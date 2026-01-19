# CineMatch AI - Movie Recommendation App

A full-stack web application that leverages Google's Gemini AI to provide personalized movie recommendations based on user preferences.

## 🚀 Features

- **AI-Powered Recommendations**: Uses Google Gemini AI to understand natural language preferences.
- **Modern UI**: Built with React and styled for a premium user experience.
- **History Tracking**: Keeps a local record of your requested recommendations.
- **Fast Performance**: Powered by Vite and Fastify.

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Backend**: Node.js, Fastify, TypeScript
- **AI Engine**: Google Gemini API
- **Database**: SQLite (via `sql.js`)

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm
- A Google Gemini API Key ([Get it here](https://makersuite.google.com/app/apikey))

## ⚙️ Installation & Setup

### 1. Backend Setup

The backend handles API requests and communicates with the Gemini AI service.

1.  Navigate to the backend directory:

    ```bash
    cd backend
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

3.  Configure Environment Variables:
    - Create a `.env` file in the `backend` directory.
    - Add your Gemini API key:
      ```env
      GEMINI_API_KEY=your_actual_api_key_here
      ```

4.  Start the backend server:
    ```bash
    npm run dev
    ```
    The server will start at `http://localhost:3001`.

### 2. Frontend Setup

The frontend provides the user interface for interacting with the application.

1.  Open a new terminal and navigate to the frontend directory:

    ```bash
    cd frontend
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

3.  Start the frontend development server:
    ```bash
    npm run dev
    ```
    The application will be accessible at `http://localhost:5173`.

## 📂 Project Structure

```
Movie_Recommendation/
├── backend/            # Backend server code
│   ├── src/
│   │   ├── server.ts   # Entry point
│   │   └── ...
│   ├── package.json
│   └── .env            # API keys (create this)
├── frontend/           # Frontend React application
│   ├── src/
│   │   ├── App.tsx     # Main component
│   │   └── ...
│   └── package.json
├── .gitignore          # Git ignore rules
└── README.md           # Project documentation
```

## 🔌 API Endpoints

### `POST /api/recommend`

Generates movie recommendations.

**Request Body:**

```json
{
  "preference": "I want to watch a sci-fi movie about time travel"
}
```

### `GET /api/recommendations`

Retrieves the history of recommendations.

### `GET /health`

Checks if the server is running.
