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
  const parRef = useRef(null);
  const stuffRef = useRef(null);
  const gridRef = useRef(null);
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
    gsap.set(textRef.current, { y: "100%" });
    gsap.to(rightRef.current, {
      y: 0,
      ease: "power4.out",
      duration: 1,
      delay: 0.5,
    });
    gsap.fromTo(
      parRef.current.querySelectorAll("span"),
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1.4,
        stagger: 0.3,
        ease: "power2.out",
        delay: 1,
      }
    );
    gsap.from(gridRef.current, {
      opacity: 0,
      maskImage:
        "radial-gradient(ellipse_0%_0%_at_0%_0%,#000_70%,transparent_110%)",
      ease: "power4.out",
      duration: 2,
      delay: 2,
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

    if (window.innerWidth > 1024) {
      // Add animations to the timeline
      tl.to(glitchRef.current, {
        background: "#000",
        duration: 0.05,
        yoyo: true,
        repeat: 7,
        delay: 10,
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
        .to(".lines-bg", {
          opacity: 0,
          duration: 0.3,
          ease: "power4.out",
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
        .to(".lines-bg", {
          opacity: 1,
          duration: 0.3,
          ease: "power4.out",
        })
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
    }
  });

  return (
    <div ref={rightRef} className="right divide h-full w-full ">
      <div
        ref={glitchRef}
        data-comp={`idk-${String(idkCounter).padStart(2, "0")}`}
        className="component top text-red-200"
      >
        <div className=" lines-bg hidden lg:flex left-7 top-0 duration-1000 h-full group-hover:h-1/2 w-[1px] absolute bg-white "></div>
        <div className=" lines-bg hidden lg:flex right-0 bottom-7 duration-1000 w-full group-hover:w-1/2 h-[1px] absolute bg-white "></div>
        <div class=" lg:hidden absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:10rem_5rem] [mask-image:radial-gradient(ellipse_100%_100%_at_0%_0%,#000_70%,transparent_110%)]"></div>
        <div
          className="h-max absolute text-xs select-none"
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
        {/* <div className=" h-6 lg:hidden absolute w-full text-xl flex justify-end items-center bg-black left-0 bottom-8 text-end -z-20 "></div> */}
        <div className=" h-full w-content flex flex-col items-end justify-end p-2 py-4 text-black text-3xl jetbrains font-light leading-tight lg:hidden">
          {/* <div
            ref={nameRef}
            className="lg:hidden text-sm  w-min h-5 bg-black text-white px-2 text-center items-center kode-mono"
          >
            <p>iieo</p>
          </div> */}
          <p className="text-end">
            DIGITAL <br /> ARCHITECT
          </p>
          {/* <div className="flex px-1 justify-between">
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
          </div> */}
        </div>
      </div>
      <div ref={stuffRef} data-comp="her-3" className="component group stuff">
        <div className="hidden lg:flex left-7 top-0 duration-1000 h-7 w-[1px]  absolute bg-white "></div>
        <div className="hidden lg:flex left-0 top-7 duration-1000 w-7 h-[1px]  absolute bg-white "></div>
        <div
          ref={gridRef}
          class=" absolute hidden bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:10rem_10rem] [mask-image:radial-gradient(ellipse_100%_100%_at_100%_80%,#000_70%,transparent_110%)]"
        ></div>
        <div className=" p-3 text-xs lg:text-sm 2xl:text-base font-light w-full  jetbrains overflow-visible">
          <p ref={parRef} class="para  overflow-visible z-40">
            <span>Hi! </span>
            {/* <br className="black lg:hidden" /> */}
            <span>I'm </span>

            <span className="highlight">
              <Link to="/about">A. Akhmadjonov.</Link>
            </span>
            <br />
            <span className="">I craft immersive </span>
            <span className="">
              digital <br /> solutions that inspire.
            </span>
            <br className="" />
            <span className="highlight">
              <Link to="/portfolio">See my works </Link>
            </span>
            <span>and </span>
            <span className="highlight">
              <Link to="/contact">reach out.</Link>
            </span>
            <br />
            <span className="text-base lg:text-xl arrow-hero">{"->"}</span>
          </p>
        </div>
        <div
          ref={heroRef}
          className="flex hidden gap-2 flex-col p-2  group unbounded font-light"
        >
          <Link
            to="/portfolio"
            className="border-b pb-2 border-black w-max text-2xl lg:text-4xl hover:border-white hover:text-white transition-all duration-150"
          >
            See my works
          </Link>
          <div className="flex gap-4 py-2 w-max text-base lg:text-xl">
            {/* <Link
              to="/contact"
              className="border-b border-black hover:border-white hover:text-white transition-all duration-150"
              rel="noopener noreferrer"
            >
              connect
            </Link> */}
            <Link
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
            </Link>
            <Link
              to="mailto:axmadjonov.ti@gmail.com"
              className="border-b border-black hover:border-white hover:text-white transition-all duration-150"
            >
              cv
            </Link>

            {/* <p className="  group-hover:pl-4 kode-mono transition-all duration-500">{`->`}</p> */}
          </div>
        </div>

        {/* <div className="hidden lg:flex z-20 left-5 top-5 h-5 w-5 absolute bg-black  shadow-lg shadow-black"></div> */}
        {/* <div className="hidden lg:flex z-20 right-5 top-5 h-5 w-5 absolute bg-black  shadow-lg shadow-black"></div> */}
        <div className=" lg:flex z-20 right-5 bottom-5 lg:right-5 lg:bottom-7 h-5 w-5 absolute bg-black "></div>
        {/* <div className="z-20 right-10 bottom-1 lg:right-14 lg:bottom-10 h-5 absolute text-black text-xs px-2">
          {frameInfo.width} : {frameInfo.height} / {frameInfo.fps || 0} fps
        </div> */}
        <div className=" lg:flex z-10 right-5 bottom-7 lg:right-7 lg:bottom-9 w-full h-[1px] absolute bg-white "></div>
      </div>
    </div>
  );
}

export default Home;
