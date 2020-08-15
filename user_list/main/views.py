from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import User

def users(request):
    query = request.GET.get('q')
    if query:
        users = User.objects.filter(userName__icontains=query)
        serial_users = [user.serialize() for user in users]
        return JsonResponse(serial_users, safe=False)

    users = User.objects.all()
    serial_users = [user.serialize() for user in users]
    return JsonResponse(serial_users, safe=False)


def users_id(request, id):
    return HttpResponse(f"Get User {id}")


def delete_user(request, id):
    return HttpResponse(f"remove User {id}")


def new_user(request):
    pass
