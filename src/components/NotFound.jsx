import React from "react";
import AnimatedCat from "./Cat";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="h-screen w-screen flex gap-2 flex-col p-2 kode-mono text-white text-4xl">
      <div className="text-sm py-2">nothing here</div>
      <div className="text-sm border-t py-4 text-yellow-500 flex gap-2">
        <p className="text-white">return</p>
        <Link to="/" className="">
          {"<home />"}
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
