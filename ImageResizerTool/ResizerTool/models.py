from django.db import models

from django.core.files.storage import FileSystemStorage

from ImageResizerTool.settings import BASE_DIR

fs = FileSystemStorage(BASE_DIR/'uploads')

class Upload(models.Model):
    pic = models.ImageField(storage=fs)
    filename = models.CharField(max_length=200)

    def __str__(self):
        return self.filename
