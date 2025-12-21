import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import { useTokens } from "../stores/tokenStore";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const { setAccessToken, setRefreshToken } = useTokens();
  const [formData, setFormData] = useState();

  const handleInputChange = (title, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [title]: value,
    }));
  };
  const handleLogin = async () => {
    try {
      const { data, statusText } = await axios.post(
        "https://ilkinibadov.com/api/b/auth/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (statusText === "OK") {
        alert("Login successful ✅");
        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {}, [formData]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 justify-center items-center mb-5 mt-5">
        <div className="flex flex-col max-w-[400px] w-full px-6 py-12 bg-white rounded-lg shadow-md">
          <h1 className="text-3xl font-semibold mb-8 text-center">Login</h1>
          <div className="flex flex-col gap-6 mb-6">
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

          <button
            onClick={handleLogin}
            className="bg-yellow-400 text-black py-3 rounded-md font-medium hover:bg-yellow-500 transition duration-150 cursor-pointer"
          >
            Login
          </button>
          <p className="text-center mt-4 text-gray-600">
            Don’t have an account?{" "}
            <a href="/register" className="font-medium underline">
              Register
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
