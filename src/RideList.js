import React from "react";

const RideList = ({ from, to }) => {
  // Mock ride data
  const rides = [
    {
      id: 1,
      driver: "John Doe",
      price: "$15",
      departure: "8:00 AM",
      route: `${from} to ${to}`,
      car: "Toyota Corolla",
      seatsAvailable: 2,
    },
    {
      id: 2,
      driver: "Jane Smith",
      price: "$12",
      departure: "9:30 AM",
      route: `${from} to ${to}`,
      car: "Honda Civic",
      seatsAvailable: 1,
    },
    {
      id: 3,
      driver: "Alex Brown",
      price: "$10",
      departure: "11:00 AM",
      route: `${from} to ${to}`,
      car: "Ford Focus",
      seatsAvailable: 3,
    },
  ];

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Available Rides from {from} to {to}
      </h2>
      <ul className="space-y-4">
        {rides.map((ride) => (
          <li
            key={ride.id}
            className="bg-white shadow-md rounded-lg p-6 flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {ride.driver}
              </h3>
              <p className="text-gray-600">{ride.route}</p>
              <p className="text-gray-500">Departure: {ride.departure}</p>
              <p className="text-gray-500">Car: {ride.car}</p>
              <p className="text-gray-500">Seats Available: {ride.seatsAvailable}</p>
            </div>
            <div>
              <span className="text-xl font-bold text-blue-600">
                {ride.price}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RideList;
