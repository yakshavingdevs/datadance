// Copyright (c) 2024-Present The Yak Shaving Devs, MIT License

import { DateTime, Interval, Duration } from 'luxon';
import { DateTimeFormatType, ErrorObject } from "../../types.ts";
import { convertDateTime, getType, isValidDateTime } from "../../utils.ts";
import { Errors } from "../../constants.ts";

export const FORMAT_DATE_TIME = (val: string, format: string = "yyyy-MM-dd") => {
    if (!isValidDateTime(val)) return { [Errors.InvalidDateTimeString]: "Invalid date time string provided" }
    if (typeof val === "string") return DateTime.fromISO(val, { "setZone": true }).toFormat(format);
    return {
        [Errors.MethodNotDefinedForType]: `The ${val} of type ${getType(val)} has no method 'formatDateTime'. <value> | formatDateTime(<format>) is only supported for String`
    };
};


export const CONVERT_DATE_TIME_FORMAT = (val: string, fromFormat: DateTimeFormatType, toFormat: DateTimeFormatType) => {
    if (typeof val === "string") return convertDateTime(val, fromFormat, toFormat);
    return {
        [Errors.MethodNotDefinedForType]: `The ${val} of type ${getType(val)} has no method 'convertDateTimeFormat'. <value> | convertDateTimeFormat(<fromFormat>,<toFormat>) is only supported for String`
    };
};

export const NOW = (_val: any) => {
    return DateTime.now().toISO() || { [Errors.ErrorFetchingCurrentLocalDateTime]: 'Error fetching current local date time' };
};

export const UTC_NOW = (_val: any) => {
    return DateTime.now().toUTC().toISO() || { [Errors.ErrorFetchingCurrentLocalDateTime]: 'Error fetching current UTC date time' };
};

export const TO_UTC = (val: string) => {
    if (!isValidDateTime(val)) return { [Errors.InvalidDateTimeString]: "Invalid date time string provided" }
    return DateTime.fromISO(val, { setZone: true }).toUTC().toISO() || { [Errors.ErrorConvertingDateTimeToUTC]: 'Error while converting date time to UTC' };
};

export const TO_LOCAL = (val: string) => {
    if (!isValidDateTime(val)) return { [Errors.InvalidDateTimeString]: "Invalid date time string provided" }
    return DateTime.fromISO(val, { setZone: true }).toLocal().toISO() || { [Errors.ErrorConvertingDateTimeToLocal]: 'Error while converting date time to local' };
};

export const TO_MILLIS = (val: string) => {
    if (!isValidDateTime(val)) return { [Errors.InvalidDateTimeString]: "Invalid date time string provided" }
    return DateTime.fromISO(val, { setZone: true }).toMillis().toString();
};

export const GET_TIME_ZONE = (val: string) => {
    if (!isValidDateTime(val)) return { [Errors.InvalidDateTimeString]: "Invalid date time string provided" }
    return DateTime.fromISO(val, { setZone: true }).zoneName;
};

export const GET_SECONDS = (val: string) => {
    if (!isValidDateTime(val)) return { [Errors.InvalidDateTimeString]: "Invalid date time string provided" }
    return DateTime.fromISO(val, { setZone: true }).second;
};

export const GET_MINUTES = (val: string) => {
    if (!isValidDateTime(val)) return { [Errors.InvalidDateTimeString]: "Invalid date time string provided" }
    return DateTime.fromISO(val, { setZone: true }).minute;
};

export const GET_HOURS = (val: string) => {
    if (!isValidDateTime(val)) return { [Errors.InvalidDateTimeString]: "Invalid date time string provided" }
    return DateTime.fromISO(val, { setZone: true }).hour;
};

export const GET_DAY = (val: string) => {
    if (!isValidDateTime(val)) return { [Errors.InvalidDateTimeString]: "Invalid date time string provided" }
    return DateTime.fromISO(val, { setZone: true }).day;
};

export const GET_MONTH = (val: string) => {
    if (!isValidDateTime(val)) return { [Errors.InvalidDateTimeString]: "Invalid date time string provided" }
    return DateTime.fromISO(val, { setZone: true }).month;
};

export const GET_YEAR = (val: string) => {
    if (!isValidDateTime(val)) return { [Errors.InvalidDateTimeString]: "Invalid date time string provided" }
    return DateTime.fromISO(val, { setZone: true }).year;
};

export const SET_TIME_ZONE = (val: string, timeZone: string) => {
    if (!isValidDateTime(val)) {
        return { [Errors.InvalidDateTimeString]: "Invalid date time string provided" };
    }
    const modifiedDateTime = DateTime.fromISO(val, { setZone: true }).setZone(timeZone);
    if (!isValidDateTime(modifiedDateTime.toString())) {
        return { [Errors.InvalidDateTimeString]: "Resulting date time is invalid" };
    }
    return modifiedDateTime.toString();
};

export const SET_SECONDS = (val: string, seconds: number) => {
    if (!isValidDateTime(val)) {
        return { [Errors.InvalidDateTimeString]: "Invalid date time string provided" };
    }
    const modifiedDateTime = DateTime.fromISO(val, { setZone: true }).set({ second: seconds });
    if (!isValidDateTime(modifiedDateTime.toString())) {
        return { [Errors.InvalidDateTimeString]: "Resulting date time is invalid" };
    }
    return modifiedDateTime.toString();
};

export const SET_MINUTES = (val: string, minutes: number) => {
    if (!isValidDateTime(val)) {
        return { [Errors.InvalidDateTimeString]: "Invalid date time string provided" };
    }
    const modifiedDateTime = DateTime.fromISO(val, { setZone: true }).set({ minute: minutes });
    if (!isValidDateTime(modifiedDateTime.toString())) {
        return { [Errors.InvalidDateTimeString]: "Resulting date time is invalid" };
    }
    return modifiedDateTime.toString();
};

export const SET_HOURS = (val: string, hours: number) => {
    if (!isValidDateTime(val)) {
        return { [Errors.InvalidDateTimeString]: "Invalid date time string provided" };
    }
    const modifiedDateTime = DateTime.fromISO(val, { setZone: true }).set({ hour: hours });
    if (!isValidDateTime(modifiedDateTime.toString())) {
        return { [Errors.InvalidDateTimeString]: "Resulting date time is invalid" };
    }
    return modifiedDateTime.toString();
};

export const SET_DAY = (val: string, day: number) => {
    if (!isValidDateTime(val)) {
        return { [Errors.InvalidDateTimeString]: "Invalid date time string provided" };
    }
    const modifiedDateTime = DateTime.fromISO(val, { setZone: true }).set({ day: day });
    if (!isValidDateTime(modifiedDateTime.toString())) {
        return { [Errors.InvalidDateTimeString]: "Resulting date time is invalid" };
    }
    return modifiedDateTime.toString();
};

export const SET_MONTH = (val: string, month: number) => {
    if (!isValidDateTime(val)) {
        return { [Errors.InvalidDateTimeString]: "Invalid date time string provided" };
    }
    const modifiedDateTime = DateTime.fromISO(val, { setZone: true }).set({ month: month });
    if (!isValidDateTime(modifiedDateTime.toString())) {
        return { [Errors.InvalidDateTimeString]: "Resulting date time is invalid" };
    }
    return modifiedDateTime.toString();
};

export const SET_YEAR = (val: string, year: number) => {
    if (!isValidDateTime(val)) {
        return { [Errors.InvalidDateTimeString]: "Invalid date time string provided" };
    }
    const modifiedDateTime = DateTime.fromISO(val, { setZone: true }).set({ year: year });
    if (!isValidDateTime(modifiedDateTime.toString())) {
        return { [Errors.InvalidDateTimeString]: "Resulting date time is invalid" };
    }
    return modifiedDateTime.toString();
};