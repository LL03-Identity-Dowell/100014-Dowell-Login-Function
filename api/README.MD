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

---

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

---

`POST /api/userinfo/`

#### Request body

```json
{
  "session_id": "string",
  "product": "string"
}
```

#### Example response

```json
{
  "userinfo": "array",
  "portfolio_info": "array",
  "userportfolio": "array",
  "members": "object",
  "own_organizations": "array",
  "other_org": "object"
}
```

---

`POST /api/mobilelogin/`

#### Request body

```json
{
  "username": "string",
  "password": "string",
  "location": "string",
  "device": "string",
  "os": "string",
  "time": "string",
  "ip": "string",
  "timezone": "string",
  "browser": "string",
  "language": "string"
}
```

#### Example response

```json
{
  "session_id": "string"
}
```

---

`POST /api/mobilelogout/`

#### Request body

```json
{
  "session_id": "string"
}
```

#### Example response

```json
{
  "msg": "string"
}
```
