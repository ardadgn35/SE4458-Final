import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const Appointment = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [appointment, setAppointment] = useState({
    patientName: "",
    patientEmail: "",
    date: "",
    time: "",
  });

  const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api/doctors";

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        console.log(`📡 Fetching doctor from: ${API_URL}/doctor/${id}`);
        const response = await axios.get(`${API_URL}/doctor/${id}`);
        setDoctor(response.data);
      } catch (error) {
        console.error("❌ Error fetching doctor:", error);
        setError("Failed to load doctor profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [id, API_URL]);

  const handleChange = (e) => {
    setAppointment({ ...appointment, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/appointments/book",
        {
          patientName: appointment.patientName,
          patientEmail: appointment.patientEmail,
          date: appointment.date,
          time: appointment.time,
          doctorName: doctor.fullname,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        alert("✅ Appointment booked and email sent successfully!");
      } else {
        alert("⚠️ Failed to book appointment.");
      }
    } catch (error) {
      console.error("❌ Error booking appointment:", error);
      alert("An error occurred while booking the appointment.");
    }
  };

  useEffect(() => {
    if (doctor?.city) {
      const mapContainer = document.getElementById("map");
      if (mapContainer && !mapContainer._leaflet_id) {
        const map = L.map(mapContainer).setView([39.9334, 32.8543], 7);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        axios
          .get(`https://nominatim.openstreetmap.org/search?city=${doctor.city}&country=Turkey&format=json`)
          .then((res) => {
            if (res.data.length > 0) {
              const { lat, lon } = res.data[0];
              map.setView([lat, lon], 10);
              L.marker([lat, lon]).addTo(map).bindPopup(`City: ${doctor.city}`).openPopup();
            }
          })
          .catch((error) => console.error("❌ Geocoding error:", error));
      }
    }
  }, [doctor]);

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center">
      <div className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
        {loading && <p className="text-center text-gray-600">Loading...</p>}
        {error && <p className="text-center text-red-600">{error}</p>}

        {doctor && (
          <>
            <div className="flex items-center space-x-6">
              {doctor.profileImage ? (
                <img
                  src={`data:image/png;base64,${doctor.profileImage}`}
                  alt={doctor.fullname}
                  className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}

              <div>
                <h2 className="text-2xl font-semibold mb-4">{doctor.fullname}</h2>
                <p><strong>Specialization:</strong> {doctor.specialty}</p>
                <p><strong>Address:</strong> {doctor.address}</p>
                <p><strong>Available Hours:</strong> {doctor.workingHours}</p>
                <p><strong>City:</strong> {doctor.city}</p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Doctor's Location</h3>
              <div id="map" className="w-full h-72 rounded-lg border border-gray-300"></div>
            </div>

            {/* 📌 Randevu Formu */}
            <div className="mt-6 p-6 bg-gray-100 shadow-md rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Book an Appointment</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="patientName"
                  placeholder="Your Name"
                  value={appointment.patientName}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
                <input
                  type="email"
                  name="patientEmail"
                  placeholder="Your Email"
                  value={appointment.patientEmail}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
                <input
                  type="date"
                  name="date"
                  value={appointment.date}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
                <input
                  type="time"
                  name="time"
                  value={appointment.time}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white p-2 rounded-lg"
                >
                  Book Appointment
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Appointment;
