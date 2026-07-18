# GET /api/errors

Returns a list of all possible error codes that Datadance can return.

## Request

**Method:** `GET`

## Response

**Status:** `200 OK`

```json
[
  "MethodNotDefinedForType",
  "JsonParseError",
  "InvalidDateTimeString",
  "InvalidFromDateTimeFormat",
  "InvalidToDateTimeFormat",
  "ErrorFetchingCurrentLocalDateTime",
  "ErrorFetchingCurrentUTCDateTime",
  "ErrorConvertingDateTimeToUTC",
  "ErrorConvertingDateTimeToLocal",
  "ErrorConvertingDateTimeToMillis",
  "InvalidTransform",
  "VariableNotInContext",
  "InvalidMergeMethod",
  "TransformError",
  "OperatorNotDefinedForType"
]
```
