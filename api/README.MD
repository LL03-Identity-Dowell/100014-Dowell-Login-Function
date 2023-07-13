# Dowell Login API Documentation

`POST /api/loginapi/`
This is the publicapi for user authentication. All fields are required

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
`GET /api/userinfo/`

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

---

`POST /api/emailotp/`

#### Request body

```json
{
  "email": "string",
  "username": "string",
  "usage": "string"
}
```

#### Example response

```json
{
  "msg": "string",
  "info": "string"
}
```

---

`POST /api/forgot_password/`

> You must get the otp from the `/api/emailotp` endpoint

#### Request body

```json
{
  "username": "string",
  "email": "string",
  "otp": "string",
  "new_password": "string"
}
```

#### Example response

```json
{
  "msg": "string",
  "info": "string"
}
```

---

`POST /api/forgot_username/`

> You must get the otp from the `/api/emailotp` endpoint

#### Request body

```json
{
  "email": "string",
  "otp": "string"
}
```

#### Example response

```json
{
  "msg": "string",
  "info": "string"
}
```

---

`POST /api/password_update/`

#### Request body

```json
{
  "email_otp": "string",
  "address": "string",
  "zip_code": "string",
  "user_city": "string",
  "user_location": "string",
  "user_country": "string",
  "native_language": "string",
  "nationality": "string",
  "language_preferences": "string",
  "vision": "string",
  "username": "string",
  "first_name": "string",
  "last_name": "string",
  "email": "string",
  "phone": "string",
  "image": "string"
}
```

#### Example response

```json
{
  "msg": "string",
  "info": "string"
}
```
