from django.shortcuts import render
import json
import requests

from django.core.mail import send_mail
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from utils.dowell_func import (generateOTP,
                                      dowellclock, get_next_pro_id, decrypt_message)
from dowll_login.models import (
  CustomSession, 
  mobile_sms,
  RandomSession,
  
)
from utils.dowellconnection import dowellconnection
from utils import dowell_hash
from utils.event_function import create_event
from utils import qrcodegen
from utils import passgen
from utils import datacube
from django.conf import settings
from django.core.files.storage import default_storage
from dowll_login.views import country_city_name, get_html_msg
import datetime
def get_or_create_collection(collection_name):

    url = "https://datacube.uxlivinglab.online/db_api/collections/"
    payload = {
        "api_key": "0699dbbb-2786-4dfa-a1db-fc12f2210228",
        "db_name": "db0",
        "payment": False
    }
    response = requests.get(url, json=payload)
    collections=response.text

    if collection_name in json.loads(collections)["data"][0]:
        return collection_name

    url="https://datacube.uxlivinglab.online/db_api/add_collection/"
    del payload["payment"]
    payload["coll_names"]=collection_name
    payload["num_collections"]=1
    collection = requests.post(url, json=payload)
    return collection_name
def get_html_msg_new(username, otp, purpose):
    return f'Dear {username}, <br> Please Enter below <strong>OTP</strong> to {purpose} of dowell account <br><h2>Your OTP is <strong>{otp}</strong></h2><br>Note: This OTP is valid for the next 2 hours only.'

def register_legal_policy(user):
    policy_url = "https://100087.pythonanywhere.com/api/legalpolicies/ayaquq6jdyqvaq9h6dlm9ysu3wkykfggyx0/iagreestatus/"
    RandomSession.objects.create(
        sessionID=user, status="Accepted", username=user)
    time = datetime.datetime.now()
    data = {
        "data": [
            {
                "event_id": "FB1010000000167475042357408025",
                "session_id": user,
                "i_agree": "true",
                "log_datetime": time,
                "i_agreed_datetime": time,
                "legal_policy_type": "app-privacy-policy"
            }
        ],
        "isSuccess": "true"
    }
    requests.post(policy_url, data=data)
    return "success"

@api_view(['POST'])
def login_legal_policy(request):
    session_id = request.data.get('s')
    if session_id:
        RandomSession.objects.create(
            sessionID=session_id, status="Accepted", username="none")
        return Response({'msg': 'Success', 'info': 'Policy accepted!!'})
    else:
        return Response({'msg': 'errror', 'info': 'Session_id is required'})
@api_view(['POST'])
def email_otp(request):
    email = request.data.get('email', None)
    username = request.data.get('username', 'User')
    usage = request.data.get('usage', None) 
    data = {
        "api_key": "0699dbbb-2786-4dfa-a1db-fc12f2210228",
        "db_name": "db0",
        "collection_name": "username_list",
        "filters": {                   
            "Email": email
        },
        "payment":False
    }
    # Datacube email_otp config
    email_data = {
        "api_key": "0699dbbb-2786-4dfa-a1db-fc12f2210228",
        "db_name": "db0",
        "collection_name": "email_otp",
        "filters": {                   
            "email": email 
        },
        "payment":False
    }

    def insert_email_otp(insert_data):
        insert_config = email_data.copy()
        insert_config.pop('filters')
        insert_config.pop('payment')
        insert_config['data'] = insert_data
        insert_config['payment'] = False
        return datacube.datacube_data_insertion(**insert_config)

    def update_email_otp(update_data,id):
        update_config = email_data.copy()
        update_config.pop('filters')
        update_config.pop('payment')
        update_config['query'] = {'email': email , "_id":id}
        update_config['update_data'] = update_data 
        return datacube.datacube_data_update(**update_config)

    # Send OTP
    if email and usage:
        otp = generateOTP()
        if usage == "forgot_username":
            user_query = datacube.datacube_data_retrieval(**data) 
            user_list = json.loads(user_query)
            email_query = datacube.datacube_data_retrieval(**email_data)
            email_list = json.loads(email_query)
            if (len(user_list["data"]) > 0): 
                if len(email_list['data']) > 0: 
                    update_data = { 'otp': otp, 'expiry': datetime.datetime.now().strftime('%d %b %Y %H:%M:%S') }
                    update_email_otp(update_data,email_list["data"][0]["_id"])
                    for_html_msg = "recover username"
                    subject = "Your otp for recovering username of Dowell account"
                    msg = 'success'
                    info = 'OTP sent Successfully'
                else:
                    msg = 'error'
                    info = 'Email not found'
                    status_code=status.HTTP_400_BAD_REQUEST
            else:
                msg = 'error'
                info = 'Email not associated with any user'
                status_code=status.HTTP_400_BAD_REQUEST
        elif usage == "forgot_password":
            data["filters"]["Username"]=username
            user_query = datacube.datacube_data_retrieval(**data) 
            user_list = json.loads(user_query)
            email_query = datacube.datacube_data_retrieval(**email_data)
            email_list = json.loads(email_query)
            if len(user_list['data']) > 0:
                if len(email_list['data']) > 0:
                    update_data = {'otp': otp, 'expiry': datetime.datetime.now().strftime('%d %b %Y %H:%M:%S'), 'username': username}
                    update_email_otp(update_data,email_list["data"][0]["_id"])
                else:
                    insert_data = {'username': username, 'email': email, 'expiry': datetime.datetime.now().strftime('%d %b %Y %H:%M:%S'), 'otp': otp}
                    insert_email_otp(insert_data)
                msg = 'success'
                info = 'OTP sent Successfully'
                for_html_msg = "reset password"
                subject = "Your otp for reseting password of Dowell account"
            else:
                msg = 'error'
                info = 'Username, email combination is incorrect'
                status_code=status.HTTP_400_BAD_REQUEST
        elif usage == "update_email":
            data["filters"]["Username"]=username
            user_query = datacube.datacube_data_retrieval(**data) 
            user_list = json.loads(user_query)
            email_query = datacube.datacube_data_retrieval(**email_data)
            email_list = json.loads(email_query)
            if not (len(user_list['data']) > 0):
                if len(email_list['data']) > 0:
                    update_data = {'username': username, 'email': email, 'expiry': datetime.datetime.now().strftime('%d %b %Y %H:%M:%S'), 'otp': otp}
                    update_email_otp(update_data,email_list["data"][0]["_id"])
                else:
                    insert_data = {'username': username, 'email': email, 'expiry': datetime.datetime.now().strftime('%d %b %Y %H:%M:%S'), 'otp': otp}
                    insert_email_otp(insert_data)
                msg = 'success'
                info = 'OTP sent Successfully'
                for_html_msg = "use this address as email"
                subject = "Your otp for updating email of Dowell account"
            else:
                msg = "error"
                info = "Given email is already in use with your account"
                status_code=status.HTTP_400_BAD_REQUEST
        elif usage == "create_account":
            for_html_msg = "use this email for creation"
            subject = "Your otp for creating dowell account"
            email_query = datacube.datacube_data_retrieval(**email_data)
            email_list = json.loads(email_query)
            if len(email_list["data"]) > 0:
                update_data = {'username': username, 'email': email, 'expiry': datetime.datetime.now().strftime('%d %b %Y %H:%M:%S'), 'otp': otp}
                update_email_otp(update_data,email_list["data"][0]["_id"])
            else:
                insert_data = {'username': username, 'email': email, 'expiry': datetime.datetime.now().strftime('%d %b %Y %H:%M:%S'), 'otp': otp}
                insert_email_otp(insert_data)

            url = "https://100085.pythonanywhere.com/api/signUp-otp-verification/"
            payload = json.dumps({
                "toEmail": email,
                "toName": username,
                "topic": "RegisterOtp",
                "otp": otp
            })
            headers = {
                'Content-Type': 'application/json'
            }
            response1 = requests.request(
                "POST", url, headers=headers, data=payload)
            msg = 'success'
            info = 'OTP sent Successfully'
            return Response({'msg': 'success', 'info': 'OTP sent successfully'})
        else:
            return Response({'msg': 'error', 'info': 'Enter email and the usage you are looking for. Look into documentation for more info.'},status=status.HTTP_400_BAD_REQUEST)
        if msg == 'success':
            message = get_html_msg_new(username, otp, for_html_msg)
            def send_otp(): return send_mail(
                subject, otp, settings.EMAIL_HOST_USER, [email], fail_silently=False, html_message=message)
            send_otp()
        try:
            return Response({'msg': msg, 'info': info},status=status_code)
        except:
            return Response({'msg': msg, 'info': info})
    else:
        return Response({'msg': 'error', 'info': 'Enter email and the usage you are looking for. Look into documentation for more info.'},status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
def mobilesms(request):
    phonecode = request.data.get("phonecode")
    phone = request.data.get("Phone")
    sms = generateOTP()
    full_number ="+" + str(phonecode) + str(phone)
    
    data = {
        "api_key": "0699dbbb-2786-4dfa-a1db-fc12f2210228",
        "db_name": "db0",
        "collection_name": "mobile_sms",
        "filters": {                   
            "phone": full_number
        },
        "payment":False
    }

    time = datetime.datetime.now().strftime('%d %b %Y %H:%M:%S')
    phone_query = datacube.datacube_data_retrieval(**data)
    phone_list = json.loads(phone_query)
    # return Response(phone_list)
    if len(phone_list["data"]) > 0:
    # if phone_exists is not None:
        update_config = data.copy()
        update_config.pop('filters')
        update_config.pop('payment')
        update_config['query'] = {'phone': full_number }
        update_config['update_data'] = {'sms': sms, 'expiry': time}
        datacube.datacube_data_update(**update_config)
    else:
        insert_config = data.copy()
        insert_config.pop('filters')
        insert_config.pop('payment')
        insert_config['data'] = {'phone': full_number, 'sms': sms, 'expiry': time}
        insert_config['payment'] = False
        datacube.datacube_data_insertion(**insert_config)
    url = "https://100085.pythonanywhere.com/api/v1/dowell-sms/c9dfbcd2-8140-4f24-ac3e-50195f651754/"
    payload = {
        "sender" : "DowellLogin",
        "recipient" : full_number,
        "content" : f"Enter the following OTP to create your dowell account: {sms}",
        "created_by" : "Manish"
        }
    response = requests.request("POST", url, data=payload)
    return Response({'msg':'success','info':'SMS sent successfully!!'})


@api_view(['POST'])
def mobile_otp(request):
    phonecode = request.data.get('phonecode')
    phone = request.data.get('phone')

    sms = generateOTP()
    full_number = phonecode + phone
    time = datetime.datetime.utcnow()

    try:
        phone_exists = mobile_sms.objects.get(phone=full_number)
    except mobile_sms.DoesNotExist:
        phone_exists = None
    if phone_exists is not None:
        mobile_sms.objects.filter(
            phone=full_number).update(sms=sms, expiry=time)
    else:
        mobile_sms.objects.create(
            phone=full_number, sms=sms, expiry=time)
    url = "https://100085.pythonanywhere.com/api/sms/"
    payload = {
        "sender": "DowellLogin",
        "recipient": full_number,
        "content": f"Enter the following OTP to create your dowell account: {sms}",
        "created_by": "Manish"
    }
    response = requests.request("POST", url, data=payload)
    if len(response.json()) > 1:
        return Response({'msg': 'success', 'info': 'SMS sent successfully!!'})
    else:
        return Response({'msg': 'error', 'error': 'The number is not valid'})
@api_view(['POST'])
def otp_verify(request):
    otp = generateOTP()
    username = request.data.get('username', None)
    email = request.data.get('email', None)
    phone = request.data.get('phone', None)
    otp_input = request.data.get('otp',None)
    if email and username and not otp_input:
        field = {
          "email":email,
          "username":username
        }
        check = dowellconnection("login","bangalore","login","otp_verify","otp_verify","1234001","ABCDE","fetch",field,"nil")
        check1 = json.loads(check)
        if len(check1["data"])>=1:
            field = {"email":email,"username":username}
            field_update = {"otp":otp,"status":"active"}
            updated = dowellconnection("login","bangalore","login","otp_verify","otp_verify","1234001","ABCDE","update",field,field_update)
        else:
            field = {"username":username,"email":email,"otp":otp,"status":"active"}
            insert = dowellconnection("login","bangalore","login","otp_verify","otp_verify","1234001","ABCDE","insert",field,"nil")
            inserted = json.loads(insert)
        url = "https://100085.pythonanywhere.com/api/signUp-otp-verification/"
        payload = json.dumps({
            "toEmail": email,
            "toName": username,
            "topic": "RegisterOtp",
            "otp": otp
        })
        headers = {
            'Content-Type': 'application/json'
        }
        response1 = requests.request(
            "POST", url, headers=headers, data=payload)
        return Response({'msg':'success','otp':otp})
    elif email and username and otp_input:
        field = {"email":email,"username":username,"otp":otp_input}
        check = dowellconnection("login","bangalore","login","otp_verify","otp_verify","1234001","ABCDE","fetch",field,"nil")
        check1 = json.loads(check)
        if len(check1["data"])>=1:
            field = {"email":email,"username":username,"otp":otp_input}
            field_update = {"status":"verified"}
            dowellconnection("login","bangalore","login","otp_verify","otp_verify","1234001","ABCDE","update",field,field_update)
            return Response({"msg":"success","info":"Verification complete"})
        else:
            return Response({"msg":"error","info":"Wrong OTP provided"})

    elif phone and username and not otp_input:
        field = {"phone":phone,"username":username}
        check = dowellconnection("login","bangalore","login","otp_verify","otp_verify","1234001","ABCDE","fetch",field,"nil")
        check1 = json.loads(check)
        if len(check1["data"])>=1:
            field = {"phone":phone,"username":username}
            field_update = {"otp":otp,"status":"active"}
            updated = dowellconnection("login","bangalore","login","otp_verify","otp_verify","1234001","ABCDE","update",field,field_update)
        else:
            field = {"phone":phone,"otp":otp,"status":"active","username":username}
            insert = dowellconnection("login","bangalore","login","otp_verify","otp_verify","1234001","ABCDE","insert",field,"nil")
            inserted = json.loads(insert)
        url = "https://100085.pythonanywhere.com/api/sms/"
        payload = {
            "sender": "DowellLogin",
            "recipient": phone,
            "content": f"Enter the following OTP to create your dowell account: {otp}",
            "created_by": "Manish"
        }
        response = requests.request("POST", url, data=payload)
        if len(response.json()) > 1:
            return Response({'msg':'success','otp':otp})
        else:
            return Response({'msg': 'error','error':'The phone number is not valid'})
    elif phone and username and otp_input:
        field = {"phone":phone,"username":username,"otp":otp_input}
        check = dowellconnection("login","bangalore","login","otp_verify","otp_verify","1234001","ABCDE","fetch",field,"nil")
        check1 = json.loads(check)
        if len(check1["data"])>=1:
            field={"phone":phone,"username":username,"otp":otp_input}
            field_update = {"status":"verified"}
            dowellconnection("login","bangalore","login","otp_verify","otp_verify","1234001","ABCDE","update",field,field_update)
            return Response({"msg":"success","info":"Verification complete"})
        else:
            return Response({"msg":"error","info":"Wrong OTP provided"})
    else:
        return Response({'msg': 'error','error':'Provide either email or phone number along with username'})
@api_view(["POST"])
def register(request):
    start=datetime.datetime.now()
    user = request.data["Username"]
    otp_input = request.data.get("otp")
    sms_input=request.data.get("sms")
    image = request.data.get("Profile_Image")
    password = request.data.get("Password")
    first = request.data.get("Firstname")
    last = request.data.get("Lastname")
    email = request.data.get("Email")
    phonecode = request.data.get("phonecode")
    phone = request.data.get("Phone")
    user_type = request.data.get('user_type')
    user_country = request.data.get('user_country')
    policy_status = request.data.get('policy_status')
    other_policy = request.data.get('other_policy')
    newsletter = request.data.get('newsletter')

    #Email and SMS verification

    email_data = {
        "api_key": "0699dbbb-2786-4dfa-a1db-fc12f2210228",
        "db_name": "db0",
        "collection_name": "email_otp",
        "filters": {                   
            "email": email,"otp":otp_input
        },
        "payment":False
    }
    check_otp = datacube.datacube_data_retrieval(**email_data)
    check_otp1 = json.loads(check_otp)
    if len(check_otp1["data"]) <= 0:
        return Response({'msg':'error','info':'Wrong Email OTP'},status=status.HTTP_400_BAD_REQUEST)

    if sms_input is not None:
        sms_data = {
            "api_key": "0699dbbb-2786-4dfa-a1db-fc12f2210228",
            "db_name": "db0",
            "collection_name": "mobile_sms",
            "filters": {                   
                "phone": "+"+str(phonecode) + str(phone),"sms":sms_input
            },
            "payment":False
        }
        check_sms = datacube.datacube_data_retrieval(**sms_data)
        check_sms1 = json.loads(check_sms)
        if len(check_sms1["data"]) <= 0 and phone:
            return Response({'msg':'error','info':'Wrong Mobile SMS'},status=status.HTTP_400_BAD_REQUEST)

    url = "https://datacube.uxlivinglab.online/db_api/get_data/"
    #Main data attributes for signup database
    data = {
        "api_key": "0699dbbb-2786-4dfa-a1db-fc12f2210228",
        "operation": "fetch",
        "db_name": "db0",
        "coll_name": "username_list",
        "filters": {
            "Username": user
        },
        "payment": False
    }

    # Check for username
    user_query = requests.post(url,json=data) 
    user_list = json.loads(user_query.text)
    if (len(user_list["data"]) > 0):
        return Response({'msg':'error','info': 'Username already taken'},status=status.HTTP_400_BAD_REQUEST)

    #Add username in policy model
    register_legal_policy(user)

    # Setup collection
    url="https://datacube.uxlivinglab.online/db_api/crud/"
    data["operation"]="insert"
    data["data"]={"Username":user,"Email":email,"Country":user_country}
    requests.post(url,json=data)

    #Even ID of user
    event_id = None
    try:
        res = create_event()
        event_id = res['event_id']
    except:
        pass

    # try:
    #     final_ltime = parser.parse(ltime).strftime('%d %b %Y %H:%M:%S')
    #     dowell_time = time.strftime(
    #         "%d %b %Y %H:%M:%S", time.gmtime(dowellclock()+1609459200))
    # except:
    #     final_ltime = ''
    #     dowell_time = ''
    serverclock = datetime.datetime.now().strftime('%d %b %Y %H:%M:%S')

    #Info of user to be inserted
    field={"Profile_Image":image,"Username":user,"Password": dowell_hash.dowell_hash(password),"Firstname":first,"Lastname":last,"Email":email,"phonecode":phonecode,"Phone":phone,"Policy_status":policy_status,"User_type":user_type,"eventId":event_id,"payment_status":"unpaid","safety_security_policy":other_policy,"user_country":user_country,"newsletter_subscription":newsletter,"joined_serverclock":serverclock}

    #Change collection value of main data attribute to user's collection
    collection_name=f'{user_country}_{user[0].upper()}_0'
    data["coll_name"] = get_or_create_collection(collection_name)
    #Putting main data values in database attribute 
    data["data"]=field

    #Inserting data to signup database as per their collection name
    user_json=requests.post(url,json=data)
    user_json1 = json.loads(user_json.text)
    inserted_id = user_json1["data"]['inserted_id']

    #Signup COnfirmation Mail
    url = "https://100085.pythonanywhere.com/api/signup-feedback/"
    if not sms_input:
        verified_phone="unverified"
    else:
        verified_phone="verified"
    payload = json.dumps({
        "topic" : "Signupfeedback",
        "toEmail" : email,
        "toName" : first +" "+ last,
        "firstname" : first,
        "lastname" : last,
        "username" : user,
        "phoneCode" : "+" + str(phonecode),
        "phoneNumber" : phone,
        "usertype" : user_type,
        "country" : user_country,
        "verified_phone":verified_phone,
        "verified_email": "verified"
            })
    headers = {
        'Content-Type': 'application/json'
    }
    response1 = requests.request("POST", url, headers=headers, data=payload)

    return Response({
        'message':f"{user}, registration success",
        'inserted_id':f"{inserted_id}"
        })