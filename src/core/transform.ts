import mozjexl from "npm:mozjexl";

import { DataObject } from "../types.ts";
import { ErrorObject } from "../types.ts";

const transform = async (
  dataObject: DataObject,
): Promise<Record<string, any> | ErrorObject> => {
  try {
    const { input, transforms, settings } = dataObject;

    const derived: Record<string, any> = { ...input };
    const transformedOutput: Record<string, any> = {};

    for (const fieldTransformObject of transforms) {
      if (Object.keys(fieldTransformObject).length !== 1) {
        return { "error-101": "Each transform has to have only one key" };
      }

      const field = Object.keys(fieldTransformObject)[0];
      const expression = fieldTransformObject[field];

      try {
        const result = await mozjexl.eval(expression, { input, derived });
        if (result === undefined) {
          return {
            "error-102":
              `The transform ${expression} uses variables not available in the context`,
          };
        }

        transformedOutput[field] = result;
        derived[field] = result;
      } catch (error) {
        return { "error-103": error.toString() };
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

export default transform;
