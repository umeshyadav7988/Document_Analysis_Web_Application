import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import "../styles.css";

const FileUpload = ({ setAnalysisData }) => {
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { getRootProps, getInputProps } = useDropzone({
    accept: "application/pdf",
    multiple: false,
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (!file) return;

      setFileName(file.name);
      setLoading(true);
      setError("");

      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post("http://localhost:5000/upload", formData);
        console.log(response.data); // Log the response to check structure
        setAnalysisData(response.data.analysis); // Make sure you're passing analysis data
      } catch (err) {
        setError("Failed to process file. Please try again.");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="upload-container">
      <div {...getRootProps()} className="drop-area">
        <input {...getInputProps()} />
        <p>Drag & drop a PDF here or click to upload</p>
      </div>
      {fileName && <p className="file-info">📄 {fileName}</p>}
      {loading && <p className="file-info">Processing...</p>}
      {error && <p className="file-info" style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default FileUpload;
