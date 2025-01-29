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
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">Admin Panel - Pending Doctors</h2>
      {loading && <p className="text-center text-gray-600">Loading...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}
      {!loading && doctors.length === 0 ? (
        <p className="text-center text-gray-600">No pending doctors.</p>
      ) : (
        <ul className="space-y-4">
          {doctors.map((doctor) => (
            <li key={doctor._id} className="p-4 border border-gray-300 rounded-lg flex justify-between items-center">
              <div>
                <p><strong>Name:</strong> {doctor.fullname}</p>
              </div>
              <button onClick={() => approveDoctor(doctor._id)} className="bg-green-500 text-white px-4 py-2 rounded-lg">
                Approve
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminPanel;
