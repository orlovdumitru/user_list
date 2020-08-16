from django.contrib import admin
from django.urls import path
from main import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('users/', views.users, name='users'),
    path('users/<int:id>/', views.users_id, name='users_id'),
    path('users/<int:id>/remove/', views.delete_user, name='delete_user'),
]
