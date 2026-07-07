import { Link } from "react-router-dom";
function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">

        {/* Logo */}
        <h1 className="text-2xl font-bold text-pink-600">
          HerGuardian AI
        </h1>

        {/* Navigation Links */}
        <div className="hidden md:flex gap-8 text-gray-700 font-medium">

          <a href="#features" className="hover:text-pink-600 transition">
            Features
          </a>

          <a href="#about" className="hover:text-pink-600 transition">
            About
          </a>

          <a href="#reviews" className="hover:text-pink-600 transition">
            Reviews
          </a>

          <a href="#contact" className="hover:text-pink-600 transition">
            Contact
          </a>

          <a href="/inspiration" className="hover:text-pink-600 transition">
            Inspiration
          </a>

        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/register"
            className="rounded-full bg-pink-600 px-6 py-2 text-white hover:bg-pink-700 transition"
          >
            Get Started
          </Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;