import {signIn,signOut} from "next-auth/react"

export default function Navbar() {
  return (
    <div className="h-12">
      <button
        className="w-24 bg-gray-200 px-6 rounded-md"
        onClick={() => {
          signIn();
        }}
      >
        Iniciar session
      </button>
      <button
        className="w-24 bg-gray-200 px-6 rounded-md"
        onClick={() => {
          signOut();
        }}
      >
        Cerrar session
      </button>
    </div>
  );
}
