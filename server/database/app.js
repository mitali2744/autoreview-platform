const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3030;

app.use(cors());
app.use(require('body-parser').urlencoded({ extended: false }));
app.use(express.json());

const Reviews = require('./review');
const Dealerships = require('./dealership');

// Connect to MongoDB
const mongoUrl = process.env.MONGO_URL || "mongodb://mongo_db:27017/";
mongoose.connect(mongoUrl, { dbName: 'dealershipsDB' })
  .then(async () => {
    console.log("MongoDB connected");

    // Seed data only if collections are empty
    const reviewCount = await Reviews.countDocuments();
    const dealerCount = await Dealerships.countDocuments();

    if (reviewCount === 0) {
      const reviews_data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'reviews.json'), 'utf8'));
      await Reviews.insertMany(reviews_data['reviews']);
      console.log("Reviews seeded");
    }

    if (dealerCount === 0) {
      const dealerships_data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'dealerships.json'), 'utf8'));
      await Dealerships.insertMany(dealerships_data['dealerships']);
      console.log("Dealerships seeded");
    }
  })
  .catch(err => console.error("MongoDB connection error:", err));

// Home route
app.get('/', (req, res) => {
  res.send("Welcome to the AutoReview Mongoose API");
});

// Fetch all reviews
app.get('/fetchReviews', async (req, res) => {
  try {
    const documents = await Reviews.find();
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching reviews' });
  }
});

// Fetch reviews by dealer id
app.get('/fetchReviews/dealer/:id', async (req, res) => {
  try {
    const documents = await Reviews.find({ dealership: req.params.id });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching reviews' });
  }
});

// Fetch all dealerships
app.get('/fetchDealers', async (req, res) => {
  try {
    const documents = await Dealerships.find();
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching dealers' });
  }
});

// Fetch dealerships by state
app.get('/fetchDealers/:state', async (req, res) => {
  try {
    const documents = await Dealerships.find({ state: req.params.state });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching dealers by state' });
  }
});

// Fetch dealership by id
app.get('/fetchDealer/:id', async (req, res) => {
  try {
    const document = await Dealerships.findOne({ id: req.params.id });
    res.json(document);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching dealer' });
  }
});

// Insert review
app.post('/insert_review', async (req, res) => {
  const data = req.body;
  try {
    const documents = await Reviews.find().sort({ id: -1 });
    const new_id = documents.length > 0 ? documents[0]['id'] + 1 : 1;
    const review = new Reviews({
      id: new_id,
      name: data['name'],
      dealership: data['dealership'],
      review: data['review'],
      purchase: data['purchase'],
      purchase_date: data['purchase_date'],
      car_make: data['car_make'],
      car_model: data['car_model'],
      car_year: data['car_year'],
    });
    const savedReview = await review.save();
    res.json(savedReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error inserting review' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
