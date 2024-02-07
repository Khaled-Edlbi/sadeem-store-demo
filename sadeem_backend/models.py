from django.db import models
from django.contrib.auth.admin import User


class ImgurToken(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    accessToken = models.CharField(max_length=100)
    refreshToken = models.CharField(max_length=100)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Token No.{self.id}"


class Product(models.Model):
    enTitle = models.CharField(max_length=100)
    arTitle = models.CharField(max_length=100)
    enDescription = models.TextField()
    arDescription = models.TextField()
    price = models.IntegerField()
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)
    isDeleted = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.id} - {self.enTitle}"


class Image(models.Model):
    forProduct = models.ForeignKey(Product, related_name='images', on_delete=models.CASCADE)
    imageUrl = models.URLField()
    isPrimary = models.BooleanField(default=False)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.forProduct}: image-{self.id}"


class Order(models.Model):
    product = models.ForeignKey(Product, on_delete=models.DO_NOTHING)
    fullName = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    area = models.CharField(max_length=100)
    street = models.CharField(max_length=100)
    phoneNumber = models.CharField(max_length=11)
    status = models.CharField(max_length=10, default='Pending')
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.fullName}: order-{self.id}"
