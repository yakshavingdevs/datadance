// Copyright (c) 2024-Present The Yak Shaving Devs, MIT License

import jsonpath from "jsonpath";
import { getType } from "../../utils.ts";
import {
    _isSubTransformBlock,
    _isTemporaryField,
    _updateDerivedState,
    transform,
} from "../../transform.ts";
import { DataObject } from "../../types.ts";
import { Errors } from "../../constants.ts";

export const JSONPATH = (val: object | Array<any>, path: string | Record<string, any>[]) => {
    if (typeof val === "object" || (typeof val === "object" && Array.isArray(val))) {
        const result: Record<string, any> = {};
        if (typeof path === "string") return jsonpath.query(val, path);
        if (typeof path === "object" && Array.isArray(path)) {
            path.forEach((record) => {
                Object.keys(record).forEach((field) => {
                    const queryResult = jsonpath.query(val, record[field]);
                    if (queryResult.length === 1) result[field] = queryResult[0];
                    else if (queryResult.length === 0) result[field] = "";
                    else result[field] = queryResult;
                });
            });
        }
        return result;
    }
    return {
        [Errors.MethodNotDefinedForType]: `The ${val} of type ${getType(val)} has no method 'jsonpath'. <value> | jsonpath(path|pathMap) is only supported for Object or Array`
    };
};

export const FOREACH = async (
    val: Array<any>,
    transforms: Record<string, any>[],
    context: Record<string, any> = {},
    filterOn: string | null = null
) => {
    if (context === null) context = {};
    let forEachResult: Array<any> = [];
    const originalContext: Record<string, any> = structuredClone(context);
    for (let idx = 0; idx < val.length; idx++) {
        const dataObject: DataObject = {
            input: { ...originalContext, item: val[idx], _idx: idx, _$func: transforms },
            derived: { ...context },
            transforms: transforms,
            settings: {
                merge_method: "transforms_only",
            },
        };
        const result = await transform(dataObject);
        Object.keys(context).forEach((field) => {
            if (result[field]) context[field] = result[field];
        });
        if (filterOn !== null && filterOn !== "") {
            if (result[filterOn]) {
                forEachResult.push(result);
            }
        }
    }
    return forEachResult;
};

export const TYPE = (val: object) => {
    return getType(val);
};

export const PARSE_JSON = (val: string) => {
    if (typeof val === "string") {
        try {
            return JSON.parse(val);
        } catch (error) {
            return { [Errors.JsonParseError]: `The ${val} cannot be parsed : ${error}` };
        }
    }
    return {
        [Errors.MethodNotDefinedForType]: `The ${val} of type ${getType(val)} has no method 'parseJson'. <value> | parseJson is only supported for String`
    };
}

export const UUID = (_val: null = null) => {
    return crypto.randomUUID();
};