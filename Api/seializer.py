from rest_framework import serializers
from Api.models import Todo


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model=Todo
        fields='__all__'