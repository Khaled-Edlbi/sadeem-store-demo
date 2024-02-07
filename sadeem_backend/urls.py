from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token

from .views import *


urlpatterns = [
    path('Auth', obtain_auth_token, name='auth'),

    path('user/<int:user>/GetImgurToken', ImgurTokenAPIView.as_view(), name='get_imgur_token'),
    path('user/<int:user>/UpdateImgurToken', ImgurTokenAPIView.as_view(), name='update_imgur_token'),

    path('product/<int:pk>/GetImages', ImageListAPIView.as_view(), name='get_images'),
    path('CreateImage', ImageAPIView.as_view(), name='create_image'),
    path('image/<int:pk>/Update', ImageAPIView.as_view(), name='update_image'),
    path('image/<int:pk>/Delete', ImageAPIView.as_view(), name='delete_image'),

    path('GetProducts', ProductsListAPIView.as_view(), name='get_products'),
    path('CreateProduct', ProductAPIView.as_view(), name='create_product'),
    path('product/<int:pk>', ProductAPIView.as_view(), name='get_product'),
    path('product/<int:pk>/Update', ProductAPIView.as_view(), name='update_product'),
    path('product/<int:pk>/ChangeIsDeleted', ChangeIsDeletedAPIView.as_view(), name='change_isDeleted'),
    path('product/<int:pk>/Delete', ProductDeleteAPIView.as_view(), name='delete_product'),

    path('GetOrders', OrdersListAPIView.as_view(), name='get_orders'),
    path('CreateOrder', OrderCreateAPIView.as_view(), name='create_order'),
    path('order/<int:pk>/ChangeStatus', OrderStatusAPIView.as_view(), name='change_status'),
]
