import  { useState, useEffect,useRef, useContext } from 'react';
import axios from 'axios'; 
import './Report.css'; 
// import sktimg from "../assets/images/Skt-PhotoRoom.png-PhotoRoom.png";
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import API from "./config";
import './print.css'
import { DashBoardContext } from '../../DashBoardContext/DashBoardContext';

function Document() {
  const [datas, setDatas] = useState([]);
  const {setActiveSection}=useContext(DashBoardContext)
const BillNo=encodeURIComponent(localStorage.getItem("BillNo"))
const id=localStorage.getItem("id")
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API}/data/${BillNo}`);
         console.log(response.data);
        setDatas(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call the async function
  }, [BillNo]);

  return (
    <div className="print-area">
            {/* <div><img src={sktimg} alt="" className='sktnav1' /></div> */}

    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh',width:"50%",marginLeft:"25%" ,marginTop:"-50px"}}>   
        <TableContainer component={Paper} style={{ justifyContent:"center" }}>
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Supplier Name</th>
                {datas.map((supplier, index) => (
                 
                  <th key={index}>{supplier.Suppliername}</th>

                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Bill No</td>
                {datas.map((supplier, index) => (
                  <td key={index}>{supplier.Billno}</td>
                ))}
              </tr>
              <tr>
                <td>Mobile Number</td>
                {datas.map((supplier, index) => (
                  <td key={index}>{supplier.mobileNumber}</td>
                ))}
              </tr>
              <tr>
                <td>Rate (Rs)</td>
                {datas.map((supplier, index) => (
                  <td key={index}>{supplier.cRate || supplier.PureRate||supplier.pure999Rate}</td>
                ))}
              </tr>
              <tr>
                <td>Total Qty In Pure-Grams</td>
                {datas.map((supplier, index) => (
                  <td key={index}>{supplier.tQty}</td>
                ))}
              </tr>
              {/* <tr>
                <td>Confirm Qty (g)</td>
                {datas.map((supplier, index) => (
                  <td key={index}>{supplier.cQty}</td>
                ))}
              </tr>
              <tr>
                <td>Return Qty (g)</td>
                {datas.map((supplier, index) => (
                  <td key={index}>{supplier.rQty}</td>
                ))}
              </tr> */}
              <tr>
                <td>Status</td>
                {datas.map((supplier, index) => (
                  <td key={index}>{supplier.approvedstatus === "accepted" ? "Accepted" : "Rejected"}</td>
                ))}
              </tr>
              <tr>
                <td>Status Date</td>
                {datas.map((supplier, index) => (
                  <td key={index}>{supplier.StatusDate}</td>
                ))}
              </tr>
              {datas.map((supplier, index) => (<>
                {supplier.approvedstatus === "accepted"?(null):( <tr>
                <td>Rejection Reason</td>
                
                  <td key={index}>{supplier.rejectionReason}</td>
              
              </tr>)}
                </>
                ))}
             
             
            </tbody>
          </table>
        </TableContainer>
        </div>
    </div>
  );
}

export default Document;
