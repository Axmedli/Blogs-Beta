import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";    
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDarkmode } from "../stores/darkmodeStore";

const Register = () => {
  const { isDarkmodeActive } = useDarkmode();
  const navigate = useNavigate();
  const [formData, setFormData] = useState();

  const handleInputChange = (title, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [title]: value,
    }));
  };

  const registerUser = async () => {
    try {
      const res = await axios.post("https://ilkinibadov.com/api/b/auth/register", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        const data = await res.json();
        alert("Register successful ✅");
        navigate("/login");
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${
        isDarkmodeActive ? "bg-[#181A2A] " : "bg-white text-black"
      }`}
    >
      <Navbar />
      <div className="flex flex-1 justify-center items-center mb-5 mt-5">
        <div className={`flex flex-col max-w-[400px] w-full px-6 py-12 rounded-lg shadow-md ${isDarkmodeActive ? "bg-[#141624] text-white" : "bg-white"}`}>
          <h1 className="text-3xl font-semibold mb-8 text-center">Register</h1>
          <div className="flex flex-col gap-6 mb-6">
            <input
              onChange={(e) => {
                handleInputChange("firstname", e.target.value);
              }}
              className="border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your first name"
              type="text"
            />
            <input
              onChange={(e) => {
                handleInputChange("lastname", e.target.value);
              }}
              className="border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your last name"
              type="text"
            />
            <input
              onChange={(e) => {
                handleInputChange("email", e.target.value);
              }}
              className="border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
              type="email"
            />
            <input
              onChange={(e) => {
                handleInputChange("password", e.target.value);
              }}
              className="border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
              type="password"
            />
          </div>
          <button onClick={registerUser} className="bg-yellow-400 text-black py-3 rounded-md font-medium hover:bg-yellow-500 transition duration-150 cursor-pointer">
            Register
          </button>
          <p className="text-center mt-4 text-gray-600">
            Already have an account?
            <Link to="/login" className={`font-medium underline ${isDarkmodeActive ? "text-white" : "text-gray-600"}`}>
              Login
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
