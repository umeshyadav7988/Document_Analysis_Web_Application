require("dotenv").config();
const express = require("express");
const multer = require("multer");
const Tesseract = require("tesseract.js");
const pdfParse = require("pdf-parse");
const cors = require("cors");
const fs = require("fs");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const upload = multer({ dest: "uploads/" });

app.post("/upload", upload.single("file"), async (req, res) => {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const filePath = req.file.path;
    let extractedText = "";

    try {
        if (req.file.mimetype === "application/pdf") {
            // Extract text from PDF
            const dataBuffer = fs.readFileSync(filePath);
            const pdfData = await pdfParse(dataBuffer);
            extractedText = pdfData.text;
        } else {
            // Perform OCR on scanned images (JPG, PNG, etc.)
            const { data } = await Tesseract.recognize(filePath, "eng");
            extractedText = data.text;
        }

        fs.unlinkSync(filePath); // Remove uploaded file after processing
        const analysis = analyzeText(extractedText);

        res.json({ text: extractedText, analysis });
    } catch (error) {
        console.error("Error processing document:", error);
        res.status(500).json({ error: "Error processing document", details: error.message });
    }
});

// Function to analyze extracted text
function analyzeText(text) {
    const words = text.match(/\b\w+\b/g) || [];
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
    const wordCount = words.length;
    const charCount = text.length;
    const charCountNoSpaces = text.replace(/\s/g, "").length;
    const avgWordLength = wordCount ? (charCountNoSpaces / wordCount).toFixed(2) : 0;

    // Word frequency analysis
    const wordFreq = {};
    words.forEach(word => {
        const lowerWord = word.toLowerCase();
        wordFreq[lowerWord] = (wordFreq[lowerWord] || 0) + 1;
    });

    // Exclude common stop words
    const stopWords = new Set([
        "the", "and", "a", "an", "of", "to", "in", "on", "for", "with", "this", "that", "it", "is", "was", "were", "be", "been"
    ]);

    const filteredWordFreq = Object.entries(wordFreq)
        .filter(([word]) => !stopWords.has(word))
        .sort((a, b) => b[1] - a[1])
        .slice(0, 20); // Get top 20 frequent words, excluding stop words

    return {
        wordCount,
        charCount,
        charCountNoSpaces,
        sentenceCount: sentences.length,
        avgWordLength,
        topWords: filteredWordFreq
    };
}

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
