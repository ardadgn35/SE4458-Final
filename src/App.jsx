import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import SearchDoctor from './pages/SearchDoctor';
import Appointment from './pages/Appointment';
import Review from './pages/Review';
import AdminPanel from './pages/AdminPanel';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search-doctor" element={<SearchDoctor />} />
        <Route path="/doctor/:id/appointment" element={<Appointment />} />
        <Route path="/review" element={<Review />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;
