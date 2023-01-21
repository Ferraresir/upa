import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import FileSaver from "file-saver";

const Table = ({ props }) => {
  useEffect(() => {
    const sortedData = props.sort((a, b) => {
      if (a.apellido < b.apellido) return -1;
      if (a.apellido > b.apellido) return 1;
      return 0;
    });
    setcurrentData(sortedData);
  }, [props]);

  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(10);
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const headers = Object.keys(Object.assign({}, ...props));
  const [currentData, setcurrentData] = useState(props);
  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  function handlePrint() {
    const data = props.map((item) => headers.map((h) => item[h]));
    data.unshift(headers);
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
    const blob = new Blob(
      [XLSX.write(wb, { bookType: "xlsx", type: "array" })],
      { type: "application/octet-stream" }
    );
    FileSaver.saveAs(blob, "sheetjs.xlsx");
  }

  const handleSort = (key) => {
    let data = currentData;
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
    data = data.sort((a, b) => {
      if (sortOrder === "asc") {
        if (a[key] < b[key]) return -1;
        if (a[key] > b[key]) return 1;
        return 0;
      } else {
        if (a[key] < b[key]) return 1;
        if (a[key] > b[key]) return -1;
        return 0;
      }
    });
    setcurrentData(data);
  };

  return (
    <div>
      <button onClick={handlePrint}>Print</button>
      <table className="table-auto w-full text-left">
        <thead>
          <tr className="bg-gray-200">
            {headers.map((header, index) => (
              <th
                key={index}
                className="px-4 py-2"
                onClick={() => handleSort(header)}
              >
                {header}
                {sortKey === header && (sortOrder === "asc" ? " 🔺" : " 🔻")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentData
            .slice(indexOfFirstData, indexOfLastData)
            .map((row, index) => (
              <tr key={index} className="text-gray-700">
                {Object.values(row).map((cell, index) => (
                  <td key={index} className="border px-4 py-2">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
      <div className="pagination flex justify-center mt-4">
        {Array.from(
          { length: Math.ceil(currentData.length / dataPerPage) },
          (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`bg-gray-300 text-gray-800 py-2 px-4 m-2 rounded-lg ${
                currentPage === i + 1 ? "bg-blue-500 text-white" : ""
              }`}
            >
              {i + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default Table;

// import { useState } from "react";

// const Table = ({props}) => {
//     const [currentPage, setCurrentPage] = useState(1);
//     const [dataPerPage] = useState(10);

//     const indexOfLastData = currentPage * dataPerPage;
//     const indexOfFirstData = indexOfLastData - dataPerPage;
//     const currentData = props.slice(indexOfFirstData, indexOfLastData);
//     const headers = Object.keys(Object.assign({}, ...props)).slice(1);

//     const paginate = (pageNumber) => setCurrentPage(pageNumber);

//     return (
//       <div>
//         <table className="table-auto w-full text-left bg-gray-200">
//           <thead>
//             <tr className="bg-gray-200">
//               {headers.map((header, index) => (
//                 <th key={index} className="px-4 py-2 border border-black">{header}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {currentData.map((row, index) => (
//               <tr key={index} className="text-gray-700">
//                 {Object.values(row).slice(1).map((cell, index) => (
//                   <td key={index} className="border border-black px-4 py-2">{cell}</td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <div className="pagination flex justify-center mt-4">
//           {Array.from({ length: Math.ceil(Object.values(props).length / dataPerPage) }, (_, i) => (
//             <button key={i} onClick={() => paginate(i + 1)} className={`bg-gray-300 text-gray-800 py-2 px-4 m-2 rounded-lg ${currentPage === i + 1 ? 'bg-blue-500 text-white' : ''}`}>
//               {i + 1}
//             </button>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   export default Table;