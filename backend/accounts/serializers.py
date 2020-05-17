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
    is_self = serializers.SerializerMethodField('is_self_field')

    def avatar_url_field(self, author):
        if re.match(r"^https?://", author.avatar_url):
            return author.avatar_url
        if 'request' in self.context:
            scheme = self.context['request'].scheme
            host = self.context['request'].get_host()
            return scheme + "://" + host + author.avatar_url

    def is_self_field(self, author):
        if 'request' in self.context:
            if self.context['request'].user == author:
                return True
            else:
                return False

    class Meta:
        model = User
        fields = ['id', 'username', 'avatar', 'avatar_url', 'email', 'gender', 'phone_number',
                  'followers', 'followings', 'follower_count', 'following_count', 'post_count', 'bio', 'is_self']


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

