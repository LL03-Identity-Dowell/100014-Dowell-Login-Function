# 100014-Dowell-Login-Function

Dowell Login Function Version 2

# To implement login in products

If your product is new then the first step would be to give the url of your product and product name to login team.

--An example is given below:

(Note: We are using "https://100093.pythonanywhere.com" as an example of product url. It must be replaced by your product url.)

- The login function of your product:

```
def dowell_login(request):
    try:
      url_id=request.GET.get('session_id',None)
      request.session["session_id"]=url_id
      return redirect("home")
    except:
        return redirect("https://100014.pythonanywhere.com/?redirect_url=https://100093.pythonanywhere.com)
```

- The main function of your product:

```
def Home(request):

    if request.session.get("session_id"):
        session_id=request.session.get("session_id")
        url="https://100014.pythonanywhere.com/api/userinfo/"
        resp=requests.post(url,data={"session_id":session_id})
        try:
            user=json.loads(resp.text)
            return render(request,"index.html")
        except:
            return HttpResponse("/")
```

- The logout function of your product:

```
def Logout(request):
    session_id=request.session.get("session_id")
    if session_id:
        try:
            del request.session["session_id"]
            return redirect("https://100014.pythonanywhere.com/sign-out?returnurl=https://100093.pythonanywhere.com)
        except:
            return redirect("https://100014.pythonanywhere.com/sign-out?returnurl=https://100093.pythonanywhere.com)
    else:
        return redirect("https://100014.pythonanywhere.com/sign-out?returnurl=https://100093.pythonanywhere.com)
```

In urls.py:

```
path('',views.dowell_login,name="login"),
path('home',views.Home,name="home"),
path('logout',views.Logout,name="logout")
```
