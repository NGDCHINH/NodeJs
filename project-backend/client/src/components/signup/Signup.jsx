import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [inputValue, setInputValue] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setInputValue((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8800/api/v1/auth/signup",
        inputValue
      );
      if (res) {
        toast.success("Sign up successful! Redirecting to login page...");
        setTimeout(() => {
          navigate("/auth/signin");
        }, 1500);
      }
    } catch (error) {
      console.log(error);
      toast.error("Sign up failed. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-md shadow-md">
      <ToastContainer />
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <label className="text-gray-600">UserName</label>
        <input
          className="px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          value={inputValue.username}
          name="username"
          onChange={handleOnChange}
        />
        <label className="text-gray-600">Email</label>
        <input
          className="px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          type="email"
          value={inputValue.email}
          name="email"
          onChange={handleOnChange}
        />
        <label className="text-gray-600">Password</label>
        <input
          className="px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          value={inputValue.password}
          name="password"
          onChange={handleOnChange}
          type="password"
        />
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">
          Sign Up
        </button>
      </form>
      <div>
        <p>
          If you have an account!{" "}
          <button
            onClick={() => navigate("/auth/signin")}
            className="text-blue-500 hover:text-blue-700"
          >
            Sign In
          </button>
        </p>
      </div>
      <div>
        <p>
          If you are admin{" "}
          <button
            onClick={() => navigate("/admin")}
            className="text-blue-500 hover:text-blue-700"
          >
            Click Here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
