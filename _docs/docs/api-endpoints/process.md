# POST /api/process

The core transformation endpoint. Accepts input data, transforms, and settings, and returns the transformed result.

## Request

**Method:** `POST`  
**Content-Type:** `application/json`

### Body (JSON transforms)

```json
{
  "input": { "x": 2, "y": 3 },
  "transforms": [
    { "sum": "input.x + input.y" },
    { "product": "input.x * input.y" }
  ],
  "settings": { "merge_method": "overwrite" }
}
```

### Body (DDS transforms)

```json
{
  "input": { "x": 2, "y": 3 },
  "transforms": "sum: input.x + input.y\nproduct: input.x * input.y",
  "settings": { "merge_method": "overwrite", "transforms_syntax": "dds" }
}
```

## Response

**Status:** `200 OK`

```json
{
  "x": 2,
  "y": 3,
  "sum": 5,
  "product": 6
}
```

## Error responses

**Status:** `400 Bad Request`

```json
{
  "error": "Invalid transforms format"
}
```
