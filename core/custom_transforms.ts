// Copyright (c) 2024-Present The Yak Shaving Devs, MIT License

import mozjexl from "mozjexl";
import jsonpath from "jsonpath";
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

mozjexl.addTransform("padStart", (val: Array<string> | string, stringLength: number, padWith: string) => {
  if (typeof val === "string") return val.padStart(stringLength,padWith);
  const result: Array<string | ErrorObject> = [];
  if (typeof val === "object" && Array.isArray(val)) {
    val.forEach((record, idx) => {
      if (typeof record === "string") {
        result.push(record.padStart(stringLength,padWith));
      } else {
        result.push({
          "error-103": `The value ${record} of type ${getType(record)} at index ${idx} has no method 'padStart'. <value> | padStart(<stringLength>,<padWith>) is only supported for String, Array<String>`
        });
      }
    });
    return result;
  }
  return {
    "error-103": `The ${val} of type ${getType(val)} has no method 'padStart'. <value> | padStart(<stringLength>,<padWith>) is only supported for String, Array<String>`
  };
});

mozjexl.addTransform("padEnd", (val: Array<string> | string, stringLength: number, padWith: string) => {
  if (typeof val === "string") return val.padEnd(stringLength,padWith);
  const result: Array<string | ErrorObject> = [];
  if (typeof val === "object" && Array.isArray(val)) {
    val.forEach((record, idx) => {
      if (typeof record === "string") {
        result.push(record.padEnd(stringLength,padWith));
      } else {
        result.push({
          "error-103": `The value ${record} of type ${getType(record)} at index ${idx} has no method 'padEnd'. <value> | padEnd(<stringLength>,<padWith>) is only supported for String, Array<String>`
        });
      }
    });
    return result;
  }
  return {
    "error-103": `The ${val} of type ${getType(val)} has no method 'padEnd'. <value> | padEnd(<stringLength>,<padWith>) is only supported for String, Array<String>`
  };
});

mozjexl.addTransform("parseInt", (val: Array<string> | string, radix: number = 10) => {
  if (typeof val === "string") return parseInt(val,radix);
  const result: Array<number | ErrorObject> = [];
  if (typeof val === "object" && Array.isArray(val)) {
    val.forEach((record, idx) => {
      if (typeof record === "string") {
        result.push(parseInt(record,radix));
      } else {
        result.push({
          "error-103": `The value ${record} of type ${getType(record)} at index ${idx} has no method 'parseInt'. <value> | parseInt('<string>',<radix>) is only supported for String, Array<String>`
        });
      }
    });
    return result;
  }
  return {
    "error-103": `The ${val} of type ${getType(val)} has no method 'parseInt'. <value> | parseInt('<string>',<radix>) is only supported for String, Array<String>`
  };
});


mozjexl.addTransform("parseFloat", (val: Array<string> | string) => {
  if (typeof val === "string") return parseFloat(val);
  const result: Array<number | ErrorObject> = [];
  if (typeof val === "object" && Array.isArray(val)) {
    val.forEach((record, idx) => {
      if (typeof record === "string") {
        result.push(parseFloat(record));
      } else {
        result.push({
          "error-103": `The value ${record} of type ${getType(record)} at index ${idx} has no method 'parseFloat'. <value> | parseFloat is only supported for String, Array<String>`
        });
      }
    });
    return result;
  }
  return {
    "error-103": `The ${val} of type ${getType(val)} has no method 'parseFloat'. <value> | parseFloat is only supported for String, Array<String>`
  };
});

mozjexl.addTransform("toBoolean", (val: Array<string> | string) => {
  if (typeof val === "string") return val === "true" ? true : false;
  const result: Array<boolean | ErrorObject> = [];
  if (typeof val === "object" && Array.isArray(val)) {
    val.forEach((record, idx) => {
      if (typeof record === "string") {
        result.push(record === "true" ? true : false);
      } else {
        result.push({
          "error-103": `The value ${record} of type ${getType(record)} at index ${idx} has no method 'toBoolean'. <value> | toBoolean is only supported for String, Array<String>`
        });
      }
    });
    return result;
  }
  return {
    "error-103": `The ${val} of type ${getType(val)} has no method 'toBoolean'. <value> | toBoolean is only supported for String, Array<String>`
  };
});

mozjexl.addTransform("reverse", (val: Array<string> | string) => {
  if (typeof val === "string") return val.split('').reverse().join('');
  const result: Array<string | ErrorObject> = [];
  if (typeof val === "object" && Array.isArray(val)) {
    val.forEach((record, idx) => {
      if (typeof record === "string") {
        result.push(record.split('').reverse().join(''));
      } else {
        result.push({
          "error-103": `The value ${record} of type ${getType(record)} at index ${idx} has no method 'reverse'. <value> | reverse is only supported for String, Array<String>`
        });
      }
    });
    return result;
  }
  return {
    "error-103": `The ${val} of type ${getType(val)} has no method 'reverse'. <value> | reverse is only supported for String, Array<String>`
  };
});

mozjexl.addTransform("push", (val: Array<any>, item: any) => {
  const result: Array<any | ErrorObject> = structuredClone(val);
  if (typeof val === "object" && Array.isArray(val)) {
    result.push(...item);
    return result;
  }
  return {
    "error-103": `The ${val} of type ${getType(val)} has no method 'push'. <value> | push(<item>) is only supported for Array<any>`
  };
});

mozjexl.addTransform("pop", (val: Array<any>) => {
  const result: Array<any | ErrorObject> = structuredClone(val);
  if (typeof val === "object" && Array.isArray(val)) {
    result.pop();
    return result;
  }
  return {
    "error-103": `The ${val} of type ${getType(val)} has no method 'pop'. <value> | pop is only supported for Array<any>`
  };
});

mozjexl.addTransform("join", (val: Array<any>, delimiter: any) => {
  const result: Array<any | ErrorObject> = structuredClone(val);
  if (typeof val === "object" && Array.isArray(val)) {
    return result.join(delimiter);
  }
  return {
    "error-103": `The ${val} of type ${getType(val)} has no method 'join'. <value> | join(<delimiter>) is only supported for Array<any>`
  };
});

mozjexl.addTransform("slice", (val: Array<any>, startIdx: number, endIdx: number) => {
  if (typeof val === "object" && Array.isArray(val)) {
    return val.slice(startIdx, endIdx);
  }
  return {
    "error-103": `The ${val} of type ${getType(val)} has no method 'slice'. <value> | slice(<startIdx>,<endIdx>) is only supported for Array<any>`
  };
});

mozjexl.addTransform("reverseArray", (val: Array<any>) => {
  const result: Array<any | ErrorObject> = structuredClone(val);
  if (typeof val === "object" && Array.isArray(val)) {
    return result.reverse();
  }
  return {
    "error-103": `The ${val} of type ${getType(val)} has no method 'reverseArray'. <value> | reverseArray is only supported for Array<any>`
  };
});

mozjexl.addTransform("sortArray", (val: Array<any>) => {
  const result: Array<any | ErrorObject> = structuredClone(val);
  if (typeof val === "object" && Array.isArray(val)) {
    return result.sort();
  }
  return {
    "error-103": `The ${val} of type ${getType(val)} has no method 'sortArray'. <value> | sortArray is only supported for Array<any>`
  };
});

// Code below is taken from here : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from#sequence_generator_range
mozjexl.addTransform("range", (_val: null = null, start: number, stop: number, step: number) => {
  return Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step));
});

mozjexl.addTransform("removeDuplicates", (val: Array<any>) => {
  const result: Array<any | ErrorObject> = structuredClone(val);
  if (typeof val === "object" && Array.isArray(val)) {
    return [...new Set(result)];
  }
  return {
    "error-103": `The ${val} of type ${getType(val)} has no method 'removeDuplicates'. <value> | removeDuplicates is only supported for Array<any>`
  };
});

mozjexl.addTransform("max", (val: Array<number>) => {
  let result: number = -Infinity;
  if (typeof val === "object" && Array.isArray(val)) {
    val.forEach((record) => {
      console.log(typeof record)
      if (typeof record === "number") {
        result = record > result ? record : result;
        console.log(result)
      }
    });
    return result;
  }
  return {
    "error-103": `The ${val} of type ${getType(val)} has no method 'max'. <value> | max is only supported for Array<Number>`
  };
});

mozjexl.addTransform("min", (val: Array<number>) => {
  let result: number = Infinity;
  if (typeof val === "object" && Array.isArray(val)) {
    val.forEach((record) => {
      console.log(typeof record)
      if (typeof record === "number") {
        result = record < result ? record : result;
        console.log(result)
      }
    });
    return result;
  }
  return {
    "error-103": `The ${val} of type ${getType(val)} has no method 'min'. <value> | min is only supported for Array<Number>`
  };
});

mozjexl.addTransform("keys", (val: object) => {
  if (typeof val === "object" && !Array.isArray(val)) {
    return Object.keys(val);
  }
  return {
    "error-103": `The ${val} of type ${getType(val)} has no method 'keys'. <value> | keys is only supported for Object`
  };
});

mozjexl.addTransform("values", (val: object) => {
  if (typeof val === "object" && !Array.isArray(val)) {
    return Object.values(val);
  }
  return {
    "error-103": `The ${val} of type ${getType(val)} has no method 'values'. <value> | values is only supported for Object`
  };
});


mozjexl.addTransform("entries", (val: object) => {
  if (typeof val === "object" && !Array.isArray(val)) {
    return Object.entries(val);
  }
  return {
    "error-103": `The ${val} of type ${getType(val)} has no method 'entries'. <value> | entries is only supported for Object`
  };
});

mozjexl.addTransform("has", (val: object, property: string) => {
  if (typeof val === "object" && !Array.isArray(val)) {
    return Object.hasOwn(val,property);
  }
  return {
    "error-103": `The ${val} of type ${getType(val)} has no method 'has'. <value> | has is only supported for Object`
  };
});

mozjexl.addTransform("delete", (val: Record<string,any>, properties: Array<string>) => {
  const result: Record<string,any> = {};
  if (typeof val === "object" && !Array.isArray(val)) {
    const propertiesToKeep = new Set(Object.keys(val)).symmetricDifference(new Set(properties))
    propertiesToKeep.forEach((property) => {
      result[property] = val[property];
    });
    return result;
  }
  return {
    "error-103": `The ${val} of type ${getType(val)} has no method 'delete'. <value> | delete(<properties>) is only supported for Object`
  };
});

mozjexl.addTransform("stringify", (val: object) => {
  if (typeof val === "object" || Array.isArray(val)) {
    return JSON.stringify(val);
  }
  return {
    "error-103": `The ${val} of type ${getType(val)} has no method 'stringify'. <value> | stringify is only supported for Object or Array`
  };
});

mozjexl.addTransform("type", (val: object) => {
  return getType(val);
});

mozjexl.addTransform("jsonpath", (val: object | Array<any>, path: string | Record<string, any>[]) => {
if(typeof val === "object" || (typeof val === "object" && Array.isArray(val))){
  console.log(path);
  const result: Record<string,any> = {};
  if(typeof path === "string") return jsonpath.query(val,path);
  if(typeof path === "object" && Array.isArray(path)){
    path.forEach((record) => {
      Object.keys(record).forEach((field) => {
        const queryResult = jsonpath.query(val,record[field]);
        if(queryResult.length  === 1) result[field] = queryResult[0];
        else if(queryResult.length === 0) result[field] = "";
        else result[field] = queryResult;
     });
    });
  }
  return result;
}
return {
  "error-103": `The ${val} of type ${getType(val)} has no method 'jsonpath'. <value> | jsonpath(path|pathMap) is only supported for Object or Array`
};
});

mozjexl.addTransform("abs", (val: Array<number> | number) => {
  if (typeof val === "number") return Math.abs(val);
  const result: Array<number | ErrorObject> = [];
  if (typeof val === "object" && Array.isArray(val)) {
    val.forEach((record, idx) => {
      if (typeof record === "number") {
        result.push(Math.abs(record));
      } else {
        result.push({
          "error-103": `The value ${record} of type ${getType(record)} at index ${idx} has no method 'abs'. <value> | abs is only supported for Number, Array<Number>`
        });
      }
    });
    return result;
  }
  return {
    "error-103": `The ${val} of type ${getType(val)} has no method 'abs'. <value> | abs is only supported for Number, Array<Number>`
  };
});

mozjexl.addTransform("ceil", (val: Array<number> | number) => {
  if (typeof val === "number") return Math.ceil(val);
  const result: Array<number | ErrorObject> = [];
  if (typeof val === "object" && Array.isArray(val)) {
    val.forEach((record, idx) => {
      if (typeof record === "number") {
        result.push(Math.ceil(record));
      } else {
        result.push({
          "error-103": `The value ${record} of type ${getType(record)} at index ${idx} has no method 'ceil'. <value> | ceil is only supported for Number, Array<Number>`
        });
      }
    });
    return result;
  }
  return {
    "error-103": `The ${val} of type ${getType(val)} has no method 'ceil'. <value> | ceil is only supported for Number, Array<Number>`
  };
});

mozjexl.addTransform("floor", (val: Array<number> | number) => {
  if (typeof val === "number") return Math.floor(val);
  const result: Array<number | ErrorObject> = [];
  if (typeof val === "object" && Array.isArray(val)) {
    val.forEach((record, idx) => {
      if (typeof record === "number") {
        result.push(Math.floor(record));
      } else {
        result.push({
          "error-103": `The value ${record} of type ${getType(record)} at index ${idx} has no method 'floor'. <value> | floor is only supported for Number, Array<Number>`
        });
      }
    });
    return result;
  }
  return {
    "error-103": `The ${val} of type ${getType(val)} has no method 'floor'. <value> | floor is only supported for Number, Array<Number>`
  };
});

mozjexl.addTransform("round", (val: Array<number> | number) => {
  if (typeof val === "number") return Math.round(val);
  const result: Array<number | ErrorObject> = [];
  if (typeof val === "object" && Array.isArray(val)) {
    val.forEach((record, idx) => {
      if (typeof record === "number") {
        result.push(Math.round(record));
      } else {
        result.push({
          "error-103": `The value ${record} of type ${getType(record)} at index ${idx} has no method 'round'. <value> | round is only supported for Number, Array<Number>`
        });
      }
    });
    return result;
  }
  return {
    "error-103": `The ${val} of type ${getType(val)} has no method 'round'. <value> | round is only supported for Number, Array<Number>`
  };
});

mozjexl.addTransform("random", (_val: null) => {
  return Math.random();
});

mozjexl.addTransform("slugify", (val: Array<string> | string) => {
  if (typeof val === "string") return encodeURI(val);
  const result: Array<string | ErrorObject> = [];
  if (typeof val === "object" && Array.isArray(val)) {
    val.forEach((record, idx) => {
      if (typeof record === "string") {
        result.push(encodeURI(record));
      } else {
        result.push({
          "error-103": `The value ${record} of type ${getType(record)} at index ${idx} has no method 'slugify'. <value> | slugify is only supported for String, Array<String>`
        });
      }
    });
    return result;
  }
  return {
    "error-103": `The ${val} of type ${getType(val)} has no method 'slugify'. <value> | slugify is only supported for String, Array<String>`
  };
});

mozjexl.addTransform("unslugify", (val: Array<string> | string) => {
  if (typeof val === "string") return decodeURI(val);
  const result: Array<string | ErrorObject> = [];
  if (typeof val === "object" && Array.isArray(val)) {
    val.forEach((record, idx) => {
      if (typeof record === "string") {
        result.push(decodeURI(record));
      } else {
        result.push({
          "error-103": `The value ${record} of type ${getType(record)} at index ${idx} has no method 'unslugify'. <value> | unslugify is only supported for String, Array<String>`
        });
      }
    });
    return result;
  }
  return {
    "error-103": `The ${val} of type ${getType(val)} has no method 'unslugify'. <value> | unslugify is only supported for String, Array<String>`
  };
});

export default mozjexl;