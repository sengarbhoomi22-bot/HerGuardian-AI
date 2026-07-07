import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

function Footer() {
  return (
    <footer
      id="contact"
      className="bg-pink-600 text-white py-10 mt-10"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-3 gap-10">

          {/* Logo */}
          <div>
            <h2 className="text-3xl font-bold">
              HerGuardian AI
            </h2>

            <p className="mt-4 text-pink-100">
              Empowering women through AI-driven guidance,
              wellness, education and opportunities.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Quick Links
            </h3>

            <ul className="space-y-2">

              <li>
                <Link to="/">Home</Link>
              </li>

              <li>
                <Link to="/register">Register</Link>
              </li>

              <li>
                <Link to="/login">Login</Link>
              </li>

            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Contact
            </h3>

            <p>Email: support@herguardianai.com</p>

            <p className="mt-2">
              Made with <FaHeart className="inline" /> for women everywhere.
            </p>

          </div>

        </div>

        <hr className="my-8 border-pink-400" />

        <p className="text-center text-pink-100">
          © 2026 HerGuardian AI. All Rights Reserved.
        </p>

      </div>
    </footer>
  );
}

export default Footer;