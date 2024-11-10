import { Errors } from "../../constants.ts";
import { getType } from "../../utils.ts";

export const ABS = (val: Array<number> | number) => {
    if (typeof val === "number") return Math.abs(val);
    return {
        [Errors.MethodNotDefinedForType]: `The ${val} of type ${getType(val)} has no method 'abs'. <value> | abs is only supported for Number`
    };
};

export const CEIL = (val: Array<number> | number) => {
    if (typeof val === "number") return Math.ceil(val);
    return {
        [Errors.MethodNotDefinedForType]: `The ${val} of type ${getType(val)} has no method 'ceil'. <value> | ceil is only supported for Number`
    };
};

export const FLOOR = (val: Array<number> | number) => {
    if (typeof val === "number") return Math.floor(val);
    return {
        [Errors.MethodNotDefinedForType]: `The ${val} of type ${getType(val)} has no method 'floor'. <value> | floor is only supported for Number`
    };
};

export const ROUND = (val: Array<number> | number) => {
    if (typeof val === "number") return Math.round(val);
    return {
        [Errors.MethodNotDefinedForType]: `The ${val} of type ${getType(val)} has no method 'round'. <value> | round is only supported for Number`
    };
};

export const RANDOM = (_val: null) => {
    return Math.random();
};