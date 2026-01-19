import React from 'react';
import type { Movie } from '../../types';
import GlassCard from '../common/GlassCard';
import './MovieCard.css';

interface MovieCardProps {
    movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
    return (
        <GlassCard hoverEffect className="movie-card-new">
            <div className="movie-card-header">
                <h3 className="movie-card-title">{movie.title}</h3>
                <span className="movie-card-year">{movie.year}</span>
            </div>
            <div className="movie-card-tags">
                <span className="movie-genre-tag">{movie.genre}</span>
            </div>
            <p className="movie-card-desc">{movie.description}</p>
        </GlassCard>
    );
};

export default MovieCard;
