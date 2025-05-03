import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/Home/HomePage";
import AboutPage from "../pages/About/AboutPage";
import AchievementsPage from "../pages/Achievements/AchievementsPage";
import BlogPage from "../pages/Blog/BlogPage";
import BlogPostPage from "../pages/Blog/BlogPostPage";

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/achievements" element={<AchievementsPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="blog/:slug" element={<BlogPostPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
