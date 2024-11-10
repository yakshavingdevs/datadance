import { getType, isRegExpExpression } from "../../utils.ts";
import { Errors } from "../../constants.ts";

export const UPPER = (val: Array<string> | string) => {
    if (typeof val === "string") return val.toUpperCase();
    return {
        [Errors.MethodNotDefinedForType]: `The ${val} of type ${getType(val)} has no method 'upper'. <value> | upper is only supported for String`
    };
};

export const LOWER = (val: Array<string> | string) => {
    if (typeof val === "string") return val.toLowerCase();
    return {
        [Errors.MethodNotDefinedForType]: `The ${val} of type ${getType(val)} has no method 'lower'. <value> | lower is only supported for String`
    };
};

export const CAPITALIZE = (val: string) => {
    if (typeof val === "string") return val[0].toUpperCase() + val.slice(1);
    return {
        [Errors.MethodNotDefinedForType]: `The ${val} of type ${getType(val)} has no method 'capitalize'. <value> | capitalize is only supported for String`
    };
};

export const SWAP_CASE = (val: string) => {
    if (typeof val === "string") {
        return val.split("").map(function (c) {
            return c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase();
        }).join("");
    }
    return {
        [Errors.MethodNotDefinedForType]: `The ${val} of type ${getType(val)} has no method 'swapCase'. <value> | swapCase is only supported for String`
    };
};

export const STARTS_WITH = (val: string, char: string) => {
    if (typeof val === "string") return (val.startsWith(char));
    return {
        [Errors.MethodNotDefinedForType]: `The ${val} of type ${getType(val)} has no method 'startsWith'. <value> | startsWith('<char>') is only supported for String`
    };
};

export const ENDS_WITH = (val: string, char: string) => {
    if (typeof val === "string") return val.endsWith(char);
    return {
        [Errors.MethodNotDefinedForType]: `The ${val} of type ${getType(val)} has no method 'endsWith'. <value> | endsWith('<char>') is only supported for String`
    };
};

export const INDEX_OF_CHAR = (val: string, char: string) => {
    if (typeof val === "string") return val.indexOf(char);
    return {
        [Errors.MethodNotDefinedForType]: `The ${val} of type ${getType(val)} has no method 'indexOfChar'. <value> | indexOfChar('<char>') is only supported for String`
    };
};

export const TRIM = (val: string) => {
    if (typeof val === "string") return val.trim();
    return {
        [Errors.MethodNotDefinedForType]: `The ${val} of type ${getType(val)} has no method 'trim'. <value> | trim is only supported for String`
    };
};

export const LTRIM = (val: string) => {
    if (typeof val === "string") return val.trimStart();
    return {
        [Errors.MethodNotDefinedForType]: `The ${val} of type ${getType(val)} has no method 'ltrim'. <value> | ltrim is only supported for String`
    };
};

export const RTRIM = (val: string) => {
    if (typeof val === "string") return val.trimEnd();
    return {
        [Errors.MethodNotDefinedForType]: `The ${val} of type ${getType(val)} has no method 'rtrim'. <value> | rtrim is only supported for String`
    };
};

export const LENGTH = (val: string) => {
    if (typeof val === "string") return val.length;
    return {
        [Errors.MethodNotDefinedForType]: `The ${val} of type ${getType(val)} has no method 'length'. <value> | length is only supported for String`
    };
};

export const REPLACE = (val: string, searchValue: string, replacementString: string) => {
    const searchParam: string | RegExp = isRegExpExpression(searchValue) ? new RegExp(searchValue) : searchValue;
    if (typeof val === "string") return val.replace(searchParam, replacementString);
    return {
        [Errors.MethodNotDefinedForType]: `The ${val} of type ${getType(val)} has no method 'replace'. <value> | replace(<search_string>,<replace_string>) is only supported for String`
    };
};

export const REPLACE_ALL = (val: string, searchValue: string, replacementString: string) => {
    const searchParam: string | RegExp = isRegExpExpression(searchValue) ? new RegExp(searchValue, "g") : searchValue;
    if (typeof val === "string") return val.replaceAll(searchParam, replacementString);
    return {
        [Errors.MethodNotDefinedForType]: `The ${val} of type ${getType(val)} has no method 'replaceAll'. <value> | replaceAll(<search_string>,<replace_string>) is only supported for String`
    };
};

export const SPLIT = (val: string, delimiter: string) => {
    const delimiterParam: string | RegExp = isRegExpExpression(delimiter) ? new RegExp(delimiter) : delimiter;
    if (typeof val === "string") return val.split(delimiterParam);
    return {
        [Errors.MethodNotDefinedForType]: `The ${val} of type ${getType(val)} has no method 'split'. <value> | split(<delimiter>) is only supported for String`
    };
};

export const SUBSTRING = (val: string, startIndex: number, endIndex: number) => {
    if (typeof val === "string") return val.substring(startIndex, endIndex);
    return {
        [Errors.MethodNotDefinedForType]: `The ${val} of type ${getType(val)} has no method 'substring'. <value> | substring(<startIdx>,<endIdx>) is only supported for String`
    };
};

export const PAD_START = (val: string, stringLength: number, padWith: string) => {
    if (typeof val === "string") return val.padStart(stringLength, padWith);
    return {
        [Errors.MethodNotDefinedForType]: `The ${val} of type ${getType(val)} has no method 'padStart'. <value> | padStart(<stringLength>,<padWith>) is only supported for String`
    };
};

export const PAD_END = (val: string, stringLength: number, padWith: string) => {
    if (typeof val === "string") return val.padEnd(stringLength, padWith);
    return {
        [Errors.MethodNotDefinedForType]: `The ${val} of type ${getType(val)} has no method 'padEnd'. <value> | padEnd(<stringLength>,<padWith>) is only supported for String`
    };
};

export const PARSE_INT = (val: string, radix: number = 10) => {
    if (typeof val === "string") return parseInt(val, radix);
    return {
        [Errors.MethodNotDefinedForType]: `The ${val} of type ${getType(val)} has no method 'parseInt'. <value> | parseInt('<string>',<radix>) is only supported for String`
    };
};

export const PARSE_FLOAT = (val: string) => {
    if (typeof val === "string") return parseFloat(val);
    return {
        [Errors.MethodNotDefinedForType]: `The ${val} of type ${getType(val)} has no method 'parseFloat'. <value> | parseFloat is only supported for String`
    };
};

export const TO_BOOLEAN = (val: string) => {
    if (typeof val === "string") return val === "true" ? true : false;
    return {
        [Errors.MethodNotDefinedForType]: `The ${val} of type ${getType(val)} has no method 'toBoolean'. <value> | toBoolean is only supported for String`
    };
};

export const REVERSE = (val: string) => {
    if (typeof val === "string") return val.split('').reverse().join('');
    return {
        [Errors.MethodNotDefinedForType]: `The ${val} of type ${getType(val)} has no method 'reverse'. <value> | reverse is only supported for String`
    };
};

export const SLUGIFY = (val: string) => {
    if (typeof val === "string") return encodeURI(val);
    return {
        [Errors.MethodNotDefinedForType]: `The ${val} of type ${getType(val)} has no method 'slugify'. <value> | slugify is only supported for String`
    };
};

export const UNSLUGIFY = (val: string) => {
    if (typeof val === "string") return decodeURI(val);
    return {
        [Errors.MethodNotDefinedForType]: `The ${val} of type ${getType(val)} has no method 'unslugify'. <value> | unslugify is only supported for String`
    };
};