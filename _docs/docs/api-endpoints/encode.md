# POST /api/encode

Converts a JSON transforms array into DDS (Datadance Syntax) text.

## Request

**Method:** `POST`  
**Content-Type:** `application/json`

```json
[
  { "name": "upper(input.name)" },
  { "score": "input.score + 10" }
]
```

## Response

**Status:** `200 OK`  
**Content-Type:** `text/yaml`

```
score: input.score + 10
name: upper(input.name)
```
