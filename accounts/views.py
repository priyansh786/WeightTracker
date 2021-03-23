from django.shortcuts import render
from django.contrib.auth import authenticate,login,logout
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User

@api_view(["POST"])
@permission_classes((AllowAny,))
def signup_view(request):
    username = request.data.get("username")
    password = request.data.get("password")
    email= request.data.get("email")

    if username is None or password is None:
        return Response({
            'error':'Incomplete Credentials'
        },status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = User.objects.get(username=username)
        #user Exist

        return Response({
            'error':'Username Already Exists'
        },status=status.HTTP_409_CONFLICT)

    except User.DoesNotExist:
        #register
        user=User.objects.create_user(username,email,password)
    user.save()
    login(request,user)
    return Response({'username':username},status=status.HTTP_200_OK)


@api_view(["POST"])
@permission_classes((AllowAny,))
def login_view(request):
    username = request.data.get("username")
    password =request.data.get("password")

    if username is None or password is None:
        return Response({
            'error':'Incomplete Credentials'
        },status=status.HTTP_400_BAD_REQUEST)

    user = authenticate(username=username,password=password)

    if not user:
        return Response({'error':'Invalid Credentials'},
        status=status.HTTP_404_NOT_FOUND)

    login(request,user)
    return Response({'username':username},status=status.HTTP_200_OK)

@api_view(["POST"])
def logout_view(request):
    logout(request)
    return Response({'msg':'Logged out'},status=status.HTTP_200_OK)
# Create your views here.
