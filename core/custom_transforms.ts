import mozjexl from "npm:mozjexl";
import { transform, _isSubTransformBlock, _isTemporaryField, _updateDerivedState } from "./transform.ts";
import { DataObject } from "./types.ts";

mozjexl.addTransform("upper", (val: Array<string> | string) => {
  if (typeof val === "string") return val.toUpperCase();
  const result: Array<string> = [];
  val.forEach((record) => {
    if (typeof record === "string") {
      result.push(record.toUpperCase());
    } else {
      result.push(record);
    }
  });
  return result;
});

mozjexl.addTransform(
  "forEach",
  async (
    val: Array<any>,
    context: Record<string, any>,
    transforms: Record<string, any>[],
  ) => {
    if (context === null) context = {};
    const forEachResult: Array<any> = [];
    for (let idx = 0; idx < val.length; idx++) {
      const dataObject: DataObject = {
        input: { ...context, item: val[idx], _idx: idx },
        transforms: transforms,
        settings: {
          merge_method: "transforms_only",
        },
      };
      const result = await transform(dataObject);
      Object.keys(context).forEach((field) => {
        if (result[field]) context[field] = result[field];
      });
      forEachResult.push(result);
    }
    return forEachResult;
  },
);

mozjexl.addTransform("pluck", (val: Array<any>, properties: Array<String>) => {
  const result = [];
  const justOneProperty: boolean = properties.length === 1 ? true : false;
  for (let idx = 0; idx < val.length; idx++) {
    const objectAtIdx: Record<string, any> = {};
    properties.forEach((property: any) => {
      objectAtIdx[property] = val[idx][property];
    });
    result.push(justOneProperty ? Object.values(objectAtIdx)[0] : objectAtIdx);
  }
  return result;
});
export default mozjexl;
