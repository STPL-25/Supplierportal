import { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./Report.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import API from "./config";
import { Link, useNavigate } from "react-router-dom";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Combobox from "react-widgets/Combobox";
import { DashBoardContext } from '../../DashBoardContext/DashBoardContext';

function DebitNoteCreditNoteReport() {
  const [datas, setDatas] = useState([]);
  const [supName, setSupName] = useState([]);
  const [supDetails, setSupDetails] = useState("");
  const [errors, setErrors] = useState({});
  const [ErrorMessage, setErrorMessage] = useState(false);
  const [creditNoteImages, setCreditNoteImages] = useState({});
  const {setActiveSection}=useContext(DashBoardContext)

  useEffect(() => {
    const fetchSupplierNames = async () => {
      try {
        const response = await axios.get(`${API}/supplierName`);
        setSupName(response.data); // Assuming response.data is an array
      } catch (error) {
        console.error("Error fetching supplier names:", error);
      }
    };

    fetchSupplierNames(); // Call the function immediately
  }, [supDetails]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${API}/dashboarddetails/${supDetails}`);
      response ? setDatas(response.data) : setDatas([]);
      if (response.data) {
        setErrorMessage(false);
      } else {
        setErrorMessage(true);
      }
      datas.map((data) => {
        data.goldData === "";
      });
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrors({ message: error.response.data.message });
        setErrorMessage(true);
      }

      if (datas.length === 0) {
        if (!supDetails) {
          setErrors({ message: "Please Select the Supplier " });
          setErrorMessage(true);
        } else {
          setErrors({ message: "No data Found  " });
          setErrorMessage(true);
        }
      } else {
        setErrors({ message: error.response.data.message });
        setErrorMessage(true);
      }
    }
  };

  const handleNavigate = (BillNo, id) => {
    // window.open("/Doc", "_blank");
    localStorage.setItem("BillNo", BillNo);
    setActiveSection("Print")
    localStorage.setItem("id", id);
    console.log(BillNo, id);
  };


  console.log(datas);
  return (
    <div>

      <form onSubmit={handleSubmit} className="searchform">

        {console.log(supDetails)}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-800 w-full">Choose By Supplier Name</h2>
          <Combobox
            data={supName}
            placeholder="Select a Supplier"
            onChange={(value) => setSupDetails(value)}
            style={{ width: "300px" }} // Set width for the ComboBox
          />
        </div>
        <button
          type="submit"
          className="searchbuttonr data"
          style={{ backgroundColor: "#60a5fa", width: "100px", height: "40px", marginTop: '40px', paddingBottom: "" }} // Match width and adjust height if necessary
        >
          Get Details
        </button>
      </form>
      {!ErrorMessage ? (
        <>
          {datas.length === 0 ? null : (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="caption table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">S no </TableCell>
                    <TableCell align="center">Supplier Name </TableCell>
                    <TableCell align="center">Bill No</TableCell>
                    <TableCell align="center">Mobile Number&nbsp;</TableCell>
                    <TableCell align="center">Gold Rate&nbsp;</TableCell>

                    <TableCell align="center">
                      Total Qty In Pure-Grams
                    </TableCell>
                    <TableCell align="center">Status&nbsp;</TableCell>
                    <TableCell align="center">View Details&nbsp;</TableCell>

                    <TableCell align="center">Status Date&nbsp;</TableCell>
                    <TableCell align="center">Reason&nbsp;</TableCell>
                   

                    <TableCell align="center"> Upload Images &nbsp;</TableCell>


                  </TableRow>
                </TableHead>
                <TableBody>
                  {datas.map((supplier, index) => (
                    <TableRow key={supplier.billNo + index}>
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="center">{supplier.name}</TableCell>
                      <TableCell align="center">{supplier.billNo}</TableCell>
                      <TableCell align="center">{supplier.phone}</TableCell>

                      <TableCell align="center" key={supplier.goldData}>
                        {supplier.goldData === "9999 Rate"
                          ? `9999 Rate-${supplier.pure999Rate}`
                          : null}
                        {supplier.goldData === "999 Rate"
                          ? `999 Rate-${supplier.PureRate}`
                          : null}
                        {supplier.goldData === "995 Rate"
                          ? `995 Rate-${supplier.cRate}`
                          : null}
                      </TableCell>

                      <TableCell align="center">{supplier.tQty}</TableCell>
                      <TableCell align="center">
                        {supplier.approvedstatus === "accepted" ? (
                          <div
                            className="acceptdetail"
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <strong
                              style={{ color: "#22c55e", marginRight: "1px" }}
                            >
                              Accepted
                            </strong>
                          </div>
                        ) : (
                          <>
                            <strong style={{ color: "#ef5350" }}>
                              Rejected
                            </strong>
                          </>
                        )}
                      </TableCell>

                      <TableCell>
                        {supplier.approvedstatus === "accepted" ? (
                          <div
                            className="acceptdetail"
                            style={{
                              display: "flex",
                              width: "20px",
                              marginLeft: "30%",
                            }}
                          >
                            <Link
                              to={{ pathname: supplier.approvedImages }}
                              className="imageurl"
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ marginRight: "5px" }}
                            >
                              <PermMediaIcon />
                            </Link>

                            <div style={{ marginLeft: "-20px" }}>
                              <button
                                onClick={() =>
                                  handleNavigate(
                                    supplier.billNo,
                                    supplier.createdAt
                                  )
                                }
                              >
                                <RemoveRedEyeIcon />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div
                            style={{
                              display: "flex",
                              width: "20px",
                              marginLeft: "40%",
                            }}
                          >
                            <button
                              onClick={() =>
                                handleNavigate(
                                  supplier.billNo,
                                  supplier.createdAt
                                )
                              }
                            >
                              <RemoveRedEyeIcon />{" "}
                            </button>
                          </div>
                        )}
                      </TableCell>

                      <TableCell align="center">
                        {supplier.rejectionDate}
                      </TableCell>
                      <TableCell align="center">
                        <strong>{supplier.rejectionReason}</strong>
                      </TableCell>




                      <TableCell align="center" style={{ width: "auto" }}>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            marginLeft: "10%",
                          }}
                        >
                          {supplier.images.map((image, idx) => (
                            <div
                              key={idx}
                              className="imgurldata"
                              style={{ paddingRight: "10px" }}
                            >
                              <a
                                href={image}
                                className="button-style" // Add button-style class
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ paddingLeft: "10px" }} // Add left padding to each link
                              >
                                <span>Rate{idx + 1}</span>
                              </a>
                            </div>
                          ))}
                        </div>
                      </TableCell>

                     
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </>
      ) : (
        <div style={{ textAlign: "center", marginLeft: "-70px" }}>
          <strong className="text-danger errordar ">{errors.message}</strong>
        </div>
      )}
    </div>
  );
}

export default DebitNoteCreditNoteReport;
