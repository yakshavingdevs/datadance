// Copyright (c) 2024-Present The Yak Shaving Devs, MIT License

/**
 * Import the `mozjexl` object along with any custom transforms, 
 * such as `upper`, `forEach`, and others as needed.
 * 
 * These custom transforms extend the functionality of `mozjexl` 
 * by providing additional utilities.
 */
import mozjexl from "./load_lib.ts";
import { DataObject, ErrorObject, Expression } from "./types.ts";
import { Errors } from "./constants.ts";

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

    /**
     * The `dataObjectClone` is utilized to enable the functionality 
     * of nested sub-transformations.
     * 
     * By working on a cloned version of the data object, it ensures 
     * that nested transformations are processed independently while 
     * preserving the integrity of the original data structure.
     */
    const dataObjectClone = structuredClone(dataObject);
    /**
     * From the sub-transformations, we only retain the fields that were modified 
     * (touched) during the process.
     * 
     * Retaining only the touched fields avoids the need for sanitizing the output 
     * of sub-transformations, simplifying the overall workflow and ensuring clean results.
     */
    dataObjectClone.settings.merge_method = "transforms_only";
    dataObjectClone.derived = derived;
    dataObjectClone.pathTrace = pathTrace;
    dataObjectClone.isSubTransformation = isSubTransformation;

    for (const fieldTransformObject of transforms) {
      /**
       * To ensure transformations are evaluated in order, we restrict transforms 
       * to be a list of JSON objects, where each object contains only one key.
       * 
       * The value of each key can either be:
       * 1. A simple string expression, or
       * 2. Another list of JSON objects, where each object also contains only one key.
       * 
       * This structure simplifies the evaluation process for both straightforward 
       * and deeply nested transformations.
       */
      if (Object.keys(fieldTransformObject).length !== 1) {
        console.error(
          `%c${[Errors.InvalidTransform]} : In the transformation : --> ${JSON.stringify(
            fieldTransformObject
          )} <--,
           there are more than one keys.`,
          "color:red"
        );
        return { [Errors.InvalidTransform]: "Each transform has to have only one key" };
      }

      const field: string = Object.keys(fieldTransformObject)[0];
      const expression: Expression = fieldTransformObject[field];

      try {
        if (_isSubTransformBlock(field)) {
          /**
           * Sub-transform blocks (fields starting with an underscore followed by a dollar sign, e.g., `_$`) 
           * are not directly evaluated. Instead, they are added to the derived state for reference purposes.
           *
           * These sub-transform blocks, regardless of their nesting level, are only accessible at the root 
           * level for referencing. This ensures a consistent way to access functions from derived state data throughout 
           * the system.
           */
          derived[field] = expression;
          continue;
        }
        if (Array.isArray(expression)) {
          /**
           * Handles cases where the expression represents a nested transformation.
           * 
           * Nested transformations involve processing a sub-structure within 
           * the data, allowing for complex, hierarchical modifications to be 
           * applied seamlessly.
           */
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
              if (Object.keys(Errors).includes(key)) {
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
            /**
             * Updating the derived state involves placing the computed value 
             * in the correct location within the derived state. 
             * This ensures that the value is immediately available for use 
             * wherever it is needed.
             */
            _updateDerivedState(dataObjectClone.derived, subResult, pathTrace);

            dataObjectClone.pathTrace.pop(); // removing sub field from pathTrace
          }

          /**
           * Temporary fields are excluded from the final transformed output JSON.
           * 
           * These fields serve a functional purpose during the transformation process, 
           * aiding in the selection and deselection of specific fields without 
           * impacting the resulting output.
           */
          transformedOutput[field] = _cleanTemporaryFields(intermediateResultObject);
          dataObjectClone.pathTrace.pop(); // removing parent field from pathTrace
          dataObjectClone.isSubTransformation = false;
        } else {
          /**
           * Handles cases where the expression is a simple string.
           * 
           * Simple string expressions are evaluated directly, without the need 
           * for additional processing or recursion, ensuring straightforward 
           * transformations.
           */
          let result = await mozjexl.eval(expression, { input, derived });
          if (result === undefined || result === null) {
            result = {
              [Errors.VariableNotInContext]: `The transform ${expression} uses variables not available in the context`,
            };
            console.error(
              `%c${[Errors.VariableNotInContext]} : The expression : --> ${JSON.stringify(
                expression
              )} <--,
           uses variables not available in the context.`,
              "color:red"
            );
          }
          /**
           * When temporary fields are referenced elsewhere, 
           * it is essential to remove these temporary variables 
           * to maintain a clean and accurate state.
           * 
           * This ensures that temporary fields do not persist unnecessarily 
           * or interfere with the final output.
           */
          if (!_isTemporaryField(field) || pathTrace.length > 0) transformedOutput[field] = typeof result === "object" && !Array.isArray(result) ? _cleanTemporaryFields(result) : result;
          /**
           * When working inside a sub-transformation, there is no need to explicitly 
           * update the derived state of the parent with changes made within the 
           * sub-transformation.
           * 
           * This is because the `_updateDerivedState()` function automatically handles 
           * these updates once the recursive process is complete.
           */
          if (!isSubTransformation) derived[field] = result;
        }
      } catch (error) {
        let formattedError = JSON.stringify(error);
        if (formattedError === `{}`) {
          formattedError = "The transforms contain an incomplete/invalid expression.";
        }
        const errorResult = { [Errors.TransformError]: formattedError };
        console.error(`%c${[Errors.TransformError]}: ${JSON.stringify(errorResult)}`, "color:red");
        if (!_isTemporaryField(field) || pathTrace.length > 0) transformedOutput[field] = errorResult;
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
        return { [Errors.InvalidMergeMethod]: "Invalid merge method" };
    }
  } catch (transformError) {
    return { [Errors.TransformError]: transformError.toString() };
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
  if (fieldName.startsWith("_") && !_isSubTransformBlock(fieldName)) {
    return true;
  }
  return false;
};

export const _cleanTemporaryFields = (resultObject: Record<string,any>) => {
  const cleanedResultObject: Record<string,any> = {};
  for (const key in resultObject) {
    if (!_isTemporaryField(key)) {
      cleanedResultObject[key] = resultObject[key];
    }
  }
  return cleanedResultObject;
};

export const _isSubTransformBlock = (fieldName: string) => {
  if (fieldName.startsWith("_$")) {
    return true;
  }
  return false;
};
