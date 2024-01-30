import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const param = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [quantity, setQuantity] = React.useState(0);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8800/api/v1/products/${id}`
      );
      setProduct(response.data.product);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const handleAddToCart = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        navigate("/auth/signin");
        return;
      }
      const cartId = JSON.parse(localStorage.getItem("cart_id"));
      const dataCart = {
        product_id: param.id,
        cart_id: cartId,
        quantity: 1,
        user_id: user.user_id,
      };
      const response = await axios.post(
        "http://localhost:8800/api/v1/cart-item",
        dataCart
      );
      setQuantity(response.data.quantityCart);

      toast.success("Product added to cart successfully!");
      console.log("Product added to cart:", response.data);
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error("Failed to add product to cart. Please try again.");
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  return (
    <div className="container mx-auto bg-white h-[700px] w-[500px] rounded-sm border-2 border-gray-200">
      <ToastContainer />
      <div className=" flex-col">
        <div className="lg:col-span-1">
          <img
            src={product.image}
            alt={product.product_name}
            className="w-full h-auto mb-8"
          />
        </div>
        <div className="lg:col-span-1">
          <h2 className="text-3xl font-semibold mb-4">
            {product.product_name}
          </h2>
          <p className="text-gray-600 mb-4">{product.price}VND</p>
          <p className="text-gray-600 mb-4">Quantity: {product.quantity}</p>
          <p className="text-gray-600 mb-8">
            Description: {product.description_product}
          </p>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
