import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";
import Cookies from "js-cookie";
import Logo from "../../img/tobirama0.png";
import Avatar from "../../img/itachi.png";

const Header = () => {
  const [quantity, setQuantity] = useState(0);
  const [user, setUser] = useState(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const localUser = JSON.parse(localStorage.getItem("user"));

        if (localUser) {
          setUser(localUser);

          const cartResponse = await axios.get(
            "http://localhost:8800/api/v1/cart",
            { withCredentials: true }
          );

          console.log("API Response:", cartResponse.data);

          localStorage.setItem("cart_id", cartResponse.data.cart_id);

          setQuantity(cartResponse.data.quantity);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const userLocalStorage = localStorage.getItem("user");
    if (userLocalStorage) {
      fetchData();
    }
    return () => {};
  }, [navigate]);

  const handleToCart = () => {
    navigate("/cart");
  };

  const handleLoginClick = () => {
    navigate("/auth/signin");
  };

  const handleLogoutClick = () => {
    localStorage.clear();
    setUser(null);
    setIsDropdownVisible(false);
  };

  return (
    <div className="flex items-center justify-between bg-slate-700 px-5">
      <div className="flex items-center">
        <img className="w-32 h-32" src={Logo} alt="Logo" />
        <span className="text-lg decoration-solid text-white ml-2">
          ShopWiBu
        </span>
      </div>
      <div className="flex items-center">
        <div className="rounded-lg bg-gray-200 p-5">
          <div className="flex">
            <div className="flex w-10 items-center justify-center rounded-tl-lg rounded-bl-lg border-r border-gray-200 bg-white p-5">
              <svg
                viewBox="0 0 20 20"
                aria-hidden="true"
                className="pointer-events-none absolute w-5 fill-gray-500 transition"
              ></svg>
            </div>
            <input
              type="text"
              className="w-[360px] bg-white pl-2 text-base font-semibold outline-0"
              placeholder=""
              id=""
            />
            <input
              type="button"
              value="Tìm kiếm"
              className="bg-blue-500 p-2 rounded-tr-lg rounded-br-lg text-white font-semibold hover:bg-blue-800 transition-colors"
            />
          </div>
        </div>
      </div>
      <div className="flex items-center relative">
        <div className="text-4xl">
          <CiShoppingCart />
        </div>
        <div
          className="text-white text-sm cursor-pointer border-2 p-1 rounded-[50%] absolute -top-2 -right-1"
          onClick={handleToCart}
        >
          {quantity}
        </div>
      </div>
      <div
        className="flex items-center cursor-pointer relative"
        onMouseEnter={() => setIsDropdownVisible(true)}
        onMouseLeave={() => setIsDropdownVisible(false)}
      >
        {user ? (
          <>
            <img
              src={user.avatar || Avatar}
              className="w-10 h-10 rounded-full"
              alt="Avatar"
            />
            <span className="text-white ml-2">{user.user_name}</span>
            {isDropdownVisible && (
              <div className="ml-2 text-white absolute top-full right-0 bg-gray-800 p-2 rounded shadow">
                <button onClick={handleLogoutClick}>Đăng xuất</button>
              </div>
            )}
          </>
        ) : (
          <Link to="/auth/signin">
            <button
              className="bg-red-950 text-red-400 border border-red-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group"
              onClick={handleLoginClick}
            >
              <span className="bg-red-400 shadow-red-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
              Đăng nhập
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
