# DELETE /api/deleteAllTransformsByEmail

Deletes all transforms associated with a given email address.

## Request

**Method:** `DELETE`  
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
  "message": "All transforms deleted successfully"
}
```
