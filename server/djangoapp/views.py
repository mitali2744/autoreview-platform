from django.http import JsonResponse
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.models import User
import logging
import json
from django.views.decorators.csrf import csrf_exempt
from .populate import initiate
from .models import CarMake, CarModel
from .restapis import get_request, analyze_review_sentiments, post_review

logger = logging.getLogger(__name__)


# ─── Auth Views ───────────────────────────────────────────────────────────────

@csrf_exempt
def login_user(request):
    """Handle user login."""
    data = json.loads(request.body)
    username = data['userName']
    password = data['password']
    user = authenticate(username=username, password=password)
    response_data = {"userName": username}
    if user is not None:
        login(request, user)
        response_data = {"userName": username, "status": "Authenticated"}
    return JsonResponse(response_data)


@csrf_exempt
def logout_request(request):
    """Handle user logout."""
    logout(request)
    return JsonResponse({"userName": ""})


@csrf_exempt
def registration(request):
    """Handle new user registration."""
    data = json.loads(request.body)
    username = data['userName']
    password = data['password']
    first_name = data.get('firstName', '')
    last_name = data.get('lastName', '')
    email = data.get('email', '')

    username_exist = False
    try:
        User.objects.get(username=username)
        username_exist = True
    except User.DoesNotExist:
        pass

    if not username_exist:
        user = User.objects.create_user(
            username=username,
            first_name=first_name,
            last_name=last_name,
            password=password,
            email=email,
        )
        login(request, user)
        return JsonResponse({
            "userName": username,
            "status": "Authenticated"
        })
    else:
        return JsonResponse({
            "userName": username,
            "error": "Already Registered"
        })


# ─── Car Views ────────────────────────────────────────────────────────────────

@csrf_exempt
def get_cars(request):
    """Return all car makes and models. Seeds DB if empty."""
    if CarMake.objects.count() == 0:
        initiate()
    car_models = CarModel.objects.select_related('car_make')
    cars = [
        {"CarModel": cm.name, "CarMake": cm.car_make.name, "CarYear": cm.year, "CarType": cm.type}
        for cm in car_models
    ]
    return JsonResponse({"CarModels": cars})


# ─── Dealership Views ─────────────────────────────────────────────────────────

@csrf_exempt
def get_dealerships(request, state="All"):
    """Return all dealerships, optionally filtered by state."""
    if state == "All":
        endpoint = "/fetchDealers"
    else:
        endpoint = f"/fetchDealers/{state}"

    dealerships = get_request(endpoint)
    if dealerships is None:
        return JsonResponse({"status": 500, "message": "Error fetching dealerships"})
    return JsonResponse({"status": 200, "dealers": dealerships})


@csrf_exempt
def get_dealer_details(request, dealer_id):
    """Return details for a single dealership."""
    endpoint = f"/fetchDealer/{dealer_id}"
    dealership = get_request(endpoint)
    if dealership is None:
        return JsonResponse({"status": 500, "message": "Error fetching dealer"})
    return JsonResponse({"status": 200, "dealer": [dealership]})


@csrf_exempt
def get_dealer_reviews(request, dealer_id):
    """Return all reviews for a dealership, with sentiment analysis."""
    endpoint = f"/fetchReviews/dealer/{dealer_id}"
    reviews = get_request(endpoint)
    if reviews is None:
        return JsonResponse({"status": 500, "message": "Error fetching reviews"})

    for review_detail in reviews:
        review_text = review_detail.get('review', '')
        if review_text:
            sentiment_result = analyze_review_sentiments(review_text)
            review_detail['sentiment'] = sentiment_result.get('sentiment', 'neutral')
        else:
            review_detail['sentiment'] = 'neutral'

    return JsonResponse({"status": 200, "reviews": reviews})


@csrf_exempt
def add_review(request):
    """Submit a new review for a dealership."""
    if not request.user.is_anonymous:
        data = json.loads(request.body)
        try:
            result = post_review(data)
            return JsonResponse({"status": 200, "result": result})
        except Exception as err:
            logger.error(f"Error posting review: {err}")
            return JsonResponse({"status": 401, "message": "Error in posting review"})
    return JsonResponse({"status": 403, "message": "Unauthorized"})
