import React from 'react';
import './Loader.css';

export default function Loader({ message = 'Loading...' }) {
  return (
    <div className="loader-overlay" role="status" aria-live="polite" aria-busy="true">
      <div className="loader-container">
        <div className="spinner" />
        <span className="loader-message">{message}</span>
      </div>
    </div>
  );
}
