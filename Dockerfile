FROM node:18-slim AS frontend-build

WORKDIR /app/frontend
COPY server/frontend/package*.json ./
RUN npm install
COPY server/frontend/ ./
RUN npm run build

FROM python:3.11-slim

WORKDIR /app

COPY server/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

RUN python -c "import nltk; nltk.download('vader_lexicon', quiet=True)"

COPY server/ .

COPY --from=frontend-build /app/frontend/build ./frontend/build

RUN python manage.py collectstatic --no-input

EXPOSE 8000

CMD ["gunicorn", "djangoproj.wsgi:application", "--bind", "0.0.0.0:8000"]
