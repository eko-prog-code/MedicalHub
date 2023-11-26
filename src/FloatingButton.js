// FloatingButton.js
import React, { useState, useEffect } from 'react';
import './Home.css';

const FloatingButton = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 20000); // Button will be visible for 20 seconds initially

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const visibilityTimer = setInterval(() => {
      setIsVisible((prev) => !prev);
    }, 26000); // Toggle visibility every 26 seconds (20 seconds visible + 6 seconds hidden)

    return () => {
      clearInterval(visibilityTimer);
    };
  }, []);

  return isVisible ? (
    <a
      href="https://chat.whatsapp.com/JXadicShWCD2sHayYWC7NU"
      className="floating-button"
      target="_blank"
      rel="noopener noreferrer"
    >
      Komunitas Medical Hub
    </a>
  ) : null;
};

export default FloatingButton;
