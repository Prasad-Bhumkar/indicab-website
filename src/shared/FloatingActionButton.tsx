import React from 'react';

interface FloatingActionButtonProps {
  icon: string;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  tooltip?: string;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ icon, position, tooltip }) => {
  return (
    <div className={`fab ${position}`}>
      {tooltip && <span className="tooltip">{tooltip}</span>}
      <button className="fab-button" aria-label={tooltip || `Floating action button with ${icon} icon`}>
        <i className={`icon-${icon}`}></i>
      </button>
    </div>
  );
};

export default FloatingActionButton;
