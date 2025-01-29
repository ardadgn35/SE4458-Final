import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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
  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  // 📌 Doktor bilgilerini çekme işlemi
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

  // 📌 Formdaki değişiklikleri takip etme
  const handleChange = (e) => {
    setAppointment({ ...appointment, [e.target.name]: e.target.value });
  };

  // 📌 Randevu oluşturma işlemi
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
  

  return (
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
            <iframe
              title="Google Maps"
              width="100%"
              height="300"
              style={{ border: "0", borderRadius: "10px" }}
              loading="lazy"
              allowFullScreen
              src={`https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}&q=${doctor.city},Turkey`}
            ></iframe>
          </div>

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
  );
};

export default Appointment;
