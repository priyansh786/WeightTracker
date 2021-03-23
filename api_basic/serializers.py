from .models import WeightLog,TargetWeight,WhiteBoard
#from accounts.serializers import UserSerializer
from rest_framework import serializers


class WeightLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = WeightLog
        fields = ['weight','date','user']



class TargetWeightSerializer(serializers.ModelSerializer):
    class Meta:
        model = TargetWeight
        fields = ['weight','user']


class WhiteBoardSerializer(serializers.ModelSerializer):
    class Meta:
        model = WhiteBoard
        fields = ['text','user']