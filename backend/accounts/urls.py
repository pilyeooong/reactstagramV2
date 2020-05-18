from django.urls import path
from rest_framework_jwt.views import obtain_jwt_token
from rest_framework_jwt.views import refresh_jwt_token
from rest_framework_jwt.views import verify_jwt_token
from . import views


urlpatterns = [
    # path('', include(router.urls)),
    path('signup/', views.SignupView.as_view(), name='signup'),
    path('token/', obtain_jwt_token),
    path('token/refresh', refresh_jwt_token),
    path('token/verify', verify_jwt_token),
    path('profile/<str:username>/', views.ProfileView.as_view(), name='profile'),
    path('profile/', views.ProfileEditView.as_view(), name='profile_edit'),
    path('suggestion/', views.SuggestionListAPIView.as_view(), name='suggestion'),
    path('follow/', views.user_follow, name='user_follow'),
    path('unfollow/', views.user_unfollow, name='user_follow'),
]
