// Copyright (c) 2024-Present The Yak Shaving Devs, MIT License

export const isRegExpExpression = (expression: string) => {
    try {
        new RegExp(expression);
        return true;
    }
    catch (_error) {
        return false;
    }
}

export const getType = (value: any) => {
    if (typeof value === "string") {
        return "String";
    } else if (typeof value === "number") {
        return "Number";
    } else if (typeof value === "boolean") {
        return "Boolean";
    } else if (typeof value === "object" && Array.isArray(value)) {
        return "Array";
    } else if (typeof value === "object" && value !== null) {
        return "Object";
    } else if (typeof value === "undefined") {
        return "undefined";
    } else if (value === null) {
        return "null";
    }

}
