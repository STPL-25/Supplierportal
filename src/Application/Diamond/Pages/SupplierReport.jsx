// import { useContext, useEffect, useState } from "react"
// import axios from "axios";
// import {DIA_API} from "../../../config/configData";
// import TextField from '@mui/material/TextField';
// import Autocomplete from '@mui/material/Autocomplete';
// import { Card, Typography } from "@material-tailwind/react";
// import { DashBoardContext } from "../../../DashBoardContext/DashBoardContext";
// function SupplierReport() {
//   const {userRole,user}=useContext(DashBoardContext)
//     const [searchQuery, setSearchQuery] = useState('');
//     const [filterData,setFilterData]=useState('Pending');
//     const [supplierNames,setSupplierNames]=useState("")
//     const [invNo,setInvNo]=useState('')
//     const [queryOptions,setQueryOptions]=useState([])
//     const [startDate, setStartDate] = useState(null);
//   const [error, setError] = useState(null);
//   // const [rejectReasonHeading,setRejectReasonHeading]=useState(false)
//     useEffect(()=>{
//       const fetchOptionData=async()=>{
//          if(userRole==="Diamond-Supplier"){
//           setSupplierNames(user)
      
//         }
//         const response= await axios.get(`${DIA_API}/gettingoptiondata`)
//         const { supplierNames } = response.data;
//         console.log(supplierNames)
//         setQueryOptions(supplierNames)
//       }
//       fetchOptionData()
//     },[])
//     useEffect(() => {
//       const fetchDetails = async () => {
//         try {
//           const res = await axios.get(
//             `${DIA_API}/submittedData/${encodeURIComponent(supplierNames)}?filter=${filterData}`
//           );
//           console.log(res.data);
//           setRows(res.data); // Set the fetched data
//         } catch (err) {
//           console.error("Error fetching data:", err);
//           setError(err); // Set the error to handle it in the UI if needed
//         }
//       };
  
//       if (supplierNames && filterData) { // Ensure that supplierNames and filterData are present before making the request
//         fetchDetails();
//       }
//     }, [supplierNames, filterData]);
//     const [rows, setRows]=useState([])
//     const TABLE_HEAD = [
//       { label: "S no", key: "index" }, 
//       { label: "EstNo", key: "EstNo" }, 
//       { label: "Invoice No", key: "invoiceNumber" }, 
//       { label: "Product Name", key: "ProductName" }, 
//       { label: "Gold Wt", key: "GoldWt" }, 
//       { label: "Gold Value", key: "GoldValue" },
//       { label: "PT Wt", key: "PTWt" },
//       { label: "PT Value", key: "PTValue" },
//       { label: "No of Stone", key: "NoofStone" },
//       { label: "D Carat", key: "DCarat" },
//       { label: "Diamond Value", key: "DiamondValue" },
//       { label: "ClrStn PCS", key: "ClrStnPCS" },
//       { label: "CS Carat", key: "CLSCarat" },
//       { label: "CS Amount", key: "CSAmount" },
//       { label: "Go Mc Amount", key: "GoMcAmount" },
//       { label: "PT Mc Amount", key: "PTMcAmount" },
//       { label: "Wastage Amt", key: "WastageAmt" },
//       { label: "Cert Total", key: "CertTotal" },
//       { label: "Handle Amount", key: "HandleAmount" },
//       { label: "G NetWt", key: "GNetWt" },
//       { label: "P NetWt", key: "PNetWt" },
//       { label: "Total Value", key: "TotalValue" },
//       { label: "GST", key: "GST" },
//       { label: "Grand Total", key: "GrandTotal" },
//       { label: "HUID", key: "HUID" },
//     ];
    

//   // const handleSupplierReportSubmit=async(event)=>{
//   //   event.preventDefault()
//   //   const res= await axios.get(`${DIA_API}/submittedData/${encodeURIComponent(supplierNames) }?filter=${filterData}`)
//   //   console.log(res,filterData)
//   //   setRows(res.data)
//   // }  
//   console.log(rows)
// // const handleInvChange=()=>{
// //     setInvNo(event.target.value)
// //     console.log(invNo)
// // }
// const handleSupplierChange=(event)=>{
//   console.log(event.target.innerText,user)
//   if(userRole==="Diamond-Purchase"){
//     setSupplierNames(event.target.innerText)

//   }
 
// }
//   return (
//     <div className="supplierreport">
//    <div  style={{marginTop:"50px"}}>

//     {userRole==="Diamond-Purchase"?(
//       <Autocomplete
//       disablePortal
//       id="filter-autocomplete"
//       options={queryOptions}
//       onChange={handleSupplierChange}
//       sx={{ width: 200 }}
//       renderInput={(params) => <TextField {...params} label="Search By Supplier " />}
//       style={{ margin: "auto", marginTop: "20px", marginBottom: "20px" }}
//       />
//       ):null}  
        
// {/* <form className="max-w-md mx-auto"onSubmit={handleSupplierReportSubmit}>   
//     <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
//     <div className="relative">
//         <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
//             <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"  fill="none" viewBox="0 0 20 20">
//             <path 
//       d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" 
//     />      </svg>
//         </div>
//         <input type="search" id="default-search"
//         onChange={(e)=>setSearchQuery(e.target.value)}
//          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search By EstNo or Invoice Number" required />
//         <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
//     </div>
// </form> */}

//    <Autocomplete
//       disablePortal
//       id="combo-box-demo"
//       options={["Accepted","Rejected","Pending"]}
//        defaultValue="Pending"
//       onChange={(event, value) => setFilterData(value)}
//       sx={{ width: 200 }}
//       renderInput={(params) => <TextField {...params} label="Filter By" />}
//       style={{margin:"auto",marginTop:"20px",marginBottom:"20px"}}
//     />
//     {/* <TextField id="outlined-basic" name='invoiceNumber' label="Enter Invoice Number"value={invNo} onChange={handleInvChange}  variant="outlined" />   */}

//     </div>
//     {rows.length>0?(
//     <Card className="h-full w-full ">
//       <h3 className="heading"><b>SUPPLIER REPORT</b></h3>
//       <table className="w-full min-w-max table-auto text-left">
//         {/* Dynamically Render the Table Header */}
//         <thead>
//           <tr>
//             {TABLE_HEAD.map((head) => (
             
//               <th key={head.key} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
//                 <Typography variant="body1" color="blue-gray" className="font-bold ">
//                   {head.label}
//                 </Typography>
//               </th>
           
            
//             ))}
//                {filterData==="Rejected"?<th  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
//               <Typography variant="body1" color="blue-gray" className="font-bold ">
//                 Reject Reason
//               </Typography>
//             </th>:null}
//           </tr>
//         </thead>
//         <tbody>
//           {/* Render the Table Rows */}
//           {rows.map((data, index) => {
//             const isLast = index === rows.length - 1;
//             const classes = isLast
//               ? "p-4 border-b border-blue-200"
//               : "p-4 border-b border-blue-gray-50";

//             return (
//               <tr key={data.RefNo + index}>
//                 {TABLE_HEAD.map((col) => (
//                   <td key={col.key} className={classes}>
//                     <Typography variant="body1" color="blue-gray" className="font-bold leading-none opacity-80">
//                       {col.key === "index" ? index + 1 : data[col.key] ?? "NA"}
//                     </Typography>
//                   </td>
//                 ))}
//                   {data.PurchaseStatus === "R" ? (
//                     <td className={classes}>
//                       <Typography variant="body1"  className="font-bold">
//                         {data.RejectionReason ?? "No reason provided"}
//                       </Typography>
//                     </td>
//                   ):null}
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </Card>):<div className="center-data flex items-center justify-center">
                      
//                       <p><span className="bg-red-100 rounded-lg p-5 text-sm text-red-700 font-medium" role="alert">No Data Found </span></p>
                               
//                              </div>}
//   </div>
//   )
// }

// export default SupplierReport

import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { DIA_API } from "../../../config/configData";
import { DashBoardContext } from "../../../DashBoardContext/DashBoardContext";

const SupplierReport = () => {
  const { userRole, user } = useContext(DashBoardContext);
  const [filterData, setFilterData] = useState('Pending');
  const [supplierNames, setSupplierNames] = useState("");
  const [queryOptions, setQueryOptions] = useState([]);
  const [rows, setRows] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // const TABLE_HEAD = [
  //   { label: "S no", key: "index" }, 
  //   { label: "EstNo", key: "EstNo" }, 
  //   { label: "Invoice No", key: "invoiceNumber" }, 
  //   { label: "Product Name", key: "ProductName" }, 
  //   { label: "Gold Wt", key: "GoldWt" }, 
  //   { label: "Gold Value", key: "GoldValue" },
  //   { label: "PT Wt", key: "PTWt" },
  //   { label: "PT Value", key: "PTValue" },
  //   { label: "No of Stone", key: "NoofStone" },
  //   { label: "D Carat", key: "DCarat" },
  //   { label: "Diamond Value", key: "DiamondValue" },
  //   { label: "ClrStn PCS", key: "ClrStnPCS" },
  //   { label: "CS Carat", key: "CLSCarat" },
  //   { label: "CS Amount", key: "CSAmount" },
  //   { label: "Go Mc Amount", key: "GoMcAmount" },
  //   { label: "PT Mc Amount", key: "PTMcAmount" },
  //   { label: "Wastage Amt", key: "WastageAmt" },
  //   { label: "Cert Total", key: "CertTotal" },
  //   { label: "Handle Amount", key: "HandleAmount" },
  //   { label: "G NetWt", key: "GNetWt" },
  //   { label: "P NetWt", key: "PNetWt" },
  //   { label: "Total Value", key: "TotalValue" },
  //   { label: "GST", key: "GST" },
  //   { label: "Grand Total", key: "GrandTotal" },
  //   { label: "HUID", key: "HUID" },
  // ];
  const formatNumber = (value, columnId) => {
    // Columns requiring 3 decimal places
    const threeDecimalColumns = [
      'GoldWt', 'WastageWeight', 'GNetWt', 'PTWt', 'PNetWt',
      'DCarat', 'DiamondWt', 'CLSCarat', 'ClrStnWt'
    ];
    // Columns requiring no decimal places (integers)
    const integerColumns = ['PCS', 'NoofStone', 'ClrStnPCS'];
    
    if (!value && value !== 0) return '';
    
    if (threeDecimalColumns.includes(columnId)) {
      return Number(value).toLocaleString(undefined, {
        minimumFractionDigits: 3,
        maximumFractionDigits: 3
      });
    }
    if (integerColumns.includes(columnId)) {
      return Number(value).toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
    }
    // Default formatting for other number columns
    return Number(value).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };
  const TABLE_HEAD = [
    { id: 'sno', label: 'S.No', type: 'number' },
    { id: 'SupplierName', label: 'Supplier Name', type: 'text' },
    // { id: 'EstNo', label: 'Estimate No', type: 'text' },
    { id: 'ProductName', label: 'Product Name', type: 'text' },
    { id: 'MetalType', label: 'Metal Type', type: 'text' },
    { id: 'WtMode', label: 'Weight Mode', type: 'text' },
    { id: 'DesignNo', label: 'Design No', type: 'text' },
    { id: 'GCarat', label: 'Gold Karat', type: 'text' },
    { id: 'PCS', label: 'PCS', type: 'number' },
    { id: 'GoldWt', label: 'Gold Weight', type: 'number' },
    { id: 'GoldPurity', label: 'Gold Purity', type: 'text' },
    { id: 'GoldPurityWt', label: 'Gold Purity Weight', type: 'number' },
    { id: 'Gold999Rate', label: 'Gold 999 Rate', type: 'text' },
    { id: 'GoldValue', label: 'Gold Value', type: 'number' },
    { id: 'PTWt', label: 'Platinum Weight', type: 'number' },
    { id: 'PTPurity', label: 'Platinum Purity', type: 'text' },
    { id: 'PTPurityWt', label: 'Platinum Purity Weight', type: 'number' },
    { id: 'PT999Rate', label: 'Platinum 999 Rate', type: 'text' },
    { id: 'PTValue', label: 'Platinum Value', type: 'number' },
    // { 
    //   id: 'DiamondDatas', 
    //   label: 'Diamond Data', 
    //   type: 'component',
    //   render: (value, row) => <DiamondTable diamonds={row.Diamonds} />
    // },
    { id: 'NoofStone', label: 'Number of Stones', type: 'number' },
    { id: 'DCarat', label: 'Diamond Carat', type: 'number' },
    { id: 'DiamondWt', label: 'Diamond Weight', type: 'number' },
    { id: 'DiamondRate', label: 'Diamond Rate', type: 'text' },
    { id: 'DiamondValue', label: 'Diamond Value', type: 'number' },
    // { 
    //   id: 'ColorStoneDatas', 
    //   label: 'Color Stone Data', 
    //   type: 'component',
    //   render: (value, row) => <ColorStoneTable colorStones={row.ColorStones} />
    // },
        { id: 'ClrStnPCS', label: 'Color Stone PCS', type: 'number' },
    { id: 'CLSCarat', label: 'Color Stone Carat', type: 'number' },
    { id: 'ClrStnWt', label: 'Color Stone Weight', type: 'number' },
    { id: 'ClrStnRate', label: 'Color Stone Rate', type: 'text' },
    { id: 'CSAmount', label: 'Color Stone Amount', type: 'number' },
    { id: 'GoMcType', label: 'Gold Making Charge Type', type: 'text' },
    { id: 'GoMcRate', label: 'Gold Making Charge Rate', type: 'text' },
    { id: 'GoMcAmount', label: 'Gold Making Charge Amount', type: 'number' },
    { id: 'PTMcType', label: 'Platinum Making Charge Type', type: 'text' },
    { id: 'PTMcRate', label: 'Platinum Making Charge Rate', type: 'text' },
    { id: 'PTMcAmount', label: 'Platinum Making Charge Amount', type: 'number' },
    { id: 'WastageType', label: 'Wastage Type', type: 'text' },
    { id: 'WastageWeight', label: 'Wastage Weight', type: 'number' },
    { id: 'WastageAmt', label: 'Wastage Amount', type: 'number' },
    { id: 'CertType', label: 'Certificate Type', type: 'text' },
    { id: 'CertGST', label: 'Certificate GST', type: 'text' },
    { id: 'CertQty', label: 'Certificate Quantity', type: 'number' },
    { id: 'CertRate', label: 'Certificate Rate', type: 'text' },
    { id: 'CertTaxableAmt', label: 'Certificate Taxable Amount', type: 'number' },
    { id: 'CertTotal', label: 'Certificate Total', type: 'number' },
    { id: 'HallMarkType', label: 'Hallmark Type', type: 'text' },
    { id: 'HMGST', label: 'Hallmark GST', type: 'number' },
    { id: 'HMQty', label: 'Hallmark Quantity', type: 'number' },
    { id: 'HMRate', label: 'Hallmark Rate', type: 'text' },
    { id: 'HMTaxableAmt', label: 'Hallmark Taxable Amount', type: 'number' },
    { id: 'HMTotal', label: 'Hallmark Total', type: 'number' },
    { id: 'HandleRate', label: 'Handling Rate', type: 'text' },
    { id: 'HandleAmount', label: 'Handling Amount', type: 'number' },
    { id: 'GNetWt', label: 'Gold Net Weight', type: 'number' },
    { id: 'PNetWt', label: 'Platinum Net Weight', type: 'number' },
    { id: 'TotalValue', label: 'Total Value', type: 'number' },
    { id: 'GST', label: 'GST', type: 'number' },
    { id: 'GrandTotal', label: 'Grand Total', type: 'number' },
    { id: 'HUID', label: 'HUID', type: 'text' },
    // { id: 'AcceptReject', label: 'Accept/Reject', type: 'text' },
  ];
  const totals = rows.reduce((acc, row) => {
    console.log(acc, row)
    TABLE_HEAD.forEach(col => {
      if (col.type === 'number' && col.id !== 'sno') {
        acc[col.id] = (acc[col.id] || 0) + (Number(row[col.id]) || 0);
      }
    });
    return acc;
  }, {});
  // Fetch initial options
  useEffect(() => {
    const fetchOptionData = async () => {
      try {
        setIsLoading(true);
        if (userRole === "Diamond-Supplier") {
          setSupplierNames(user);
        }
        
        const response = await axios.get(`${DIA_API}/gettingoptiondata`);
        const { supplierNames } = response.data;
        setQueryOptions(supplierNames);
      } catch (err) {
        console.error("Error fetching options:", err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOptionData();
  }, [userRole, user]);
  const handleExport = async () => {
    try {
      const response = await axios.put(`${DIA_API}/excel`, rows, {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.download = 'DiamondDealerReceipt.xlsx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Export failed:', error);
    }
  };
console.log(rows)
  // Fetch supplier data
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `${DIA_API}/submittedData/${encodeURIComponent(supplierNames)}?filter=${filterData}`
        );
        setRows(res.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (supplierNames && filterData) {
      fetchDetails();
    }
  }, [supplierNames, filterData]);

  return (
    <div className=" mx-auto px-2 py-4 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-xl rounded-lg p-4">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">
          Comprehensive Supplier Report
        </h1>

        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4 mb-6">
        <div className="mb-6 flex justify-between items-center">
       

      {/* Export Button */}
        <button
          onClick={handleExport}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Export to Excel
        </button>
      </div>
          {userRole === "Diamond-Purchase" && (
            <div className="w-full md:w-1/3">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Supplier
              </label>
              <select 
                onChange={(e) => setSupplierNames(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Supplier</option>
                {queryOptions.map((supplier, index) => (
                  <option key={index} value={supplier}>
                    {supplier}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="w-full md:w-1/3">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter Status
            </label>
            <select 
              value={filterData}
              onChange={(e) => setFilterData(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Pending">Pending</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error! </strong>
            <span className="block sm:inline">{error.message}</span>
          </div>
        ) : rows.length > 0 ? (
          
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border">
                <thead>
                  <tr className="bg-gray-100">
                    {TABLE_HEAD.map(column => (
                      <th key={column.id} className="border p-2 text-left">
                        {column.label}
                      </th>
                    ))}
                    {/* <th className="border p-2 text-left">Actions</th> */}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, index) => (
                    <tr key={row.id || index} className="hover:bg-gray-50">
                      {TABLE_HEAD.map(column => (
                        <td key={column.id} className="border p-2">
                        {column.type === 'number' && column.id !== 'sno'
                          ? formatNumber(row[column.id], column.id)
                          : column.id === 'sno'
                          ? index + 1
                          : row[column.id]}
                      </td>
                      ))}
                      {/* <td className="border p-2">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleAction(row.id, 'accept')}
                            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => {
                              setSelectedId(row.id);
                              setShowRejectDialog(true);
                            }}
                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                          >
                            Reject
                          </button>
                        </div>
                      </td> */}
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-50 font-bold">
                    {TABLE_HEAD.map(column => (
                     <td key={column.id} className="border p-2">
                     {column.type === 'number' && column.id !== 'sno'
                       ? formatNumber(totals[column.id], column.id)
                       : column.id === 'sno'
                       ? 'Totals'
                       : ''}
                   </td>
                    ))}
                  </tr>
                </tfoot>
              </table>
            </div>
           
        ) : (
          <div className="text-center py-10 bg-gray-100 rounded-lg">
            <p className="text-gray-600 text-xl">No Data Found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupplierReport;
