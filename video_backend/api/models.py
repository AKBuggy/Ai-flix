from django.db import models

# Create your models here.
class Video(models.Model):
    video_file = models.FileField(upload_to='videos/')
    upvotes = models.PositiveIntegerField(default=0)
    downvotes = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.title
