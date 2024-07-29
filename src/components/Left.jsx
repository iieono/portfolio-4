import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { SlArrowRight } from "react-icons/sl";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

function Left({ nav, toggleNav, setNav }) {
  const navContainerRef = useRef(null);
  const leftRef = useRef(null);
  const lineRef = useRef(null);
  const bgNavRef = useRef(null);
  const location = useLocation(); // Get the current location

  useEffect(() => {
    setNav(false);
  }, [location.pathname]);

  useGSAP(() => {
    const navItems = navContainerRef.current.querySelectorAll(".nav-item");

    gsap.set(navItems, { opacity: 0, y: 20, scale: 0.8 });
    gsap.set(leftRef.current, { y: "100%" });
    gsap.to(leftRef.current, {
      y: 0,
      ease: "power4.out",
      duration: 1,
    });
    gsap.from(lineRef.current, {
      opacity: 0,
      x: -50,
      ease: "power4.out",
      duration: 2,
      delay: 2.8,
    });
    gsap.from(bgNavRef.current, {
      opacity: 0,
      y: 50,
      ease: "power4.out",
      duration: 2,
      delay: 1,
    });

    gsap.to(navItems, {
      duration: 0.6,
      opacity: 1,
      y: 0,
      scale: 1,
      stagger: 0.1,
      delay: 1,
      ease: "power3.out",
    });
    const firstH1 = document.querySelectorAll(".hero-1")[0];
    const secondH1 = document.querySelectorAll(".hero-1")[1];

    // Split text into spans for animation
    const splitText = (element) => {
      const text = element.innerText;
      element.innerText = "";
      text.split("").forEach((char) => {
        const span = document.createElement("span");
        span.innerText = char;
        element.appendChild(span);
      });
    };

    splitText(firstH1);
    splitText(secondH1);

    // Animate each letter
    gsap.fromTo(
      firstH1.children,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.5,
        stagger: -0.1,
        delay: 1,
        x: 0,
        onComplete: () => {
          gsap.to(firstH1, {
            fontSize: "4.6rem",
            duration: 1,
            ease: "power1.in",
          });
        },
      }
    );

    gsap.fromTo(
      secondH1.children,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.5,
        stagger: -0.1,
        delay: 2, // delay to start after firstH1 animation
      }
    );
  });

  return (
    <div
      ref={leftRef}
      className={`left ${nav ? "active" : ""} divide h-full w-full`}
    >
      <div className="hidden lg:flex z-20 left-5 top-5 h-5 w-5 absolute bg-black"></div>
      <div className="hidden lg:flex z-20 right-5 top-5 h-5 w-5 absolute bg-black shadow-lg shadow-black"></div>
      <div className="hidden experiment-title lg:flex z-20 left-5 top-5 h-5 absolute bg-black text-white px-2 text-center items-center kode-mono shadow-lg shadow-black">
        <p className="overflow-visible select-none">iieo</p>
      </div>
      <div data-comp="her-0" className="component top nav-not justify-between">
        <div></div>
        <div className="flex py-10 px-2 flex-col items-end  unbounded font-light">
          <h1 className="hero-1 text-[4.6rem]"> DIGITAL</h1>
          <h1 className="hero-1 text-[4.6rem]">ARCHITECT</h1>
          <div className="h-10 absolute w-full text-base flex justify-end items-center bg-white right-0 bottom-8 text-end -z-20 ">
            <p ref={lineRef} className=" px-10 tracking-[2px]">
              {/* crafting web experiences */}
            </p>
          </div>
        </div>
      </div>
      <div
        data-comp="nav-16"
        className="component nav flex flex-col justify-end"
      >
        <div className="hidden lg:flex right-7 top-7 h-3/4 w-[2px] absolute bg-white "></div>
        <div className="hidden lg:flex right-7 top-7 w-[90%] h-[2px] absolute bg-white "></div>
        <div className="hidden lg:flex z-20 left-5 top-5 h-5 w-5 absolute bg-black shadow-lg shadow-black"></div>
        <div className="hidden lg:flex z-20 right-5 bottom-7 h-5 w-5 absolute bg-black shadow-lg shadow-black"></div>
        <div
          ref={bgNavRef}
          className=" font-bold hidden lg:flex absolute -bottom-72 h-full w-full overflow-visible tracking-wider text-[var(--bg-main)] opacity-5 select-none lg:text-[20rem] leading-none"
        >
          {location.pathname.slice(1) || "home"}
        </div>
        <div onClick={toggleNav} className="menu-btn  lg:hidden absolute">
          <SlArrowRight />
        </div>

        <div className="nav-container" ref={navContainerRef}>
          <Link
            to="/"
            className={`nav-item ${
              location.pathname === "/" ? "active nav-item" : "nav-item"
            }`}
          >
            {location.pathname != "/" ? "home" : "♦"}
          </Link>
          <Link
            to="/about"
            className={`nav-item ${
              location.pathname === "/about" ? "active nav-item" : "nav-item"
            }`}
          >
            {location.pathname != "/about" ? "about" : "♦"}
          </Link>
          <Link
            to="/portfolio"
            className={`nav-item ${
              location.pathname === "/portfolio"
                ? "active nav-item"
                : "nav-item"
            }`}
          >
            {location.pathname != "/portfolio" ? "portfolio" : "♦"}
          </Link>
          <Link
            to="/contact"
            className={`nav-item ${
              location.pathname === "/contact" ? "active nav-item" : "nav-item"
            }`}
          >
            {location.pathname != "/contact" ? "contact" : "♦"}
          </Link>
          <div className=" lg:hidden z-10  bottom-7 lg:right-7 lg:bottom-10 w-full h-[2px] absolute bg-white "></div>
        </div>
      </div>
    </div>
  );
}

export default Left;
