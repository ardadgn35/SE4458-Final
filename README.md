cat <<EOF > README.md
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

## 🛠️ Installation

1. **Clone the project:**
   \`\`\`bash
   git clone https://github.com/yourusername/doctor-appointment-system.git
   cd doctor-appointment-system
   \`\`\`

2. **Install frontend dependencies (using React and Vite):**
   \`\`\`bash
   npm install
   \`\`\`

3. **Install backend dependencies:**  
   Navigate to the backend folder and run the following command:
   \`\`\`bash
   cd server
   npm install
   \`\`\`

4. **Set up environment variables:**  
   Create a `.env` file in both the client and server directories with the following details:

   **For client (`client/.env`):**
   \`\`\`bash
   VITE_BACKEND_URL=http://localhost:5000
   VITE_GOOGLE_CLIENT_ID=208971797877-o73qp8c019cfp0pudlt5rsvf33d486bg.apps.googleusercontent.com
   \`\`\`

   **For server (`server/.env`):**
   \`\`\`bash
   MONGO_URI=your-mongodb-uri
   PORT=5000
   \`\`\`

5. **Start the development servers:**  
   Open two terminals to start the client and server:
   \`\`\`bash
   # Start the client
   npm run dev

   # Start the server
   cd server
   npm run dev
   \`\`\`

---

## 🚀 Usage

1. **Home Page:** Users can explore the platform and navigate through various sections via the navigation bar.
2. **Doctor Registration:** Doctors can fill out the registration form and also use the Google login option.
3. **Doctor Search:** Users can search for doctors based on specialty and city.
4. **Appointment Booking:** Users can view available time slots and book appointments with selected doctors.
5. **Admin Panel:** Admins can approve or reject pending doctor registrations.

---



