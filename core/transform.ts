import mozjexl from "npm:mozjexl";
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

    const dataObjectClone = structuredClone(dataObject);
    dataObjectClone.settings.merge_method = "transforms_only";
    dataObjectClone.derived = derived;
    dataObjectClone.pathTrace = pathTrace;
    dataObjectClone.isSubTransformation = isSubTransformation;

    for (const fieldTransformObject of transforms) {
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
          dataObjectClone.derived[field] = expression;
          continue;
        }
        if (Array.isArray(expression)) {
          let intermediateResultObject = {};
          dataObjectClone.pathTrace.push(field);
          dataObjectClone.isSubTransformation = true;
          for (
            let subTransformIndex = 0;
            subTransformIndex < expression.length;
            subTransformIndex++
          ) {
            dataObjectClone.transforms = [expression[subTransformIndex]];
            const subFieldName = Object.keys(expression[subTransformIndex])[0];
            const subResultObject = await transform(dataObjectClone);

            dataObjectClone.pathTrace.push(subFieldName);
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
            _updateDerivedState(dataObjectClone.derived, subResult, pathTrace);

            dataObjectClone.pathTrace.pop();
          }

          if (!_isTemporaryField(field)) {
            transformedOutput[field] = intermediateResultObject;
          }
          dataObjectClone.pathTrace.pop();
          dataObjectClone.isSubTransformation = false;
        } else {
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
