import { signIn, signOut } from "next-auth/react";
import Image from "next/image";

export default function Navbar() {
  return (
    <div className="navbar bg-base-100">
      <label
        htmlFor="my-drawer-2"
        className="btn btn-primary drawer-button lg:hidden"
      >
        X
      </label>
      <div className="flex-none ml-auto gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered"
          />
        </div>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <Image
                src="/images/stock/photo-1534528741775-53994a69daeb.jpg"
                alt="User Profile picture"
                width={50}
                height={50}
              />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
