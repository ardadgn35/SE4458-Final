import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-green-800 p-4">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-white font-bold text-2xl">Find Your Doctor</Link>
        <ul className="flex space-x-6 text-white">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/search-doctor">Search Doctor</Link></li>
          <li><Link to="/admin" className="bg-red-500 px-4 py-2 rounded-lg">Admin Panel</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
