# POST /api/run

Runs a previously saved transform against new input data.

## Request

**Method:** `POST`  
**Content-Type:** `application/json`

```json
{
  "emailId": "user@example.com",
  "transformName": "myTransform",
  "input": { "x": 10, "y": 20 }
}
```

## Response

**Status:** `200 OK`

```json
{
  "sum": 30,
  "product": 200
}
```

## Error responses

**Status:** `404 Not Found`

```json
{
  "error": "The transformation myTransform not found."
}
```
