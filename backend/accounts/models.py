from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.core.validators import RegexValidator
from django.shortcuts import resolve_url


class User(AbstractUser):
    class GenderChoices(models.TextChoices):
        MALE = 'Male',
        FEMALE = 'Female',
        ELSE = 'Else'

    avatar = models.ImageField(upload_to='accounts/avatar/%Y/%m/%d',
                               help_text='48px * 48px의 이미지를 업로드 해주세요', blank=True)
    gender = models.CharField(max_length=10, choices=GenderChoices.choices, blank=True)
    phone_number = models.CharField(max_length=13, validators=[RegexValidator(r'^010-?[1-9]\d{3}-?\d{4}$')], blank=True)
    followings = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='followers', blank=True)
    bio = models.TextField(blank=True)

    @property
    def name(self):
        return f'{self.first_name} {self.last_name}'.strip()

    @property
    def avatar_url(self):
        if self.avatar:
            return self.avatar.url
        else:
            return resolve_url('pydenticon_image', self.username)

    @property
    def following_count(self):
        return self.followings.all().count()

    @property
    def follower_count(self):
        return self.followers.all().count()

    @property
    def post_count(self):
        return self.posts.all().count()
