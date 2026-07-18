# Date/Time Transforms

Date/time transforms operate on ISO 8601 date strings using the pipe syntax. They use the [Luxon](https://moment.github.io/luxon/) library internally.

## now

Returns the current local date and time as an ISO 8601 string.

```js
null | now    // "2026-07-17T12:00:00.000+05:30"
```

## utcNow

Returns the current UTC date and time as an ISO 8601 string.

```js
null | utcNow    // "2026-07-17T06:30:00.000Z"
```

## formatDateTime

Formats a date string using a Luxon format pattern. The default format is `yyyy-MM-dd`.

```js
"2026-07-17T12:00:00.000+05:30" | formatDateTime('yyyy-MM-dd')         // "2026-07-17"
"2026-07-17T12:00:00.000+05:30" | formatDateTime('MMMM dd, yyyy')     // "July 17, 2026"
"2026-07-17T12:00:00.000+05:30" | formatDateTime('HH:mm:ss')          // "12:00:00"
```

## convertDateTimeFormat

Converts a date string between different standard formats. Supported formats: `ISO`, `RFC2822`, `SQL`, `HTTP`, `Millis`.

```js
"2026-07-17T12:00:00.000Z" | convertDateTimeFormat('ISO', 'SQL')       // "2026-07-17 12:00:00"
"2026-07-17T12:00:00.000Z" | convertDateTimeFormat('ISO', 'RFC2822')   // "Fri, 17 Jul 2026 12:00:00 +0000"
```

## toUTC

Converts a date string to UTC.

```js
"2026-07-17T12:00:00.000+05:30" | toUTC    // "2026-07-17T06:30:00.000Z"
```

## toLocal

Converts a date string to local time.

```js
"2026-07-17T06:30:00.000Z" | toLocal    // "2026-07-17T12:00:00.000+05:30"
```

## toMillis

Converts a date string to milliseconds timestamp.

```js
"2026-07-17T12:00:00.000+05:30" | toMillis    // "1776501600000"
```

## getSeconds / getMinutes / getHours / getDay / getMonth / getYear

Extracts individual components from a date string.

```js
"2026-07-17T12:30:45.000+05:30" | getYear      // 2026
"2026-07-17T12:30:45.000+05:30" | getMonth     // 7
"2026-07-17T12:30:45.000+05:30" | getDay       // 17
"2026-07-17T12:30:45.000+05:30" | getHours     // 12
"2026-07-17T12:30:45.000+05:30" | getMinutes   // 30
"2026-07-17T12:30:45.000+05:30" | getSeconds   // 45
```

## setSeconds / setMinutes / setHours / setDay / setMonth / setYear

Sets individual components of a date string, returning the modified ISO string.

```js
"2026-07-17T12:00:00.000+05:30" | setYear(2027)      // "2027-07-17T12:00:00.000+05:30"
"2026-07-17T12:00:00.000+05:30" | setMonth(12)        // "2026-12-17T12:00:00.000+05:30"
"2026-07-17T12:00:00.000+05:30" | setHours(9)         // "2026-07-17T09:00:00.000+05:30"
```

## setTimeZone

Changes the timezone of a date string.

```js
"2026-07-17T12:00:00.000+05:30" | setTimeZone('America/New_York')    // "2026-07-17T02:00:00.000-04:00"
```
