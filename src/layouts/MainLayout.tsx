import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import StarfieldBackground from "@/components/StarfieldBackground";

const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-transparent flex flex-col relative">
      <StarfieldBackground />
      <NavBar />
      <div className="flex-grow pt-16 relative z-10">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
