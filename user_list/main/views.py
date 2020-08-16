from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import User


@csrf_exempt
def users(request):
    if request.method == "GET":
        query = request.GET.get('q')
        if query:
            users = User.objects.filter(userName__icontains=query)
            serial_users = [user.serialize() for user in users]
            return JsonResponse(serial_users, safe=False)

        users = User.objects.all()
        serial_users = [user.serialize() for user in users]
        return JsonResponse(serial_users, safe=False)

    elif request.method == "POST":
        clean_data = json.loads(request.body)
        user_name = clean_data.get('userName')
        first_name = clean_data.get('firstName')
        last_name = clean_data.get('lastName')
        user_email = clean_data.get('email')

        if user_name and first_name and last_name and user_email:
            u = User.objects.filter(userName=user_name)
            if u.exists():
                return JsonResponse({'message':'Username is already in used, chose another username'}, status=400)
            try:
                user = User.objects.create(userName=user_name, firstName=first_name, lastName=last_name, email=user_email)
                return JsonResponse({'message':'User created successfully'}, status=200)
            except:
                return JsonResponse({'message':'something went wrong, user not created'}, status=400)
        else:
            return JsonResponse({'message':'Check your input, user not created'}, status=500)


@csrf_exempt
def users_id(request, id):
    if request.method == "GET":
        user = User.objects.filter(pk=id)
        if user.exists():
            return JsonResponse(user.first().serialize(), safe=False)
        else:
            return JsonResponse({'status': 'false', 'message': 'User not found'}, status=404)
    elif request.method == "PUT":
        user = User.objects.filter(pk=id)
        if user.exists():
            user = user.first()

            clean_data = json.loads(request.body)
            user.userName = clean_data.get('userName')
            user.firstName = clean_data.get('firstName')
            user.lastName = clean_data.get('lastName')
            user.email = clean_data.get('email')
            user.status = clean_data.get('status')
            user.save()
            return JsonResponse({'message': 'User successfully updated'}, status=200)
        else:
            return JsonResponse({'message': 'User not updated'}, status=404)


@csrf_exempt
def delete_user(request, id):
    try:
        user = User.objects.get(pk=id)
        user.delete()
        return JsonResponse({'message': 'User removed'})
    except:
        return JsonResponse({'message': 'Unable to remove requested user'})