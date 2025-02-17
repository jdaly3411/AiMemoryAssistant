from django.shortcuts import render
from rest_framework import generics
from .models import Memory
from .serializers import MemorySerializer
import openai

class MemoryListCreateView(generics.ListCreateAPIView):
    queryset = Memory.objects.all()
    serializer_class = MemorySerializer


def generateEmbed(text):
    response = openai.Embedding.create(input=text, model = "text-embedding-ada-002")
    return response["data"][0]["embedding"]