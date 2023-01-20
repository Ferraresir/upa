import { useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Form({ sectores }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-100">
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-gray-50 px-4 py-6 pt-8 text-center sm:px-16">
          <a href="https://dub.sh">
            <Image
              src="/upalogo.png"
              alt="Logo upa16"
              width={180}
              height={20}
            />
          </a>
          <h3 className="text-lg font-semibold pt-4">Registrar</h3>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setLoading(true);
            fetch("/api/auth/reguser", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                nombre: e.currentTarget.nombre.value.toUpperCase(),
                apellido: e.currentTarget.apellido.value.toUpperCase(),
                sectorId: parseInt(e.currentTarget.sector.value),
                role: e.currentTarget.rol.value,
                user: (
                  e.currentTarget.apellido.value.slice(0, 1) +
                  e.currentTarget.nombre.value.slice(0, 4)
                ).toUpperCase(),
                password: (
                  e.currentTarget.apellido.value.slice(0, 3) + "123"
                ).toUpperCase(),
              }),
            }).then(async (res) => {
              setLoading(false);
              if (res.status === 200) {
                toast.success("Cuenta Creada");
                setTimeout(() => {
                  router.push("/");
                }, 2000);
              } else {
                toast.error(await res.text());
              }
            });
          }}
          className="flex flex-col space-y-4 bg-gray-100 px-4 py-8 sm:px-16"
        >
          <div>
            <label
              htmlFor="nombre"
              className="block text-xs text-gray-600 uppercase"
            >
              Nombre
            </label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              required
              className="mt-1 uppercase block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="apellido"
              className="block text-xs text-gray-600 uppercase"
            >
              Apellido
            </label>
            <input
              id="apellido"
              name="apellido"
              type="text"
              required
              className="mt-1 uppercase block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
            />
          </div>
          <div className="flex justify-center w-full">
            <div className="w-1/2 mr-2">
              <label
                htmlFor="sector"
                className="block text-xs text-gray-600 uppercase"
              >
                Sector
              </label>
              <select
                id="sector"
                name="sector"
                required
                className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
              >
                {sectores.map((e, i) => {
                  return (
                    <option key={i} value={e.id}>
                      {e.nombre}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="w-1/2 ml-2">
              <label
                htmlFor="rol"
                className="block text-xs text-gray-600 uppercase"
              >
                Rol
              </label>
              <select
                id="rol"
                name="rol"
                required
                className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
              >
                <option value="usuario">Usuario</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
          <button
            disabled={loading}
            className={`${
              loading
                ? "cursor-not-allowed border-gray-200 bg-gray-100"
                : "border-black bg-black text-white hover:bg-white hover:text-black"
            } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
          >
            <p>Registrar</p>
          </button>
        </form>
      </div>
    </div>
  );
}
