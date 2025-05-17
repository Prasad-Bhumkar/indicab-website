import React from 'react';

export interface FloatingActionButtonProps {
    icon: string;
    position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    tooltip?: string;
}

const _FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ icon, position, tooltip }): JSX.Element => {
    return (
        <div className={`fab ${position}`}>
            {tooltip && <span className="tooltip">{tooltip}</span>}
            <button className="fab-button" aria-label={tooltip || `Floating action button with ${icon} icon`}>
                <i className={`icon-${icon}`}></i>
            </button>
        </div>
    );
};

export default _FloatingActionButton;
