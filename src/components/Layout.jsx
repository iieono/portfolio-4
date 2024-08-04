import React, { useState } from "react";
import Right from "./Right";
import Left from "./Left";
import { SlArrowLeft } from "react-icons/sl";
import { Outlet } from "react-router-dom";
import AnimatedCat from "./Cat";

function Layout() {
  const [nav, setNav] = useState(false);

  const toggleNav = () => {
    setNav(!nav);
  };
  return (
    <div className="layout h-full w-full text-white">
      <AnimatedCat />
      <Left nav={nav} toggleNav={toggleNav} setNav={setNav} />
      <Outlet />
      {!nav && (
        <div onClick={toggleNav} className="menu-btn lg:hidden text-black pb-2">
          <SlArrowLeft />
        </div>
      )}
    </div>
  );
}

export default Layout;
