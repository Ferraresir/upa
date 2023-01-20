import Image from "next/image";
import React from "react";

export default function Sidebar() {
  return (
    <div className="w-52 h-screen flex flex-col items-center">
      <div className="mt-2 h-8 w-full justify-center flex">
        <Image src="/upalogo.png" width={120} height={100}  alt="logo upa16"/>
      </div>
      <div className="mt-2 border-t border-gray-300 w-full justify-center flex">
        <ul>
          <li>Inicio</li>
          <li>Farmacia</li>
          <li>Personal</li>
          <li>Admision</li>
        </ul>
      </div>
    </div>
  );
}
