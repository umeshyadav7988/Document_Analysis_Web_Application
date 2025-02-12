import React, { useState } from "react";
import FileUpload from "./components/FileUpload";
import AnalysisResults from "./components/AnalysisResults";
import "./styles.css";

const App = () => {
  const [analysisData, setAnalysisData] = useState(null);

  return (
    <div>
      <h1 style={{ textAlign: "center", color: "#007bff", margin: "20px 0" }}>
        📄 Document Analysis Tool
      </h1>
      <FileUpload setAnalysisData={setAnalysisData} />
      <AnalysisResults analysisData={analysisData} />
    </div>
  );
};

export default App;
