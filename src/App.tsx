import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Blog from "./components/Blog";
import BlogPostPage from "./components/BlogPost";
import AchievementsPage from "./components/achievements/AchievementsPage";

const App: React.FC = () => {
  return (
    <Router>
      <div
        className="min-h-screen theme-transition"
        style={{ backgroundColor: "var(--color-background)" }}
      >
        <Navbar />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/about" element={<About />} />
            <Route path="/achievements" element={<AchievementsPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

const Home: React.FC = () => {
  return (
    <div className="container py-12 fade-in">
      <h1
        className="text-4xl font-bold mb-6 theme-transition"
        style={{ color: "var(--color-text-primary)" }}
      >
        Bienvenido a mi Portfolio
      </h1>
      <p
        className="text-lg mb-6 theme-transition"
        style={{ color: "var(--color-text-secondary)" }}
      >
        en construcción...
      </p>
    </div>
  );
};

const About: React.FC = () => {
  return (
    <div className="container py-12 fade-in">
      <h1
        className="text-4xl font-bold mb-6 theme-transition"
        style={{ color: "var(--color-text-primary)" }}
      >
        Sobre mí
      </h1>
      <p
        className="text-lg mb-6 theme-transition"
        style={{ color: "var(--color-text-secondary)" }}
      >
        en construcción...
      </p>
    </div>
  );
};

export default App;
