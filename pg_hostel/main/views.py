from django.shortcuts import render
from django.contrib.auth.decorators import login_required

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

@login_required
def users_page(request):
    return render(request, 'users.html')

from django.shortcuts import render, redirect
from django.contrib.auth import authenticate,login
from .forms import OwnerSignupForm, UserSignupForm
from django.contrib import messages

def owner_signup(request):
    if request.method == 'POST':
        form = OwnerSignupForm(request.POST)
        if form.is_valid():
            user =  form.save()
            login(request, user)
            messages.success(request, "Account created successfully! Please log in.")
            return redirect("owner_login")  # later redirect to owner dashboard
        else:
            messages.error(request, "Please fix the errors below.")

    else:
        form = OwnerSignupForm()
    return render(request, 'owner_signup.html', {'form': form})


def user_signup(request):
    if request.method == 'POST':
        form = UserSignupForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            messages.success(request, "Account created successfully! Please log in.")
            return redirect("user_login")  # later redirect to owner dashboard
        else:
            messages.error(request, "Please fix the errors below.") # later redirect to user dashboard
    else:
        form = UserSignupForm()
    return render(request, 'user_signup.html', {'form': form})

from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib import messages
from .models import CustomUser

def owner_login(request):
    if request.method == "POST":
        email = request.POST.get("email")
        password = request.POST.get("password")

        try:
            user = CustomUser.objects.get(email=email, role="owner")  # owner only
        except CustomUser.DoesNotExist:
            messages.error(request, "No account found with this email")
            return render(request, "owner_login.html")

        # Authenticate using username (since Django uses username, not email internally)
        user = authenticate(request, username=user.username, password=password)

        if user is not None:
            login(request, user)
            return redirect("users_page")  # this should be your users.html
        else:
            messages.error(request, "Invalid password")
    
    return render(request, "owner_login.html")