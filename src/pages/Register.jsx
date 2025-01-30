import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    fullname: '',
    specialty: '',
    address: '',
    city: '',
    workingHours: '',
    email: '',
    profileImage: null,
  });

  const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api/doctors";

  const cities = [
    "Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Aksaray", "Amasya", "Ankara", "Antalya", "Ardahan", "Artvin", "Aydın",
    "Balıkesir", "Bartın", "Batman", "Bayburt", "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa", "Çanakkale",
    "Çankırı", "Çorum", "Denizli", "Diyarbakır", "Düzce", "Edirne", "Elazığ", "Erzincan", "Erzurum", "Eskişehir", "Gaziantep",
    "Giresun", "Gümüşhane", "Hakkari", "Hatay", "Iğdır", "Isparta", "İstanbul", "İzmir", "Kahramanmaraş", "Karabük", "Karaman",
    "Kars", "Kastamonu", "Kayseri", "Kırıkkale", "Kırklareli", "Kırşehir", "Kocaeli", "Konya", "Kütahya", "Malatya", "Manisa",
    "Mardin", "Mersin", "Muğla", "Muş", "Nevşehir", "Niğde", "Ordu", "Osmaniye", "Rize", "Sakarya", "Samsun", "Siirt",
    "Sinop", "Sivas", "Şanlıurfa", "Şırnak", "Tekirdağ", "Tokat", "Trabzon", "Tunceli", "Uşak", "Van", "Yalova", "Yozgat", "Zonguldak"
  ];

  const handleGoogleLogin = async () => {
    try {
      window.location.href = `${API_URL}/auth/google`;
    } catch (error) {
      console.error('Google login error:', error);
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    setUser({ ...user, profileImage: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(user).forEach((key) => {
      formData.append(key, user[key]);
    });

    try {
      console.log("📡 Sending request to:", API_URL);
      const response = await axios.post(`${API_URL}/register`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log("✅ Server Response:", response.data);
      if (response.data.success) {
        alert('Registration successful!');
        navigate('/');
      } else {
        alert(`⚠️ Error: ${response.data.message}`);
      }
    } catch (error) {
      console.error('❌ Registration error:', error);
      alert(`Registration failed! ${error.response?.data?.message || "Unknown error"}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center">
      <div className="max-w-lg p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-4">Register as a Doctor</h2>

        <button
          className="w-full bg-red-500 text-white p-2 rounded-lg mb-4"
          onClick={handleGoogleLogin}
        >
          Sign in with Google
        </button>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col items-center">
            <label htmlFor="profileImage" className="cursor-pointer">
              {user.profileImage ? (
                <img
                  src={URL.createObjectURL(user.profileImage)}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
                />
              ) : (
                <div className="w-32 h-32 flex items-center justify-center border-2 border-gray-300 rounded-full bg-gray-100">
                  <span className="text-gray-500">Upload Image</span>
                </div>
              )}
            </label>
            <input type="file" id="profileImage" className="hidden" accept="image/*" onChange={handleImageUpload} />
          </div>

          <input
            type="text"
            name="fullname"
            placeholder="Full Name"
            value={user.fullname}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />

          <input
            type="text"
            name="specialty"
            placeholder="Specialty (e.g. Cardiologist)"
            value={user.specialty}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={user.address}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />

          <select
            name="city"
            value={user.city}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>

          <input
            type="text"
            name="workingHours"
            placeholder="Working Hours (e.g. Mon-Fri 9AM - 5PM)"
            value={user.workingHours}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-lg"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
