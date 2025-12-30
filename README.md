# CineMatch AI - Movie Recommendation App

A full-stack web application that recommends movies based on user preferences using Google Gemini AI.

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Backend**: Node.js + Fastify + TypeScript
- **Database**: SQLite
- **AI**: Google Gemini API

## Prerequisites

- Node.js 18+
- A Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))

## Setup Instructions

### 1. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Add your Gemini API key to .env
# GEMINI_API_KEY=your_api_key_here

# Start development server
npm run dev
```

The backend will run on `http://localhost:3001`

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies (if not already done)
npm install

# Start development server
npm run dev
```

The frontend will run on `http://localhost:5173`

## API Endpoints

### POST /api/recommend

Get movie recommendations based on user preference.

**Request:**

```json
{
  "preference": "action movies with a strong female lead"
}
```

**Response:**

```json
{
  "id": 1,
  "movies": [
    {
      "title": "Wonder Woman",
      "year": 2017,
      "genre": "Action, Adventure",
      "description": "An Amazon princess leaves her island..."
    }
  ]
}
```

### GET /api/recommendations

Get all past recommendations.

### GET /health

Health check endpoint.

## Database Schema

```sql
CREATE TABLE recommendations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_input TEXT NOT NULL,
  recommended_movies TEXT NOT NULL,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## Deployment

### Backend (Render)

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set build command: `npm install && npm run build`
4. Set start command: `npm start`
5. Add environment variable: `GEMINI_API_KEY`

### Frontend (Vercel)

1. Import your repository on Vercel
2. Set root directory to `frontend`
3. Add environment variable: `VITE_API_URL=your-backend-url`
4. Deploy

## Project Structure

```
aceluid/
├── backend/
│   ├── src/
│   │   ├── server.ts
│   │   ├── db.ts
│   │   └── routes/recommendations.ts
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── App.tsx
│   │   ├── App.css
│   │   ├── types.ts
│   │   └── components/
│   │       ├── PreferenceForm.tsx
│   │       └── MovieList.tsx
│   └── package.json
└── README.md
```
