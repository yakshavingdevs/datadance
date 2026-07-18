# POST /api/retrieveTransform

Retrieves a single saved transform by email and transform name.

## Request

**Method:** `POST`  
**Content-Type:** `application/json`

```json
{
  "emailId": "user@example.com",
  "transformName": "myTransform"
}
```

## Response

**Status:** `200 OK`

```json
{
  "transforms": [{ "sum": "input.x + input.y" }],
  "settings": { "merge_method": "overwrite" }
}
```
