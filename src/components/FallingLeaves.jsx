import React, { useState, useEffect, useCallback, useRef } from "react";

const TeaLeaf = ({ x, y, leafType, rotation }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      style={{
        position: "absolute",
        left: `${x}px`,
        top: `${y}px`,
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
  const lastAddTimeRef = useRef(0);

  const addLeaf = useCallback((x) => {
    const now = Date.now();
    if (now - lastAddTimeRef.current > 200) {
      // Increased time interval to reduce leaf creation rate
      // Add a new leaf every 500ms at most
      const newLeaf = {
        id: now,
        x,
        y: -100, // Start position off-screen
        leafType: Math.floor(Math.random() * 3) + 1,
        rotation: Math.random() * 360,
        parameters: {
          swayFrequency: 0.2 + Math.random() * 0.8, // Slower sway frequency
          swayAmplitude: 30 + Math.random() * 70, // Reduced sway amplitude
          fallSpeed: 0.1 + Math.random() * 0.5, // Slower fall speed
          rotationSpeed: Math.random() * 0.5 - 0.25, // Slower rotation speed
        },
      };
      setLeaves((prevLeaves) => [...prevLeaves, newLeaf]);
      lastAddTimeRef.current = now;
    }
  }, []);

  const handleMouseMove = useCallback(
    (e) => {
      addLeaf(e.clientX);
    },
    [addLeaf]
  );

  useEffect(() => {
    const throttledMouseMove = (e) => {
      requestAnimationFrame(() => handleMouseMove(e));
    };

    window.addEventListener("mousemove", throttledMouseMove);
    return () => window.removeEventListener("mousemove", throttledMouseMove);
  }, [handleMouseMove]);

  // Animation function to update leaf positions
  useEffect(() => {
    const updateLeaves = () => {
      setLeaves(
        (prevLeaves) =>
          prevLeaves
            .map((leaf) => {
              const now = Date.now();
              const timeElapsed = (now - leaf.id) / 600; // in seconds

              return {
                ...leaf,
                y: leaf.y + leaf.parameters.fallSpeed,
                x:
                  leaf.x +
                  (Math.sin(timeElapsed * leaf.parameters.swayFrequency) *
                    leaf.parameters.swayAmplitude) /
                    100,
                rotation: leaf.rotation + leaf.parameters.rotationSpeed,
              };
            })
            .filter((leaf) => leaf.y < window.innerHeight) // Keep only leaves within the viewport
      );

      requestAnimationFrame(updateLeaves);
    };

    updateLeaves(); // Start the animation loop

    return () => cancelAnimationFrame(updateLeaves);
  }, []);

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
        <TeaLeaf
          key={leaf.id}
          x={leaf.x}
          y={leaf.y}
          leafType={leaf.leafType}
          rotation={leaf.rotation}
        />
      ))}
    </div>
  );
};

export default FallingLeaves;
