# POST /api/saveTransform

Saves a transform to Deno KV for later retrieval and reuse.

## Request

**Method:** `POST`  
**Content-Type:** `application/json`

```json
{
  "emailId": "user@example.com",
  "transformName": "myTransform",
  "transforms": [
    { "sum": "input.x + input.y" }
  ],
  "settings": { "merge_method": "overwrite" }
}
```

## Response

**Status:** `200 OK`

```json
{
  "message": "Transform saved successfully"
}
```
