import { getType } from "../../utils.ts";

export const KEYS = (val: object) => {
    if (typeof val === "object" && !Array.isArray(val)) {
        return Object.keys(val);
    }
    return {
        "error-103": `The ${val} of type ${getType(val)} has no method 'keys'. <value> | keys is only supported for Object`
    };
};

export const VALUES = (val: object) => {
    if (typeof val === "object" && !Array.isArray(val)) {
        return Object.values(val);
    }
    return {
        "error-103": `The ${val} of type ${getType(val)} has no method 'values'. <value> | values is only supported for Object`
    };
};

export const ENTRIES = (val: object) => {
    if (typeof val === "object" && !Array.isArray(val)) {
        return Object.entries(val);
    }
    return {
        "error-103": `The ${val} of type ${getType(val)} has no method 'entries'. <value> | entries is only supported for Object`
    };
};

export const HAS = (val: object, property: string) => {
    if (typeof val === "object" && !Array.isArray(val)) {
        return Object.hasOwn(val, property);
    }
    return {
        "error-103": `The ${val} of type ${getType(val)} has no method 'has'. <value> | has is only supported for Object`
    };
};

export const DELETE = (val: Record<string, any>, properties: Array<string>) => {
    const result: Record<string, any> = {};
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
};

export const STRINGIFY = (val: object) => {
    if (typeof val === "object" || Array.isArray(val)) {
        return JSON.stringify(val);
    }
    return {
        "error-103": `The ${val} of type ${getType(val)} has no method 'stringify'. <value> | stringify is only supported for Object or Array`
    };
};