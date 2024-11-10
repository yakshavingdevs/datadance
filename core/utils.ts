// Copyright (c) 2024-Present The Yak Shaving Devs, MIT License

import { Errors } from "./constants.ts";
import { DateTimeFormatType, ErrorObject } from "./types.ts";
import { DateTime } from 'luxon';

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

};


export const convertDateTime = (dateString: string, fromFormat: DateTimeFormatType, toFormat: DateTimeFormatType): string | ErrorObject => {
    let date: DateTime;

    // Parse the date string based on the "from" format
    switch (fromFormat) {
        case 'ISO':
            date = DateTime.fromISO(dateString, { "setZone": true });
            break;
        case 'RFC2822':
            date = DateTime.fromRFC2822(dateString, { "setZone": true });
            break;
        case 'SQL':
            date = DateTime.fromSQL(dateString, { "setZone": true });
            break;
        case 'HTTP':
            date = DateTime.fromHTTP(dateString, { "setZone": true });
            break;
        case 'Millis':
            date = DateTime.fromMillis(parseInt(dateString, 10));
            break;
        default:
            return { [Errors.InvalidFromDateTimeFormat]: `Unsupported fromFormat "${fromFormat}"` };
    }

    // Check if the date is valid
    if (!date.isValid) {
        return { [Errors.InvalidDateTimeString]: `Invalid date time string "${dateString}". Reason: ${date.invalidReason}` };
    }

    // Convert the DateTime object to the desired "to" format
    switch (toFormat) {
        case 'ISO':
            return date.toISO() || 'Error: Failed to convert to ISO format';
        case 'RFC2822':
            return date.toRFC2822() || 'Error: Failed to convert to RFC2822 format';
        case 'SQL':
            return date.toSQL() || 'Error: Failed to convert to SQL format';
        case 'HTTP':
            return date.toHTTP() || 'Error: Failed to convert to HTTP format';
        case 'Millis':
            return date.toMillis().toString();
        default:
            return { [Errors.InvalidToDateTimeFormat]: `Error: Unsupported toFormat "${toFormat}"` };
    }
};

export const isValidDateTime = (dateTimeString: string) => {
    return DateTime.fromISO(dateTimeString, { setZone: true }).isValid;
};