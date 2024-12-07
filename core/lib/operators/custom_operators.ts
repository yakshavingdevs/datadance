// Copyright (c) 2024-Present The Yak Shaving Devs, MIT License

import { Errors } from "../../constants.ts";
import { getType } from "../../utils.ts";


export const EQUALS_IGNORE_CASE = (left: string, right: string) => {
    if (typeof left === "string" && typeof right === "string"){
        return left.toLowerCase() === right.toLocaleLowerCase();
    }
    return {
        [Errors.OperatorNotDefinedForType]: `${getType(left)} _= ${getType(right)} is an invalid operation. "_=" only supports string types.`
    };
};

export const STRICT_EQUALS = (left: any, right: any) => {
    return left === right;
};