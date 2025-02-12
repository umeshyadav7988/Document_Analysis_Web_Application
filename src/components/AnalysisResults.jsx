import React from "react";
import "../styles.css";

const AnalysisResults = ({ analysisData }) => {
  if (!analysisData) return null;

  const { wordCount, charCount, sentenceCount, avgWordLength } = analysisData;

  return (
    <div className="analysis-container">
      <h2>📊 Document Statistics</h2>
      <div className="analysis-grid">
        <p><strong>Word Count:</strong> {wordCount}</p>
        <p><strong>Character Count:</strong> {charCount}</p>
        <p><strong>Sentence Count:</strong> {sentenceCount}</p>
        <p><strong>Avg. Word Length:</strong> {avgWordLength.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default AnalysisResults;
