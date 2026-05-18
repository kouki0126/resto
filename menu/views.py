from rest_framework import viewsets, status, permissions
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import Category, Dish, Order, ContactMessage
from .serializers import CategorySerializer, DishSerializer, OrderSerializer, ContactMessageSerializer


def _jwt_pair_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


# --- 1. CATEGORY VIEWSET ---
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]

# --- 2. DISH VIEWSET ---
class DishViewSet(viewsets.ModelViewSet):
    queryset = Dish.objects.all() 
    serializer_class = DishSerializer
    permission_classes = [permissions.AllowAny]

# --- 3. REGISTER VIEW ---
@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def register_user(request):
    data = request.data
    try:
        email = data.get('email') or data.get('username')
        password = data.get('password')

        if not email or not password:
            return Response({'error': 'Email et mot de passe obligatoires'}, status=status.HTTP_400_BAD_REQUEST)
        
        if User.objects.filter(username=email).exists():
            return Response({'error': 'Cet e-mail est déjà associé à un compte.'}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(
            username=email, 
            email=email, 
            password=password,
            first_name=data.get('first_name', ''),
        )

        tokens = _jwt_pair_for_user(user)

        return Response({
            'message': 'Success',
            'username': user.first_name or user.username,
            'email': user.email,
            **tokens,
        }, status=status.HTTP_201_CREATED)

    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

# --- 4. LOGIN VIEW ---
@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def login_user(request):
    email = request.data.get('email') or request.data.get('username')
    password = request.data.get('password')

    if not email or not password:
        return Response({'error': 'Veuillez remplir tous les champs.'}, status=status.HTTP_400_BAD_REQUEST)

    user = authenticate(username=email, password=password)
    
    if user is not None:
        tokens = _jwt_pair_for_user(user)
        return Response({
            'username': user.first_name or user.username,
            'email': user.email,
            **tokens,
        }, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Email ou mot de passe incorrect.'}, status=status.HTTP_400_BAD_REQUEST)

# --- 5. ORDER VIEWSET ---
class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all().order_by('-created_at')
    serializer_class = OrderSerializer
    permission_classes = [permissions.AllowAny]

# --- 6. CONTACT VIEWSET ---
class ContactViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all().order_by('-sent_at')
    serializer_class = ContactMessageSerializer
    permission_classes = [permissions.AllowAny]

    @action(detail=True, methods=['patch'])
    def approve(self, request, pk=None):
        try:
            message = self.get_object()
            message.is_testimonial = True 
            message.save()
            return Response({'status': 'Approved as Testimonial'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)