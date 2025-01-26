import React, { useState, useEffect } from "react";

const RideList = ({ from, to, date }) => {
  const [rides, setRides] = useState([]);
  const [error, setError] = useState(""); // Track errors

  useEffect(() => {
    const fetchRides = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/routes");
        if (!response.ok) {
          throw new Error("Failed to fetch rides. Check your backend.");
        }
        const data = await response.json();

        // Filter rides based on the search inputs
        const filteredRides = data.filter(
          (ride) =>
            ride.from.toLowerCase().includes(from.toLowerCase()) &&
            ride.to.toLowerCase().includes(to.toLowerCase())
        );
        setRides(filteredRides);
        setError(""); // Clear any previous error
      } catch (err) {
        setError(err.message); // Show error message
        setRides([]); // Clear rides on error
      }
    };

    fetchRides("http://localhost:5000/api/routes");
  }, [from, to]);

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Available Rides from {from} to {to} on {date}
      </h2>
      {error ? (
        <p className="text-red-600">Error: {error}</p>
      ) : rides.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {rides.map((ride) => (
            <div
              key={ride.id}
              className="border rounded-lg p-4 shadow hover:shadow-lg transition"
            >
              <h3 className="text-lg font-bold">{ride.driverName}</h3>
              <p className="text-gray-600">Departure: {ride.departureTime}</p>
              <p className="text-gray-600">Price: {ride.price}</p>
              <button className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 mt-4">
                Book Ride
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No rides available for the selected route.</p>
      )}
    </div>
  );
};

export default RideList;
