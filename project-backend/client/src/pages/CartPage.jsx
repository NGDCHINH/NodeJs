import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import QRCodeImage from "../img/qrcode.png"; // Thay đổi tên biến này

const CartPage = () => {
  const [cartProduct, setCartProduct] = useState([]);

  const handleCallCart = async () => {
    try {
      const res = await axios.get("http://localhost:8800/api/v1/cart-items", {
        withCredentials: true,
      });
      setCartProduct(res.data.cartData);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  useEffect(() => {
    handleCallCart();
  }, []);

  const handleIncrement = async (e, id) => {
    e.preventDefault();
    setCartProduct((prevCart) =>
      prevCart.map((item) =>
        item.product_id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );

    try {
      await axios.post("http://localhost:8800/api/v1/cart-increment", {
        cart_id: JSON.parse(localStorage.getItem("cart_id")),
        product_id: id,
      });
      handleCallCart();
      showNotification("Số lượng đã tăng!", "success");
    } catch (error) {
      console.error("Error incrementing cart item:", error);
      handleCallCart();
      showNotification("Lỗi khi tăng số lượng!", "error");
    }
  };

  const handleDecrement = async (e, id) => {
    e.preventDefault();
    setCartProduct((prevCart) =>
      prevCart.map((item) =>
        item.product_id === id && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );

    try {
      await axios.post("http://localhost:8800/api/v1/cart-decrement", {
        cart_id: JSON.parse(localStorage.getItem("cart_id")),
        product_id: id,
      });
      handleCallCart();
      showNotification("Số lượng đã giảm!", "success");
    } catch (error) {
      console.error("Error decrementing cart item:", error);
      handleCallCart();
      showNotification("Lỗi khi giảm số lượng!", "error");
    }
  };

  const handlePayment = () => {
    const bankAccountNumber = "3275123456789";
    const bankName = "Vietcombank";

    toast.info(
      <>
        <div>
          Mã QR:{" "}
          <img
            src={QRCodeImage}
            alt="QR Code"
            className="flex justify-center"
          />
          <br />
          Số tài khoản: {bankAccountNumber}
          <br />
          Ngân hàng: {bankName}
        </div>
      </>
    );
  };

  const showNotification = (message, type) => {
    toast[type](message);
  };

  return (
    <div className="container mx-auto mt-8">
      <ToastContainer />
      <table className="w-full border">
        <thead>
          <tr>
            <th className="text-white border px-4 py-2">Tên sản phẩm</th>
            <th className="text-white border px-4 py-2">Số lượng</th>
            <th className="text-white border px-4 py-2">Giá tiền</th>
          </tr>
        </thead>
        <tbody>
          {cartProduct &&
            cartProduct.map((item) => {
              return (
                <tr key={item.product_id}>
                  <td className="text-white border px-4 py-2">
                    {item.product_name}
                  </td>
                  <td className="text-white border px-4 py-2">
                    <button
                      onClick={(e) => handleIncrement(e, item.product_id)}
                      className="bg-blue-500 text-white px-2 py-1 mr-1"
                    >
                      +
                    </button>
                    {item.quantity}
                    <button
                      onClick={(e) => handleDecrement(e, item.product_id)}
                      className="bg-red-500 text-white px-2 py-1 ml-1"
                    >
                      -
                    </button>
                  </td>
                  <td className="text-white border px-4 py-2">
                    {item.quantity * item.price}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      <div className="text-white mt-4">
        <span className="text-white mr-4">
          Tổng thanh toán:{" "}
          {cartProduct.reduce((prev, current) => {
            return prev + current.quantity * current.price;
          }, 0)}
        </span>
        <button
          onClick={handlePayment}
          className="bg-green-500 text-white px-4 py-2"
        >
          Thanh toán
        </button>
      </div>
    </div>
  );
};

export default CartPage;
