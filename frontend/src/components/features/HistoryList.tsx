import React, { useState } from 'react';
import type { PreviousRecommendationResponse } from '../../types';
import Button from '../common/Button';
import GlassCard from '../common/GlassCard';
import './HistoryList.css';

interface HistoryListProps {
    items: PreviousRecommendationResponse[];
    onDelete: (id: number) => void;
}

const HistoryList: React.FC<HistoryListProps> = ({ items, onDelete }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className="history-toggle">
                <Button variant="secondary" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? 'Hide History' : 'Show History'}
                </Button>
            </div>

            <div className={`history-panel ${isOpen ? 'open' : ''}`}>
                <h3 className="history-title">Recent Finds</h3>
                <div className="history-grid">
                    {items.map((item) => (
                        <GlassCard key={item.id} className="history-item">
                            <div className="history-content">
                                <p className="history-prompt">"{item.user_input}"</p>
                                <span className="history-count">{item.recommended_movies.length} movies</span>
                            </div>
                            <button
                                className="history-delete-btn"
                                onClick={() => onDelete(item.id)}
                                title="Delete"
                            >
                                ×
                            </button>
                        </GlassCard>
                    ))}
                    {items.length === 0 && (
                        <p className="history-empty">No searches yet.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default HistoryList;
