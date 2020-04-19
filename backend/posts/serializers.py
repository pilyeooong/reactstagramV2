from rest_framework import serializers
from .models import Post
from django.contrib.auth import get_user_model


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = [
            'username',
            'name',
            'avatar_url'
        ]


class PostSerializer(serializers.ModelSerializer):
    is_like = serializers.SerializerMethodField('is_like_field')
    author = AuthorSerializer(read_only=True)

    def is_like_field(self, post):
        if 'request' in self.context:
            user = self.context['request'].user
            return post.like_user_set.filter(pk=user.id).exists()
        return False

    class Meta:
        model = Post
        fields = ['id', 'author', 'photo', 'caption', 'location', 'is_like']
