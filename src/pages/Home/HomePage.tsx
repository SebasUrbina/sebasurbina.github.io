import React from "react";

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="w-48 h-48 flex-shrink-0">
            <img
              src="https://avatars.githubusercontent.com/u/48739508?v=4"
              alt="Sebastián Urbina"
              className="rounded-full w-full h-full object-cover shadow-lg"
            />
          </div>
          <div>
            <h1 className="text-5xl font-bold mb-4 text-text-primary">
              Sebastián Urbina
            </h1>
            <h2 className="text-2xl mb-8 text-text-secondary">
              Data Scientist & Software Engineer
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed">
              Welcome to my personal website. I'm passionate about data science,
              machine learning, and software development. Here you can find my
              projects, achievements, and thoughts on technology.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
