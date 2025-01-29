import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const SearchDoctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api/doctors";

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_URL}/approved-doctors`);
      setDoctors(response.data);
      setFilteredDoctors(response.data);
    } catch (error) {
      setError("Failed to fetch doctors.");
    } finally {
      setLoading(false);
    }
  };

  // 📌 Arama ve Filtreleme
  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    const filtered = doctors.filter((doctor) =>
      (doctor.fullname.toLowerCase().includes(query) ||
      doctor.specialty.toLowerCase().includes(query)) &&
      (selectedCity === "" || doctor.city === selectedCity)
    );

    setFilteredDoctors(filtered);
  };

  // 📌 Türkiye Şehirleri Listesi
  const cities = [
    "Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Aksaray", "Amasya", "Ankara", "Antalya", "Ardahan", "Artvin", "Aydın",
    "Balıkesir", "Bartın", "Batman", "Bayburt", "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa", "Çanakkale",
    "Çankırı", "Çorum", "Denizli", "Diyarbakır", "Düzce", "Edirne", "Elazığ", "Erzincan", "Erzurum", "Eskişehir", "Gaziantep",
    "Giresun", "Gümüşhane", "Hakkari", "Hatay", "Iğdır", "Isparta", "İstanbul", "İzmir", "Kahramanmaraş", "Karabük", "Karaman",
    "Kars", "Kastamonu", "Kayseri", "Kırıkkale", "Kırklareli", "Kırşehir", "Kocaeli", "Konya", "Kütahya", "Malatya", "Manisa",
    "Mardin", "Mersin", "Muğla", "Muş", "Nevşehir", "Niğde", "Ordu", "Osmaniye", "Rize", "Sakarya", "Samsun", "Siirt",
    "Sinop", "Sivas", "Şanlıurfa", "Şırnak", "Tekirdağ", "Tokat", "Trabzon", "Tunceli", "Uşak", "Van", "Yalova", "Yozgat", "Zonguldak"
  ];

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">Search Doctor</h2>

      {/* 📌 Arama Formu */}
      <div className="flex gap-4 items-center mb-6">
        <input
          type="text"
          placeholder="Specialization, area of interest, or name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-grow p-2 border border-gray-300 rounded-lg"
        />
        
        {/* 📌 Şehir Seçimi */}
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg"
        >
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>

        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Search
        </button>
      </div>

      {loading && <p className="text-center text-gray-600">Loading...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      {!loading && filteredDoctors.length === 0 ? (
        <p className="text-center text-gray-600">No matching doctors found.</p>
      ) : (
        <ul className="space-y-4">
          {filteredDoctors.map((doctor) => (
            <li key={doctor._id} className="p-4 border border-gray-300 rounded-lg flex items-center space-x-4">
              
              {/* 📌 Doktor Resmi */}
              {doctor.profileImage ? (
                <img
                  src={`data:image/png;base64,${doctor.profileImage}`}
                  alt={doctor.fullname}
                  className="w-20 h-20 rounded-full object-cover"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}

              <div>
                <p><strong>Name:</strong> {doctor.fullname}</p>
                <p><strong>Specialty:</strong> {doctor.specialty}</p>
                <p><strong>Email:</strong> {doctor.email}</p>
                <p><strong>City:</strong> {doctor.city}</p>
              </div>

              <div className="flex gap-4">
                {/* 📌 Randevu Alma Butonu */}
                <Link to={`/doctor/${doctor._id}/appointment`} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                  Book Appointment
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchDoctor;
