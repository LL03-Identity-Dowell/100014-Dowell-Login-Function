# 100014-Dowell-Login-Function

Dowell Login Function Version 2

# Dowel Login Documentation

When logging with dowell login you must provide the following credentials

- username
- password
- orgs (Optional)

URL params

- redirect_url (The product url)
- hr_invitation

The login function has different mode of authentication

- session authentication
- QR authentication

Once the post request is made to the backend server with the required parameters
the login function will process the request. The process is describe with pseudocode
for simplicity.

```plaintext

START _login:
  # Get post data and query params
  username: request.username
  password: request.password
  orgs: request.orgs

  redirect_url: request.query.redirect_url
  hr_invitaion: request.query.hr_invitation

  # Check for user session
  if request.session.key:
    # Retrieve the session object and redirect to product
    # url if session exists
    session_obj: CustomSession.get(session_id=request.session.key)

    # Get the product url from the session_obj and redirect
    if session_obj:
      return redirect(session_obj.product_url)
  # Log user in and create user session
  user = authenticate(username, password)
  if user:
    created: new CustomSession(user)
    return redirect(created.product_url)
```
