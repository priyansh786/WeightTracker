from django.conf.urls import url
from frontend import views
from django.urls import path



urlpatterns = [
    url(r'^',views.index),
]