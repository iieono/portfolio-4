import React, { useEffect, useRef } from "react";

const SubtleFractalBackground = () => {
  const svgRef = useRef(null);

  const createFractal = (x, y, size, depth, index) => {
    if (depth === 0) return null;

    const halfSize = size / 2;
    const quarter = size / 4;

    return (
      <g key={`${x}-${y}-${size}-${index}`} className="fractal-group">
        <rect
          x={x}
          y={y}
          width={size}
          height={size}
          fill="none"
          stroke="url(#fractalGradient)"
          strokeWidth={0.5 / (6 - depth)}
          opacity={0.3 + depth * 0.1}
        />
        {createFractal(
          x + quarter,
          y + quarter,
          halfSize,
          depth - 1,
          index * 4 + 1
        )}
        {createFractal(
          x - quarter,
          y - quarter,
          halfSize,
          depth - 1,
          index * 4 + 2
        )}
        {createFractal(
          x + size + quarter,
          y - quarter,
          halfSize,
          depth - 1,
          index * 4 + 3
        )}
        {createFractal(
          x - quarter,
          y + size + quarter,
          halfSize,
          depth - 1,
          index * 4 + 4
        )}
      </g>
    );
  };

  useEffect(() => {
    const svg = svgRef.current;
    let frame;
    let time = 0;

    const animate = () => {
      time += 0.01;
      const fractalGroups = svg.querySelectorAll(".fractal-group");

      fractalGroups.forEach((group, index) => {
        const scale = 1 + Math.sin(time + index * 0.1) * 0.03;
        const hueShift = Math.sin(time * 0.2 + index * 0.05) * 20;

        group.style.transform = `scale(${scale})`;
        group.style.filter = `hue-rotate(${hueShift}deg)`;
      });

      frame = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="absolute w-full h-full -z-20">
      <svg
        ref={svgRef}
        className="w-full h-full"
        viewBox="-50 -50 100 100"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="fractalGradient">
            <stop offset="0%" stopColor="#001a33" />
            <stop offset="50%" stopColor="#003366" />
            <stop offset="100%" stopColor="#0059b3" />
          </radialGradient>
        </defs>
        <rect x="-50" y="-50" width="100" height="100" fill="#000913" />
        {createFractal(-25, -25, 50, 5, 0)}
      </svg>
    </div>
  );
};

export default SubtleFractalBackground;
