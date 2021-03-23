from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class WeightLog(models.Model):
    weight = models.FloatField()
    date = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User,related_name='wlogs',on_delete=models.CASCADE)



class TargetWeight(models.Model):
    weight  = models.FloatField()
    user=models.ForeignKey(User,related_name='tw',on_delete=models.CASCADE)


class WhiteBoard(models.Model):
    text=models.TextField()
    user=models.ForeignKey(User,related_name='wb',on_delete=models.CASCADE)
