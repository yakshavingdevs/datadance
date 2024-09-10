import { ErrorObject } from "../../types.ts";
import { getType, isRegExpExpression } from "../../utils.ts";

export const UPPER = (val: Array<string> | string) => {
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
};

export const LOWER = (val: Array<string> | string) => {
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
};

export const CAPITALIZE = (val: Array<string> | string) => {
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
};

export const SWAP_CASE = (val: Array<string> | string) => {
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
};

export const STARTS_WITH = (val: Array<string> | string, char: string) => {
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
};

export const ENDS_WITH = (val: Array<string> | string, char: string) => {
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
};

export const INDEX_OF_CHAR = (val: Array<string> | string, char: string) => {
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
};

export const TRIM = (val: Array<string> | string) => {
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
};

export const LTRIM = (val: Array<string> | string) => {
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
};

export const RTRIM = (val: Array<string> | string) => {
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
};

export const LENGTH = (val: Array<string> | string) => {
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
};

export const REPLACE = (val: Array<string> | string, searchValue: string, replacementString: string) => {
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
};

export const REPLACE_ALL = (val: Array<string> | string, searchValue: string, replacementString: string) => {
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
};

export const SPLIT = (val: string, delimiter: string) => {
    const delimiterParam: string | RegExp = isRegExpExpression(delimiter) ? new RegExp(delimiter) : delimiter;
    if (typeof val === "string") return val.split(delimiterParam);
    return {
        "error-103": `The ${val} of type ${getType(val)} has no method 'split'. <value> | split(<delimiter>) is only supported for String`
    };
};

export const SUBSTRING = (val: Array<string> | string, startIndex: number, endIndex: number) => {
    if (typeof val === "string") return val.substring(startIndex, endIndex);
    const result: Array<string | ErrorObject> = [];
    if (typeof val === "object" && Array.isArray(val)) {
        val.forEach((record, idx) => {
            if (typeof record === "string") {
                result.push(record.substring(startIndex, endIndex));
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
};

export const PAD_START = (val: Array<string> | string, stringLength: number, padWith: string) => {
    if (typeof val === "string") return val.padStart(stringLength, padWith);
    const result: Array<string | ErrorObject> = [];
    if (typeof val === "object" && Array.isArray(val)) {
        val.forEach((record, idx) => {
            if (typeof record === "string") {
                result.push(record.padStart(stringLength, padWith));
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
};

export const PAD_END = (val: Array<string> | string, stringLength: number, padWith: string) => {
    if (typeof val === "string") return val.padEnd(stringLength, padWith);
    const result: Array<string | ErrorObject> = [];
    if (typeof val === "object" && Array.isArray(val)) {
        val.forEach((record, idx) => {
            if (typeof record === "string") {
                result.push(record.padEnd(stringLength, padWith));
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
};

export const PARSE_INT = (val: Array<string> | string, radix: number = 10) => {
    if (typeof val === "string") return parseInt(val, radix);
    const result: Array<number | ErrorObject> = [];
    if (typeof val === "object" && Array.isArray(val)) {
        val.forEach((record, idx) => {
            if (typeof record === "string") {
                result.push(parseInt(record, radix));
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
};

export const PARSE_FLOAT = (val: Array<string> | string) => {
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
};

export const TO_BOOLEAN = (val: Array<string> | string) => {
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
};

export const REVERSE = (val: Array<string> | string) => {
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
};

export const SLUGIFY = (val: Array<string> | string) => {
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
};

export const UNSLUGIFY = (val: Array<string> | string) => {
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
};