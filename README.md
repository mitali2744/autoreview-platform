# 🚗 AutoReview — Car Dealership Review Platform

A full-stack web application where users can browse car dealerships, read AI-analyzed reviews, and post their own reviews.

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![Django](https://img.shields.io/badge/Django-4.x-green?logo=django)
![Node.js](https://img.shields.io/badge/Node.js-18-green?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-6-green?logo=mongodb)
![Flask](https://img.shields.io/badge/Flask-3.x-black?logo=flask)

---

## ✨ Features

- 🏢 Browse 50+ car dealerships across the US
- 🔍 Search dealerships by name and filter by state
- 😊 AI-powered sentiment analysis on every review (Positive / Neutral / Negative)
- ✍️ Post reviews with car make, model, year and purchase date
- 🔐 User registration and login
- 🌙 Dark mode toggle
- 📱 Fully responsive design

---

## 🏗️ Architecture

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────────┐
│   React Frontend │────▶│  Django Backend   │────▶│ Node.js + MongoDB   │
│   (Port 3000)    │     │  (Port 8000)      │     │ Dealerships/Reviews │
└─────────────────┘     └──────────────────┘     │ (Port 3030)         │
                                │                  └─────────────────────┘
                                │
                                ▼
                        ┌──────────────────┐
                        │  Flask Sentiment  │
                        │  Microservice     │
                        │  (Port 5050)      │
                        └──────────────────┘
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, React Router v6, react-icons, react-toastify |
| Backend | Django 4, SQLite |
| Database Service | Node.js, Express, MongoDB, Mongoose |
| Sentiment Analysis | Flask, NLTK VADER |
| Containerization | Docker, Docker Compose |

---

## 🚀 Getting Started

### Prerequisites
- Python 3.9+
- Node.js 18+
- Docker & Docker Compose (for MongoDB + Node.js service)

---

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/xrwvm-fullstack_developer_capstone.git
cd xrwvm-fullstack_developer_capstone
```

---

### 2. Configure environment variables

Create `server/djangoapp/.env`:

```env
backend_url=http://localhost:3030
sentiment_analyzer_url=http://localhost:5050/
```

---

### 3. Start MongoDB + Node.js backend (Docker)

```bash
cd server/database
docker build -t nodeapp .
docker-compose up -d
```

This starts:
- MongoDB on port `27017`
- Node.js API on port `3030`

---

### 4. Start the Flask sentiment microservice

```bash
cd server/djangoapp/microservices
pip install -r requirements.txt
python app.py
```

Runs on `http://localhost:5050`

---

### 5. Start Django backend

```bash
cd server
pip install -r requirements.txt
python -c "import nltk; nltk.download('vader_lexicon')"
python manage.py makemigrations djangoapp
python manage.py migrate
python manage.py runserver
```

Runs on `http://localhost:8000`

---

### 6. Build & serve the React frontend

The React build is already compiled. Django serves it automatically at `http://localhost:8000`.

To rebuild after changes:

```bash
cd server/frontend
npm install
npm run build
```

---

## 📁 Project Structure

```
├── server/
│   ├── djangoapp/              # Django app (views, models, APIs)
│   │   ├── microservices/      # Flask sentiment analyzer
│   │   ├── models.py           # CarMake, CarModel
│   │   ├── views.py            # All API views
│   │   ├── restapis.py         # Calls to Node.js & Flask services
│   │   └── urls.py             # URL routing
│   ├── djangoproj/             # Django project settings
│   ├── database/               # Node.js + MongoDB service
│   │   ├── app.js              # Express API
│   │   ├── dealership.js       # Mongoose schema
│   │   ├── review.js           # Mongoose schema
│   │   └── docker-compose.yml  # Docker config
│   └── frontend/               # React app
│       └── src/
│           ├── components/
│           │   ├── Home/       # Landing page
│           │   ├── Header/     # Navbar with dark mode
│           │   ├── Dealers/    # Dealers list, detail, post review
│           │   ├── Login/      # Login page
│           │   └── Register/   # Register page
│           └── context/
│               └── ThemeContext.js  # Dark mode context
```

---

## 🔌 API Endpoints

### Django (Port 8000)
| Method | Endpoint | Description |
|---|---|---|
| POST | `/djangoapp/login` | User login |
| GET | `/djangoapp/logout` | User logout |
| POST | `/djangoapp/register` | User registration |
| GET | `/djangoapp/get_cars` | Get all car makes & models |
| GET | `/djangoapp/get_dealers` | Get all dealerships |
| GET | `/djangoapp/get_dealers/:state` | Filter by state |
| GET | `/djangoapp/dealer/:id` | Get single dealer |
| GET | `/djangoapp/reviews/dealer/:id` | Get reviews with sentiment |
| POST | `/djangoapp/add_review` | Post a new review |

### Node.js (Port 3030)
| Method | Endpoint | Description |
|---|---|---|
| GET | `/fetchDealers` | All dealerships |
| GET | `/fetchDealers/:state` | By state |
| GET | `/fetchDealer/:id` | Single dealer |
| GET | `/fetchReviews/dealer/:id` | Reviews by dealer |
| POST | `/insert_review` | Insert review |

---

## 📸 Screenshots

> Browse Dealers → Click a dealer → Read reviews with sentiment → Post your own review

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 👩‍💻 Author

Built as a Full Stack Developer Capstone Project.
