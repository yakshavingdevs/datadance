# POST /api/retrieveAllTransformsByEmail

Lists all transforms saved by a given email address.

## Request

**Method:** `POST`  
**Content-Type:** `application/json`

```json
{
  "emailId": "user@example.com"
}
```

## Response

**Status:** `200 OK`

```json
{
  "transforms": [
    { "name": "myTransform", "transforms": [...], "settings": {...} },
    { "name": "otherTransform", "transforms": [...], "settings": {...} }
  ]
}
```
