from django.shortcuts import render
from .models import Todo
from rest_framework.response import Response
from .seializer import TodoSerializer
from rest_framework.views import APIView

class TodoApi(APIView):
    def get(self,request):
        todos=Todo.objects.all()
        serializer=TodoSerializer(todos,many=True)
        return Response(serializer.data)

    def post(self,request):
        data=request.data
        serializer=TodoSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
    
    def put(self, request):
        data=request.data
        obj = Todo.objects.get(id=data['id'])
        serializer = TodoSerializer(obj, data=data,partial=False)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
    
    def delete(self, request):
        
        data=request.data
        obj = Todo.objects.get(id=data['id'])
        obj.delete()
        return Response({'message':'deleted'})
    


class TodoDetailApi(APIView):
    def get(self, request, id):
        try:
            todo = Todo.objects.get(pk=id)  
            serializer = TodoSerializer(todo)
            return Response(serializer.data)
        except Todo.DoesNotExist:
            return Response({"error": "Record not found"})

    

# Create your views here.
