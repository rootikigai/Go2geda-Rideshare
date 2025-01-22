const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON requests

const routes = [
    { id: 1, from: "Ikeja", to: "Victoria Island", price: "₦1500" },
    { id: 2, from: "Yaba", to: "Lekki", price: "₦1200" },
    { id: 3, from: "Surulere", to: "Ikoyi", price: "₦1300" },
  ];
  
  // Endpoint to get all routes
  app.get("/api/routes", (req, res) => {
    res.json(routes);
  });
  

// Test Route
app.get("/", (req, res) => {
  res.send("Welcome to Rizzo Rideshare Backend!");
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});