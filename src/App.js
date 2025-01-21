import React, { useState } from "react";
import RideList from "./RideList";

function App() {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
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
    setShowRides(true); // Show ride listings on form submission
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {!showRides ? (
        <>
          {/* Header */}
          <header className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
              <h1 className="text-2xl font-bold text-blue-600">
                Rizzo Rideshare
              </h1>
              <nav>
                <ul className="flex space-x-6">
                  <li>
                    <a
                      href="#home"
                      className="text-gray-700 hover:text-blue-600"
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      href="#about"
                      className="text-gray-700 hover:text-blue-600"
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      href="#contact"
                      className="text-gray-700 hover:text-blue-600"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </header>

          {/* Hero Section */}
          <section
            className="bg-blue-500 text-white text-center py-20 px-4"
            id="hero"
          >
            <div className="container mx-auto">
              <h1 className="text-4xl font-bold mb-4">
                Share Rides with Rizzo Rideshare!
              </h1>
              <p className="text-lg mb-6">
                A convenient way to commute with colleagues, save time and money.
              </p>
              <form
                className="bg-white text-gray-700 rounded-lg shadow-lg p-6 max-w-md mx-auto"
                onSubmit={handleSubmit}
              >
                <div className="mb-4">
                  <label htmlFor="from" className="block font-medium mb-2">
                    From:
                  </label>
                  <input
                    type="text"
                    id="from"
                    value={formData.from}
                    onChange={handleChange}
                    placeholder="Enter starting location"
                    className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="to" className="block font-medium mb-2">
                    To:
                  </label>
                  <input
                    type="text"
                    id="to"
                    value={formData.to}
                    onChange={handleChange}
                    placeholder="Enter destination"
                    className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-full"
                >
                  Search Rides
                </button>
              </form>
            </div>
          </section>
        </>
      ) : (
        <RideList from={formData.from} to={formData.to} />
      )}
    </div>
  );
}

export default App;
