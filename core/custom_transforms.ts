import mozjexl from "npm:mozjexl";
import {
  _isSubTransformBlock,
  _isTemporaryField,
  _updateDerivedState,
  transform,
} from "./transform.ts";
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

mozjexl.addTransform("lower", (val: Array<string> | string) => {
  if (typeof val === "string") return val.toLowerCase();
  const result: Array<string> = [];
  val.forEach((record) => {
    if (typeof record === "string") {
      result.push(record.toLowerCase());
    } else {
      result.push(record);
    }
  });
  return result;
});

mozjexl.addTransform("capitalize", (val: Array<string> | string) => {
  if (typeof val === "string") return val[0].toUpperCase() + val.slice(1);
  const result: Array<string> = [];
  val.forEach((record) => {
    if (typeof record === "string") {
      result.push(record[0].toUpperCase() + record.slice(1));
    } else {
      result.push(record);
    }
  });
  return result;
});

mozjexl.addTransform("swapCase", (val: Array<string> | string) => {
  if (typeof val === "string") {
    return val.split("").map(function (c) {
      return c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase();
    }).join("");
  }
  const result: Array<string> = [];
  val.forEach((record) => {
    if (typeof record === "string") {
      result.push(
        record.split("").map(function (c) {
          return c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase();
        }).join(""),
      );
    } else {
      result.push(record);
    }
  });
  return result;
});

mozjexl.addTransform("count", (val: Array<string> | string, char: string) => {
  if (typeof val === "string") return (val.split(char)).length - 1;
  const result: Array<number> = [];
  val.forEach((record) => {
    record = record.toString();
    if (typeof record === "string") {
      result.push((record.split(char)).length - 1);
    } else {
      result.push(record);
    }
  });
  return result;
});

mozjexl.addTransform(
  "startsWith",
  (val: Array<string> | string, char: string) => {
    if (typeof val === "string") return (val.startsWith(char));
    const result: Array<boolean> = [];
    val.forEach((record) => {
      record = record.toString();
      if (typeof record === "string") {
        result.push(record.startsWith(char));
      } else {
        result.push(record);
      }
    });
    return result;
  },
);

mozjexl.addTransform(
  "endsWith",
  (val: Array<string> | string, char: string) => {
    if (typeof val === "string") return (val.endsWith(char));
    const result: Array<boolean> = [];
    val.forEach((record) => {
      record = record.toString();
      if (typeof record === "string") {
        result.push(record.endsWith(char));
      } else {
        result.push(record);
      }
    });
    return result;
  },
);

mozjexl.addTransform("indexOf", (val: Array<string> | string, char: string) => {
  if (typeof val === "string") return (val.indexOf(char));
  const result: Array<number> = [];
  val.forEach((record) => {
    record = record.toString();
    if (typeof record === "string") {
      result.push(record.indexOf(char));
    } else {
      result.push(record);
    }
  });
  return result;
});

mozjexl.addTransform("trim", (val: Array<string> | string) => {
  if (typeof val === "string") return val.trim();
  const result: Array<string> = [];
  val.forEach((record) => {
    if (typeof record === "string") {
      result.push(record.trim());
    } else {
      result.push(record);
    }
  });
  return result;
});

mozjexl.addTransform("ltrim", (val: Array<string> | string) => {
  if (typeof val === "string") return val.trimStart();
  const result: Array<string> = [];
  val.forEach((record) => {
    if (typeof record === "string") {
      result.push(record.trimStart());
    } else {
      result.push(record);
    }
  });
  return result;
});

mozjexl.addTransform("rtrim", (val: Array<string> | string) => {
  if (typeof val === "string") return val.trimEnd();
  const result: Array<string> = [];
  val.forEach((record) => {
    if (typeof record === "string") {
      result.push(record.trimEnd());
    } else {
      result.push(record);
    }
  });
  return result;
});

mozjexl.addTransform("length", (val: Array<string> | string) => {
  if (typeof val === "string") return val.length;
  const result: Array<number> = [];
  val.forEach((record) => {
    if (typeof record === "string") {
      result.push(record.length);
    } else {
      result.push(record);
    }
  });
  return result;
});

export default mozjexl;
