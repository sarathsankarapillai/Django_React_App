from django.db import models

class Todo(models.Model):
    task=models.CharField(max_length=200)
    completed=models.BooleanField(default=False)
    due_date = models.DateField(blank=True, null=True)
