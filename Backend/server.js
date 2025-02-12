require("dotenv").config();
const express = require("express");
const multer = require("multer");
const axios = require("axios");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const upload = multer({ dest: "uploads/" });

// Upload and process PDF
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    // Read file
    const fileBuffer = fs.readFileSync(req.file.path);

    // Call Azure Document Intelligence API
    const azureResponse = await axios.post(
      `${process.env.AZURE_ENDPOINT}/formrecognizer/documentModels/prebuilt-read:analyze?api-version=2023-07-31`,
      fileBuffer,
      {
        headers: {
          "Ocp-Apim-Subscription-Key": process.env.AZURE_KEY,
          "Content-Type": "application/pdf",
        },
      }
    );

    const textData = azureResponse.data.analyzeResult.content;
    const analysis = analyzeText(textData);

    res.json(analysis);
  } catch (error) {
    res.status(500).json({ error: "Failed to process document" });
  }
});

// Text analysis function
function analyzeText(text) {
  const words = text.match(/\b\w+\b/g) || [];
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
  const wordCount = words.length;
  const charCount = text.length;
  const charCountNoSpaces = text.replace(/\s/g, "").length;
  const avgWordLength = wordCount ? charCountNoSpaces / wordCount : 0;

  const wordFreq = words.reduce((acc, word) => {
    word = word.toLowerCase();
    acc[word] = (acc[word] || 0) + 1;
    return acc;
  }, {});

  const sortedFreq = Object.entries(wordFreq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20);

  return {
    wordCount,
    charCount,
    charCountNoSpaces,
    sentenceCount: sentences.length,
    avgWordLength,
    wordFrequency: sortedFreq,
  };
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
