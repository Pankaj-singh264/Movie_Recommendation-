import { useState } from "react";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Handle form submission to get movie recommendations
   * @param {Event} e - Form submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    // Reset state
    setLoading(true);
    setError(null);
    setRecommendations([]);

    try {
      // Make POST request to backend API
      const response = await fetch(
        "https://movie-recommendation-backend2.onrender.com/api/recommendations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt }),
        },
      );

      // Handle non-OK responses
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch recommendations");
      }

      // Parse and set recommendations
      const data = await response.json();
      console.log("Backend response:", data);

      // Ensure recommendations is an array
      const movieRecommendations = Array.isArray(data.recommendations)
        ? data.recommendations
        : [];

      setRecommendations(movieRecommendations);
    } catch (err) {
      console.error("Error:", err);
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Animated Background Orbs */}
      <div className="background-orbs">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>

      <div className="app-container">
        <header>
          <h1>MovieMind AI</h1>
          <p className="subtitle">
            Discover your next favorite movie with AI-powered recommendations
          </p>
        </header>

        <form className="search-form" onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="e.g., action movies with a strong female lead"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={loading}
            />
          </div>
          <button type="submit" disabled={loading || !prompt.trim()}>
            {loading ? "Finding..." : "Get Recommendations"}
          </button>
        </form>

        {error && <div className="error-message">⚠️ {error}</div>}

        {loading && (
          <div className="loader">
            <div className="spinner-container">
              <div className="spinner"></div>
              <div className="spinner-inner"></div>
            </div>
          </div>
        )}

        <div className="recommendations-grid">
          {recommendations &&
            recommendations.length > 0 &&
            recommendations.map((movie, index) => (
              <div key={index} className="movie-card">
                <h3>{movie.title}</h3>
                <div className="movie-meta">
                  <span>{movie.year}</span>
                  <span>•</span>
                  <span>{movie.genre}</span>
                </div>
                <p>{movie.description}</p>
              </div>
            ))}
        </div>

        {!loading && recommendations.length === 0 && !error && (
          <div className="empty-state">
            <div className="empty-state-icon">🎬</div>
            <p>
              Tell us what kind of movie you're in the mood for, and we'll find
              the perfect recommendations!
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
