from django.shortcuts import render

def home(request):
    return render(request, "index.html")

def owner_login(request):
    return render(request, "owner_login.html")

def owner_signup(request):
    return render(request, "owner_signup.html")

def user_login(request):
    return render(request, "user_login.html")

def user_signup(request):
    return render(request, "user_signup.html")
