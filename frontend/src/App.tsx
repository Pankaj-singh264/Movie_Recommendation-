import { useEffect, useState } from 'react';
import { api } from './services/api';
import { Movie, PreviousRecommendationResponse } from './types';
import PromptBar from './components/features/PromptBar';
import MovieCard from './components/features/MovieCard';
import HistoryList from './components/features/HistoryList';
import './App.css';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [history, setHistory] = useState<PreviousRecommendationResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const data = await api.getHistory();
      setHistory(data);
    } catch (err) {
      console.error('Failed to load history', err);
    }
  };

  const handleGenerate = async (preference: string) => {
    setIsLoading(true);
    setError(null);
    setMovies([]);

    try {
      const response = await api.getRecommendations(preference);
      setMovies(response.movies);
      loadHistory(); // Refresh history
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteHistory = async (id: number) => {
    try {
      await api.deleteHistoryItem(id);
      setHistory(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      console.error('Failed to delete item', err);
    }
  };

  return (
    <div className="app-container">
      <div className="background-glow"></div>

      <header className="app-header">
        <h1 className="app-logo">
          <span className="logo-text text-gradient">CineMatch AI</span>
          <span className="logo-spark">✨</span>
        </h1>
        <p className="app-subtitle">Discover Your Next Cinematic Experience</p>
      </header>

      <main className="container">
        <section className="prompt-section">
          <PromptBar onSubmit={handleGenerate} isLoading={isLoading} />
        </section>

        {error && (
          <div className="error-banner">
            <span>⚠️ {error}</span>
          </div>
        )}

        {movies.length > 0 && (
          <section className="results-section">
            <h2 className="section-title">Recommended For You</h2>
            <div className="movies-grid">
              {movies.map((movie, index) => (
                <MovieCard key={`${movie.title}-${index}`} movie={movie} />
              ))}
            </div>
          </section>
        )}

        {isLoading && (
          <div className="loading-state">
            <div className="scanner"></div>
            <p>Analyzing cinematic universe...</p>
          </div>
        )}

        <section className="history-section">
          <HistoryList items={history} onDelete={handleDeleteHistory} />
        </section>
      </main>

      <footer className="app-footer">
        <p>© 2026 CineMatch AI</p>
        <p className="footer-credits">Crafted with intelligence</p>
      </footer>
    </div>
  );
}

export default App;
