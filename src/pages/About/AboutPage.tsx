import React from "react";
import Career from "../../components/career/Career";

const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-text-primary">About Me</h1>
      <Career />
    </div>
  );
};

export default AboutPage;
