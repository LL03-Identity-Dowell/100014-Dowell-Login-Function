import json
import datetime
import time
import io
import base64
import os
import csv

from django.shortcuts import render
from django.core.files.base import ContentFile
from django.contrib.auth import authenticate, login, logout
from django.core.mail import send_mail
from django.template import RequestContext, Template
from django.conf import settings

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.exceptions import AuthenticationFailed

from dateutil import parser
from PIL import Image

from loginapp.views import country_city_name, get_html_msg
from loginapp.models import CustomSession, Account, LiveStatus, GuestAccount

from server.utils.dowell_func import generateOTP, dowellconnection, dowellclock, get_next_pro_id
from server.utils import dowell_hash
from server.utils.event_function import create_event
from server.utils import qrcodegen


@api_view(["POST"])
def MobileLogin(request):
    mdata = request.data.get
    username = mdata('username')
    password = mdata('password')
    loc = mdata("location")
    try:
        lo = loc.split(" ")
        country, city = country_city_name(lo[0], lo[1])
    except:
        city = ""
        country = ""
    # return Response({"city":city,"country":country,"zone":timezone_str})
    device = mdata("device")
    osver = mdata("os")
    # brow=mdata["browser"]
    ltime = mdata("time")
    ipuser = mdata("ip")
    zone = mdata("timezone")
    if None in [username, password, loc, device, osver, ltime, ipuser]:
        resp = {"data": "Provide all credentials",
                "Credentials": "username, password, location, device, os, time, ip"}
        return Response(resp)
    browser = mdata("browser")
    language = mdata("language", "English")
    company = None
    org = None
    dept = None
    member = None
    project = None
    subproject = None
    role_res = None
    user_id = None
    first_name = None
    last_name = None
    email = None
    phone = None
    User_type = None
    # role_id=mdata["role_id"]
    user = authenticate(request, username=username, password=password)
    if user is not None:
        field = {"Username": username}
        id = dowellconnection("login", "bangalore", "login", "registration",
                              "registration", "10004545", "ABCDE", "find", field, "nil")
        response = json.loads(id)
        if response["data"] != None:
            form = login(request, user)
            request.session.save()
            session = request.session.session_key
            obj = CustomSession.objects.filter(sessionID=session)
            if obj:
                if obj.first().status == 'login':
                    resp = {'session_id': session}
                    return Response(resp)
            try:
                res = create_event()
                event_id = res['event_id']
            except:
                event_id = None
            profile_image = "https://100014.pythonanywhere.com/media/user.png"
            first_name = response["data"]['Firstname']
            last_name = response["data"]['Lastname']
            email = response["data"]['Email']
            phone = response["data"]['Phone']
            try:
                if response["data"]['Profile_Image'] == "https://100014.pythonanywhere.com/media/":
                    profile_image = "https://100014.pythonanywhere.com/media/user.png"
                else:
                    profile_image = response["data"]['Profile_Image']
                User_type = response["data"]['User_type']
                client_admin_id = response["data"]['client_admin_id']
                user_id = response["data"]['_id']
                role_res = response["data"]['Role']
                company = response["data"]['company_id']
                member = response["data"]['Memberof']
                dept = response["data"]['dept_id']
                org = response["data"]['org_id']
                project = response["data"]['project_id']
                subproject = response["data"]['subproject_id']
            except:
                pass
            try:
                final_ltime = parser.parse(ltime).strftime('%d %b %Y %H:%M:%S')
                dowell_time = time.strftime(
                    "%d %b %Y %H:%M:%S", time.gmtime(dowellclock()+1609459200))
            except:
                final_ltime = ''
                dowell_time = ''
            serverclock = datetime.datetime.now().strftime('%d %b %Y %H:%M:%S')

            field_session = {'sessionID': session, 'role': role_res, 'username': username, 'Email': email, "profile_img": profile_image, 'Phone': phone, "User_type": User_type, 'language': language, 'city': city, 'country': country, 'org': org, 'company_id': company, 'project': project, 'subproject': subproject, 'dept': dept, 'Memberof': member,
                             'status': 'login', 'dowell_time': dowell_time, 'timezone': zone, 'regional_time': final_ltime, 'server_time': serverclock, 'userIP': ipuser, 'userOS': osver, 'browser': browser, 'userdevice': device, 'userbrowser': "", 'UserID': user_id, 'login_eventID': event_id, "redirect_url": "", "client_admin_id": client_admin_id}
            dowellconnection("login", "bangalore", "login", "session",
                             "session", "1121", "ABCDE", "insert", field_session, "nil")

            info = {"role": role_res, "username": username, "email": email, "profile_img": profile_image, "phone": phone, "User_type": User_type, "language": language, "city": city, "country": country, "status": "login", "dowell_time": dowell_time, "timezone": zone,
                    "regional_time": final_ltime, "server_time": serverclock, "userIP": ipuser, "browser": browser, "userOS": osver, "userDevice": device, "userBrowser": "", "userID": user_id, "login_eventID": event_id, "client_admin_id": client_admin_id}
            info1 = json.dumps(info)
            infoo = str(info1)
            custom_session = CustomSession.objects.create(
                sessionID=session, info=infoo, document="", status="login")

            # resp={'userinfo':info}
            resp = {'session_id': session}
            return Response(resp)
        else:
            resp = {"data": "Username not found in database"}
            return Response(resp)
        # raise AuthenticationFailed("Username not Found or password not found")
    else:
        resp = {"data": "Username, Password combination incorrect.."}
        return Response(resp)


@api_view(["POST"])
def MobileLogout(request):
    session = request.data.get("session_id")
    mydata = CustomSession.objects.filter(sessionID=session).first()
    if mydata is not None:
        a2 = mydata.info
        a3 = json.loads(a2)
        a3["status"] = "logout"
        a4 = json.dumps(a3)
        a5 = str(a4)
        mydata.info = a5
        if mydata.status != "logout":
            mydata.status = "logout"
        mydata.save(update_fields=['info', 'status'])
    field_session = {'sessionID': session}
    update_field = {'status': 'logout'}
    dowellconnection("login", "bangalore", "login", "session", "session",
                     "1121", "ABCDE", "update", field_session, update_field)
    logout(request)
    return Response({'msg': 'Logged out Successfully..'})


@api_view(['GET', 'POST'])
def LinkBased(request):
    if request.method == 'POST':
        user = request.data["Username"]
        loc = request.data["Location"]
        device = request.data["Device"]
        osver = request.data["OS"]
        brow = request.data["Browser"]
        ltime = request.data["Time"]
        ipuser = request.data["IP"]
        mobconn = request.data["Connection"]
        field = {"Username": user, "OS": osver, "Device": device, "Browser": brow, "Location": loc, "Time": str(
            ltime), "SessionID": "linkbased", "Connection": mobconn, "qrcode_id": "user6", "IP": ipuser}
        resp = dowellconnection("login", "bangalore", "login", "login",
                                "login", "6752828281", "ABCDE", "insert", field, "nil")
        respj = json.loads(resp)
        qrcodegen.qrgen1(
            user, respj["inserted_id"], f"dowell_login/media/userqrcodes/{respj['inserted_id']}.png")
        return Response({"qrid": respj["inserted_id"]})
        # if url is not None:
        #     return redirect(f'{url}?qrid={respj["inserted_id"]}')
        # return HttpResponse("pl provide redirect url")
    return Response({"message": "its working"})


@api_view(['GET', 'POST'])
def new_userinfo(request):
    if request.method == 'POST':
        session = request.data["session_id"]
        product = request.data.get("product", None)
        mydata = CustomSession.objects.filter(sessionID=session).first()
        if not mydata:
            return Response({"message": "SessionID not found in database, Please check and try again!!"})
        if mydata.status != "login":
            return Response({"message": "You are logged out, Please login and try again!!"})
        var1 = mydata.info
        var2 = json.loads(var1)
        var2["org_img"] = "https://100093.pythonanywhere.com/static/clientadmin/img/logomissing.png"

        del_keys = ["role", "company_id", "org", "project",
                    "subproject", "dept", "Memberof", "members"]
        for key in del_keys:
            try:
                del var2[key]
            except:
                pass
        field = {"document_name": var2["username"]}
        details = dowellconnection("login", "bangalore", "login", "client_admin",
                                   "client_admin", "1159", "ABCDE", "fetch", field, "nil")
        details_res = json.loads(details)
        var3 = []
        productport = []
        portfolio = details_res["data"][0]["portpolio"]
        if product is None:
            try:
                for i in portfolio:
                    if type(i["username"]) is list:
                        if var2["username"] in i["username"] or "owner" in i["username"]:
                            var3.append(i)
                    if i["username"]=="owner" and i["product"]!="owner":
                        var3.append(i)
            except:
                pass
        if product is not None:
            try:
                for i in portfolio:
                    if type(i["username"]) is list:
                        if var2["username"] in i["username"] or "owner" in i["username"] and product in i["product"]:
                            var3.append(i)
                    if i["username"]=="owner" and i["product"]!="owner" and product in i["product"]:
                        var3.append(i)
            except:
                pass
            try:
                for ite in portfolio:
                    if product in ite["product"]:
                        productport.append(ite)
            except:
                pass
        try:
            var2["client_admin_id"] = details_res["data"][0]["_id"]
            for r in var3:
                r["org_id"] = details_res["data"][0]["_id"]
                r["org_name"] = details_res["data"][0]["document_name"]
        except:
            pass
        organisations = details_res["data"][0]['organisations'][0]["org_name"]
        otherorg = details_res["data"][0]['other_organisation']
        team_members = details_res["data"][0]['members']['team_members']['accept_members']
        guest_members = details_res["data"][0]['members']['guest_members']['accept_members']
        public_members = details_res["data"][0]['members']['public_members']['accept_members']
        main_member = {'team_member': team_members,
                       'guest_members': guest_members, 'public_members': public_members}
        userinfo = {'userinfo': var2, 'portfolio_info': var3, "userportfolio": productport,
                    'members': main_member, "own_organisations": [{"org_name": organisations}], "other_org": otherorg}
        return Response(userinfo)
    return Response({"message": "its working"})


@api_view(['GET', 'POST'])
def all_users(request):
    if request.method == 'POST':
        username = request.data["username"]
        password1 = request.data["password"]
        user = authenticate(request, username=username, password=password1)
        if user is not None:
            userfield = {}
            main = dowellconnection("login", "bangalore", "login", "registration",
                                    "registration", "10004545", "ABCDE", "fetch", userfield, "nil")
            main_res = json.loads(main)
            final = main_res["data"]
            final2 = []
            for a in final:
                try:
                    username = a['Username']
                    payment_status = a['payment_status']
                    user_id = a['_id']
                    user_type=a['User_type']
                    final2.append({"member_name": username, "org_name": username,
                                  "payment_status": payment_status, "user_id": user_id,"user_type":user_type})
                except:
                    pass
            return Response({"data": final2})
        else:
            return Response({"msg": "API working", "data": "Provided credential is wrong, try again!"})
    return Response({"msg": "API working", "data": "POST your username and password to get list"})


@api_view(['GET', 'POST'])
def lastlogins(request):
    if request.method == 'POST':
        username = request.data["username"]
        logintimelist = []
        # activeuserlist=[]
        all2 = CustomSession.objects.all()
        print(type(all2))
        all1 = all2[::-1]
        # print(all1)
        for a in all1:
            a2 = a.info
            try:
                a3 = json.loads(a2)
                if a3["username"] == username:
                    logintimelist.append([a3["regional_time"], a.sessionID])
                    break
            except:
                pass
        return Response({"data": {"LastloginTimes": logintimelist}})
    return Response({"msg": "API working", "data": "POST an username to get list"})


@api_view(['GET'])
def activeusers(request):
    from django.contrib.sessions.models import Session
    from django.utils import timezone
    active_sessions = Session.objects.filter(expire_date__gte=timezone.now())
    user_id_list = []
    for session in active_sessions:
        data = session.get_decoded()
        user_id_list.append(data.get('_auth_user_id', None))
    final = Account.objects.filter(id__in=user_id_list).values_list('username')
    return Response({"msg": "API working", "data": final})


@api_view(['POST'])
def password_change(request):
    username = request.data.get("username")
    old_password = request.data.get("old_password")
    new_password = request.data.get("new_password")
    obj = authenticate(request, username=username, password=old_password)
    if None in [username, old_password, new_password]:
        response = {'data': 'Please provide all fields'}
        return Response(response)
    if obj is not None:
        print("ok")
        try:
            obj.set_password(new_password)
            obj.save()
            field = {'Username': username}
            up_field = {'Password': dowell_hash.dowell_hash(new_password)}
            dowellconnection("login", "bangalore", "login", "registration",
                             "registration", "10004545", "ABCDE", "update", field, up_field)
            response = {'data': 'Password Changed successfully..'}
            return Response(response)
        except Exception as e:
            response = {'data': 'Error', 'error': e}
            return Response(response)
    else:
        response = {'data': 'Username, Password combination incorrect'}
        return Response(response)


@api_view(['POST'])
def profile_update(request):
    email_otp=request.data.get("email_otp")
    address=request.data.get("address")
    zip_code=request.data.get("zip_code")
    user_city=request.data.get("city")
    user_location=request.data.get("location")
    user_country=request.data.get("country")
    native_language=request.data.get("native_language")
    nationality=request.data.get("nationality")
    language_preferences=request.data.get("language_preferences")
    vision=request.data.get("vision")
    username=request.data.get("username")
    Firstname=request.data.get("first_name")
    Lastname=request.data.get("last_name")
    Email=request.data.get("email")
    Phone=request.data.get("phone")
    Profile_Image=request.data.get("image")
    obj=Account.objects.filter(username=username).first()
    field={"document_name":username}
    client_admin=dowellconnection("login","bangalore","login","client_admin","client_admin","1159","ABCDE","fetch",field,"nil")
    data2=json.loads(client_admin)
    resp2={"success_fields":[],"error_fields":[]}
    data1=data2["data"][0]
    up_field={}
    update_fields=[]
    img_exists=""
    if username and Email and not Profile_Image and not Phone and not Lastname and not Firstname and not vision \
        and not language_preferences and not nationality and not native_language and not user_country and not user_location \
            and not user_city and not zip_code and not address and not email_otp:
        check=Account.objects.filter(username=username,email=Email)
        check_guest=GuestAccount.objects.filter(email=Email).first()
        if not check:
            otp_input = generateOTP()
            message = f'Dear {username}, <br> Please Enter below <strong>OTP</strong> to use this email address in your existing dowell account <br><h2>Your OTP is <strong>{otp_input}</strong></h2><br>Note: This OTP is valid for the next 2 hours only.'

            def send_otp(): return send_mail(
                'Your otp for changing email in your Dowell account', otp_input, settings.EMAIL_HOST_USER, [Email], fail_silently=False, html_message=message)

            if check_guest:
                check_guest.otp=otp_input
                check_guest.save(update_fields=['otp'])
            else:
                guest_account=GuestAccount(username="user", email=Email, otp=otp_input, expiry=datetime.datetime.utcnow())
                guest_account.save()
            send_otp()
            return Response({'msg':'success','info':'OTP sent successfully'})
        else:
            return Response({'msg':'error','info':'Given email is already in use with your account'})

    if Profile_Image is not None:
        img = Image.open(io.BytesIO(base64.decodebytes(bytes(Profile_Image, "utf-8"))))
        if obj.profile_image == "":
            img.save(f"dowell_login/static/img/api_upload/{username}.png")
            im = Image.open(f"dowell_login/static/img/api_upload/{username}.png")
            thumb_io = io.BytesIO()
            im.save(thumb_io, im.format, quality=60)
            obj.profile_image.save(im.filename,ContentFile(thumb_io.getvalue()), save=False )
            try:
                os.remove(f"dowell_login/static/img/api_upload/{username}.png")
            except:
                pass
            obj.save()
            up_field["Profile_Image"]=f"https://100014.pythonanywhere.com/media/{obj.profile_image}"
            update_data1={"profile_img":f"https://100014.pythonanywhere.com/media/{obj.profile_image}"}
            data1["profile_info"].update(update_data1)
            resp2["success_fields"].append("Profile Image")
        else:
            img.save(f"dowell_login/media/{obj.profile_image}")
            resp2["success_fields"].append("Profile Image")
            up_field["Profile_Image"]=f"https://100014.pythonanywhere.com/media/{obj.profile_image}"
    if Firstname is not None:
        obj.first_name=Firstname
        update_fields.append("first_name")
        up_field["Firstname"]=Firstname
        update_data1={"first_name":Firstname}
        data1["profile_info"].update(update_data1)
        resp2["success_fields"].append("Firstname")

    if Lastname is not None:
        obj.last_name=Lastname
        update_fields.append("last_name")
        up_field["Lastname"]=Lastname
        update_data1={"last_name":Lastname}
        data1["profile_info"].update(update_data1)
        resp2["success_fields"].append("Lastname")

    if Email is not None and email_otp is not None:
        try:
            guest =GuestAccount.objects.get(
                otp=email_otp, email=Email)
        except GuestAccount.DoesNotExist:
            guest = None
        print(guest)
        print(email_otp)
        if guest is not None:
            obj.email=Email
            update_fields.append("email")
            up_field["Email"]=Email
            update_data1={"email":Email}
            data1["profile_info"].update(update_data1)
            resp2["success_fields"].append("Email")
        else:
            resp2["error_fields"].append({"field":"Email",'msg':'Wrong OTP'})

    if Phone is not None:
        obj.phone=Phone
        update_fields.append("phone")
        up_field["Phone"]=Phone
        update_data1={"phone":Phone}
        data1["profile_info"].update(update_data1)
        resp2["success_fields"].append("Phone")
    if address is not None:
        up_field["address"]=address
        resp2["success_fields"].append("Address")
    if zip_code is not None:
        up_field["zip_code"]=zip_code
        resp2["success_fields"].append("Zip_code")
    if user_city is not None:
        up_field["user_city"]=user_city
        resp2["success_fields"].append("User_city")
    if user_location is not None:
        up_field["user_location"]=user_location
        resp2["success_fields"].append("User_location")
    if user_country is not None:
        up_field["user_country"]=user_country
        resp2["success_fields"].append("User_country")
    if native_language is not None:
        up_field["native_language"]=native_language
        resp2["success_fields"].append("Native_language")
    if nationality is not None:
        up_field["nationality"]=nationality
        resp2["success_fields"].append("Nationality")
    if language_preferences is not None:
        up_field["language_preferences"]=language_preferences
        resp2["success_fields"].append("Language_preference")
    if vision is not None:
        up_field["vision"]=vision
        resp2["success_fields"].append("Vision")

    final_data1=data1.pop("_id")
    if update_fields !=[]:
        obj.save(update_fields=update_fields)
    client_admin=dowellconnection("login","bangalore","login","client_admin","client_admin","1159","ABCDE","update",{"document_name":username},{'profile_info':data1["profile_info"]})

    if up_field != {}:
        dowellconnection("login","bangalore","login","registration","registration","10004545","ABCDE","update",{"Username":username},up_field)
    return Response(resp2)


@api_view(['POST'])
def profile_view(request):
    username = request.data.get("username")
    password = request.data.get("password")
    obj = "OK"
    if obj is not None:
        resp = dowellconnection("login", "bangalore", "login", "registration",
                                "registration", "10004545", "ABCDE", "find", {"Username": username}, "nil")
        resp1 = json.loads(resp)
        if resp1["data"] != None:
            return Response(resp1["data"])
        else:
            return Response({"Error": "Credentials wrong1"})
    else:
        return Response({"Error": "Credentials wrong"})


@api_view(['GET'])
def live_users(request):
    total_products=[]
    for_product=LiveStatus.objects.values_list('product', flat=True)
    for a in for_product:
        if not a in total_products:
            total_products.append(a)
    time_threshold = datetime.datetime.now()- datetime.timedelta(minutes=1)
    obj_notlive=LiveStatus.objects.filter(status="login",date_updated__lte=time_threshold.strftime('%d %b %Y %H:%M:%S')).values_list('username', 'sessionID')
    obj_live=LiveStatus.objects.filter(status="login",date_updated__gte=time_threshold.strftime('%d %b %Y %H:%M:%S')).values_list('username', 'sessionID')
    final={'liveusers':obj_live,'non_liveusers':obj_notlive,'total_products':total_products}
    return Response(final)


@api_view(['POST'])
def all_liveusers(request):
    session_id=request.data.get("session_id")
    mydata=CustomSession.objects.filter(sessionID=session_id).first()
    if not mydata:
        return Response({"message":"SessionID not found in database, Please check and try again!!"})
    products_list=["Client_admin","Exhibitoe form","Living Lab Admin","Workflow AI"]
    field={}
    details=dowellconnection("login","bangalore","login","client_admin","client_admin","1159","ABCDE","fetch",field,"nil")
    ok=json.loads(details)
    users=[]
    count=0
    team_members=[]
    public_members=[]
    owners=[]
    for data in ok["data"]:
        count+=1
        for team in data["members"]["team_members"]["accept_members"]:
            if not team["name"] in team_members:
                # if team["name"]=="owner":
                #     if not data["document_name"] in team_members:
                #         team_members.append(data["document_name"])
                # else:
                if not team["name"]=="owner":
                    team_members.append(team["name"])
                else:
                    owners.append(data["document_name"])
        for guest in data["members"]["guest_members"]["accept_members"]:
            users.append(guest["name"])
        for public in data["members"]["public_members"]["accept_members"]:
            try:
                public_members.append(public["username"])
            except:
                pass
    team_members=list(set(team_members))
    owners=list(set(owners))
    time_threshold = datetime.datetime.now()- datetime.timedelta(minutes=1)
    obj_live=LiveStatus.objects.filter(status="login",date_updated__gte=time_threshold.strftime('%d %b %Y %H:%M:%S')).values_list('username', flat=True).order_by('username').distinct()
    response={'products_used':json.dumps(products_list),'team_members':len(team_members),'users':len(users),'public_members':len(public_members),'live_team_members':len(set(obj_live).intersection(team_members)),'live_owners':len(set(obj_live).intersection(owners))}
    current={}
    weekly={}
    for product in products_list:
        product_wise=LiveStatus.objects.filter(status="login",date_updated__gte=time_threshold.strftime('%d %b %Y %H:%M:%S'),product=product).values_list('username', flat=True).order_by('username').distinct()
        current[product]=len(product_wise)
        weekly[product]={}
        for r in range(0,7):
            date_start= datetime.datetime.now()-datetime.timedelta(days=r+1)
            date_end=datetime.datetime.now()-datetime.timedelta(days=r)
            obj=LiveStatus.objects.filter(date_updated__gte=date_start.strftime('%d %b %Y %H:%M:%S'),date_updated__lte=date_end.strftime('%d %b %Y %H:%M:%S'),product=product).values_list('username', flat=True).order_by('username').distinct()
            weekly[product][r]=obj
    response["current"]=current
    response["weekly"]=weekly
    return Response(response)


@api_view(['GET'])
def get_country_codes(request):
    codes = []
    with open('api/country-codes.csv', 'r') as file:
        reader = csv.reader(file, delimiter=',')
        for row in reader:
            codes.append({
                'country': row[0],
                'code': row[1]
            })
    return Response(codes[1:])


@api_view(['POST'])
def forgot_password(request):
    username = request.data.get('username', None)
    email = request.data.get('email', None)
    otp_input = request.data.get('otp', None)
    new_password = request.data.get('new_password', None)

    # Send OTP
    if username and email and not otp_input:
        otp = generateOTP()
        message = get_html_msg(username, otp, 'reset password')

        user_qs = Account.objects.filter(email=email, username=username)
        email_qs = GuestAccount.objects.filter(email=email)

        def send_otp(): return send_mail(
            'Your otp for reseting password of Dowell account', otp, settings.EMAIL_HOST_USER, [email], fail_silently=False, html_message=message)

        if user_qs.exists():
            if email_qs.exists():
                GuestAccount.objects.filter(email=email).update(
                    otp=otp, expiry=datetime.datetime.utcnow(), username=username)
                send_otp()
                return Response({'msg':'success','info': 'OTP sent successfully'})
            else:
                guest_account = GuestAccount(
                    username=username, email=email, otp=otp, expiry=datetime.datetime.utcnow())
                guest_account.save()
                send_otp()
                return Response({'msg': 'success','info':'OTP sent successfully'})
        else:
            return Response({'msg':'error','info': 'Username, email combination is incorrect'})

    # Create new password
    elif username and email and otp_input and new_password:
        try:
            guest = GuestAccount.objects.get(
                otp=otp_input, email=email)
        except GuestAccount.DoesNotExist:
            guest = None

        if guest is not None:
            acct = Account.objects.filter(
                email=email, username=username).first()
            acct.set_password(new_password)
            acct.save()
            fields = {'Username': username, 'Email': email}
            user_json = dowellconnection(
                "login", "bangalore", "login", "registration", "registration", "10004545", "ABCDE", "fetch", fields, "nill")
            user = json.loads(user_json)
            if len(user['data']) >= 1:
                update_fields = {
                    'Password': dowell_hash.dowell_hash(new_password)}
                dowellconnection(
                    "login", "bangalore", "login", "registration", "registration", "10004545", "ABCDE", "fetch", fields, update_fields)
                return Response({'msg':'success','info':'Password reset successfully'})
        else:
            return Response({'msg':'error','info': 'Wrong OTP'})
    else:
        return Response({'msg':'error','info':"Request must have 'username' and 'email' for getting otp and then 'otp' and new password for changing otp. "})
    return Response({'msg': 'Something went wrong'})


@api_view(['POST'])
def forgot_username(request):
    email = request.data.get('email', None)
    otp_input = request.data.get('otp', None)

    # Send OTP
    if email and not otp_input:
        otp = generateOTP()
        message = get_html_msg('User', otp , 'recover username')

        user_qs = Account.objects.filter(email=email)
        email_qs = GuestAccount.objects.filter(email=email)

        def send_otp(): return send_mail(
            'Your otp for recovering username of Dowell account', otp, settings.EMAIL_HOST_USER, [email], fail_silently=False, html_message=message)

        if user_qs.exists():
            if email_qs.exists():
                GuestAccount.objects.filter(email=email).update(
                    otp=otp, expiry=datetime.datetime.utcnow())
                send_otp()
                return Response({'msg':'success','info': 'OTP sent successfully'})
            else:
                return Response({'msg':'error','info': 'Email not found'})
        else:
            return Response({'msg':'error','info': 'Email not found'})

    # Create new password
    elif email and otp_input:
        try:
            guest = GuestAccount.objects.filter(
                otp=otp_input, email=email)
        except GuestAccount.DoesNotExist:
            guest = None
        if guest:
            fields = {'Email': email}
            user_json = dowellconnection(
                "login", "bangalore", "login", "registration", "registration", "10004545", "ABCDE", "fetch", fields, "nill")
            user = json.loads(user_json)
            username_list = []
            if len(user['data']) > 1:
                json_data = dowellconnection(
                    "login", "bangalore", "login", "registration", "registration", "10004545", "ABCDE", "fetch", fields, 'nil')
                data = json.loads(json_data)
                if len(data['data']) >= 1:
                    for obj in data['data']:
                        if obj['Username'] not in username_list:
                            username_list.append(obj['Username'])
                    context = RequestContext(
                        request, {'email': email, 'username_list': username_list})
                    html_msg = 'Dear user, <br> The list of username associated with your email: <strong>{{email}}</strong> as dowell account are as follows: <br><h3>{% for a in username_list %}<ul><li>{{a}}</li></ul>{%endfor%}</h3><br>You can proceed to login now!'
                    template = Template(html_msg)
                    send_mail('Username/s associated with your email in Dowell', '', settings.EMAIL_HOST_USER, [
                              email], fail_silently=False, html_message=template.render(context))
                return Response({'msg':'success','info':'Your username/s was sent to your mail'})
            else:
                return Response({'msg':'error','info': 'Email not found'})
        else:
            return Response({'msg':'error','info': 'Wrong OTP'})
    else:
        return Response({'msg':'error','info':"Request must have field 'email' for getting otp in mail and then add field 'otp' for getting list of username in mail.."})

@api_view(["POST"])
def PublicApi(request):
    mdata = request.data.get
    username = mdata('username')
    password = mdata('password')
    loc = mdata("location")
    try:
        lo = loc.split(" ")
        country, city = country_city_name(lo[0], lo[1])
    except:
        city = ""
        country = ""
    # return Response({"city":city,"country":country,"zone":timezone_str})
    device = mdata("device")
    osver = mdata("os")
    # brow=mdata["browser"]
    ltime = mdata("time")
    ipuser = mdata("ip")
    zone = mdata("timezone")
    if None in [username, password, loc, device, osver, ltime, ipuser]:
        resp = {"data": "Provide all credentials",
                "Credentials": "username, password, location, device, os, time, ip"}
        return Response(resp)
    browser = mdata("browser")
    language = mdata("language", "English")
    company = None
    org = None
    dept = None
    member = None
    project = None
    subproject = None
    role_res = None
    user_id = None
    first_name = None
    last_name = None
    email = None
    phone = None
    User_type = None
    # role_id=mdata["role_id"]
    user = authenticate(request, username=username, password=password)
    if user is not None:
        field = {"Username": username}
        id = dowellconnection("login", "bangalore", "login", "registration",
                              "registration", "10004545", "ABCDE", "find", field, "nil")
        response = json.loads(id)
        if response["data"] != None:
            form = login(request, user)
            request.session.save()
            session = request.session.session_key
            obj = CustomSession.objects.filter(sessionID=session)
            if obj:
                if obj.first().status == 'login':
                    resp = {'session_id': session}
                    return Response(resp)
            try:
                res = create_event()
                event_id = res['event_id']
            except:
                event_id = None
            profile_image = "https://100014.pythonanywhere.com/media/user.png"
            first_name = response["data"]['Firstname']
            last_name = response["data"]['Lastname']
            email = response["data"]['Email']
            phone = response["data"]['Phone']
            try:
                if response["data"]['Profile_Image'] == "https://100014.pythonanywhere.com/media/":
                    profile_image = "https://100014.pythonanywhere.com/media/user.png"
                else:
                    profile_image = response["data"]['Profile_Image']
                User_type = response["data"]['User_type']
                client_admin_id = response["data"]['client_admin_id']
                user_id = response["data"]['_id']
                role_res = response["data"]['Role']
                company = response["data"]['company_id']
                member = response["data"]['Memberof']
                dept = response["data"]['dept_id']
                org = response["data"]['org_id']
                project = response["data"]['project_id']
                subproject = response["data"]['subproject_id']
            except:
                pass
            try:
                final_ltime = parser.parse(ltime).strftime('%d %b %Y %H:%M:%S')
                dowell_time = time.strftime(
                    "%d %b %Y %H:%M:%S", time.gmtime(dowellclock()+1609459200))
            except:
                final_ltime = ''
                dowell_time = ''
            serverclock = datetime.datetime.now().strftime('%d %b %Y %H:%M:%S')

            field_session = {'sessionID': session, 'role': role_res, 'username': username, 'Email': email, "profile_img": profile_image, 'Phone': phone, "User_type": User_type, 'language': language, 'city': city, 'country': country, 'org': org, 'company_id': company, 'project': project, 'subproject': subproject, 'dept': dept, 'Memberof': member,
                             'status': 'login', 'dowell_time': dowell_time, 'timezone': zone, 'regional_time': final_ltime, 'server_time': serverclock, 'userIP': ipuser, 'userOS': osver, 'browser': browser, 'userdevice': device, 'userbrowser': "", 'UserID': user_id, 'login_eventID': event_id, "redirect_url": "", "client_admin_id": client_admin_id}
            dowellconnection("login", "bangalore", "login", "session",
                             "session", "1121", "ABCDE", "insert", field_session, "nil")

            info = {"role": role_res, "username": username, "email": email, "profile_img": profile_image, "phone": phone, "User_type": User_type, "language": language, "city": city, "country": country, "status": "login", "dowell_time": dowell_time, "timezone": zone,
                    "regional_time": final_ltime, "server_time": serverclock, "userIP": ipuser, "browser": browser, "userOS": osver, "userDevice": device, "userBrowser": "", "userID": user_id, "login_eventID": event_id, "client_admin_id": client_admin_id}
            info1 = json.dumps(info)
            infoo = str(info1)
            custom_session = CustomSession.objects.create(
                sessionID=session, info=infoo, document="", status="login")

            # resp={'userinfo':info}
            resp = {'session_id': session}
            return Response(resp)
        else:
            resp = {"data": "Username not found in database"}
            return Response(resp)
        # raise AuthenticationFailed("Username not Found or password not found")
    else:
        resp = {"data": "Username, Password combination incorrect.."}
        return Response(resp)