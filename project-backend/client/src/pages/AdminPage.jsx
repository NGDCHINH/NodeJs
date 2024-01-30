// src/components/AdminPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminPage = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    price: "",
    quantity: "",
    image: "",
    description: "",
  });

  const handleAddProduct = async () => {
    try {
      const response = await fetch("http://localhost:8800/api/v1/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        toast.success("Product added successfully");
        // Add additional logic as needed
      } else {
        toast.error("Failed to add product");
        // Handle error as needed
      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Error adding product");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  return (
    <div className="bg-gray-800 text-white p-4">
      <ToastContainer />
      <h1 className="text-2xl font-bold">Admin Page</h1>
      <div className="flex justify-center flex-col items-center mt-4 gap-2">
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="p-2 mr-2 w-1/2 text-black"
        />
        <input
          type="text"
          name="price"
          value={product.price}
          onChange={handleChange}
          placeholder="Price"
          className="p-2 mr-2 w-1/2 text-black"
        />
        <input
          type="text"
          name="quantity"
          value={product.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          className="p-2 mr-2 w-1/2 text-black"
        />
        <input
          type="text"
          name="image"
          value={product.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="p-2 mr-2 w-1/2 text-black"
        />
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Description"
          className="p-2 mr-2 w-1/2 text-black"
        />
        <button
          onClick={handleAddProduct}
          className="bg-blue-500 text-white p-2 "
        >
          Add Product
        </button>
      </div>
      <div>
        <p>
          Qua lại để đăng nhập?{" "}
          <button
            onClick={() => navigate("/auth/signin")}
            className="text-blue-500 hover:text-blue-700"
          >
            Click here
          </button>
        </p>
      </div>
    </div>
  );
};

export default AdminPage;
