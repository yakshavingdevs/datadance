import { ErrorObject } from "../../types.ts";
import { getType } from "../../utils.ts";
import { Errors } from "../../constants.ts";

export const PLUCK = (val: Array<any>, properties: Array<String>) => {
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
};

export const SIZE = (val: Array<any> | object | string) => {
    if (typeof val === "string") return val.length;
    if (typeof val === "object") {
        if (Array.isArray(val)) return val.length;
        return Object.keys(val).length;
    }
    return {
        [Errors.MethodNotDefinedForType]: `The ${val} of type ${getType(val)} has no method 'size'. <value> | size is only supported for Object, String, Array<any>`
    };
};

export const PUSH = (val: Array<any>, item: any) => {
    const result: Array<any | ErrorObject> = structuredClone(val);
    if (typeof val === "object" && Array.isArray(val)) {
        result.push(...item);
        return result;
    }
    return {
        [Errors.MethodNotDefinedForType]: `The ${val} of type ${getType(val)} has no method 'push'. <value> | push(<item>) is only supported for Array<any>`
    };
};


export const POP = (val: Array<any>) => {
    const result: Array<any | ErrorObject> = structuredClone(val);
    if (typeof val === "object" && Array.isArray(val)) {
        result.pop();
        return result;
    }
    return {
        [Errors.MethodNotDefinedForType]: `The ${val} of type ${getType(val)} has no method 'pop'. <value> | pop is only supported for Array<any>`
    };
};


export const JOIN = (val: Array<any>, delimiter: any) => {
    const result: Array<any | ErrorObject> = structuredClone(val);
    if (typeof val === "object" && Array.isArray(val)) {
        return result.join(delimiter);
    }
    return {
        [Errors.MethodNotDefinedForType]: `The ${val} of type ${getType(val)} has no method 'join'. <value> | join(<delimiter>) is only supported for Array<any>`
    };
};

export const SLICE = (val: Array<any>, startIdx: number, endIdx: number) => {
    if (typeof val === "object" && Array.isArray(val)) {
        return val.slice(startIdx, endIdx);
    }
    return {
        [Errors.MethodNotDefinedForType]: `The ${val} of type ${getType(val)} has no method 'slice'. <value> | slice(<startIdx>,<endIdx>) is only supported for Array<any>`
    };
};

export const REVERSE_ARRAY = (val: Array<any>) => {
    const result: Array<any | ErrorObject> = structuredClone(val);
    if (typeof val === "object" && Array.isArray(val)) {
        return result.reverse();
    }
    return {
        [Errors.MethodNotDefinedForType]: `The ${val} of type ${getType(val)} has no method 'reverseArray'. <value> | reverseArray is only supported for Array<any>`
    };
};

export const SORT_ARRAY = (val: Array<any>) => {
    const result: Array<any | ErrorObject> = structuredClone(val);
    if (typeof val === "object" && Array.isArray(val)) {
        return result.sort();
    }
    return {
        [Errors.MethodNotDefinedForType]: `The ${val} of type ${getType(val)} has no method 'sortArray'. <value> | sortArray is only supported for Array<any>`
    };
};

// Code below is taken from here : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from#sequence_generator_range
export const RANGE = (_val: null = null, start: number, stop: number, step: number) => {
    return Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step));
};

export const REMOVE_DUPLICATES = (val: Array<any>) => {
    const result: Array<any | ErrorObject> = structuredClone(val);
    if (typeof val === "object" && Array.isArray(val)) {
        return [...new Set(result)];
    }
    return {
        [Errors.MethodNotDefinedForType]: `The ${val} of type ${getType(val)} has no method 'removeDuplicates'. <value> | removeDuplicates is only supported for Array<any>`
    };
};

export const MAX = (val: Array<number>) => {
    let result: number = -Infinity;
    if (typeof val === "object" && Array.isArray(val)) {
        val.forEach((record) => {
            if (typeof record === "number") {
                result = record > result ? record : result;
            }
        });
        return result;
    }
    return {
        [Errors.MethodNotDefinedForType]: `The ${val} of type ${getType(val)} has no method 'max'. <value> | max is only supported for Array<Number>`
    };
};

export const MIN = (val: Array<number>) => {
    let result: number = Infinity;
    if (typeof val === "object" && Array.isArray(val)) {
        val.forEach((record) => {
            if (typeof record === "number") {
                result = record < result ? record : result;
            }
        });
        return result;
    }
    return {
        [Errors.MethodNotDefinedForType]: `The ${val} of type ${getType(val)} has no method 'min'. <value> | min is only supported for Array<Number>`
    };
};