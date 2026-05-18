from rest_framework import serializers
from .models import Category, Dish, Order, ContactMessage

# 1. DISH SERIALIZER
class DishSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dish
        fields = '__all__'

# 2. CATEGORY SERIALIZER
class CategorySerializer(serializers.ModelSerializer):
    dishes = DishSerializer(many=True, read_only=True)

    class Meta:
        model = Category
        fields = ['id', 'name', 'dishes']

# 3. ORDER SERIALIZER
class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'

# 4. CONTACT MESSAGE SERIALIZER
class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        # Hna k-n-diro l-fields li 3ndna f ContactMessage models
        fields = ['id', 'name', 'email', 'subject', 'message', 'sent_at', 'is_testimonial', 'rating']