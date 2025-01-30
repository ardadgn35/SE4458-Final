import { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api/doctors";

  useEffect(() => {
    fetchPendingDoctors();
  }, []);

  const fetchPendingDoctors = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_URL}/pending-doctors`);
      setDoctors(response.data);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch doctors.");
    } finally {
      setLoading(false);
    }
  };

  const approveDoctor = async (id) => {
    try {
      await axios.post(`${API_URL}/approve-doctor/${id}`);
      fetchPendingDoctors();
    } catch (error) {
      alert(`❌ Failed to approve doctor: ${error.response?.data?.message || "Unknown error"}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white flex items-center justify-center">
      <div className="max-w-4xl p-6 bg-white shadow-lg rounded-lg text-gray-900">
        <h2 className="text-2xl font-semibold text-center mb-4">Admin Panel - Pending Doctors</h2>
        {loading && <p className="text-center text-gray-600">Loading...</p>}
        {error && <p className="text-center text-red-600">{error}</p>}
        {!loading && doctors.length === 0 ? (
          <p className="text-center text-gray-600">No pending doctors.</p>
        ) : (
          <ul className="space-y-4">
            {doctors.map((doctor) => (
              <li key={doctor._id} className="p-4 border border-gray-300 rounded-lg flex items-center space-x-6">
                {/* 📌 Doktorun Profil Resmi */}
                {doctor.profileImage ? (
                  <img
                    src={`data:image/png;base64,${doctor.profileImage}`}
                    alt={doctor.fullname}
                    className="w-20 h-20 rounded-full object-cover border border-gray-300"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}

                {/* 📌 Doktorun Detayları */}
                <div className="flex-grow">
                  <p><strong>Name:</strong> {doctor.fullname}</p>
                  <p><strong>Email:</strong> {doctor.email}</p>
                  <p><strong>Specialty:</strong> {doctor.specialty}</p>
                  <p><strong>City:</strong> {doctor.city}</p>
                </div>

                {/* 📌 Onay Butonu */}
                <button
                  onClick={() => approveDoctor(doctor._id)}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg"
                >
                  Approve
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
