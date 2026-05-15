import requests
import os
from dotenv import load_dotenv

load_dotenv()

backend_url = os.getenv('backend_url', default="http://localhost:3030")
sentiment_analyzer_url = os.getenv('sentiment_analyzer_url', default="http://localhost:5050/")


def get_request(endpoint, **kwargs):
    """Make a GET request to the backend Node.js service."""
    params = ""
    if kwargs:
        for key, value in kwargs.items():
            params += f"{key}={value}&"
    request_url = backend_url + endpoint + "?" + params.rstrip("&")
    print(f"GET from {request_url}")
    try:
        response = requests.get(request_url)
        return response.json()
    except Exception as err:
        print(f"Network exception occurred: {err}")
        return None


def analyze_review_sentiments(text):
    """Call the Flask sentiment microservice to analyze review text."""
    request_url = sentiment_analyzer_url + "analyze/" + text
    print(f"Sentiment analysis from {request_url}")
    try:
        response = requests.get(request_url)
        return response.json()
    except Exception as err:
        print(f"Unexpected error in sentiment analysis: {err}")
        return {"sentiment": "neutral"}


def post_review(data_dict):
    """POST a new review to the backend Node.js service."""
    request_url = backend_url + "/insert_review"
    print(f"POST to {request_url}")
    try:
        response = requests.post(request_url, json=data_dict)
        print(response.json())
        return response.json()
    except Exception as err:
        print(f"Unexpected error posting review: {err}")
        return None
