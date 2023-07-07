# Dowell Login API Documentation

`POST /api/loginapi/`

#### Request body

```json
{
  "username": "string",
  "password": "string",
  "api_services": "string",
  "api_key": "sting",
  "time": "string",
  "ip": "string",
  "os": "string",
  "device": "string",
  "location": "string",
  "timezone": "string",
  "language": "string",
  "browser": "string"
}
```

#### Example response

```json
{
  "session_id": "string",
  "remaining_times": "integer"
}
```

`POST /api/password_change/`

#### Request body

```json
{
  "username": "string",
  "old_password": "string",
  "new_password": "string"
}
```

#### Example response

```json
{
  "data": "Password Changed successfully.."
}
```
