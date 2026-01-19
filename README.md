# Movie Recommendation Web App

A simple web application that recommends movies based on user input using AI (OpenAI API).

## Tech Stack
- **Frontend**: React + Vite
- **Backend**: Node.js + Fastify
- **Database**: SQLite
- **AI**: Google Gemini API (Gemini 1.5 Flash)

## Prerequisites
- Node.js installed
- Google Gemini API Key

## Setup and Installation

### 1. Clone the repository
```bash
git clone <repo-url>
cd <repo-name>
```

### 2. Backend Setup
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory and add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
4. Start the backend server:
   ```bash
   npm start
   ```
   The server will run on `http://localhost:3001`.

### 3. Frontend Setup
1. Open a new terminal and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`.

## Database Schema
The SQLite database (`backend/movies.db`) contains a `recommendations` table:
- `id`: INTEGER PRIMARY KEY
- `user_input`: TEXT
- `recommended_movies`: TEXT (JSON)
- `timestamp`: DATETIME

## Deployment
- **Frontend**: Can be deployed to Vercel or Netlify. Ensure the API URL in `App.jsx` is updated to your backend URL.
- **Backend**: Can be deployed to Render or Fly.io.
