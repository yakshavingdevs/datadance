// Copyright (c) 2024-Present The Yak Shaving Devs, MIT License

// We need the mozjexl object along with custom transforms like upper, forEach...etc
import mozjexl from "./custom_transforms.ts";
import { DataObject, ErrorObject, Expression } from "./types.ts";
import { errors } from "./constants.ts";

export const transform = async (
  dataObject: DataObject
): Promise<Record<string, any> | ErrorObject> => {
  try {
    const { input, transforms, settings } = dataObject;

    const derived: Record<string, any> =
      dataObject.derived !== undefined ? dataObject.derived : { ...input };

    const pathTrace: Array<string> =
      dataObject.pathTrace !== undefined ? dataObject.pathTrace : [];

    const isSubTransformation: boolean =
      dataObject.isSubTransformation !== undefined
        ? dataObject.isSubTransformation
        : false;

    const transformedOutput: Record<string, any> = {};

    // The dataObjectClone is used in making the nested sub transformations work
    const dataObjectClone = structuredClone(dataObject);
    // From the sub transformations, We would ony need the touched fields always
    // Otherwise sanitizing the sub transformations output would be tedious task
    dataObjectClone.settings.merge_method = "transforms_only";
    dataObjectClone.derived = derived;
    dataObjectClone.pathTrace = pathTrace;
    dataObjectClone.isSubTransformation = isSubTransformation;

    for (const fieldTransformObject of transforms) {
      // For the transformations to be evaluated in order, we restrict the transforms to be 
      // a list of JSON Objects, where each object has only one key.
      // And value can be a simple string expressions or another list of JSON Objects
      // with each object containing only one key. This helps in evaluating simple and as
      // well as deep-nested transformations easy.
      if (Object.keys(fieldTransformObject).length !== 1) {
        console.error(
          `%cerror-101 : In the transformation : --> ${JSON.stringify(
            fieldTransformObject
          )} <--,
           there are more than one keys.`,
          "color:red"
        );
        return { "error-101": "Each transform has to have only one key" };
      }

      const field: string = Object.keys(fieldTransformObject)[0];
      const expression: Expression = fieldTransformObject[field];

      try {
        if (_isSubTransformBlock(field)) {
          // Sub transform block i.e fields starting with _$ never gets evaluated,
          // But only gets added to the derived state for referencing it.
          dataObjectClone.derived[field] = expression;
          continue;
        }
        if (Array.isArray(expression)) {
          // When the expression is a nested transformation
          let intermediateResultObject = {};
          dataObjectClone.pathTrace.push(field); // adding parent field to pathTrace
          dataObjectClone.isSubTransformation = true;
          for (
            let subTransformIndex = 0;
            subTransformIndex < expression.length;
            subTransformIndex++
          ) {
            dataObjectClone.transforms = [expression[subTransformIndex]];
            const subFieldName = Object.keys(expression[subTransformIndex])[0];
            const subResultObject = await transform(dataObjectClone);

            dataObjectClone.pathTrace.push(subFieldName); // adding sub field to pathTrace
            let subResult: Record<string, any> = {};
            Object.keys(subResultObject).some((key) => {
              if (errors.includes(key)) {
                Object.assign(subResult, {});
                subResult[subFieldName] = subResultObject;
              } else {
                subResult = { ...subResultObject };
              }
            });

            intermediateResultObject = {
              ...intermediateResultObject,
              ...subResult,
            };
            // Updating the derived state is all about placing the computed value at
            // right place within the derived state to be able to use it immediately.
            _updateDerivedState(dataObjectClone.derived, subResult, pathTrace);

            dataObjectClone.pathTrace.pop(); // removing sub field from pathTrace
          }

          if (!_isTemporaryField(field)) {
            // Temporary fields never make their way into transformed output JSON.
            // In other sense, Temporary fields help in selection and deselection of fields.
            transformedOutput[field] = intermediateResultObject;
          }
          dataObjectClone.pathTrace.pop(); // removing parent field from pathTrace
          dataObjectClone.isSubTransformation = false;
        } else {
          // When the expression is a simple string
          let result = await mozjexl.eval(expression, { input, derived });
          if (result === undefined || result === null) {
            result = {
              "error-102": `The transform ${expression} uses variables not available in the context`,
            };
            console.error(
              `%cerror-102 : The expression : --> ${JSON.stringify(
                expression
              )} <--,
           uses variables not available in the context.`,
              "color:red"
            );
          }

          if (!_isTemporaryField(field)) transformedOutput[field] = result;
          // If inside a sub transformation, there is no need to update derived state
          // of parent with updates made within the sub transformation.
          // As it is already being handled by _updateDerivedState() already,
          // once the recursion is complete.
          if (!isSubTransformation) derived[field] = result;
        }
      } catch (error) {
        const errorResult = { "error-103": error.toString() };
        console.error(`%cerror-103 : ${errorResult}`, "color:red");
        if (!_isTemporaryField(field)) transformedOutput[field] = errorResult;
        if (!isSubTransformation) derived[field] = errorResult;
      }
    }

    switch (settings.merge_method?.toLowerCase()) {
      case "overwrite":
        return { ...input, ...transformedOutput };
      case "preserve":
        return { ...input, transforms: transformedOutput };
      case "transforms_only":
        return transformedOutput;
      default:
        return { "error-104": "Invalid merge method" };
    }
  } catch (transformError) {
    return { "error-105": transformError.toString() };
  }
};

export const _updateDerivedState = (
  targetObject: Record<string, any>,
  sourceObject: Record<string, any>,
  pathTrace: Array<string>
) => {
  let currentObject = targetObject;
  pathTrace.forEach((path, index) => {
    if (index === pathTrace.length - 1) {
      currentObject[path] = sourceObject[path];
    } else {
      if (currentObject[path] === undefined) {
        currentObject[path] = {};
      }
      currentObject = currentObject[path];
    }
  });
};

export const _isTemporaryField = (fieldName: string) => {
  if (fieldName.startsWith("_")) {
    return true;
  }
  return false;
};

export const _isSubTransformBlock = (fieldName: string) => {
  if (fieldName.startsWith("_$")) {
    return true;
  }
  return false;
};
