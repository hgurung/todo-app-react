import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-dark text-white text-center py-3 mt-auto">
      <div className="container">
        <p className="mb-0">&copy; {new Date().getFullYear()} TodoApp — All Rights Reserved.</p>
        <small>Built with React & Bootstrap</small>
      </div>
    </footer>
  );
}
