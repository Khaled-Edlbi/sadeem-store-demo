from rest_framework import generics, mixins
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.db.models import Q

from .models import *
from .serializers import *


class ImgurTokenAPIView(
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    generics.GenericAPIView
):
    queryset = ImgurToken.objects.all()
    serializer_class = ImgurTokenSerializer
    lookup_field = 'user'

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)


class ImageListAPIView(generics.ListAPIView):
    serializer_class = ImageListSerializer

    def get_queryset(self):
        queryset = Image.objects.filter(forProduct=self.kwargs['pk'])
        return queryset


class ImageAPIView(
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    generics.GenericAPIView
):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


class ProductsListAPIView(generics.ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = Product.objects.all().order_by('-updated')
        search_query = self.request.query_params.get('q')

        if search_query:
            queryset = queryset.filter(
                Q(enTitle__icontains=search_query) |
                Q(arTitle__icontains=search_query) |
                Q(enDescription__icontains=search_query) |
                Q(enDescription__icontains=search_query)
            )

        return queryset


class ProductAPIView(
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    generics.GenericAPIView
):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)


class ChangeIsDeletedAPIView(generics.UpdateAPIView):
    queryset = Product.objects.all()
    serializer_class = ChangeIsDeletedSerializer


class ProductDeleteAPIView(generics.DestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = DeleteProductSerializer


class OrdersListAPIView(generics.ListAPIView):
    serializer_class = GetOrdersSerializer

    def get_filtered_orders(self, status):
        orders = Order.objects.filter(status=status).order_by('-updated')
        search_query = self.request.query_params.get('q')

        if search_query:
            orders = orders.filter(
                Q(fullName__icontains=search_query) |
                Q(phoneNumber__icontains=search_query)
            )

        return orders

    def get_queryset(self):
        pending_orders = self.get_filtered_orders('Pending')
        delivered_orders = self.get_filtered_orders('Delivered')
        rejected_orders = self.get_filtered_orders('Rejected')

        return [pending_orders, delivered_orders, rejected_orders]

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()

        pending_serializer = self.serializer_class(queryset[0], many=True)
        delivered_serializer = self.serializer_class(queryset[1], many=True)
        rejected_serializer = self.serializer_class(queryset[2], many=True)

        earnings = sum([delivered.product.price for delivered in queryset[1]])

        serialized_data = {
            'pending': pending_serializer.data,
            'delivered': delivered_serializer.data,
            'rejected': rejected_serializer.data,
            'pendingCount': queryset[0].count(),
            'deliveredCount': queryset[1].count(),
            'rejectedCount': queryset[2].count(),
            'earnings': earnings
        }

        return Response(serialized_data)


class OrderCreateAPIView(generics.CreateAPIView):
    queryset = Order.objects.all()
    serializer_class = CreateOrderSerializer
    permission_classes = [AllowAny]


class OrderStatusAPIView(generics.UpdateAPIView):
    queryset = Order.objects.all()
    serializer_class = ChangeOrderStatusSerializer
