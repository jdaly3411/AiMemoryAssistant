from django.shortcuts import render
from rest_framework import generics
from .models import Memory
from .serializers import MemorySerializer

class MemoryListCreateView(generics.ListCreateAPIView):
    queryset = Memory.objects.all()
    serializer_class = MemorySerializer
