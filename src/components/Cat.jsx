import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const AnimatedCat = () => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsVisible(false); // Reset visibility when pathname changes
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (location.pathname !== "/") {
    return null; // Don't render the cat on other pages
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 300 200"
      className={`absolute ${
        isVisible ? "opacity-100" : "opacity-0"
      }  lg:flex h-1/3 w-full md:w-1/4 bottom-20 right-0 md:right-[15%] lg:right-[12.5%] z-0`}
    >
      <style>
        {`
          @keyframes earTwitch {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(3deg); }
          }
          @keyframes tailWag {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(-5deg); }
          }
        `}
      </style>
      {/* Laptop */}
      <rect x="75" y="120" width="150" height="10" fill="#333" />
      <rect x="75" y="50" width="150" height="70" fill="#444" />
      {/* Cat body */}
      <ellipse cx="150" cy="140" rx="50" ry="40" fill="#fff" />
      {/* Cat head */}
      <ellipse cx="150" cy="100" rx="35" ry="30" fill="#fff" />
      {/* Cat ears (animated) */}
      <g transform-origin="135 80">
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0; 3; 0"
          dur="3s"
          repeatCount="indefinite"
        />
        <polygon points="120,80 135,60 150,80" fill="#fff" />
        <polygon points="125,75 135,62 145,75" fill="#ffcccb" />
      </g>
      <g transform-origin="165 80">
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0; 3; 0"
          dur="3s"
          repeatCount="indefinite"
        />
        <polygon points="150,80 165,60 180,80" fill="#fff" />
        <polygon points="155,75 165,62 175,75" fill="#ffcccb" />
      </g>
      {/* Cat tail (animated) */}
      <path
        d="M200,140 Q230,160 250,140"
        stroke="#fff"
        strokeWidth="15"
        fill="none"
        strokeLinecap="round"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0 200 140; -5 200 140; 0 200 140"
          dur="3s"
          repeatCount="indefinite"
        />
      </path>
      <path
        d="M240,140 Q245,142 250,140"
        stroke="#ffcccb"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0 200 140; -5 200 140; 0 200 140"
          dur="3s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
};

export default AnimatedCat;
