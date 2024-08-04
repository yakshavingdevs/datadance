// Copyright (c) 2024-Present The Yak Shaving Devs, MIT License

import mozjexl from "mozjexl";
import {
  _isSubTransformBlock,
  _isTemporaryField,
  _updateDerivedState,
  transform,
} from "./transform.ts";
import { DataObject, ErrorObject } from "./types.ts";
import { isRegExpExpression, getType } from "./utils.ts";

mozjexl.addTransform("upper", (val: Array<string> | string) => {
  if (typeof val === "string") return val.toUpperCase();
  const result: Array<string | ErrorObject> = [];
  if (typeof val === "object" && Array.isArray(val)) {
    val.forEach((record, idx) => {
      if (typeof record === "string") {
        result.push(record.toUpperCase());
      } else {
        result.push({
          "error-103": `The value ${record} of type ${getType(record)} at index ${idx} has no method 'upper'. <value> | upper is only supported for String, Array<String>`
        });
      }
    });
    return result;
  }
  return {
    "error-103": `The ${val} of type ${getType(val)} has no method 'upper'. <value> | upper is only supported for String, Array<String>`
  };
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
        input: { ...context, item: val[idx], _idx: idx, _$func: transforms },
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
  const result: Array<string | ErrorObject> = [];
  if (typeof val === "object" && Array.isArray(val)) {
    val.forEach((record, idx) => {
      if (typeof record === "string") {
        result.push(record.toLowerCase());
      } else {
        result.push({
          "error-103": `The value ${record} of type ${getType(record)} at index ${idx} has no method 'lower'. <value> | lower is only supported for String, Array<String>`
        });
      }
    });
    return result;
  }
  return {
    "error-103": `The ${val} of type ${getType(val)} has no method 'lower'. <value> | lower is only supported for String, Array<String>`
  };
});

mozjexl.addTransform("capitalize", (val: Array<string> | string) => {
  if (typeof val === "string") return val[0].toUpperCase() + val.slice(1);
  const result: Array<string | ErrorObject> = [];
  if (typeof val === "object" && Array.isArray(val)) {
    val.forEach((record, idx) => {
      if (typeof record === "string") {
        result.push(record[0].toUpperCase() + record.slice(1));
      } else {
        result.push({
          "error-103": `The value ${record} of type ${getType(record)} at index ${idx} has no method 'capitalize'. <value> | capitalize is only supported for String, Array<String>`
        });
      }
    });
    return result;
  }
  return {
    "error-103": `The ${val} of type ${getType(val)} has no method 'capitalize'. <value> | capitalize is only supported for String, Array<String>`
  };
});

mozjexl.addTransform("swapCase", (val: Array<string> | string) => {
  if (typeof val === "string") {
    return val.split("").map(function (c) {
      return c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase();
    }).join("");
  }
  const result: Array<string | ErrorObject> = [];
  if (typeof val === "object" && Array.isArray(val)) {
    val.forEach((record, idx) => {
      if (typeof record === "string") {
        result.push(
          record.split("").map(function (c) {
            return c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase();
          }).join(""),
        );
      } else {
        result.push({
          "error-103": `The value ${record} of type ${getType(record)} at index ${idx} has no method 'swapCase'. <value> | swapCase is only supported for String, Array<String>`
        });
      }
    });
    return result;
  }
  return {
    "error-103": `The ${val} of type ${getType(val)} has no method 'swapCase'. <value> | swapCase is only supported for String, Array<String>`
  };
});

mozjexl.addTransform(
  "startsWith",
  (val: Array<string> | string, char: string) => {
    if (typeof val === "string") return (val.startsWith(char));
    const result: Array<boolean | ErrorObject> = [];
    if (typeof val === "object" && Array.isArray(val)) {
      val.forEach((record, idx) => {
        record = record.toString();
        if (typeof record === "string") {
          result.push(record.startsWith(char));
        } else {
          result.push({
            "error-103": `The value ${record} of type ${getType(record)} at index ${idx} has no method 'startsWith'. <value> | startsWith('<char>') is only supported for String, Array<String>`
          });
        }
      });
      return result;
    }
    return {
      "error-103": `The ${val} of type ${getType(val)} has no method 'startsWith'. <value> | startsWith('<char>') is only supported for String, Array<String>`
    };
  }
);

mozjexl.addTransform(
  "endsWith",
  (val: Array<string> | string, char: string) => {
    if (typeof val === "string") return (val.endsWith(char));
    const result: Array<boolean | ErrorObject> = [];
    if (typeof val === "object" && Array.isArray(val)) {
      val.forEach((record, idx) => {
        record = record.toString();
        if (typeof record === "string") {
          result.push(record.endsWith(char));
        } else {
          result.push({
            "error-103": `The value ${record} of type ${getType(record)} at index ${idx} has no method 'endsWith'. <value> | endsWith('<char>') is only supported for String, Array<String>`
          });
        }
      });
      return result;
    }
    return {
      "error-103": `The ${val} of type ${getType(val)} has no method 'endsWith'. <value> | endsWith('<char>') is only supported for String, Array<String>`
    };
  }
);

mozjexl.addTransform("indexOfChar", (val: Array<string> | string, char: string) => {
  if (typeof val === "string") return (val.indexOf(char));
  const result: Array<number | ErrorObject> = [];
  if (typeof val === "object" && Array.isArray(val)) {
    val.forEach((record, idx) => {
      record = record.toString();
      if (typeof record === "string") {
        result.push(record.indexOf(char));
      } else {
        result.push({
          "error-103": `The value ${record} of type ${getType(record)} at index ${idx} has no method 'indexOfChar'. <value> | indexOfChar('<char>') is only supported for String, Array<String>`
        });
      }
    });
    return result;
  }
  return {
    "error-103": `The ${val} of type ${getType(val)} has no method 'indexOfChar'. <value> | indexOfChar('<char>') is only supported for String, Array<String>`
  };
});

mozjexl.addTransform("trim", (val: Array<string> | string) => {
  if (typeof val === "string") return val.trim();
  const result: Array<string | ErrorObject> = [];
  if (typeof val === "object" && Array.isArray(val)) {
    val.forEach((record, idx) => {
      if (typeof record === "string") {
        result.push(record.trim());
      } else {
        result.push({
          "error-103": `The value ${record} of type ${getType(record)} at index ${idx} has no method 'trim'. <value> | trim is only supported for String, Array<String>`
        });
      }
    });
    return result;
  }
  return {
    "error-103": `The ${val} of type ${getType(val)} has no method 'trim'. <value> | trim is only supported for String, Array<String>`
  };
});

mozjexl.addTransform("ltrim", (val: Array<string> | string) => {
  if (typeof val === "string") return val.trimStart();
  const result: Array<string | ErrorObject> = [];
  if (typeof val === "object" && Array.isArray(val)) {
    val.forEach((record, idx) => {
      if (typeof record === "string") {
        result.push(record.trimStart());
      } else {
        result.push({
          "error-103": `The value ${record} of type ${getType(record)} at index ${idx} has no method 'ltrim'. <value> | ltrim is only supported for String, Array<String>`
        });
      }
    });
    return result;
  }
  return {
    "error-103": `The ${val} of type ${getType(val)} has no method 'ltrim'. <value> | ltrim is only supported for String, Array<String>`
  };
});

mozjexl.addTransform("rtrim", (val: Array<string> | string) => {
  if (typeof val === "string") return val.trimEnd();
  const result: Array<string | ErrorObject> = [];
  if (typeof val === "object" && Array.isArray(val)) {
    val.forEach((record, idx) => {
      if (typeof record === "string") {
        result.push(record.trimEnd());
      } else {
        result.push({
          "error-103": `The value ${record} of type ${getType(record)} at index ${idx} has no method 'rtrim'. <value> | rtrim is only supported for String, Array<String>`
        });
      }
    });
    return result;
  }
  return {
    "error-103": `The ${val} of type ${getType(val)} has no method 'rtrim'. <value> | rtrim is only supported for String, Array<String>`
  };
});

mozjexl.addTransform("length", (val: Array<string> | string) => {
  const result: Array<number | ErrorObject> = [];
  if (typeof val === "string") return val.length;
  if (typeof val === "object" && Array.isArray(val)) {
    val.forEach((record, idx) => {
      if (typeof record === "string") {
        result.push(record.length);
      } else {
        result.push({
          "error-103": `The value ${record} of type ${getType(record)} at index ${idx} has no method 'length'. <value> | length is only supported for String, Array<String>`
        });
      }
    });
    return result;
  }
  return {
    "error-103": `The ${val} of type ${getType(val)} has no method 'length'. <value> | length is only supported for String, Array<String>`
  };
});

mozjexl.addTransform("size", (val: Array<any> | object | string) => {
  if (typeof val === "string") return val.length;
  if (typeof val === "object") {
    if (Array.isArray(val)) return val.length;
    return Object.keys(val).length;
  }
  return {
    "error-103": `The ${val} of type ${getType(val)} has no method 'size'. <value> | size is only supported for Object, String, Array<any>`
  };
});

mozjexl.addTransform("replace", (val: Array<string> | string, searchValue: string, replacementString: string) => {
  const searchParam: string | RegExp = isRegExpExpression(searchValue) ? new RegExp(searchValue) : searchValue;
  if (typeof val === "string") return val.replace(searchParam, replacementString);
  const result: Array<string | ErrorObject> = [];
  if (typeof val === "object" && Array.isArray(val)) {
    val.forEach((record, idx) => {
      if (typeof record === "string") {
        result.push(record.replace(searchParam, replacementString));
      } else {
        result.push({
          "error-103": `The value ${record} of type ${getType(record)} at index ${idx} has no method 'replace'. <value> | replace(<search_string>,<replace_string>) is only supported for String, Array<String>`
        });
      }
    });
    return result;
  }
  return {
    "error-103": `The ${val} of type ${getType(val)} has no method 'replace'. <value> | replace(<search_string>,<replace_string>) is only supported for String, Array<String>`
  };
});

mozjexl.addTransform("replaceAll", (val: Array<string> | string, searchValue: string, replacementString: string) => {
  const searchParam: string | RegExp = isRegExpExpression(searchValue) ? new RegExp(searchValue, "g") : searchValue;
  if (typeof val === "string") return val.replaceAll(searchParam, replacementString);
  const result: Array<string | ErrorObject> = [];
  if (typeof val === "object" && Array.isArray(val)) {
    val.forEach((record, idx) => {
      if (typeof record === "string") {
        result.push(record.replaceAll(searchParam, replacementString));
      } else {
        result.push({
          "error-103": `The value ${record} of type ${getType(record)} at index ${idx} has no method 'replaceAll'. <value> | replaceAll(<search_string>,<replace_string>) is only supported for String, Array<String>`
        });
      }
    });
    return result;
  }
  return {
    "error-103": `The ${val} of type ${getType(val)} has no method 'replaceAll'. <value> | replaceAll(<search_string>,<replace_string>) is only supported for String, Array<String>`
  };
});

mozjexl.addTransform("split", (val: string, delimiter: string) => {
  const delimiterParam: string | RegExp = isRegExpExpression(delimiter) ? new RegExp(delimiter) : delimiter;
  if (typeof val === "string") return val.split(delimiterParam);
  return {
    "error-103": `The ${val} of type ${getType(val)} has no method 'split'. <value> | split(<delimiter>) is only supported for String`
  };
});

mozjexl.addTransform("substring", (val: Array<string> | string, startIndex: number, endIndex: number) => {
  if (typeof val === "string") return val.substring(startIndex,endIndex);
  const result: Array<string | ErrorObject> = [];
  if (typeof val === "object" && Array.isArray(val)) {
    val.forEach((record, idx) => {
      if (typeof record === "string") {
        result.push(record.substring(startIndex,endIndex));
      } else {
        result.push({
          "error-103": `The value ${record} of type ${getType(record)} at index ${idx} has no method 'substring'. <value> | substring(<startIdx>,<endIdx>) is only supported for String, Array<String>`
        });
      }
    });
    return result;
  }
  return {
    "error-103": `The ${val} of type ${getType(val)} has no method 'substring'. <value> | substring(<startIdx>,<endIdx>) is only supported for String, Array<String>`
  };
});

export default mozjexl;
