#!/usr/bin/env bash
set -o errexit

# Install Python dependencies
pip install -r requirements.txt

# Download NLTK data
python -c "import nltk; nltk.download('vader_lexicon')"

# Install Node and build React frontend
cd frontend
npm install
npm run build
cd ..

# Collect Django static files
python manage.py collectstatic --no-input

# Run migrations
python manage.py migrate
