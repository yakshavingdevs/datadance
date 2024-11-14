import { Errors } from "../../constants.ts";
import { getType, symmetricDifference } from "../../utils.ts";

export const GET = (val: Record<string,any>, property : string) => {
    if (typeof val === "object" && !Array.isArray(val)) {
        return val?.[property] || null;
    }
    return {
        [Errors.MethodNotDefinedForType]: `The ${val} of type ${getType(val)} has no method 'keys'. <value> | keys is only supported for Object`
    };
};

export const KEYS = (val: object) => {
    if (typeof val === "object" && !Array.isArray(val)) {
        return Object.keys(val);
    }
    return {
        [Errors.MethodNotDefinedForType]: `The ${val} of type ${getType(val)} has no method 'keys'. <value> | keys is only supported for Object`
    };
};

export const VALUES = (val: object) => {
    if (typeof val === "object" && !Array.isArray(val)) {
        return Object.values(val);
    }
    return {
        [Errors.MethodNotDefinedForType]: `The ${val} of type ${getType(val)} has no method 'values'. <value> | values is only supported for Object`
    };
};

export const ENTRIES = (val: object) => {
    if (typeof val === "object" && !Array.isArray(val)) {
        return Object.entries(val);
    }
    return {
        [Errors.MethodNotDefinedForType]: `The ${val} of type ${getType(val)} has no method 'entries'. <value> | entries is only supported for Object`
    };
};

export const HAS = (val: object, property: string) => {
    if (typeof val === "object" && !Array.isArray(val)) {
        return Object.hasOwn(val, property);
    }
    return {
        [Errors.MethodNotDefinedForType]: `The ${val} of type ${getType(val)} has no method 'has'. <value> | has is only supported for Object`
    };
};

export const DELETE = (val: Record<string, any>, properties: Array<string>) => {
    const result: Record<string, any> = {};
    if (typeof val === "object" && !Array.isArray(val)) {
        const propertiesToKeep = symmetricDifference(new Set(Object.keys(val)), new Set(properties));
        propertiesToKeep.forEach((property: string) => {
            result[property] = val[property];
        });
        return result;
    }
    return {
        [Errors.MethodNotDefinedForType]: `The ${val} of type ${getType(val)} has no method 'delete'. <value> | delete(<properties>) is only supported for Object`
    };
};

export const STRINGIFY = (val: object) => {
    if (typeof val === "object" || Array.isArray(val)) {
        return JSON.stringify(val);
    }
    return {
        [Errors.MethodNotDefinedForType]: `The ${val} of type ${getType(val)} has no method 'stringify'. <value> | stringify is only supported for Object or Array`
    };
};