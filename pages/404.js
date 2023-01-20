import { useEffect } from "react";
import Router from "next/router";
import Image from "next/image";

export default function Custom404() {
  useEffect(() => {
    setTimeout(() => {
      Router.push("/");
    }, 3000);
  }, []);

  return (
    <div className="bg-black w-screen h-screen flex flex-col gap-16 justify-center items-center text-gray-100">
      <Image src="/upalogo.png" width={300} height={300} alt="logo upa16" />
      <h2 className="font-bold">
        La pagina a la que intenta acceder no existe, sera redirigido...
      </h2>
    </div>
  );
}
