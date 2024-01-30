import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signin = () => {
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setInputValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:8800/api/v1/auth/login",
        inputValue,
        {
          withCredentials: true,
        }
      );

      const user = res.data.user;
      const userId = user.user_id;

      const userData = { ...user, user_id: userId };
      localStorage.setItem("user", JSON.stringify(userData));

      setLoading(false);
      navigate("/");
      toast.success("Login successful!");
    } catch (error) {
      console.log("Error during login:", error);
      setLoading(false);
      toast.error("Login failed. Please check your credentials and try again.");
    }
  };

  useEffect(() => {}, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <ToastContainer />
      <div className="max-w-md w-full bg-white p-6 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">Sign In</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <label className="text-sm">Email</label>
          <input
            type="email"
            value={inputValue.email}
            name="email"
            onChange={handleOnChange}
            className="border px-4 py-2 rounded-md focus:outline-none focus:border-blue-500"
          />
          <label className="text-sm">Password</label>
          <input
            value={inputValue.password}
            name="password"
            onChange={handleOnChange}
            type="password"
            className="border px-4 py-2 rounded-md focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
        <div>
          <p>
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/auth/signup")}
              className="text-blue-500 hover:text-blue-700"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
