import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <div className="drawer drawer-mobile">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        <div className="grid h-full w-full grid-rows-[70px_1fr_40px]">
          <div className="border-2">
            <Navbar />
          </div>
          <div className=" border-2">children{children}</div>
          <footer className="border-2">footer</footer>
        </div>
      </div>
      <div className="drawer-side">
        <Sidebar />
      </div>
    </div>

    // <div className="h-screen grid grid-cols-[250px_1fr] grid-rows-[60px_1fr_40px] p-2">
    //   <div className="row-span-3 border-2">
    //     <Sidebar />
    //   </div>
    //   <div className="border-2">
    //     <Navbar />
    //   </div>
    //   <div className=" border-2">children{children}</div>
    //   <footer className="border-2">footer</footer>
    // </div>
  );
}
