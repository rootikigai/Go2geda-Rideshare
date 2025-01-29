import React, { useState } from "react";
import RideList from "./RideList";
import Navbar from "./Navbar";

function App() {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    date: "",
  });
  const [showRides, setShowRides] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.from === formData.to) {
      alert("Starting location and destination cannot be the same.");
      return;
    }
    if (new Date(formData.date) < new Date()) {
      alert("Date cannot be in the past.");
      return;
    }
    setShowRides(true);
    setFormData({
      from: "",
      to: "",
      date: "",
      passengers: "1",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      {!showRides ? (
        <>
          {/* Header */}
          <header className="bg-white shadow-md">
          </header>

          {/* Hero Section */}
          <section className="bg-green-500 text-white text-center py-10">
            <div className="container mx-auto">
              <h1 className="text-4xl font-bold mb-4">
                Your Daily Commute Made Easy
              </h1>
              <p className="text-lg mb-6">
                Connect with fellow professionals and save on your rides in
                Lagos.
              </p>
              <form
                className="bg-white text-gray-800 rounded-lg shadow-md p-6 max-w-2xl mx-auto"
                onSubmit={handleSubmit}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="from" className="block font-medium mb-2">
                      From:
                    </label>
                    <input
                      type="text"
                      id="from"
                      required
                      value={formData.from}
                      onChange={handleChange}
                      placeholder="Enter starting location"
                      className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="to" className="block font-medium mb-2">
                      To:
                    </label>
                    <input
                      type="text"
                      id="to"
                      required
                      value={formData.to}
                      onChange={handleChange}
                      placeholder="Enter destination"
                      className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="date" className="block font-medium mb-2">
                      Date:
                    </label>
                    <input
                      type="date"
                      id="date"
                      required
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="passengers"
                      className="block font-medium mb-2"
                    >
                      Passengers:
                    </label>
                    <select
                      id="passengers"
                      value={formData.passengers || ""}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-green-500"
                    >
                      <option value="1">1 Passenger</option>
                      <option value="2">2 Passengers</option>
                      <option value="3">3 Passengers</option>
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 w-full"
                >
                  Search Rides
                </button>
              </form>
            </div>
          </section>
          {/* Feature Highlights Section */}
          <section className="bg-gray-100 py-12">
            <div className="container mx-auto text-center">
              <h2 className="text-2xl font-bold mb-8 text-gray-800">
                Why Choose Rizzo Rideshare?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Feature 1 */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <img
                    src={`${process.env.PUBLIC_URL}/icons/rr_car1.png`}
                    alt="Affordable Rides Icon"
                    className="mx-auto mb-4 w-full max-w-[80px] sm:max-w-[100px] md:max-w-[120px] h-auto"
                  />
                  <h3 className="text-xl font-semibold mb-2 text-green-600">
                    Affordable Daily Rides
                  </h3>
                  <p className="text-gray-600">
                    Save money on your daily commute by sharing rides with
                    professionals.
                  </p>
                </div>
                {/* Feature 2 */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <img
                    src={`${process.env.PUBLIC_URL}/icons/rr_driver.png`}
                    alt="Verified Users Icon"
                    className="mx-auto mb-4 w-full max-w-[80px] sm:max-w-[100px] md:max-w-[120px] h-auto"
                  />
                  <h3 className="text-xl font-semibold mb-2 text-green-600">
                    Verified Drivers and Passengers
                  </h3>
                  <p className="text-gray-600">
                    All drivers and passengers are verified for safety and peace
                    of mind.
                  </p>
                </div>
                {/* Feature 3 */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <img
                    src={`${process.env.PUBLIC_URL}/icons/rr_booking.svg`}
                    alt="Convenient Booking Icon"
                    className="mx-auto mb-4 w-full max-w-[80px] sm:max-w-[100px] md:max-w-[120px] h-auto"
                  />
                  <h3 className="text-xl font-semibold mb-2 text-green-600">
                    Convenient Booking
                  </h3>
                  <p className="text-gray-600">
                    Easily book your ride through our intuitive platform.
                  </p>
                </div>
              </div>
            </div>
          </section>
          {/* Safety Section */}
          <section className="bg-green-50 py-12">
            <div className="container mx-auto text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Help us keep you safe and secure
              </h2>
              <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                At Rizzo Rideshare, your safety is our top priority. We’re
                committed to ensuring that every ride is as safe and reliable as
                possible. Learn how we verify drivers, monitor trips, and
                provide support for all riders and drivers.
              </p>
              <button className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700">
                Learn More
              </button>
            </div>{" "}
          </section>
          {/* Offer a Ride Section */}
          <section className="bg-white py-12">
            <div className="container mx-auto text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Where do you want to drive to?
              </h2>
              <p className="text-gray-700 mb-6 max-w-xl mx-auto">
                Let’s help you make some money with your ride on your regular
                daily commute to work. Share your ride with fellow 9-to-5
                workers and make the most of your journey.
              </p>
              <button className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700">
                Offer a Ride
              </button>
            </div>
          </section>
          {/* Popular Routes Section */}
          <section className="bg-gray-100 py-12">
            <div className="container mx-auto">
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
                Popular Routes in Lagos
              </h2>
              <div className="grid gap-6 sm:grid-cols md:grid-cols-3">
                {/* Route 1 */}
                <div className="bg-white shadow-md rounded-lg p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    Ikeja → Victoria Island
                  </h3>
                  <p className="text-gray-700 mb-4">From ₦3,000</p>
                  <button className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">
                    View Rides
                  </button>
                </div>

                {/* Route 2 */}
                <div className="bg-white shadow-md rounded-lg p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    Lekki → Ikoyi
                  </h3>
                  <p className="text-gray-700 mb-4">From ₦2,000</p>
                  <button className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">
                    View Rides
                  </button>
                </div>

                {/* Route 3 */}
                <div className="bg-white shadow-md rounded-lg p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    Surulere → Marina
                  </h3>
                  <p className="text-gray-700 mb-4">From ₦2,500</p>
                  <button className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">
                    View Rides
                  </button>
                </div>
              </div>
            </div>
          </section>
          {/* Footer Section */}
          <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Column 1: How to travel */}
              <div>
                <h3 className="text-lg font-bold mb-4">
                  How to travel with Rizzo
                </h3>
                <ul>
                  <li>
                    <a
                      href="/all-carpool-routes"
                      className="text-gray-400 hover:text-white block mb-2"
                    >
                      All carpool routes
                    </a>
                  </li>
                  <li>
                    <a
                      href="/all-carpool-destinations"
                      className="text-gray-400 hover:text-white block mb-2"
                    >
                      All carpool destinations
                    </a>
                  </li>
                </ul>
              </div>

              {/* Column 2: Top carpool routes */}
              <div>
                <h3 className="text-lg font-bold mb-4">Top carpool routes</h3>
                <ul>
                  <li>
                    <a
                      href="/top-carpool-routes"
                      className="text-gray-400 hover:text-white block mb-2"
                    >
                      Ikeja → Lekki
                    </a>
                  </li>
                  <li>
                    <a
                      href="/ikeja-lekki"
                      className="text-gray-400 hover:text-white block mb-2"
                    >
                      Yaba → Victoria Island
                    </a>
                  </li>
                  <li>
                    <a
                      href="/yaba-victoria-island"
                      className="text-gray-400 hover:text-white block mb-2"
                    >
                      Ajah → Marina
                    </a>
                  </li>
                </ul>
              </div>

              {/* Column 3: About */}
              <div>
                <h3 className="text-lg font-bold mb-4">About</h3>
                <ul>
                  <li>
                    <a
                      href="/about"
                      className="text-gray-400 hover:text-white block mb-2"
                    >
                      How it works
                    </a>
                  </li>
                  <li>
                    <a
                      href="/how-it-works"
                      className="text-gray-400 hover:text-white block mb-2"
                    >
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a
                      href="/help-center"
                      className="text-gray-400 hover:text-white block mb-2"
                    >
                      Careers
                    </a>
                  </li>
                </ul>
              </div>

              {/* Column 4: Branding */}
              <div>
                <h3 className="text-lg font-bold mb-4">Language</h3>
                <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                  English (NG)
                </button>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="mt-8 text-center border-t border-gray-700 pt-4">
              <p className="text-gray-400 text-sm">
                &copy; {new Date().getFullYear()} Rizzo Rideshare. All rights
                reserved. @amansopinion
              </p>
            </div>
          </footer>
        </>
      ) : (
        <RideList from={formData.from} to={formData.to} date={formData.date} />
      )}
    </div>
  );
}

export default App;
