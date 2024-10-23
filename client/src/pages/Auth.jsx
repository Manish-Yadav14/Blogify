import React from "react";
import { Outlet } from "react-router-dom";
import blogbg from '../assets/blogbg.webp'

function Auth() {
  return (
    <>
      <div 
      style={{backgroundImage: `url(${blogbg})`,backgroundSize: "cover",} }
      className="flex justify-center items-center w-full h-screen">
        <div className="mt-9 flex flex-row p-3 border-2 border-white/40 rounded-md shadow-xl backdrop-blur-xs">
          <div className="p-3 m-2 w-full">
            <div className="m-3 p-3">
              <h1 className="m-1 text-4xl font-mono font-bold">
                Welcome to Blogify..
              </h1>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Auth;
