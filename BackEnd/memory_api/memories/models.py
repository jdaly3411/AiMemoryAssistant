from django.db import models

# Creating the model for what is stored in the database (each entry)
class Memory(models.Model):
    text = models.TextField()
    audio = models.FileField(upload_to='audio/', null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    category = models.CharField(max_length=100, null=True, blank=True)
    
    def __str__(self):
        return self.text[:50]
