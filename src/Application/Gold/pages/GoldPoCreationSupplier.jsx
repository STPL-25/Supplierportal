

import React, { useEffect, useState,useContext } from "react";
import SubmittedDataComp from "../components/SubmittedDataComp";
import axios from "axios";
import { API } from "../../../config/configData";
import PurchaseOrderGenerator from "../components/PurchaseOrderGenerator";
import { DashBoardContext } from "../../../DashBoardContext/DashBoardContext";

function GoldPoCreationSupplier() {
  const [poCreationDatas, setPoCreationDatas] = useState([]);
  const [poAddressData, setPoAddressData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [suppliers, setSuppliers] = useState([]);
  const [poNumbers, setPoNumbers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [selectedPoNumber, setSelectedPoNumber] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const {user}=useContext(DashBoardContext)
//   useEffect(() => {
//     const fetchSupplier = async () => {
//       try {
//         const response = await axios.get(`${API}/gold_po/fetch_supplier`);
//         console.log(response.data);
//         setSuppliers(response.data.supplierNames);
//       } catch (error) {
//         console.error("Error fetching supplier and PO details:", error);
//       }
//     };
//     fetchSupplier();
//   }, []);
  useEffect(() => {
    const fetchPoDetails = async () => {
      try {
        const response = await axios.get(
          `${API}/gold_po/fetch_po_number/${user}`
        );
        console.log(response.data);
        setPoNumbers(response.data.poNumbers);
      } catch (error) {
        console.error("Error fetching supplier and PO details:", error);
      }
    };
    fetchPoDetails();
  }, [selectedSupplier]);

  const fetchPoCreationDetails = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `${API}/gold_po/fetch_po_creation?selectedSupplier=${user}&selectedPoNumber=${selectedPoNumber}`
      );

      console.log("Full API response:", response.data);

      if (response.status === 200) {
        if (!response.data) {
          throw new Error("No data received from the API");
        }

        const addressData = response.data.address;
        const poCreationData = response.data.data;

        if (!poCreationData) {
          throw new Error("PO creation data is missing");
        }

        console.log("Address Data:", addressData);
        console.log("PO Creation Data:", poCreationData);

        // setPoCreationDatas(poCreationData);
        setFilteredData(poCreationData);
        setPoAddressData(addressData ? addressData : {});
      } else {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching PO creation details:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPoCreationDetails();
  }, [selectedPoNumber, selectedSupplier]);
  useEffect(() => {
    // Filter data based on selected supplier and PO number
    let filtered = [...poCreationDatas];

    if (selectedSupplier) {
      filtered = filtered.filter(
        (item) => item.supplier.name === selectedSupplier
      );
    }

    if (selectedPoNumber) {
      filtered = filtered.filter(
        (item) => item.poDetails.poNumber === selectedPoNumber
      );
    }

    setFilteredData(filtered);
  }, [selectedSupplier, selectedPoNumber, poCreationDatas]);

//   const handleSupplierChange = (event) => {
//     setSelectedSupplier(event.target.value);
//     // Reset PO number when supplier changes
//     setSelectedPoNumber("");
//   };

  const handlePoNumberChange = (event) => {
    setSelectedPoNumber(event.target.value);
  };

  return (
    <div className="space-y-4 m-10">
      <div className="flex space-x-4">
        {/* <div className="w-72">
          <select
            value={selectedSupplier}
            onChange={handleSupplierChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select Supplier</option>
            {suppliers.map((supplier, index) => (
              <option key={index} value={supplier}>
                {supplier}
              </option>
            ))}
          </select>
        </div> */}
        <div className="w-72">
          <select
            value={selectedPoNumber}
            onChange={handlePoNumberChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select PO Number</option>
            {poNumbers.map((poNumber, index) => (
              <option key={index} value={poNumber}>
                {poNumber}
              </option>
            ))}
          </select>
        </div>
      </div>

      {console.log(poAddressData)}
      <SubmittedDataComp submittedData={filteredData} ispocreation={true} />
      {/* {filteredData.length > 0 && selectedPoNumber && ( */}
        <PurchaseOrderGenerator
          submittedData={filteredData}
          poAddressData={poAddressData}
          selectedPoNumber={selectedPoNumber}
        />
      {/* )} */}
    </div>
  );
}

export default GoldPoCreationSupplier;
