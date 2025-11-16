// src/pages/RegisterPage.jsx

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function RegisterPage() {
  // register and login state are very similar. when you have shared state/logic/handlers,
  // that's a potential opportunity to write a custom hook for the shared logic
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Registration failed.");
      }

      // On success, navigate to the login page and pass a state object with our success message.
      navigate("/login", {
        state: { successMessage: "Registration successful! Please log in." },
      });
    } catch (error) {
      console.error(error);
      // You can add state to show a UI error to the user here
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Create Account</h2>
        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
