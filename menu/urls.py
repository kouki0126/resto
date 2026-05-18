from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CategoryViewSet, 
    DishViewSet, 
    OrderViewSet, 
    ContactViewSet, 
    register_user, 
    login_user
)

router = DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'dishes', DishViewSet)
# حيدنا السطر ديال testimonials من هنا
router.register(r'orders', OrderViewSet)
router.register(r'contactmessages', ContactViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register/', register_user, name='register'),
    path('login/', login_user, name='login'),
]