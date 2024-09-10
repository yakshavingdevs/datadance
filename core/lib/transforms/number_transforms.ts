import { ErrorObject } from "../../types.ts";
import { getType } from "../../utils.ts";

export const ABS = (val: Array<number> | number) => {
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
};

export const CEIL = (val: Array<number> | number) => {
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
};

export const FLOOR = (val: Array<number> | number) => {
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
};

export const ROUND = (val: Array<number> | number) => {
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
};

export const RANDOM = (_val: null) => {
    return Math.random();
};