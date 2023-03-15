import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <div data-theme="cupcake" className="h-screen flex">
      <div>
        <Sidebar />
      </div>
      <div>
        <Navbar />
        {children}
      </div>
    </div>
  );
}

// import Link from 'next/link';
// import { useRouter } from 'next/router';

// const Dashboard = () => {
//   const router = useRouter();
//   const [isOpen, setOpen] = useState(false);

//   return (
//     <div className="flex h-screen">
//       <div className={`bg-gray-800 w-64 h-full ${isOpen ? 'block' : 'hidden'}`}>
//         <ul className="list-none p-4">
//           <li className="text-white">
//             <Link href="/table" as={`/table`}>
//               <a className={`text-white hover:text-gray-400 ${router.pathname === '/table' ? 'underline' : ''}`}>Table</a>
//             </Link>
//           </li>
//           <li className="text-white">
//             <Link href="/chart" as={`/chart`}>
//               <a className={`text-white hover:text-gray-400 ${router.pathname === '/chart' ? 'underline' : ''}`}>Chart</a>
//             </Link>
//           </li>
//         </ul>
//       </div>
//       <div className="flex-1 bg-gray-100">
//         <div className="flex justify-between p-4">
//           <div className="text-2xl">Dashboard</div>
//           <button onClick={() => setOpen(!isOpen)} className="text-gray-800">Menu</button>
//         </div>
//         <div>
//           {router.pathname === '/table' && <Table />}
//           {router.pathname === '/chart' && <Chart />}
//         </div>
//       </div>
//     </div>
//   )
// };