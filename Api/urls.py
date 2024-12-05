
from django.urls import path
from .views import TodoApi,TodoDetailApi

urlpatterns = [
    path('api/',TodoApi.as_view()),
    path('api/<int:id>/', TodoDetailApi.as_view()),
    
    
]
