import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/register"); // "register" sayfasına yönlendirme
  };

  return (
    <div>
      <section
        className="relative h-screen bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504813184591-01572f98c85f')" }}
      >
        <div className="text-center bg-black bg-opacity-50 p-8 rounded-lg shadow-lg max-w-2xl">
          <h1 className="text-5xl font-extrabold text-white">Your Health, Our Priority</h1>
          <p className="mt-4 text-lg text-gray-300">You can easily join us as a doctor.</p>
          <button
            onClick={handleButtonClick}
            className="mt-6 px-8 py-3 bg-blue-500 text-white rounded-lg shadow-md text-lg font-semibold transition-transform transform hover:scale-105 hover:bg-blue-600"
          >
            Register Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
