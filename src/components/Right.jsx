import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";
import textData from "../data/animationCode";

function Right() {
  const rightRef = useRef(null);
  const glitchRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(() => {
    gsap.set(rightRef.current, { y: "-100%" });
    gsap.to(rightRef.current, {
      y: 0,
      ease: "power4.out",
      duration: 1,
      delay: 0.5,
    });
    gsap.to(glitchRef.current, {
      background: "#000",
      duration: 0.05,
      yoyo: true,
      repeat: 7,
      delay: 2,
      onComplete: () => {
        gsap.to(glitchRef.current, {
          background: "#000000", // Black background on complete
          duration: 2,
        });
      },
    });
    gsap.fromTo(
      textRef.current,
      {
        y: "20%",
      },
      {
        y: "-120%",
        duration: 10,
        delay: 1,
        repeat: -1,
        ease: "linear",
      },
      "-=1"
    );
  });
  return (
    <div ref={rightRef} className="right divide h-full w-full ">
      <div
        ref={glitchRef}
        data-comp="idk-47"
        className="component text-red-200"
      >
        <div
          className="h-max absolute"
          ref={textRef}
          style={{
            whiteSpace: "pre-wrap",
          }}
        >
          {textData}
        </div>
      </div>
      <div data-comp="stuff-46" className="component">
        4
      </div>
    </div>
  );
}

export default Right;
