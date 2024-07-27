import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";
import textData from "../data/animationCode";

function About() {
  const rightRef = useRef(null);

  useGSAP(() => {
    gsap.set(rightRef.current, { y: "100%" });
    gsap.to(rightRef.current, {
      y: 0,
      ease: "power4.out",
      duration: 1,
      delay: 0.5,
    });
  });
  return (
    <div ref={rightRef} className="right divide h-full w-full ">
      <div data-comp="idk-00" className="component top">
        3
      </div>
      <div data-comp="her-3" className="component">
        4
      </div>
    </div>
  );
}

export default About;
