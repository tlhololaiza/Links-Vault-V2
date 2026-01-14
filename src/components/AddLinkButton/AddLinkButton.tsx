import React from 'react';
import './AddLinkButton.css';

interface AddLinkButtonProps {
  onClick: () => void;
  variant?: 'floating' | 'inline';
}

const AddLinkButton: React.FC<AddLinkButtonProps> = ({ onClick, variant = 'inline' }) => {
  return (
    <button
      className={`add-link-button add-link-button--${variant}`}
      onClick={onClick}
      aria-label="Add new link"
    >
      <span className="add-link-button-icon">+</span>
      <span className="add-link-button-text">Add Link</span>
    </button>
  );
};

export default AddLinkButton;
