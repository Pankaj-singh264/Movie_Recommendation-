import React, { useState } from 'react';
import Button from '../common/Button';
import './PromptBar.css';

interface PromptBarProps {
    onSubmit: (preference: string) => void;
    isLoading: boolean;
}

const PromptBar: React.FC<PromptBarProps> = ({ onSubmit, isLoading }) => {
    const [input, setInput] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim()) {
            onSubmit(input.trim());
        }
    };

    return (
        <div className="prompt-container">
            <form onSubmit={handleSubmit} className="prompt-bar">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Describe the movie vibe you're looking for..."
                    className="prompt-input"
                    disabled={isLoading}
                />
                <Button
                    type="submit"
                    variant="primary"
                    isLoading={isLoading}
                    className="prompt-submit-btn"
                    disabled={!input.trim()}
                >
                    Generate
                </Button>
            </form>
            <div className="prompt-tips">
                <span>Try: "Sci-fi with time travel", "90s Rom-Com", "Dark psychological thriller"</span>
            </div>
        </div>
    );
};

export default PromptBar;
