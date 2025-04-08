import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        {" "}
        {/* Espacio para el navbar fijo */}
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
