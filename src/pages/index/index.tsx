import React from "react";
import Terminal from "../../components/terminal/terminal";
import MatrixBackground from "../../components/matrix/MatrixBackground";
import "./index.css";

const Index = () => {
  return (
    <div className="index">
      <MatrixBackground />
      <Terminal />
    </div>
  );
};

export default Index;
