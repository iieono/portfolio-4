import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useCallback, useEffect, useRef, useState } from "react";
import textData from "../data/animationCode";
import { Link } from "react-router-dom";

function Home() {
  const rightRef = useRef(null);
  const glitchRef = useRef(null);
  const textRef = useRef(null);
  const nameRef = useRef(null);
  const heroRef = useRef(null);
  const infoRef = useRef(null);
  const stuffRef = useRef(null);
  const [idkCounter, setIdkCounter] = useState(0);
  const [frameInfo, setFrameInfo] = useState({ width: 0, height: 0, fps: 0 });
  const fpsRef = useRef({ frames: 0, lastTime: performance.now() });

  const updateFrameInfo = useCallback(() => {
    setFrameInfo((prevInfo) => ({
      ...prevInfo,
      width: window.innerWidth,
      height: window.innerHeight,
    }));
  }, []);

  const calculateFPS = useCallback(() => {
    const now = performance.now();
    const delta = now - fpsRef.current.lastTime;
    fpsRef.current.frames++;

    if (delta >= 1000) {
      const fps = Math.round((fpsRef.current.frames * 1000) / delta);
      setFrameInfo((prevInfo) => ({ ...prevInfo, fps }));
      fpsRef.current.frames = 0;
      fpsRef.current.lastTime = now;
    }

    requestAnimationFrame(calculateFPS);
  }, []);

  useEffect(() => {
    updateFrameInfo();
    window.addEventListener("resize", updateFrameInfo);
    const animationId = requestAnimationFrame(calculateFPS);

    return () => {
      window.removeEventListener("resize", updateFrameInfo);
      cancelAnimationFrame(animationId);
    };
  }, [updateFrameInfo, calculateFPS]);

  useGSAP(() => {
    // Animation for rightRef remains outside the timeline
    gsap.set(rightRef.current, { y: "-100%" });
    gsap.to(rightRef.current, {
      y: 0,
      ease: "power4.out",
      duration: 1,
      delay: 0.5,
    });
    if (window.innerWidth > 1024) {
      gsap.from(heroRef.current, {
        x: -50,
        opacity: 0,
        ease: "power4.out",
        duration: 2,
        delay: 1,
      });
    }
    // Create a timeline for other animations
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0 });

    // Add animations to the timeline
    tl.to(glitchRef.current, {
      background: "#000",
      duration: 0.05,
      yoyo: true,
      repeat: 7,
      delay: 4,
      onComplete: () => {
        gsap.to(glitchRef.current, {
          background: "#000000",
          duration: 2,
        });
        if (glitchRef.current) {
          glitchRef.current.setAttribute("data-comp", "err-410");
        }
      },
    })
      .to(
        nameRef.current,
        {
          opacity: 0,
          duration: 1,
          ease: "power4.out",
        },
        "+=0.5"
      )
      .to(infoRef.current, {
        opacity: 0,
        duration: 1,
        ease: "power4.out",
      })
      // .to(
      //   stuffRef.current,
      //   {
      //     rotateX: 110,
      //     duration: 1,
      //     delay: 1,
      //     ease: "Bounce.easeOut",
      //   },
      //   "-=0.5"
      // )
      .fromTo(
        textRef.current,
        {
          y: "20%",
        },
        {
          y: "-120%",
          duration: 5,
          ease: "linear",
        },
        "-=0.5"
      )
      .to(
        glitchRef.current,
        {
          background: "#fecaca",
          duration: 0.05,
          yoyo: true,
          repeat: 6,
          delay: 1,
          onComplete: () => {
            gsap.to(glitchRef.current, {
              background: "#fecaca",
              duration: 1,
            });
            if (glitchRef.current) {
              setIdkCounter((prevCounter) => {
                const newCounter = prevCounter + 1;
                glitchRef.current.setAttribute(
                  "data-comp",
                  `idk-${String(newCounter).padStart(2, "0")}`
                );
                return newCounter;
              });
            }
          },
        },
        "-=0.5"
      )
      .to(
        nameRef.current,
        {
          opacity: 1,
          duration: 1,
          ease: "power4.out",
        },
        "-=0.5"
      )
      .to(
        infoRef.current,
        {
          opacity: 1,
          duration: 1,
          ease: "power4.out",
        },
        "-=1"
      );
    // .to(
    //   stuffRef.current,
    //   {
    //     rotateX: 0,
    //     duration: 2,
    //     delay: 0,
    //     ease: "power4.inOut",
    //   },
    //   "-=0.5"
    // );
  });

  return (
    <div ref={rightRef} className="right divide h-full w-full ">
      <div
        ref={glitchRef}
        data-comp={`idk-${String(idkCounter).padStart(2, "0")}`}
        className="component top text-red-200"
      >
        <div
          className="h-max absolute select-none"
          ref={textRef}
          style={{
            whiteSpace: "pre-wrap",
          }}
        >
          {textData}
        </div>
        <div
          ref={nameRef}
          className="lg:hidden  left-5 top-5 h-5 absolute bg-black text-white px-2 text-center items-center kode-mono"
        >
          <p>iieo</p>
        </div>
        <div className=" h-6 lg:h-10 absolute w-full text-xl flex justify-end items-center bg-black left-0 bottom-8 text-end -z-20 "></div>
        <div className="h-full w-min p-2 py-8 text-black text-6xl leading-tight lg:hidden">
          <p>DIGITAL ARCHITECT</p>
          <div className="flex px-2 justify-between">
            <div className="text-sm w-1/4 flex items-center justify-center">
              <div className="w-full bg-black h-3"></div>
            </div>
            <div
              ref={infoRef}
              className="text-sm relative overflow-visible glitch layers"
              data-text="crafting web experiences"
            >
              <span>crafting web experiences</span>
            </div>
          </div>
        </div>
      </div>
      <div ref={stuffRef} data-comp="her-3" className="component stuff">
        <div ref={heroRef} className="flex gap-2 flex-col p-4  group">
          <Link
            to="/portfolio"
            className="border-b pb-4 border-black w-max text-4xl hover:border-white hover:text-white transition-all duration-150"
          >
            See my works
          </Link>
          <div className="flex gap-4 py-2 w-max text-xl">
            <Link
              to="/contact"
              className="border-b border-black hover:border-white hover:text-white transition-all duration-150"
              rel="noopener noreferrer"
            >
              connect
            </Link>
            {/* <Link
              to="https://github.com/iieono"
              className="border-b border-black hover:border-white hover:text-white transition-all duration-150"
              target="_blank"
              rel="noopener noreferrer"
            >
              github
            </Link>
            <Link
              to="mailto:axmadjonov.ti@gmail.com"
              className="border-b border-black hover:border-white hover:text-white transition-all duration-150"
            >
              e-mail
            </Link> */}

            <p className="  group-hover:pl-2 transition-all duration-500">{`->`}</p>
          </div>
        </div>
        <div className="hidden lg:flex z-20 left-5 top-5 h-5 w-5 absolute bg-black  shadow-lg shadow-black"></div>
        <div className="hidden lg:flex z-20 right-5 top-5 h-5 w-5 absolute bg-black  shadow-lg shadow-black"></div>
        <div className=" lg:flex z-20 right-5 bottom-5 lg:right-5 lg:bottom-8 h-5 w-5 absolute bg-black  shadow-lg shadow-black"></div>
        <div className="z-20 right-10 bottom-1 lg:right-14 lg:bottom-10 h-5 absolute text-black text-xs px-2">
          {frameInfo.width} : {frameInfo.height} / {frameInfo.fps || 0} fps
        </div>
        <div className=" lg:flex z-10 right-5 bottom-7 lg:right-7 lg:bottom-10 w-full h-[2px] absolute bg-white "></div>
      </div>
    </div>
  );
}

export default Home;
