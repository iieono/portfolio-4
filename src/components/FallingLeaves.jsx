import React, { useState, useEffect, useCallback } from "react";

const TeaLeaf = ({ x, leafType }) => {
  const [position, setPosition] = useState({ x, y: -100 });
  const [rotation, setRotation] = useState(Math.random() * 360);
  const [parameters] = useState({
    swayFrequency: 0.5 + Math.random() * 1.5,
    swayAmplitude: 50 + Math.random() * 100,
    fallSpeed: 0.5 + Math.random() * 1.5,
    rotationSpeed: Math.random() * 2 - 1,
  });

  useEffect(() => {
    const fallAnimation = setInterval(() => {
      setPosition((prev) => ({
        x:
          prev.x +
          (Math.sin((Date.now() / 1000) * parameters.swayFrequency) *
            parameters.swayAmplitude) /
            100,
        y: prev.y + parameters.fallSpeed,
      }));
      setRotation((prev) => prev + parameters.rotationSpeed);
    }, 16); // ~60fps

    return () => clearInterval(fallAnimation);
  }, [parameters]);

  if (position.y > window.innerHeight) return null;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      style={{
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: "60px",
        height: "60px",
        transform: `rotate(${rotation}deg)`,
        transition: "transform 0.5s ease-in-out",
      }}
    >
      <use href={`#leaf${leafType}`} />
    </svg>
  );
};

const FallingLeaves = () => {
  const [leaves, setLeaves] = useState([]);
  const [lastAddTime, setLastAddTime] = useState(0);

  const addLeaf = useCallback(
    (x) => {
      const now = Date.now();
      if (now - lastAddTime > 100) {
        // Add a new leaf every 100ms at most
        const newLeaf = {
          id: now,
          x,
          leafType: Math.floor(Math.random() * 3) + 1,
        };
        setLeaves((prevLeaves) => [...prevLeaves, newLeaf]);
        setLastAddTime(now);
      }
    },
    [lastAddTime]
  );

  useEffect(() => {
    const handleMouseMove = (e) => {
      addLeaf(e.clientX);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [addLeaf]);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    >
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <g id="leaf1">
            <path d="M50,10 Q70,50 50,90 Q30,50 50,10" fill="#2ecc71" />
            <path
              d="M50,10 Q55,50 50,90"
              fill="none"
              stroke="#27ae60"
              strokeWidth="2"
            />
          </g>
          <g id="leaf2">
            <path d="M30,20 Q50,50 70,80 Q40,65 30,20" fill="#27ae60" />
            <path
              d="M30,20 Q50,50 70,80"
              fill="none"
              stroke="#229954"
              strokeWidth="2"
            />
          </g>
          <g id="leaf3">
            <path d="M20,50 Q50,30 80,50 Q50,70 20,50" fill="#1abc9c" />
            <path
              d="M20,50 Q50,30 80,50"
              fill="none"
              stroke="#16a085"
              strokeWidth="2"
            />
          </g>
        </defs>
      </svg>
      {leaves.map((leaf) => (
        <TeaLeaf key={leaf.id} x={leaf.x} leafType={leaf.leafType} />
      ))}
    </div>
  );
};

export default FallingLeaves;
