import React from "react";
import "../styles.css";

const AnalysisResults = ({ analysisData }) => {
  // Ensure that analysisData is available
  if (!analysisData) return null;

  const {
    wordCount,
    charCount,
    charCountNoSpaces,
    sentenceCount,
    avgWordLength,
    topWords,  // This will contain the frequent words
  } = analysisData;

  return (
    <div className="analysis-container">
      <h2>📊 Document Statistics</h2>
      <div className="analysis-grid">
        {wordCount !== undefined && (
          <p><strong>Word Count:</strong> {wordCount}</p>
        )}
        {charCount !== undefined && (
          <p><strong>Character Count:</strong> {charCount}</p>
        )}
        {charCountNoSpaces !== undefined && (
          <p><strong>Character Count (No Spaces):</strong> {charCountNoSpaces}</p>
        )}
        {sentenceCount !== undefined && (
          <p><strong>Sentence Count:</strong> {sentenceCount}</p>
        )}
        {avgWordLength !== undefined && (
          <p><strong>Avg. Word Length:</strong> {avgWordLength}</p>
        )}
      </div>

      <h3>🔠 Most Frequent Words</h3>
      {/* Check if topWords exists and is an array */}
      {Array.isArray(topWords) && topWords.length > 0 ? (
        <ul className="word-list">
          {topWords.map(([word, freq], index) => (
            <li key={index}>
              <strong>{word}:</strong> {freq} times
            </li>
          ))}
        </ul>
      ) : (
        <p>No word frequency data available.</p>
      )}
    </div>
  );
};

export default AnalysisResults;
