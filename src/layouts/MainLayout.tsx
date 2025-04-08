import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="flex-grow pt-16">
        {" "}
        {/* Espacio para el navbar fijo */}
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
