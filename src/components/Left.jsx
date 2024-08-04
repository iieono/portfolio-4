import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { SlArrowRight } from "react-icons/sl";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { CSSRulePlugin } from "gsap/CSSRulePlugin";

gsap.registerPlugin(CSSRulePlugin);

function Left({ nav, toggleNav, setNav }) {
  const navContainerRef = useRef(null);
  const leftRef = useRef(null);
  const lineRef = useRef(null);
  const bgNavRef = useRef(null);
  const heroRef = useRef(null);
  const gridRef = useRef(null);
  const location = useLocation(); // Get the current location
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);

  useEffect(() => {
    setNav(false);
  }, [location.pathname]);

  useEffect(() => {
    const tlText1 = gsap.timeline({ paused: true });
    tlText1
      .to(text1Ref.current, {
        duration: 0.3,
        x: -10,
        filter: "blur(4px)",
        ease: "power1.inOut",
      }) // Slight move animation
      .call(() => {
        text1Ref.current.innerHTML = "& Designer";
      })
      .to(text1Ref.current, {
        duration: 0.3,
        x: 0,
        color: "white",
        filter: "blur(0px)",
        ease: "power1.inOut",
      });

    const tlText2 = gsap.timeline({ paused: true });
    tlText2
      .to(text2Ref.current, {
        duration: 0.3,
        x: -10,
        filter: "blur(4px)",
        ease: "power1.inOut",
      }) // Slight move animation
      .call(() => {
        text2Ref.current.innerHTML = "Developer";
      })
      .to(text2Ref.current, {
        duration: 0.3,
        x: 0,
        filter: "blur(0px)",
        ease: "power1.inOut",
      });

    const handleMouseEnterText1 = () => {
      tlText1.play();
    };

    const handleMouseEnterText2 = () => {
      tlText2.play();
    };

    const text1 = text1Ref.current;
    const text2 = text2Ref.current;

    text1.addEventListener("mouseenter", handleMouseEnterText1);
    text2.addEventListener("mouseenter", handleMouseEnterText2);

    return () => {
      text1.removeEventListener("mouseenter", handleMouseEnterText1);
      text2.removeEventListener("mouseenter", handleMouseEnterText2);
    };
  }, []);

  useGSAP(() => {
    const navItems = navContainerRef.current.querySelectorAll(".nav-item");

    // if (window.innerWidth > 1024) {
    //   gsap.from(heroRef.current, {
    //     y: -40,
    //     // x: 20,
    //     opacity: 0,
    //     ease: "power4.out",
    //     duration: 2,
    //     delay: 2,
    //   });
    // }
    gsap.from(gridRef.current, {
      opacity: 0,
      maskImage:
        "radial-gradient(ellipse_0%_0%_at_0%_0%,#000_70%,transparent_110%)",
      ease: "power4.out",
      duration: 2,
      delay: 2,
    });

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
      secondH1.children,
      { opacity: 0, filter: "blur(20px)" },
      {
        opacity: 1,
        duration: 0.5,
        stagger: -0.1,
        delay: 1,
        filter: "blur(0px)",
        x: 0,
        onComplete: () => {
          gsap.to(firstH1, {
            fontSize: "5.3rem",
            duration: 1,
            ease: "power1.in",
          });
        },
      }
    );

    gsap.fromTo(
      firstH1.children,
      { opacity: 0, filter: "blur(20px)" },
      {
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.5,
        stagger: -0.1,
        delay: 1, // delay to start after firstH1 animation
      }
    );
  });

  return (
    <div
      ref={leftRef}
      className={`left ${nav ? "active" : ""} divide h-full w-full`}
    >
      <div className="hidden lg:flex z-20 left-5 top-5 h-5 w-5 absolute   bg-black"></div>

      {/* <div className="hidden lg:flex z-20 right-5 top-5 h-5 w-5 absolute bg-black   shadow-lg shadow-black"></div> */}
      <div className="hidden experiment-title lg:flex z-20 left-5 top-5 h-5 absolute bg-black text-white px-2 text-center items-center kode-mono shadow-lg shadow-black">
        <p className="overflow-visible select-none">iieo</p>
      </div>
      <div data-comp="her-0" className="component top nav-not justify-between">
        <div className="hidden lg:flex right-7 bottom-0 duration-1000 h-7 w-[1px] absolute bg-white z-20 "></div>
        <div className="hidden lg:flex right-0 bottom-7 duration-1000 w-7 h-[1px] absolute bg-white z-20 "></div>
        <div
          ref={gridRef}
          class=" absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:10rem_10rem] [mask-image:radial-gradient(ellipse_100%_80%_at_0%_0%,#000_70%,transparent_110%)]"
        ></div>
        <div></div>
        <div className="flex  flex-col items-end uppercase yatra heroo font-light">
          <h1 ref={text1Ref} className="hero-1 text-[5.3rem]">
            DIGITAL
          </h1>
          <h1 ref={text2Ref} className="hero-1 text-[5.5rem]">
            ARCHITECT
          </h1>
          {/* <div className="h-10 absolute w-full text-base flex justify-end items-center bg-white right-0 bottom-8 text-end -z-20 ">
            <p ref={lineRef} className=" px-10 tracking-[2px]">
              crafting web experiences
            </p>
          </div> */}
        </div>
      </div>
      <div
        data-comp="nav-16"
        className="component group nav flex flex-col justify-end lg:justify-between"
      >
        <div className="hidden lg:flex z-20 right-0 top-0 h-7 w-7 opacity-40 group-hover:opacity-0 duration-500 absolute bg-white"></div>
        <div className="hidden lg:flex right-7 bottom-0 duration-1000 h-full group-hover:h-1/2 w-[1px] absolute bg-white "></div>
        <div className="hidden lg:flex left-0 top-7 duration-1000 w-full group-hover:w-1/2 h-[1px] absolute bg-white "></div>
        {/* <div className="hidden lg:flex z-20 left-5 top-5 h-5 w-5 absolute bg-black "></div>
        <div className="hidden lg:flex z-20 right-5 bottom-7 h-5 w-5 absolute bg-black "></div> */}
        <div
          ref={bgNavRef}
          className=" font-bold hidden lg:inline-block absolute bottom-[-20%] overflow-visible tracking-none text-[var(--bg-main)] opacity-5 select-none lg:text-[20rem] leading-none"
        >
          {location.pathname.slice(1) || "home"}
        </div>
        <div onClick={toggleNav} className="menu-btn  lg:hidden absolute">
          <SlArrowRight />
        </div>
        {/* <div className="text-white duration-1000 unbounded text-6xl opacity-0 lg:opacity-30 group-hover:opacity-0 absolute top-10 right-10">
          [ action ]
        </div> */}

        <div
          ref={heroRef}
          className="hidden lg:flex gap-2 flex-col p-2 items-end w-full opacity-0 duration-1000 group-hover:opacity-100 transition-all -translate-y-4 blur-xl group-hover:blur-0 group-hover:translate-y-0  unbounded font-light"
        >
          <Link
            to="/portfolio"
            className="border-b pb-4 border-black w-max text-xl lg:text-3xl 2xl:text-4xl hover:border-white hover:text-white transition-all duration-150"
          >
            See my works
          </Link>
          <div className="flex gap-4 py-2 w-max text-base lg:text-base 2xl:text-xl">
            <p className=" pr-12 group-hover:pr-0 kode-mono transition-all duration-500">{`->`}</p>
            {/* <Link
              to="/contact"
              className="border-b border-black hover:border-white hover:text-white transition-all duration-150"
              rel="noopener noreferrer"
            >
              connect
            </Link> */}
            <Link
              to="mailto:axmadjonov.ti@gmail.com"
              className="border-b border-black hover:border-white hover:text-white transition-all duration-150"
            >
              cv
            </Link>
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
          </div>
        </div>

        <div className="nav-container" ref={navContainerRef}>
          <Link
            to="/"
            className={`nav-item ${
              location.pathname === "/" ? "active nav-item" : "nav-item"
            }`}
          >
            {location.pathname != "/" ? "home" : "◆"}
          </Link>
          <Link
            to="/about"
            className={`nav-item ${
              location.pathname === "/about" ? "active nav-item" : "nav-item"
            }`}
          >
            {location.pathname != "/about" ? "about" : "◆"}
          </Link>
          <Link
            to="/portfolio"
            className={`nav-item ${
              location.pathname === "/portfolio"
                ? "active nav-item"
                : "nav-item"
            }`}
          >
            {location.pathname != "/portfolio" ? "portfolio" : "◆"}
          </Link>
          <Link
            to="/contact"
            className={`nav-item ${
              location.pathname === "/contact" ? "active nav-item" : "nav-item"
            }`}
          >
            {location.pathname != "/contact" ? "contact" : "◆"}
          </Link>
          <div className=" lg:hidden z-10  bottom-7 lg:right-7 lg:bottom-10 w-full h-[1px] absolute bg-white "></div>
        </div>
      </div>
    </div>
  );
}

export default Left;
