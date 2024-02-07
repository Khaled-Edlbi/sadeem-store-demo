from rest_framework import serializers
from .models import *


class ImgurTokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImgurToken
        fields = ['user', 'accessToken', 'refreshToken']


class ImageListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['id', 'imageUrl', 'isPrimary']


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['forProduct', 'imageUrl', 'isPrimary']


class ProductSerializer(serializers.ModelSerializer):
    images = ImageListSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = '__all__'


class ChangeIsDeletedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['isDeleted']


class DeleteProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product


class GetOrdersSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)

    class Meta:
        model = Order
        fields = '__all__'


class CreateOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = [
            'product',
            'fullName',
            'city',
            'area',
            'street',
            'phoneNumber'
        ]


class ChangeOrderStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['status']
