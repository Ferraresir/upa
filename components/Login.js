import { useState } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Form() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-100">
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-gray-50 px-4 py-6 pt-8 text-center sm:px-16">
          <Image src="/upalogo.png" alt="Logo upa16" width={180} height={80} />
          <h3 className="text-lg font-semibold pt-4">Iniciar Sesion</h3>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setLoading(true);
            signIn("credentials", {
              redirect: false,
              user: e.currentTarget.user.value.toUpperCase(),
              password: e.currentTarget.password.value.toUpperCase(),
              // @ts-ignore
            }).then(({ ok, error }) => {
              setLoading(false);
              if (ok) {
                router.push("/");
              } else {
                toast.error(error);
              }
            });
          }}
          className="flex flex-col space-y-4 bg-gray-100 px-4 py-8 sm:px-16"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-xs text-gray-600 uppercase"
            >
              Usuario
            </label>
            <input
              id="user"
              name="user"
              type="text"
              required
              className="mt-1 uppercase block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-xs text-gray-600 uppercase"
            >
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="mt-1 uppercase block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
            />
          </div>
          <button
            disabled={loading}
            className={`${
              loading
                ? "cursor-not-allowed border-gray-200 bg-gray-100"
                : "border-black bg-black text-white hover:bg-white hover:text-black"
            } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
          >
            <p>Entrar</p>
          </button>
        </form>
      </div>
    </div>
  );
}
