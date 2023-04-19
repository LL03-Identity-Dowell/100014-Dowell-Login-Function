# standard
import json
import requests
import datetime

# django
from django.conf import settings
from django.core.mail import get_connection, send_mail, EmailMessage
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
from rest_framework.views import APIView

# loginapp
from loginapp.models import Account, GuestAccount
from loginapp.forms import UserRegisterForm
from loginapp.utils.dowellconnection import dowellconnection
from loginapp.utils.dowell_func import generateOTP, get_next_pro_id
from loginapp.utils.dowell_hash import dowell_hash
from loginapp.utils.event_function import create_event
from loginapp.utils.country_code import country_codes


def is_ajax(request):
    return request.META.get('HTTP_X_REQUESTED_WITH') == 'XMLHttpRequest'


def get_gen_html(user, otp_user):
    return f'Dear {user}, <br> Please Enter below <strong>OTP</strong> to create your dowell account <br><h2>Your OTP is <strong>{otp_user}</strong></h2><br>Note: This OTP is valid for the next 2 hours only.'


@method_decorator(xframe_options_exempt, name='dispatch')
@csrf_exempt
def RegisterPage(request):
    '''
    User Registration

    Description
    -----------
    Generate OTP for GuestUser from ajax request.
    Create User from GuestUser with post request.
    '''
    otp_user = generateOTP()
    context = {}
    orgs = None
    type1 = None

    url = request.GET.get("redirect_url", None)

    # Generate OTP from AJAX request
    if is_ajax(request=request):
        user = request.POST.get('username', "User")
        email_ajax = request.POST.get('email', None)
        time = datetime.datetime.now()

        # Check if email exists
        try:
            email_exist = GuestAccount.objects.get(email=email_ajax)
        except GuestAccount.DoesNotExist:
            email_exist = None

        if email_exist is not None:
            # Do this if the email exists
            GuestAccount.objects.filter(email=email_ajax).update(
                otp=otp_user, expiry=time, username=user)

            htmlgen = get_gen_html(user, otp_user)
            # Email the otp to the user
            send_mail(
                'Your OTP for creating your Dowell account',
                otp_user,
                settings.EMAIL_HOST_USER,
                [email_ajax],
                fail_silently=False,
                html_message=htmlgen
            )
            return Response({}, status=status.HTTP_200_OK)
        else:
            # Do this if the email does not exists
            inserted_data = GuestAccount(username=user,
                                         email=email_ajax, otp=otp_user)
            inserted_data.save()
            htmlgen = get_gen_html(user, otp_user)
            send_mail('Your OTP for creating your Dowell account',
                      otp_user, settings.EMAIL_HOST_USER, [email_ajax], fail_silently=False, html_message=htmlgen)

            return Response({}, status=status.HTTP_200_OK)

    # Create new user from post request
    if request.method == 'POST':
        # Form data
        mainparams = request.POST.get('mainparams', None)
        type1 = request.POST.get('type', None)
        otp = request.POST.get('otp')
        org = request.POST.get('org', None)
        policy_status = request.POST.get('policy_status')
        user = request.POST['username']
        password1 = request.POST['password1']
        password2 = request.POST['password2']
        first = request.POST['first_name']
        last = request.POST['last_name']
        email = request.POST['email']
        phonecode = request.POST["phonecode"]
        phone = request.POST['phone']
        user_type = request.POST.get('user_type')
        role1 = "guest"
        img = request.FILES.get("profile_image", None)
        name = ""

        form = UserRegisterForm(request.POST or None, request.FILES or None)

        # Validate form data
        if policy_status != "Accepted":
            context["error"] = "Policy not accepted.."
            return render(request, "login/register_v2.html", context)

        if password1 != password2:
            context["error"] = "Passwords Not Matching.."
            return render(request, "login/register_v2.html", context)

        try:
            valid = GuestAccount.objects.get(otp=otp, email=email)
        except GuestAccount.DoesNotExist:
            valid = None
        if valid is not None:
            try:
                filtered_accts = Account.objects.filter(email=email)

                for obj in filtered_accts:
                    if email == obj.email and role1 == obj.role:
                        filtered_accts = Account.objects.filter(email=email).update(password=make_password(
                            password1), first_name=first, last_name=last, email=email, phonecode=phonecode, phone=phone, profile_image=img)
            except Account.DoesNotExist:
                name = None
        else:
            context["error"] = "Wrong OTP!!"
            return render(request, "register_v2.html", context)

        if name is not None:
            new_user = Account.objects.create(email=email, username=user, password=make_password(
                password1), first_name=first, last_name=last, phonecode=phonecode, phone=phone, profile_image=img)
            profile_image = new_user.profile_image
            json_data = open('dowell_login/static/newnaga2.json')
            data1 = json.load(json_data)
            json_data.close()
            data1["document_name"] = user
            data1["Username"] = user
            update_data1 = {
                "first_name": first,
                "last_name": last,
                "profile_img": f'https://100014.pythonanywhere.com/media/{profile_image}', "email": email,
                "phonecode": phonecode,
                "phone": phone
            }
            data1["profile_info"].update(update_data1)
            data1["organisations"][0]["org_name"] = user
            update_data2 = {"first_name": first,
                            "last_name": last, "email": email}
            data1["members"]["team_members"]["accept_members"][0].update(
                update_data2)
            client_admin = dowellconnection(
                "login", "bangalore", "login", "client_admin", "client_admin", "1159", "ABCDE", "insert", data1, "nil")
            client_admin_res = json.loads(client_admin)

            userfield = {}
            userresp = dowellconnection("login", "bangalore", "login", "registration",
                                        "registration", "10004545", "ABCDE", "fetch", userfield, "nil")
            idd = json.loads(userresp)
            res_list = idd["data"]
            profile_id = get_next_pro_id(res_list)

            event_id = None
            try:
                res = create_event()
                event_id = res['event_id']
            except:
                pass

            field = {
                "Profile_Image": f"https://100014.pythonanywhere.com/media/{profile_image}",
                "Username": user,
                "Password": dowell_hash(password1),
                "Firstname": first,
                "Lastname": last,
                "Email": email,
                "phonecode": phonecode,
                "Phone": phone,
                "profile_id": profile_id,
                'org_id': [],
                "company_id": "",
                "project_id": [],
                "subproject_id": [],
                "dept_id": [],
                "Memberof": {},
                "client_admin_id": client_admin_res["inserted_id"], "Policy_status": policy_status, "User_type": user_type, "eventId": event_id,
                "payment_status": "unpaid"
            }

            id = dowellconnection("login", "bangalore", "login", "registration",
                                  "registration", "10004545", "ABCDE", "insert", field, "nil")

            htmlgen_final = f'Hi {first} {last}, <br> Welcome to UX Living Lab. Your new account details are,<br><h3><ul><li>Firstname: {first}</li><li>Lastname: {last}</li><li>Username: {user}</li><li>Phone Number: {phonecode} {phone}</li><li>Email: {email}</li></ul></h3><br>Login to UX Living Lab to use your workspace. Watch this video to learn more.<br>https://youtube.com/playlist?list=PLa-BPmUzAKKfVgomvrIsWd9ZGQFTiT0Xb<br><strong>Thank You</strong><br>UX Living Lab'

            connection = get_connection()
            connection.open()
            email = EmailMessage(
                'A Dowell account was created',
                htmlgen_final,
                settings.EMAIL_HOST_USER,
                to=[email],
                bcc=['customersupport@dowellresearch.sg',
                     'dowell@dowellresearch.uk']
            )
            email.content_subtype = "html"
            email.send()
            connection.close()

            if org != "None":
                return redirect(f'https://100014.pythonanywhere.com/?{mainparams}')
            if url is not None:
                return redirect(f'/?redirect_url={url}')
            else:
                return redirect("/")
        else:

            return HttpResponse("check")
    else:
        form = UserRegisterForm()
    return render(request, 'register_v2.html', {'form': form, 'title': 'reqister here', 'country_resp': country_codes, 'org': orgs, 'type': type1})


@method_decorator(xframe_options_exempt, name='dispatch')
@csrf_exempt
def LoginPage(request):
    ...
