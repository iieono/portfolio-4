import React, { useEffect, useRef, useState } from "react";
import Layout from "./components/Layout";
import "./App.css";
import Portfolio from "./components/Portfolio";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import NotFound from "./components/NotFound";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const documentHeight = () => {
      const doc = document.documentElement;
      doc.style.setProperty("--doc-height", `${window.innerHeight}px`);
    };

    window.addEventListener("resize", documentHeight);

    // Set initial height
    documentHeight();

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", documentHeight);
    };
  }, []);
  useEffect(() => {
    if (location.pathname === "/") {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let bgColor;
    let strokeColor;
    switch (location.pathname) {
      case "/":
        bgColor = "black";
        strokeColor = "red";
        break;
      case "/portfolio":
        bgColor = "red";
        strokeColor = "red";
        break;
      case "/about":
        bgColor = "blue";
        strokeColor = "blue";
        break;
      case "/contact":
        bgColor = "#399918";
        strokeColor = "#399918";
        break;
      default:
        bgColor = "black";
        strokeColor = "white";
    }
    document.documentElement.style.setProperty("--bg-main", bgColor);
    document.documentElement.style.setProperty("--stroke-main", strokeColor);
  }, [location.pathname]);

  // if (loading && location.pathname === "/") return <Loading />;

  return (
    <div className="app  p-0 lg:p-[var(--gap-main)]">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="contact" element={<Contact />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

function Loading() {
  const [breadText, setBreadText] = useState("");
  const [loadingText, setLoadingText] = useState("");
  const [showHome, setShowHome] = useState(false);
  const fullBreadText = "bread rolls";
  const fullLoadingText = "loading";
  const breadRef = useRef(null);

  useGSAP(() => {
    gsap.to(breadRef.current, {
      x: 2000,
      rotation: 1800,
      duration: 2,
      ease: "power2.in",
      delay: 1,
    });
  }, []);

  useEffect(() => {
    const animateText = async () => {
      // Animate 'bread'
      for (let i = 0; i <= fullBreadText.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 50));
        setBreadText(fullBreadText.slice(0, i));
      }

      // Animate 'loading'
      for (let i = 0; i <= fullLoadingText.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 50));
        setLoadingText(fullLoadingText.slice(0, i));
      }

      // Show <home />
      await new Promise((resolve) => setTimeout(resolve, 500));
      setShowHome(true);
    };

    animateText();
  }, []);

  useEffect(() => {
    function setVH() {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    }

    setVH();
    window.addEventListener("resize", setVH);
    return () => window.removeEventListener("resize", setVH);
  }, []);

  return (
    <div className="h-screen w-screen bg-black flex gap-2 flex-col p-2 kode-mono text-white text-4xl">
      <div className="flex items-center gap-2">
        <div className="text-sm py-2">{breadText}</div>
        <img ref={breadRef} src="/ico.png" className="h-6 w-6" />
      </div>
      <div className="text-sm border-t py-4 text-yellow-500 flex gap-2">
        <p className="text-white">{loadingText}</p>
        {showHome && (
          <Link to="/" className="">
            {location.pathname === "/"
              ? "<home />"
              : `<${location.pathname.slice(1)} />`}
          </Link>
        )}
      </div>
      <div class="absolute inset-0  h-full w-full bg-transparent opacity-5 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:8rem_4rem]"></div>
    </div>
  );
}
export default App;
