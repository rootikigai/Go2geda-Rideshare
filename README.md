# 🚗 Rizzo Rideshare

![React](https://img.shields.io/badge/Frontend-React-blue?logo=react)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green?logo=node.js)
![Express](https://img.shields.io/badge/API-Express-lightgrey?logo=express)
![License](https://img.shields.io/badge/license-MIT-yellow)
![Status](https://img.shields.io/badge/status-in%20development-orange)

A simple **Carpooling App** built for **9-to-5 workers** who share rides with others going the same route.  
This full-stack project uses **React** for the frontend and **Node.js (Express)** for the backend.

---

## 🌍 Overview

The **Rizzo Rideshare App** allows users to:
- Browse available rides shared by other workers.
- See ride details like pickup point, destination, and time.
- Connect with other 9-to-5 commuters going in the same direction.

The app is structured to fetch ride data from a backend API and display it neatly in the frontend using React components.

---

## 🧱 Tech Stack

| Layer | Technology | Purpose |
|-------|-------------|----------|
| **Frontend** | [React](https://reactjs.org/) + [TailwindCSS](https://tailwindcss.com/) | User Interface |
| **Backend** | [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/) | API / Server |
| **Communication** | REST API | Fetch rides and routes |
| **Styling** | TailwindCSS | Responsive design |
| **Tools** | ESLint, npm, Git | Development workflow |

---

## 📁 Project Structure

Rizzo-Rideshare/
├── backend/
│ ├── server.js # Express app entry point
│ ├── routes/ # Route definitions
│ ├── package.json
│ └── (Some of my other files are here)
│
├── src/
│ ├── api/
│ │ └── api.js
│ ├── components/
│ │ ├── RideList.js
│ │ └── Navbar.js
│ ├── App.jsx
│ ├── index.js
│ └── index.css
│
├── public/
│ └── index.html
│
├── package.json
├── tailwind.config.js
└── README.md


---

## ⚙️ Getting Started

### 1 Clone the repository
git clone https://github.com/rootikigai/Rizzo-Rideshare.git
cd Rizzo-Rideshare

### 2 Install dependencies
Frontend
npm install

Backend
cd backend
npm install

### 3 Run the servers
Start frontend (React)
npm start

The React app will run on http://localhost:3000

The backend API will run on http://localhost:5000

🔗 API Endpoints
/api/routes	GET	Fetch all available rides
/api/routes/:id	GET	Fetch ride by ID
/api/routes	POST	Add a new ride (future feature)

📄 License

This project is licensed under the MIT License

Special thanks to the Semicolon Africa community for inspiring this full-stack journey.

Made with 💻 + ☕ by Kelvin Ifeanyi (IKIGAI)
