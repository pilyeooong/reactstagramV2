from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'posts', views.PostViewSet)
router.register(r'posts/(?P<post_pk>\d+)/comments', views.CommentViewSet)
# router.register(r'posts/(?P<username>\d+)', views.UserPostViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('<str:username>/posts/', views.UserPostListAPIView.as_view(), name='users-posts'),
]
