// Copyright (c) 2024-Present The Yak Shaving Devs, MIT License

export enum Errors {
  MethodNotDefinedForType = "MethodNotDefinedForType",
  JsonParseError = "JsonParseError",
  InvalidDateTimeString = "InvalidDateTimeString",
  InvalidFromDateTimeFormat = "InvalidFromDateTimeFormat",
  InvalidToDateTimeFormat = "InvalidToDateTimeFormat",
  ErrorFetchingCurrentLocalDateTime = "ErrorFetchingCurrentLocalDateTime",
  ErrorFetchingCurrentUTCDateTime = "ErrorFetchingCurrentUTCDateTime",
  ErrorConvertingDateTimeToUTC = "ErrorConvertingDateTimeToUTC",
  ErrorConvertingDateTimeToLocal = "ErrorConvertingDateTimeToLocal",
  ErrorConvertingDateTimeToMillis = "ErrorConvertingDateTimeToMillis",
  InvalidTransform = "InvalidTransform",
  VariableNotInContext = "VariableNotInContext",
  InvalidMergeMethod = "InvalidMergeMethod",
  TransformError = "TransformError",
  OperatorNotDefinedForType = "OperatorNotDefinedForType"
};