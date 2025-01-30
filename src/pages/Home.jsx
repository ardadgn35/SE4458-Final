import { useNavigate } from "react-router-dom";
import { FaStethoscope, FaHeartbeat, FaRegCalendarAlt } from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/register");
  };

  return (
    <div>
      <section
        className="relative h-screen bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1504813184591-01572f98c85f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDR8fGhvc3BpdGFsfGVufDB8fHx8MTY2MjgzMzI0MA&ixlib=rb-1.2.1&q=80&w=1080')",
        }}
      >
        <div className="relative text-center bg-black bg-opacity-70 p-12 rounded-lg shadow-2xl max-w-3xl backdrop-blur-md">
          <h1 className="text-6xl font-bold text-white tracking-wider leading-tight animate-fade-in">
            Your Health, Our Priority
          </h1>
          <p className="mt-6 text-xl text-gray-300 animate-fade-in-delay">
            Join us today and become a part of our trusted doctor network.
          </p>
          <button
            onClick={handleButtonClick}
            className="mt-8 px-10 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full shadow-lg text-lg font-semibold hover:scale-105 transform transition-transform duration-300 hover:shadow-2xl hover:bg-opacity-90"
          >
            Register Now
          </button>
        </div>

        <div className="absolute top-0 left-0 w-32 h-32 bg-blue-400 rounded-full opacity-30 blur-xl animate-floating"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-indigo-500 rounded-full opacity-40 blur-lg animate-floating-reverse"></div>
      </section>

      <section className="py-16 bg-gray-900 text-white text-center">
        <h2 className="text-4xl font-extrabold mb-10">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto px-4">
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
            <FaStethoscope className="text-blue-500 text-6xl mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Professional Care</h3>
            <p className="text-gray-300">
              Our certified doctors provide the highest quality healthcare services to patients.
            </p>
          </div>
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
            <FaHeartbeat className="text-red-500 text-6xl mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">24/7 Support</h3>
            <p className="text-gray-300">
              We offer round-the-clock support to ensure our patients' health needs are met at all times.
            </p>
          </div>
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
            <FaRegCalendarAlt className="text-green-500 text-6xl mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Easy Appointment</h3>
            <p className="text-gray-300">
              Easily book and manage appointments with just a few clicks through our platform.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white text-gray-900 text-center">
        <h2 className="text-4xl font-extrabold mb-10">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto px-4">
          <div className="bg-gray-100 p-8 rounded-lg shadow-lg">
            <p className="text-xl italic">
              "The platform is incredibly user-friendly. I found a doctor near me within minutes!"
            </p>
            <p className="mt-4 text-gray-600 font-bold">- Sarah L.</p>
          </div>
          <div className="bg-gray-100 p-8 rounded-lg shadow-lg">
            <p className="text-xl italic">
              "As a doctor, I was amazed by the seamless registration process and support."
            </p>
            <p className="mt-4 text-gray-600 font-bold">- Dr. Michael B.</p>
          </div>
        </div>
      </section>

      <footer className="py-8 bg-gray-900 text-white text-center">
        <p className="text-lg">© 2025 Your Health Platform. All rights reserved.</p>
        <p className="text-sm mt-2">Designed and built with passion.</p>
      </footer>
    </div>
  );
};

export default Home;
