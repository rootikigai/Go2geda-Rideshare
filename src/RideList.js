import React from "react";

const RideList = ({ from, to, date }) => (
  <div className="container mx-auto py-8">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">
      Available Rides from {from} to {to} on {date}
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {/* Placeholder Ride */}
      <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
        <h3 className="text-lg font-bold">John Doe</h3>
        <p className="text-gray-600">Departure: 8:00 AM</p>
        <p className="text-gray-600">Price: $10</p>
        <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 mt-4">
          Book Ride
        </button>
      </div>
      <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
        <h3 className="text-lg font-bold">Jane Smith</h3>
        <p className="text-gray-600">Departure: 9:00 AM</p>
        <p className="text-gray-600">Price: $12</p>
        <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 mt-4">
          Book Ride
        </button>
      </div>
      <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
        <h3 className="text-lg font-bold">Alex Johnson</h3>
        <p className="text-gray-600">Departure: 10:00 AM</p>
        <p className="text-gray-600">Price: $8</p>
        <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 mt-4">
          Book Ride
        </button>
      </div>
    </div>
  </div>
);

export default RideList;
