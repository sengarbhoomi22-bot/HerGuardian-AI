import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";

function UserForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    country: "",
    profession: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await registerUser({
        name: formData.name,
        age: formData.age ? Number(formData.age) : undefined,
        country: formData.country,
        profession: formData.profession,
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      toast.success("Registration successful");
      navigate("/dashboard");
    } catch (err) {
      console.error("Registration error:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-xl"
    >
      <h2 className="mb-8 text-center text-3xl font-bold text-pink-600">
        Create Your Profile
      </h2>

      {error && <p className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-600">{error}</p>}

      {/* Name */}
      <div className="mb-5">
        <label className="block mb-2 font-medium">
          Name
        </label>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
          className="w-full border rounded-xl p-3"
          required
        />
      </div>

      {/* Email */}
      <div className="mb-5">
        <label className="mb-2 block font-medium">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          className="w-full rounded-xl border p-3"
          required
        />
      </div>

      {/* Password */}
      <div className="mb-5">
        <label className="mb-2 block font-medium">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter a password"
          className="w-full rounded-xl border p-3"
          required
          minLength="8"
        />
      </div>

      {/* Age */}
      <div className="mb-5">
        <label className="mb-2 block font-medium">
          Age
        </label>

        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Enter your age"
          className="w-full border rounded-xl p-3"
          required
        />
      </div>

      {/* Country */}
      <div className="mb-5">
        <label className="block mb-2 font-medium">
          Country
        </label>

        <select
          name="country"
          value={formData.country}
          onChange={handleChange}
          className="w-full border rounded-xl p-3"
          required
        >
          <option value="">Select Country</option>
          <option>India</option>
          <option>United States</option>
          <option>Canada</option>
          <option>United Kingdom</option>
          <option>Australia</option>
          <option>Germany</option>
          <option>France</option>
          <option>Japan</option>
          <option>Singapore</option>
          <option>UAE</option>
        </select>
      </div>

      {/* Profession */}
      <div className="mb-8">
        <label className="block mb-2 font-medium">
          Profession
        </label>

        <input
          type="text"
          name="profession"
          value={formData.profession}
          onChange={handleChange}
          placeholder="Enter your profession"
          className="w-full border rounded-xl p-3"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-pink-600 py-3 text-white transition hover:bg-pink-700"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Creating account..." : "Continue"}
      </button>
    </form>
  );
}

export default UserForm;