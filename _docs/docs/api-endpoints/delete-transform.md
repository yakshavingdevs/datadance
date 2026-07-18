# DELETE /api/deleteTransform

Deletes a specific saved transform.

## Request

**Method:** `DELETE`  
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
  "message": "Transform deleted successfully"
}
```
