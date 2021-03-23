from django.conf.urls import url
from api_basic import views
from django.urls import path

app_name = 'api_basic'

urlpatterns = [
    path('wlogs/',views.weightlog_view),
    path('tw/',views.targetweight_view),
    path('wb/',views.whiteBoard_view)
]