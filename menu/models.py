from django.db import models
from django.contrib.auth.models import User

# 1. Categories dial l-makla
class Category(models.Model):
    name = models.CharField(max_length=100)
    
    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name

# 2. Les Plats (Dishes)
class Dish(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='dishes')
    name = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
    image = models.ImageField(upload_to='dishes/', blank=True, null=True)

    class Meta:
        verbose_name_plural = "Dishes"

    def __str__(self):
        return self.name

# 3. Les Commandes (Orders)
class Order(models.Model):
    full_name = models.CharField(max_length=150)
    items = models.TextField()  # Ex: "Pizza x1, Tacos x2"
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    order_type = models.CharField(max_length=50) # Sur place / Emporter
    status = models.CharField(max_length=20, default='En attente')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order {self.id} - {self.full_name}"

# 4. Contact & Testimonials (L-Model l-wa7id li ghadi i-koun fih l-avis)
class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=200, default="Avis Client", blank=True)
    message = models.TextField()
    sent_at = models.DateTimeField(auto_now_add=True)
    
    # Had l-jouj homa li k-i-khlliw l-message i-welli Avis f l-accueil
    is_testimonial = models.BooleanField(default=False) 
    rating = models.IntegerField(default=5)

    def __str__(self):
        return f"Message from {self.name} ({'Avis' if self.is_testimonial else 'Contact'})"