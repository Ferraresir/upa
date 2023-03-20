import Image from "next/image";
import React from "react";

export default function Sidebar() {
  return (
    <>
      <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
      <ul className="menu p-4 w-80 bg-base-100 text-base-content">
        <li>
          <a>Sidebar Item 1</a>
        </li>
        <li>
          <a>Sidebar Item 2</a>
        </li>
      </ul>
    </>
    // <div className="flex flex-col justify-center items-center mt-2">
    //   <div className="">
    //     <Image src="/upalogo.png" width={120} height={100} alt="logo upa16" />
    //   </div>
    //   <div className="mt-5 border-t-2 w-full">
    //     <ul>
    //       <li>Inicio</li>
    //       <li>Farmacia</li>
    //       <li>Personal</li>
    //       <li>Informatica</li>
    //     </ul>
    //   </div>
    // </div>
  );
}
