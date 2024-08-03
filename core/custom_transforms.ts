/********************************************************/

/*
  Datadance : A simple JSON transformation package
  MIT License

  Copyright (c) 2024-Present Sri Pravan Paturi, Chiranjeevi Karthik Kuruganti, Vodela Saiswapnil Gupta

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.

  Please refer the license here : https://github.com/yakshavingdevs/datadance/blob/main/LICENSE
*/

/********************************************************/

import mozjexl from "mozjexl";
import {
  _isSubTransformBlock,
  _isTemporaryField,
  _updateDerivedState,
  transform,
} from "./transform.ts";
import { DataObject, ErrorObject } from "./types.ts";

/********************************************************/

mozjexl.addTransform("upper", (val: Array<string> | string) => {
  if (typeof val === "string") return val.toUpperCase();
  const result: Array<string | ErrorObject> = [];
  if (typeof val === "object" && Array.isArray(val)) {
    val.forEach((record, idx) => {
      if (typeof record === "string") {
        result.push(record.toUpperCase());
      } else {
        result.push({
          "error-103": `The value ${record} of type ${typeof record} at index ${idx} has no method 'upper'. <value> | upper is only supported for String, Array<String>`
        });
      }
    });
    return result;
  }
  return {
    "error-103": `The ${val} of type ${typeof val} has no method 'upper'. <value> | upper is only supported for String, Array<String>`
  };
});

/********************************************************/

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

/********************************************************/

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

/********************************************************/

mozjexl.addTransform("lower", (val: Array<string> | string) => {
  if (typeof val === "string") return val.toLowerCase();
  const result: Array<string | ErrorObject> = [];
  if (typeof val === "object" && Array.isArray(val)) {
    val.forEach((record, idx) => {
      if (typeof record === "string") {
        result.push(record.toLowerCase());
      } else {
        result.push({
          "error-103": `The value ${record} of type ${typeof record} at index ${idx} has no method 'lower'. <value> | lower is only supported for String, Array<String>`
        });
      }
    });
    return result;
  }
  return {
    "error-103": `The ${val} of type ${typeof val} has no method 'lower'. <value> | lower is only supported for String, Array<String>`
  };
});

/********************************************************/

mozjexl.addTransform("capitalize", (val: Array<string> | string) => {
  if (typeof val === "string") return val[0].toUpperCase() + val.slice(1);
  const result: Array<string | ErrorObject> = [];
  if (typeof val === "object" && Array.isArray(val)) {
    val.forEach((record, idx) => {
      if (typeof record === "string") {
        result.push(record[0].toUpperCase() + record.slice(1));
      } else {
        result.push({
          "error-103": `The value ${record} of type ${typeof record} at index ${idx} has no method 'capitalize'. <value> | capitalize is only supported for String, Array<String>`
        });
      }
    });
    return result;
  }
  return {
    "error-103": `The ${val} of type ${typeof val} has no method 'capitalize'. <value> | capitalize is only supported for String, Array<String>`
  };
});

/********************************************************/

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
          "error-103": `The value ${record} of type ${typeof record} at index ${idx} has no method 'swapCase'. <value> | swapCase is only supported for String, Array<String>`
        });
      }
    });
    return result;
  }
  return {
    "error-103": `The ${val} of type ${typeof val} has no method 'swapCase'. <value> | swapCase is only supported for String, Array<String>`
  };
});

/********************************************************/

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
            "error-103": `The value ${record} of type ${typeof record} at index ${idx} has no method 'startsWith'. <value> | startsWith('<char>') is only supported for String, Array<String>`
          });
        }
      });
      return result;
    }
    return {
      "error-103": `The ${val} of type ${typeof val} has no method 'startsWith'. <value> | startsWith('<char>') is only supported for String, Array<String>`
    };
  }
);

/********************************************************/

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
            "error-103": `The value ${record} of type ${typeof record} at index ${idx} has no method 'endsWith'. <value> | endsWith('<char>') is only supported for String, Array<String>`
          });
        }
      });
      return result;
    }
    return {
      "error-103": `The ${val} of type ${typeof val} has no method 'endsWith'. <value> | endsWith('<char>') is only supported for String, Array<String>`
    };
  }
);

/********************************************************/

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
          "error-103": `The value ${record} of type ${typeof record} at index ${idx} has no method 'indexOfChar'. <value> | indexOfChar('<char>') is only supported for String, Array<String>`
        });
      }
    });
    return result;
  }
  return {
    "error-103": `The ${val} of type ${typeof val} has no method 'indexOfChar'. <value> | indexOfChar('<char>') is only supported for String, Array<String>`
  };
});

/********************************************************/

mozjexl.addTransform("trim", (val: Array<string> | string) => {
  if (typeof val === "string") return val.trim();
  const result: Array<string | ErrorObject> = [];
  if (typeof val === "object" && Array.isArray(val)) {
    val.forEach((record, idx) => {
      if (typeof record === "string") {
        result.push(record.trim());
      } else {
        result.push({
          "error-103": `The value ${record} of type ${typeof record} at index ${idx} has no method 'trim'. <value> | trim is only supported for String, Array<String>`
        });
      }
    });
    return result;
  }
  return {
    "error-103": `The ${val} of type ${typeof val} has no method 'trim'. <value> | trim is only supported for String, Array<String>`
  };
});

/********************************************************/

mozjexl.addTransform("ltrim", (val: Array<string> | string) => {
  if (typeof val === "string") return val.trimStart();
  const result: Array<string | ErrorObject> = [];
  if (typeof val === "object" && Array.isArray(val)) {
    val.forEach((record, idx) => {
      if (typeof record === "string") {
        result.push(record.trimStart());
      } else {
        result.push({
          "error-103": `The value ${record} of type ${typeof record} at index ${idx} has no method 'ltrim'. <value> | ltrim is only supported for String, Array<String>`
        });
      }
    });
    return result;
  }
  return {
    "error-103": `The ${val} of type ${typeof val} has no method 'ltrim'. <value> | ltrim is only supported for String, Array<String>`
  };
});

/********************************************************/

mozjexl.addTransform("rtrim", (val: Array<string> | string) => {
  if (typeof val === "string") return val.trimEnd();
  const result: Array<string | ErrorObject> = [];
  if (typeof val === "object" && Array.isArray(val)) {
    val.forEach((record, idx) => {
      if (typeof record === "string") {
        result.push(record.trimEnd());
      } else {
        result.push({
          "error-103": `The value ${record} of type ${typeof record} at index ${idx} has no method 'rtrim'. <value> | rtrim is only supported for String, Array<String>`
        });
      }
    });
    return result;
  }
  return {
    "error-103": `The ${val} of type ${typeof val} has no method 'rtrim'. <value> | rtrim is only supported for String, Array<String>`
  };
});

/********************************************************/

mozjexl.addTransform("length", (val: Array<string> | string) => {
  const result: Array<number | ErrorObject> = [];
  if (typeof val === "string") return val.length;
  if (typeof val === "object" && Array.isArray(val)) {
    val.forEach((record, idx) => {
      if (typeof record === "string") {
        result.push(record.length);
      } else {
        result.push({
          "error-103": `The value ${record} of type ${typeof record} at index ${idx} has no method 'length'. <value> | length is only supported for String, Array<String>`
        });
      }
    });
    return result;
  }
  return {
    "error-103": `The ${val} of type ${typeof val} has no method 'length'. <value> | length is only supported for String, Array<String>`
  };
});

/********************************************************/

mozjexl.addTransform("size", (val: Array<any> | object | string) => {
  if (typeof val === "string") return val.length;
  if (typeof val === "object") {
    if (Array.isArray(val)) return val.length;
    return Object.keys(val).length;
  }
  return {
    "error-103": `The ${val} of type ${typeof val} has no method 'size'. <value> | size is only supported for Object, String, Array<any>`
  };
});

/********************************************************/

export default mozjexl;

/********************************************************/
