import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Layout({ children }: any) {
  return (
    <>
      <div className="">
        hiii
        <Sidebar />
      </div>
      <div className="h-screen w-5/6 flex-col pr-10 flex">
        <Navbar />
      </div>
    </>
  );
}
