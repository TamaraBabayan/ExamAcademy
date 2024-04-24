import React from 'react';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="error-container">
      <h1>404 Error - Page Not Found</h1>
      <p>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
      <a href="/">Go to Home</a>
    </div>
  );
}

export default NotFound;
