import React from "react";
import { Outlet, Route } from "react-router-dom";
import Header from "../components/header/Header";
import SideBar from "../components/sidebar/SideBar";

const HomePage = () => {
  return (
    <div className="bg-[#000c17] h-full w-full">
      <Header />
      <div className="flex justify-center">
        <div className="bg-[#000c17] h-[880px] w-auto">
          <SideBar />
        </div>
        <div className="bg-[#1d3042] w-[1000px] rounded-xl">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
