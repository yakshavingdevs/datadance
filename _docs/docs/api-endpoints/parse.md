# POST /api/parse

Converts DDS (Datadance Syntax) text into JSON transforms array.

## Request

**Method:** `POST`  
**Content-Type:** `text/plain`

```
sum: input.x + input.y
product: input.x * input.y
```

## Response

**Status:** `200 OK`

```json
[
  { "sum": "input.x + input.y" },
  { "product": "input.x * input.y" }
]
```
