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
        userName = request.POST.get('userName')
        firstName = request.POST.get('firstName')
        lastName = request.POST.get('lastName')
        email = request.POST.get('email')

        create_data = json.dumps(request.POST)
        print(create_data)
        print(userName)
        print(firstName)
        print(lastName)
        print(email)

        if userName and firstName and lastName and email:
            try:
                user = User.objects.create(userName=userName, firstName=firstName, lastName=lastName, email=email)
                return JsonResponse({'message':'user created'}, status=200)
            except:
                return JsonResponse({'message':'something went wrong, user not created'}, status=400)
        else:
            return JsonResponse({'message':'Check your input, user not created'}, status=500)


def users_id(request, id):
    user = User.objects.filter(pk=id)
    if user.exists():
        return JsonResponse(user.first().serialize(), safe=False)
    else:
        return JsonResponse({'status': 'false', 'message': 'User not found'}, status=404)


@csrf_exempt
def delete_user(request, id):
    try:
        User.objects.filter(pk=id).delete()
        return JsonResponse({'message': 'User removed'})
    except:
        return JsonResponse({'message': 'Unable to remove requested user'})