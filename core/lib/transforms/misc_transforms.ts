import jsonpath from "jsonpath";
import { getType } from "../../utils.ts";
import {
    _isSubTransformBlock,
    _isTemporaryField,
    _updateDerivedState,
    transform,
} from "../../transform.ts";
import { DataObject } from "../../types.ts";

export const JSONPATH = (val: object | Array<any>, path: string | Record<string, any>[]) => {
    if (typeof val === "object" || (typeof val === "object" && Array.isArray(val))) {
        console.log(path);
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
        "error-103": `The ${val} of type ${getType(val)} has no method 'jsonpath'. <value> | jsonpath(path|pathMap) is only supported for Object or Array`
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
    if (filterOn !== null && filterOn !== "") {
        forEachResult = forEachResult.filter((record) => {
            return record[filterOn];
        });
    }
    return forEachResult;
};

export const TYPE = (val: object) => {
    return getType(val);
};

export const PARSE_JSON = (val: string) => {
    if(typeof val === "string") {
        try {
            return JSON.parse(val);
        } catch (error) {
            return { "error-103": `The ${val} cannot be parsed : ${error}` };
        }
    }
    return {
        "error-103": `The ${val} of type ${getType(val)} has no method 'parseJson'. <value> | parseJson is only supported for String`
    };
}