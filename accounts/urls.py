from django.conf.urls import url
from accounts import views
from django.urls import path

app_name = 'accounts'

urlpatterns = [
    path('login/',views.login_view),
    path('logout/',views.logout_view),
    path('signup/',views.signup_view),
]