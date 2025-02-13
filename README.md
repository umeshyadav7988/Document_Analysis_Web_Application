# 📄 Document Analysis Web Application

##  Overview
The **Document Analysis Web Application** allows users to upload scanned PDFs and extract text-based insights using **Azure Document Intelligence API**. The application provides various document statistics and word frequency analysis in a user-friendly interface.

## 🛠 Features
### ✅ Frontend:
- **Drag-and-drop file upload** (Supports PDF only)
- **Document statistics**:
  - Word count
  - Character count (with and without spaces)
  - Sentence count
  - Average word length
- **Word frequency analysis**:
  - Top 20 most frequent words
  - Option to exclude common words (stop words)
- **Loading states & error handling**
- **Responsive UI** (Mobile & desktop-friendly)

### ✅ Backend:
- **File validation** (Ensures only PDFs are uploaded)
- **Azure Document Intelligence API Integration** (OCR for text extraction)
- **Text analysis computation** (Statistics & word frequency)
- **RESTful API endpoints** with proper error handling

## 📂 Repository Structure
```
Document_Analysis_Web_Application/
│── backend/               # Node.js backend with Azure API integration
│── frontend/              # React frontend for UI
│── public/                # Static assets
│── src/                   # Frontend components
│── .gitignore
│── README.md
│── package.json
│── server.js              # Main backend server file
```

## 🛠️ Setup Instructions
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/umeshyadav7988/Document_Analysis_Web_Application.git
cd Document_Analysis_Web_Application
```

### **2️⃣ Install Dependencies**
#### **Backend:**
```sh
cd backend
npm install
```
#### **Frontend:**
```sh
cd frontend
npm install
```

### **3️⃣ Setup Environment Variables**
Create a **.env** file in the `backend` directory and add the following:
```
AZURE_API_KEY=your_azure_api_key
AZURE_ENDPOINT=your_azure_endpoint
PORT=5000
```

### **4️⃣ Run the Application**
#### **Start Backend:**
```sh
cd backend
npm start
```
#### **Start Frontend:**
```sh
cd frontend
npm start
```

## 🔗 API Endpoints
| Method | Endpoint          | Description |
|--------|------------------|-------------|
| POST   | `/upload`        | Uploads a PDF and extracts text |
| GET    | `/analysis`      | Returns text statistics & word frequency |

## ⚖️ Design Decisions & Trade-offs
- **Azure Document Intelligence API** was chosen for **high accuracy OCR**.
- **In-memory processing** instead of database storage to keep it lightweight.
- **Excludes handwritten text recognition** due to API limitations.
- **No authentication** as this is a standalone document analysis tool.

##  Future Improvements
- ✅ Support for **multi-file upload**
- ✅ **Downloadable reports** (PDF/CSV)
- ✅ **Advanced NLP analysis** (Sentiment, named entity recognition)
- ✅ **User authentication & history tracking**

## 🌍 Live Deployment
The application is live at: [Document Analysis Web Application](https://document-analysis-web-application-gqn5wwsgv.vercel.app)

## 📬 Contact
Developed by **Umesh Yadav**  
📧 Email: [umeshyadav7988@gmail.com](mailto:umeshyadav7988@gmail.com)

