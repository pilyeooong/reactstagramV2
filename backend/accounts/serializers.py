import re
from django.contrib.auth import get_user_model
from rest_framework import serializers
from posts.models import Post

User = get_user_model()


class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['pk', 'username', 'password']

    def create(self, validated_data):
        user = User.objects.create(username=validated_data['username'])
        user.set_password(validated_data['password'])
        user.save()
        return user


class UserSerializer(serializers.ModelSerializer):
    avatar_url = serializers.SerializerMethodField("avatar_url_field")

    def avatar_url_field(self, author):
        if re.match(r"^https?://", author.avatar_url):
            return author.avatar_url
        if 'request' in self.context:
            scheme = self.context['request'].scheme
            host = self.context['request'].get_host()
            return scheme + "://" + host + author.avatar_url

    class Meta:
        model = User
        fields = ['id', 'username', 'avatar', 'avatar_url', 'email', 'gender', 'phone_number',
                  'followers', 'followings', 'follower_count', 'following_count', 'post_count', 'bio']


class SuggestionUserSerializer(serializers.ModelSerializer):
    avatar_url = serializers.SerializerMethodField("avatar_url_field")

    def avatar_url_field(self, author):
        if re.match(r"^https?://", author.avatar_url):
            return author.avatar_url
        if 'request' in self.context:
            scheme = self.context['request'].scheme
            host = self.context['request'].get_host()
            return scheme + "://" + host + author.avatar_url

    class Meta:
        model = User
        fields = ['username', 'name', 'avatar_url']

