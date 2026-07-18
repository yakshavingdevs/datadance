# API Reference

The Datadance server exposes a REST API for processing transforms and managing saved transformations.

## Base URL

**Production:** `https://datadance.org`  
**Local development:** `http://localhost:8000`

## Endpoints overview

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/process` | Core transformation endpoint |
| `POST` | `/api/run` | Run a saved transform |
| `POST` | `/api/saveTransform` | Save a transform to Deno KV |
| `POST` | `/api/retrieveTransform` | Retrieve a saved transform |
| `POST` | `/api/retrieveAllTransformsByEmail` | List all transforms for an email |
| `DELETE` | `/api/deleteTransform` | Delete a saved transform |
| `DELETE` | `/api/deleteAllTransformsByEmail` | Delete all transforms for an email |
| `POST` | `/api/parse` | Convert DDS text to JSON transforms |
| `POST` | `/api/encode` | Convert JSON transforms to DDS text |
| `GET` | `/api/health` | Health check |
| `GET` | `/api/errors` | List all error codes |

## Common response format

All endpoints return JSON. Success responses use HTTP 200. Error responses use appropriate HTTP status codes (400, 404, 500) with an `error` field in the response body.

## Authentication

The API does not require authentication for local development. The production instance may enforce additional security measures.
