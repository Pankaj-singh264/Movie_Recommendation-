import React from 'react';
import './GlassCard.css';

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
    hoverEffect?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', hoverEffect = false }) => {
    return (
        <div className={`glass-card ${hoverEffect ? 'glass-card--hover' : ''} ${className}`}>
            {children}
        </div>
    );
};

export default GlassCard;
