# standard
import json
import requests
import datetime

# django
from django.shortcuts import render, redirect
from django.http.response import HttpResponse, JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.hashers import make_password
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.clickjacking import (
    xframe_options_exempt, xframe_options_deny, xframe_options_sameorigin,
)

# rest_framework
from rest_framework import status
from rest_framework.response import Response

# loginapp
from loginapp.models import Account, GuestAccount, mobile_sms

# server utility functions
from server.utils.dowellconnection import dowellconnection
from server.utils.dowell_func import generateOTP, get_next_pro_id
from server.utils.dowell_hash import dowell_hash
from server.utils.event_function import create_event
from server.utils.country_code import country_codes


def is_ajax(request):
    return request.META.get('HTTP_X_REQUESTED_WITH') == 'XMLHttpRequest'

@method_decorator(xframe_options_exempt, name='dispatch')
@csrf_exempt
def register(request):
    '''
    User Registration

    Description
    -----------
    Generate OTP for GuestUser from ajax request.
    Create Account with post request.
    Insert client admin document into cluster
    Insert Registration document into cluster.
    '''
    otp_user = generateOTP()
    context = {
        'country_resp': country_codes,
    }
    _type = None
    orgs = request.GET.get("org",None)

    if is_ajax(request=request):
        if request.POST.get('form')=='verify_otp':
            otp = request.POST.get('otp')
            email = request.POST.get('email')
            try:
                valid = GuestAccount.objects.get(otp=otp,email=email)
            except GuestAccount.DoesNotExist:
                valid=None
            if valid:
                return JsonResponse({'verified':'True'})
            else:
                return JsonResponse({'verified':'False'})
        elif request.POST.get('form')=='mobileotp':
            sms = generateOTP()
            code = request.POST.get("phonecode")
            phone = request.POST.get("phone")
            full_number = code+phone
            time = datetime.datetime.utcnow()
            try:
                phone_exists = mobile_sms.objects.get(phone=full_number)
            except mobile_sms.DoesNotExist:
                phone_exists = None
            if phone_exists is not None:
                mobile_sms.objects.filter(phone=full_number).update(sms=sms,expiry=time)
            else:
                mobile_sms.objects.create(phone=full_number,sms=sms,expiry=time)
            url = "https://100085.pythonanywhere.com/api/sms/"
            payload = {
                "sender" : "DowellLogin",
                "recipient" : full_number,
                "content" : f"Enter the following OTP to create your dowell account: {sms}",
                "created_by" : "Manish"
                }
            response = requests.request("POST", url, data=payload)
            if len(response.json())>1:
                return JsonResponse({'msg':'SMS sent successfully!!'})
            else:
                return JsonResponse({'msg':'error'})
        elif request.POST.get('form')=='verify_sms':
            code = request.POST.get("phonecode")
            phone = request.POST.get("phone")
            sms = request.POST.get("sms")
            full_number = code+phone
            try:
                valid = mobile_sms.objects.get(sms=sms,phone=full_number)
            except mobile_sms.DoesNotExist:
                valid=None
            if valid:
                return JsonResponse({'verified':'True'})
            else:
                return JsonResponse({'verified':'False'})
        else:
            user = request.POST.get('username',"User")
            email_ajax = request.POST.get('email',None)
            time = datetime.datetime.utcnow()
            try:
                email_exist = GuestAccount.objects.get(email=email_ajax)
            except GuestAccount.DoesNotExist:
                email_exist = None
            if email_exist is not None:
                GuestAccount.objects.filter(email=email_ajax).update(otp=otp_user,expiry=time,username=user)
                url = "https://100085.pythonanywhere.com/api/signUp-otp-verification/"
                payload = json.dumps({
                    "toEmail":email_ajax,
                    "toName":user,
                    "topic":"RegisterOtp",
                    "otp":otp_user
                    })
                headers = {
                    'Content-Type': 'application/json'
                    }
                requests.request("POST", url, headers=headers, data=payload)
                response = {}
                return JsonResponse(response)
            else:
                insertdata = GuestAccount(username=user,email=email_ajax,otp=otp_user)
                insertdata.save()
                url = "https://100085.pythonanywhere.com/api/signUp-otp-verification/"
                payload = json.dumps({
                    "toEmail": email_ajax,
                    "toName": user,
                    "topic": "RegisterOtp",
                    "otp": otp_user
                })
                headers = {
                    'Content-Type': 'application/json'
                }
                requests.request("POST", url, headers=headers, data=payload)
                
                response = {}
                return Response(response, status=status.HTTP_200_OK)

    if request.method == 'POST':
        valid = request.POST.get('otp_status',None)
        main_params = request.POST.get('mainparams',None)
        _type = request.POST.get('type',None)
        otp = request.POST.get('otp')
        org = request.POST.get('org',None)
        policy_status = request.POST.get('policy_status')
        other_policy = request.POST.get('other_policy')
        newsletter = request.POST.get('newsletter')
        user = request.POST['username']
        password1 = request.POST['password1']
        password2 = request.POST['password2']
        first = request.POST['first_name']
        last = request.POST['last_name']
        email = request.POST['email']
        phonecode=request.POST["phonecode"]
        phone = request.POST['phone']
        user_type = request.POST.get('user_type')
        user_country = request.POST.get('user_country')
        role1 = "guest"
        img = request.FILES.get("profile_image",None)
        name = ""

        # Validate policy and passwords
        if policy_status != "Accepted":
            context["error"] = "Policy not accepted.."
            return render(request, "register_v2.html", context)
        if password1 != password2:
            context["error"] = "Passwords Not Matching.."
            return render(request, "register_v2.html", context)
        
        if valid is not None:
            try:
                account = Account.objects.filter(email=email)

                for data in account:
                    if email == data.email and role1 == data.role:
                        account = Account.objects.filter(email=email).update(password = make_password(password1),first_name = first,last_name = last,email = email,phonecode=phonecode,phone = phone,profile_image=img)
            except Account.DoesNotExist:
                name = None
        else:
            context["error"] = "Wrong OTP!!"
            return render(request, "register_v2.html", context)
        if name is not None:
            if img:
                new_user=Account.objects.create(email = email,username = user,
                                                password = make_password(password1), first_name=first,last_name = last, phonecode = phonecode, phone = phone,profile_image = img)
            else:
                new_user = Account.objects.create(email = email,username=user,
                                                  password = make_password(password1),first_name = first,last_name = last,phonecode=phonecode,phone = phone)
            profile_image = new_user.profile_image

            # Mongodb document structure
            json_data = open('static/clientadmin.json')
            data = json.load(json_data)
            json_data.close()

            # Change document name and username
            data["document_name"] = user
            data["Username"] = user

            # create profile info data in document
            update_data = {"first_name": first, "last_name": last, "profile_img": f'https://100014.pythonanywhere.com/media/{profile_image}',"email": email, "phonecode": phonecode,"phone": phone}
            data["profile_info"].update(update_data)
            data["organisations"][0]["org_name"]= user
            
            # create team_members data in document
            update_data = {"first_name":first,"last_name":last,"email":email}
            data["members"]["team_members"]["accept_members"][0].update(update_data)

            # Insert client_admin doc into mongo db collection
            client_admin = dowellconnection("login","bangalore","login","client_admin","client_admin","1159","ABCDE","insert",data,"nil")

            client_admin_res = json.loads(client_admin)
            org_id = client_admin_res["inserted_id"]

            user_field = {}
            user_resp = dowellconnection("login","bangalore","login","registration","registration","10004545","ABCDE","fetch",user_field,"nil")
            idd = json.loads(user_resp)
            res_list = idd["data"]
            profile_id = get_next_pro_id(res_list)
            event_id = None
            try:
                res = create_event()
                event_id = res['event_id']
            except:
                pass

            field={"Profile_Image":f"https://100014.pythonanywhere.com/media/{profile_image}","Username":user,"Password":dowell_hash(password1),"Firstname":first,"Lastname":last,"Email":email,"phonecode":phonecode,"Phone":phone,"profile_id":profile_id,"client_admin_id":client_admin_res["inserted_id"],"Policy_status":policy_status,"User_type":user_type,"eventId":event_id,"payment_status":"unpaid","safety_security_policy":other_policy,"user_country":user_country,"newsletter_subscription":newsletter}

            # Insert user registration
            id = dowellconnection("login","bangalore","login","registration","registration","10004545","ABCDE","insert",field,"nil")

            url = "https://100085.pythonanywhere.com/api/signup-feedback/"
            payload = json.dumps({
                "topic" : "Signupfeedback",
                "toEmail" : email,
                "toName" : first +" "+ last,
                "firstname" : first,
                "lastname" : last,
                "username" : user,
                "phoneCode" : phonecode,
                "phoneNumber" : phone,
                "usertype" : user_type,
                "country" : user_country
                    })
            headers = {
                'Content-Type': 'application/json'
                }
            
            requests.request("POST", url, headers=headers, data=payload)

            if org != "None":
                return redirect(f'https://100014.pythonanywhere.com/?{main_params}')
            else:
                return render(request,'after_register_v2.html',{'user':user})
        else:
            return HttpResponse("check")
    else:
        ...
    return render(request,'register_v2.html',{'title':'Register here','country_resp': country_codes,'org':orgs,'type': _type})

@method_decorator(xframe_options_exempt, name='dispatch')
@csrf_exempt
def login(request):
    context = {}
    orgs = None
    type1 = None
    email1 = None
    name1 = None
    u_code = None
    spec = None
    code = None
    detail = None
    try:
        orgs = request.GET.get('org',None)
        type1 = request.GET.get('type',None)
        email1 = request.GET.get('email',None)
        name1 = request.GET.get('name',None)
        code = request.GET.get('code',None)
        spec = request.GET.get('spec',None)
        u_code = request.GET.get('u_code',None)
        detail = request.GET.get('detail',None)
    except:
        pass
    context["org"] = orgs
    context["type"] = type1
    urls = request.GET.get('next',None)
    context["url"] = request.GET.get('redirect_url',None)
    redirect_url = request.GET.get('redirect_url',None)
    country=""
    city=""
    userr=request.session.session_key
    if userr:
        if orgs:
            return redirect(f'https://100093.pythonanywhere.com/invitelink?session_id={userr}&org={orgs}&type={type1}&name={name1}&code={code}&spec={spec}&u_code={u_code}&detail={detail}')
        elif redirect_url:
            return HttpResponse(f"<script>window.location.replace('{redirect_url}?session_id={userr}');</script>")
        else:
            return redirect(f'https://100093.pythonanywhere.com/home?session_id={userr}')
    var1= passgen.generate_random_password1(24)
    context["random_session"] = var1
    if request.COOKIES.get('qrid'):
        context["qrid"]= request.COOKIES.get('qrid')
        qrid_obj_1 = QR_Creation.objects.filter(qrid=context["qrid"]).first()
        if qrid_obj_1.info == "":
            context["qrid_type"] = "new"
        else:
            context["qrid_type"] = "old"
    else:
        qrid_obj = QR_Creation.objects.filter(status="new").first()
        if qrid_obj is None:
            ruser = passgen.generate_random_password1(24)
            rpass = "DoWell@123"
            new_obj = QR_Creation.objects.create(qrid=ruser,password=rpass,status="used")
            context["qrid"] = new_obj.qrid
            context["qrid_type"] = "new"
            html = render(request,'login_v2.html',context)
            html.set_cookie('qrid',new_obj.qrid, max_age = 365*24*60*60)
            return html
        else:
            qrid_obj.status = "used"
            qrid_obj.save(update_fields=['status'])
            context["qrid"] = qrid_obj.qrid
            context["qrid_type"] = "new"
            html = render(request,'login_v2.html',context)
            html.set_cookie('qrid',qrid_obj.qrid, max_age = 365*24*60*60)
            return html
    if request.method == 'POST':
        username = request.POST['username']
        obj = Account.objects.filter(username=username).first()
        try:
        #obj.current_task="Data taken, Checking policy acceptance and  User registration..."
            obj.current_task="Logging In"
            obj.save(update_fields=['current_task'])
        except:
            pass
        random_session=request.POST.get('random_session',None)
        random_session_obj1=RandomSession.objects.filter(username=username).first()
        if random_session_obj1 is None:
            random_session_obj=RandomSession.objects.filter(sessionID=random_session).first()
            if random_session_obj is None:
                context["error"]="Please accept the terms in policy page!"
                return render(request,'login_v2.html',context)
            random_session_obj.username=username
            random_session_obj.save(update_fields=['username'])
        main_params = request.POST.get('mainparams',None)
        org1 = request.POST.get('org',None)
        type1 = request.POST.get('type',None)
        url = request.POST.get('url',None)
        username = request.POST['username']
        password = request.POST['password']
        loc = request.POST["loc"]
        zone = request.POST.get("zone",None)
        try:
            lo = loc.split(" ")
            country,city=country_city_name(lo[0],lo[1])
        except Exception as e:
            city=""
            country=""
        language = request.POST.get("language","en-us")
        device = request.POST.get("dev","")
        osver = request.POST.get("os","")
        brow = request.POST.get("brow","")
        ltime = request.POST["time"]
        ipuser = request.POST.get("ip","")
        mobconn = request.POST["conn"]

        user = authenticate(request, username = username, password = password)
        print(user)
        if user is not None:
            form = login(request, user)
            context["username"] = username
            context["user"] = user
            if user.role=="Admin":
                linkl = "createusers"
                linklabel = "Create User Links"
                usersession = user
                context["linkl"] = linkl
                context["linklabel"] = linklabel
                context["user"] = usersession
            session = request.session.session_key
            try:
                res = create_event()
                event_id = res['event_id']
            except:
                event_id = None
                context["api"] = "api not work"
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
            payment_status = None
            client_admin_id = ""
            field= { "Username": username }
            id = dowellconnection("login","bangalore","login","registration","registration","10004545","ABCDE","find",field,"nil")
            response=json.loads(id)
            if response["data"] != None:
                try:
                    obj.current_task="Verifying User"
                    #obj.current_task="Logging In"
                    obj.save(update_fields=['current_task'])
                except:
                    pass
                first_name=response["data"]['Firstname']
                last_name=response["data"]['Lastname']
                email=response["data"]['Email']
                phone=response["data"]['Phone']
                try:
                    User_type=response["data"]['User_type']
                    client_admin_id=response["data"]['client_admin_id']
                    user_id=response["data"]['profile_id']
                    payment_status=response["data"]['payment_status']
                    role_res=response["data"]['Role']
                    company=response["data"]['company_id']
                    member=response["data"]['Memberof']
                    dept=response["data"]['dept_id']
                    org=response["data"]['org_id']
                    project=response["data"]['project_id']
                    subproject=response["data"]['subproject_id']
                except Exception as e:
                    pass

            try:
                final_ltime= parser.parse(ltime).strftime('%d %b %Y %H:%M:%S')
                dowell_time= time.strftime("%d %b %Y %H:%M:%S", time.gmtime(dowellclock()+1609459200))
            except:
                final_ltime=''
                dowell_time=''
            serverclock = datetime.datetime.now().strftime('%d %b %Y %H:%M:%S')

            field_session = {'sessionID':session,'role':role_res,'username':username,'Email':email,'Phone':phone,"User_type":User_type,'language':language,'city':city,'country':country,'org':org,'company_id':company,'project':project,'subproject':subproject,'dept':dept,'Memberof':member,'status':'login','dowell_time':dowell_time,'timezone':zone,'regional_time':final_ltime,'server_time':serverclock,'userIP':ipuser,'userOS':osver,'userdevice':device,'userbrowser':brow,'UserID':user_id,'login_eventID':event_id,"redirect_url":redirect_url,"client_admin_id":client_admin_id,"payment_status":payment_status}

            dowellconnection("login","bangalore","login","session","session","1121","ABCDE","insert",field_session,"nil")

            try:
                obj.current_task="Connecting to UX Living Lab"
                obj.save(update_fields=['current_task'])
            except:
                pass

            info = {"role":role_res,"username":username,"email":email,"phone":phone,"User_type":User_type,"language":language,"city":city,"country":country,"status":"login","dowell_time":dowell_time,"timezone":zone,"regional_time":final_ltime,"server_time":serverclock,"userIP":ipuser,"userOS":osver,"userDevice":device,"userBrowser":brow,"language":language,"userID":user_id,"login_eventID":event_id,"client_admin_id":client_admin_id,"payment_status":payment_status}

            info1 = json.dumps(info)
            infoo = str(info1)
            custom_session = CustomSession.objects.create(sessionID=session,info=infoo,document="",status="login")

            if org1 != "None":
                return redirect(f'https://100093.pythonanywhere.com/invitelink?session_id={session}&{mainparams}')

            if url=="None":
                return redirect(f'https://100093.pythonanywhere.com/home?session_id={session}')
            else:
                return HttpResponse(f"<script>window.location.replace('{url}?session_id={session}');</script>")
                return redirect(f'{url}?session_id={session}')
        else:
            context["error"]="Username, Password combination is incorrect!"
            context["main_logo"]='dowelllogo.png'
            return render(request,'login_v2.html',context)
    #form = AuthenticationForm()
    if redirect_url is None:
        context["main_logo"]='logos/dowelllogo.png'
    else:
        if '100084' in redirect_url:
            context["main_logo"]='logos/dowell_workflow_AI.png'
        else:
            context["main_logo"]='logos/dowelllogo.png'
        # logos=[]
        # path='dowell_login/static/img/logos'
        # for path1 in os.listdir(path):
        #     if os.path.isfile(os.path.join(path,path1)):
        #         logos.append(path1)
        # return HttpResponse(logos)
    return render(request,'login_v2.html',context)
