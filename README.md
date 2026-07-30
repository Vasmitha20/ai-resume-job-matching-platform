# AI Resume–Job Matching Platform

> **Personal Learning & Development Repository**

This repository showcases my individual contributions, independent implementation, and technical exploration completed alongside our team's capstone project.

While the official capstone project was designed and submitted collaboratively by our team, this repository focuses on the components I personally implemented, experimented with, and extended to deepen my understanding of AI application development, prompt engineering, and full-stack architecture.

The project is an AI-powered Resume–Job Matching Platform that analyzes resumes against job descriptions using a structured multi-stage LLM pipeline. It extracts information from resumes and job descriptions, evaluates compatibility, validates intermediate results, and generates personalized recommendations.

---

## ✨ Features

* 📄 Resume PDF parsing
* 💼 Job description analysis
* 🤖 Multi-stage Gemini AI pipeline
* 🧠 Prompt-engineered workflow with specialized AI agents
* 📊 Resume–Job compatibility analysis
* ✅ Validation and critique stages for improved output quality
* 💡 Personalized recommendations for candidates
* 🌐 React-based frontend with FastAPI backend
* 📦 Structured JSON responses between frontend and backend
* 📑 Downloadable AI-generated PDF reports

---

## 🏗️ Tech Stack

### Frontend

* React
* Vite
* React Router
* Axios

### Backend

* FastAPI
* Python
* Pydantic

### AI & Prompt Engineering

* Google Gemini API
* Multi-agent prompt engineering
* Modular prompt templates
* JSON-based structured outputs

### Utilities

* PyPDF
* ReportLab
* Python Dotenv

---

## 🧠 Prompt Engineering Pipeline

The AI workflow is divided into multiple specialized prompts instead of relying on a single monolithic prompt.

1. Resume Parser

   * Extracts structured information from uploaded resumes.

2. Job Description Parser

   * Identifies required skills, qualifications, and responsibilities.

3. Worker

   * Performs the primary resume-to-job matching.

4. Critic

   * Reviews the generated analysis for inconsistencies and missing details.

5. Validator

   * Ensures the generated response follows the expected structure and quality.

6. Recommendation

   * Produces personalized suggestions for improving resume compatibility.

This modular pipeline improves maintainability, consistency, and output quality compared to a single-prompt approach.

---

## 📁 Project Structure

```text
backend/
│
├── config/
├── models/
├── prompts/
│   ├── system_prompt.md
│   ├── resume_parser.md
│   ├── jd_parser.md
│   ├── worker.md
│   ├── critic.md
│   ├── validator.md
│   └── recommendation.md
│
├── routers/
├── services/
├── utils/
└── main.py

frontend/
├── public/
├── src/
└── package.json
```

---

## 🚀 Getting Started

### Backend

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

pip install -r requirements.txt

uvicorn main:app --reload
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## 🎯 Learning Outcomes

Through this project, I gained practical experience with:

* Prompt engineering for LLM applications
* Building modular AI workflows
* FastAPI backend development
* React frontend integration
* REST API design
* Structured JSON generation
* Resume parsing and information extraction
* Multi-stage AI validation techniques
* PDF report generation using ReportLab

---

## 🔮 Future Improvements

* User authentication and profile management
* Resume version comparison
* Support for DOCX resumes
* Interview preparation recommendations
* AI chat assistant for career guidance
* Enhanced analytics and visualizations

---

## 🙏 Acknowledgement

This repository represents my personal implementation and technical exploration completed alongside our team's capstone project.

The official capstone submission was developed collaboratively by our team. This repository is intended to showcase my individual learning journey, implementation work, and experimentation with AI application development and prompt engineering.

---

## 🤝 Official Team Project

Official Team Repository:
https://github.com/vedhapoojithaangarapu-bit/AI-Resume-Job-Matching-Platform.git

Live Application:
https://ai-resume-job-matching-platform.vercel.app

For the complete collaborative submission, including the final deployed application, please visit the official team repository above.
