
# Doctor Appointment Booking System

This project is a appointment management system developed for doctors and patients. Doctors can register, and patients can book appointments with registered doctors. The project has a sleek and user-friendly interface.

---

## 📋 Features

- **Doctor Registration:** Doctors can register using a form and sign in with Google.
- **Appointment Booking:** Users can search for doctors based on specialty and city to book appointments.
- **Admin Panel:** Admin can approve or reject pending doctor registrations.
- **Map Integration:** Doctors' locations can be displayed on a map.
- **Google OAuth:** Easy authentication with Google.
- **Responsive Design:** Modern design compatible with desktop and mobile devices.

---



## 🚀 Usage

1. **Home Page:** Users can explore the platform and navigate through various sections via the navigation bar.
2. **Doctor Registration:** Doctors can fill out the registration form and also use the Google login option.
3. **Doctor Search:** Users can search for doctors based on specialty and city.
4. **Appointment Booking:** Users can view available time slots and book appointments with selected doctors.
5. **Admin Panel:** Admins can approve or reject pending doctor registrations.
6. **Docker Support:** A Dockerfile is provided for deploying the system in a containerized environment.

---
## 🚀 Prerequisites

React
Vite
Node.js
MongoDB
Docker
RabbitMQ

---

## 🚀 Structure

src/
│
├── assets/              # Static assets such as images and icons
├── components/          # Reusable React components (e.g., Navbar, Footer)
├── pages/               # Application pages (e.g., Home.jsx, Register.jsx, Appointment.jsx)
├── App.css              # Main CSS file for global styles
│
backend/
│
├── config/              # Configuration files (e.g., Db.js for database connection)
├── controllers/         # Logic for handling API requests (e.g., appointmentsController.js)
├── middleware/          # Middleware for authentication and other logic (e.g., auth.js)
├── models/              # Mongoose models defining the database structure (e.g., Doctor.js)
├── routes/              # API routes (e.g., appointmentRoutes.js, doctorRoutes.js)
├── Server.js            # Entry point for the backend server
├── .env                 # Environment variables file
├── DockerFile.txt       # Docker configuration file
├── package.json         # Project dependencies and scripts
├── node_modules/        # Installed packages and libraries
└── package-lock.json    # Dependency lock file to ensure consistent installations




