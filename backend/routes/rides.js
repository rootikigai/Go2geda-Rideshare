const express = require("express");
const router = express.Router();

// Dummy ride data
const rideData = [
  {
    id: 1,
    driverName: "John Doe",
    from: "Ikeja",
    to: "Victoria Island",
    departureTime: "8:00 AM",
    price: "₦3000",
  },
  {
    id: 2,
    driverName: "Jane Smith",
    from: "Lekki",
    to: "Yaba",
    departureTime: "9:00 AM",
    price: "₦3500",
  },
  {
    id: 3,
    driverName: "Alex Johnson",
    from: "Surulere",
    to: "Ikeja",
    departureTime: "7:30 AM",
    price: "₦2500",
  },
];

// Define the /api/routes endpoint
router.get("/routes", (req, res) => {
  res.json(rideData); // Send the ride data as JSON
});

module.exports = router;
