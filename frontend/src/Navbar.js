import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-white text-green-600">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div
          className="text-xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          Rizzo!
        </div>

        {/* Hamburger Icon */}
        <button
          className="block md:hidden focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-6">
          <li>
            <button onClick={() => navigate("/about")} className="cursor-pointer">About</button>
          </li>
          <li>
            <button onClick={() => navigate("/contact")} className="cursor-pointer">Contact</button>
          </li>
          <li>
            <button onClick={() => navigate("/popular-routes")} className="cursor-pointer">Popular Routes</button>
          </li>
        </ul>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 bg-white text-black w-full shadow-lg md:hidden">
          <ul className="flex flex-col space-y-2 p-4">
            <li>
              <button onClick={() => navigate("/about")} className="cursor-pointer">About</button>
            </li>
            <li>
              <button onClick={() => navigate("/contact")} className="cursor-pointer">Contact</button>
            </li>
            <li>
              {/* Publish Rides Button */}
              <button
                className="w-full bg-green-500 text-white p-2 rounded-md mt-4"
                onClick={() => alert("Publish a ride")}
              >
                Publish Rides
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
