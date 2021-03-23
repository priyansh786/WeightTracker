from django.shortcuts import render
from .models import WeightLog,TargetWeight,WhiteBoard
from .serializers import WeightLogSerializer,TargetWeightSerializer,WhiteBoardSerializer
from accounts.serializers import UserSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view,permission_classes

# Create your views here.

@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def weightlog_view(request):
    if request.method=='GET':
        user = request.user
        wlogs = WeightLog.objects.filter(user=user)
        serializer = WeightLogSerializer(wlogs,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    
    elif request.method == 'POST':
        request.data['user'] = request.user.id
        serializer = WeightLogSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def targetweight_view(request):
    user = request.user
    if request.method=='GET':
        try:
            tw = TargetWeight.objects.get(user=user)
            # return the entry
            serializer = TargetWeightSerializer(tw)
            return Response(serializer.data,status=status.HTTP_200_OK)
        except Exception as e:
            # print(e)
            # error
            return Response({'error':'Target Weight Not found'},status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'POST':
        request.data['user'] = request.user.id
        try:
            tw = TargetWeight.objects.get(user=user)
            # update the entry
            serializer = TargetWeightSerializer(tw,data=request.data)
        except:
            # create the entry
            serializer = TargetWeightSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

    
@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def whiteBoard_view(request):
    user = request.user
    if request.method=='GET':
        try:
            wb = WhiteBoard.objects.get(user=user)
            # return the entry
            serializer = WhiteBoardSerializer(wb)
            return Response(serializer.data,status=status.HTTP_200_OK)
        except Exception as e:
            # print(e)
            # error
            return Response({'error':'NO DATA FOUND'},status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'POST':
        request.data['user'] = request.user.id
        try:
            wb = WhiteBoard.objects.get(user=user)
            # update the entry
            serializer = WhiteBoardSerializer(wb,data=request.data)
        except:
            # create the entry
            serializer = WhiteBoardSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
