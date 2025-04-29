

import React, { useState, useEffect, useContext } from "react";
import { Trash2, Edit } from "lucide-react";
import axios from "axios";
import { API } from "../../../config/configData";
import { DashBoardContext } from "../../../DashBoardContext/DashBoardContext";
import { useSendToServer } from "./SendToServer";

function SubmittedDataComp({
  submittedData,
  onEdit,
  onDelete,
  handleSelect,
  selectedItems,
  ispocreation,
  ispproval,
  selectedPoNumber,
  fetchPoCreationDetails
}) {
  const [activeModal, setActiveModal] = useState(null);
  const [fairData, setfairData] = useState([]);
  const [officeData, setOfficeData] = useState([]);
  const { roleData,names } = useContext(DashBoardContext);
  console.log("selectd Items", selectedItems);
  useEffect(() => {
    console.log("Submitted Data:", submittedData); // Log data to verify structure

    setfairData(
      submittedData?.filter((item) => item.orderType === "fair") || []
    );
    setOfficeData(
      submittedData?.filter((item) => item.orderType === "office") || []
    );
  }, [submittedData]);
const { generatePdf, isGenerating, errors } = useSendToServer({
    // submittedData: filteredSubmittedData,
    // poAddressData,
    onPdfGenerated: (pdfFile) => {
      console.log(pdfFile);
      console.log("PDF generated successfully");
    },
  });
  const renderConfirmModal = (item) =>
    activeModal === item.sno && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ">
        <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
          <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
          <p className="mb-4">Are you sure you want to delete this item?</p>
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setActiveModal(null)}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onDelete(item.sno);
                setActiveModal(null);
              }}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );

  const renderMobileCard = (item) => {
    console.log(item);
    const handleAccept = async (po) => {
      try {
        const response = await axios.put(`${API}/gold_po/update/accept/${po}/${names}`);
        const  filteredItems= response.data.findPoDatas
        const poData=response.data.poData
        const orderTypes=response.data.orderTypes
         console.log(filteredItems,poData,orderTypes);
        const pdfGenerated = await generatePdf(
          filteredItems,
          poData,
          // submittedData,
          orderTypes
        );
        if(response.status===200){
          fetchPoCreationDetails()
        }
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    const handleReject = async(po) => {
      try {
        const response = await axios.put(`${API}/gold_po/update/reject/${po}/${names}`);
        const  filteredItems= response.data.findPoDatas
        const poData=response.data.poData
        const orderTypes=response.data.orderTypes
         console.log(filteredItems,poData,orderTypes);
        const pdfGenerated = await generatePdf(
          filteredItems,
          poData,
          // submittedData,
          orderTypes
        );
        if(response.status===200){
          fetchPoCreationDetails()
        }
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    const fields = [
      { label: "Product", value: item.product || 0 },
      { label: "Product Name", value: item.product_name || "NA" },
      { label: "Pieces", value: item.pieces || 0 },
      { label: "Product Weightage", value: item.productWeightage || 0 },
      { label: "Rate", value: item.rate || 0 },
      { label: "Gross Wt", value: item.gross_weight || 0 },
      { label: "Stone Wt", value: item.stone_weight || 0 },
      { label: "Stone Cost", value: item.stone_cost || 0 },
      { label: "Wax Wt", value: item.wax_weight || 0 },
      { label: "Net Wt", value: item.net_weight || 0 },
      { label: "Amount", value: item.amount || 0 },
      { label: "Melting", value: item.melting || 0 },
      { label: "Wastage", value: item.wastage || 0 },
      { label: "Making Charges", value: item.makingCharges || 0 },
      { label: "Pure Wt", value: item.pure_wt || 0 },
      { label: "Metal Type", value: item.metal_type || 0 },
    ];

    return (
      <div
        key={item.sno}
        className="bg-white border rounded-lg shadow-md mb-4 p-4"
      >
         {roleData === "PM" && selectedPoNumber && (
            <div className="flex space-x-2 items-center mt-4 mb-4">
              <button
                className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg shadow transition-colors duration-200 flex items-center"
                onClick={() => handleAccept(selectedPoNumber)}
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                Accept
              </button>

              <button
                className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg 
                          shadow transition-colors duration-200 flex items-center"
                onClick={()=>handleReject(selectedPoNumber)}
              >
                <svg
                  className="w-2 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
                Reject
              </button>
            </div>
          )}
        {selectedItems && (
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              checked={selectedItems.includes(item.sno)}
              onChange={() => handleSelect(item.sno, item.orderType)}
              className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
          </div>
        )}

        {item.product_image && (
          <div className="flex justify-center mb-4">
            <img
              src={item.product_image}
              alt="Product"
              className="w-32 h-32 object-cover rounded-lg"
            />
          </div>
        )}

        <div className="grid grid-cols-2 gap-2">
          {fields.map(({ label, value }) => (
            <div key={label} className="flex flex-col">
              <span className="text-xs text-gray-600 font-semibold">
                {label}
              </span>
              <span className="text-sm">{value}</span>
            </div>
          ))}
        </div>
        {selectedItems && (
          <div className="flex justify-end space-x-2 mt-4">
            <div className="flex space-x-2">
              <button
                onClick={() => onEdit(item)}
                className="text-blue-600 hover:text-blue-800 transition-colors"
                title="Edit"
              >
                <Edit size={20} />
              </button>
              <button
                onClick={() => setActiveModal(item.sno)}
                className="text-red-600 hover:text-red-800 transition-colors"
                title="Delete"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        )}

        {renderConfirmModal(item)}
      </div>
    );
  };

  const renderTableContent = (data, title) => {
    if (data.length === 0) return null;

    const handleAccept = async (po) => {
      try {
        const response = await axios.put(`${API}/gold_po/update/accept/${po}/${names}`);
        const  filteredItems= response.data.findPoDatas
        const poData=response.data.poData
        const orderTypes=response.data.orderTypes
         console.log(filteredItems,poData,orderTypes);
        const pdfGenerated = await generatePdf(
          filteredItems,
          poData,
          // submittedData,
          orderTypes
        );
        if(response.status===200){
          fetchPoCreationDetails()
        }
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    const handleReject = async(po) => {
      try {
        const response = await axios.put(`${API}/gold_po/update/reject/${po}/${names}`);
        const  filteredItems= response.data.findPoDatas
        const poData=response.data.poData
        const orderTypes=response.data.orderTypes
         console.log(filteredItems,poData,orderTypes);
        const pdfGenerated = await generatePdf(
          filteredItems,
          poData,
          // submittedData,
          orderTypes
        );
        if(response.status===200){
          fetchPoCreationDetails()
        }
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    return (
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-3">{title}</h2>
        {/* Desktop View */}
        <div className="hidden md:block overflow-none ">
          {roleData === "PM" && selectedPoNumber && (
            <div className="flex space-x-2 items-center mt-4 mb-4">
              <button
                className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg shadow transition-colors duration-200 flex items-center"
                onClick={() => handleAccept(selectedPoNumber)}
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                Accept
              </button>

              <button
                className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg 
                          shadow transition-colors duration-200 flex items-center"
                onClick={()=>handleReject(selectedPoNumber)}
              >
                <svg
                  className="w-2 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
                Reject
              </button>
            </div>
          )}
          {selectedItems && (
            <div className="flex items-center justify-center space-x-2">
              <p className="text-lg font-semibold text-gray-700">
                Total Selected:
                <span className="ml-2 text-blue-600">
                  {selectedItems?.length || 0}
                </span>
              </p>
            </div>
          )}
          <table className="w-full bg-white border border-gray-200 text-sm">
            <thead>
              <tr className="bg-gray-50">
                {selectedItems && (
                  <th className="px-2 py-1 md:px-4 md:py-2 border">Select</th>
                )}
                {ispocreation && (
                  <th className="px-2 py-1 md:px-4 md:py-2 border">
                    Po Number
                  </th>
                )}
                {ispocreation && (
                  <th className="px-2 py-1 md:px-4 md:py-2 border">Po Date</th>
                )}
                <th className="px-2 py-1 md:px-4 md:py-2 border">Product</th>
                <th className="px-2 py-1 md:px-4 md:py-2 border">
                  Product Name
                </th>
                <th className="px-2 py-1 md:px-4 md:py-2 border">Pieces</th>
                <th className="px-2 py-1 md:px-4 md:py-2 border">Rate</th>
                <th className="px-2 py-1 md:px-4 md:py-2 border">Gross Wt</th>
                <th className="px-2 py-1 md:px-4 md:py-2 border">Diamond Wt(cent)</th>
                <th className="px-2 py-1 md:px-4 md:py-2 border">Stone Wt</th>
                <th className="px-2 py-1 md:px-4 md:py-2 border">Stone Cost</th>
                <th className="px-2 py-1 md:px-4 md:py-2 border">Wax Wt</th>
                <th className="px-2 py-1 md:px-4 md:py-2 border">Net Wt</th>
                <th className="px-2 py-1 md:px-4 md:py-2 border">Amount</th>
                {}
                <th className="px-2 py-1 md:px-4 md:py-2 border">Melting</th>
                <th className="px-2 py-1 md:px-4 md:py-2 border">Wastage</th>
                <th className="px-2 py-1 md:px-4 md:py-2 border">
                  MC
                </th>
                <th className="px-2 py-1 md:px-4 md:py-2 border">Pure Wt</th>
                <th className="px-2 py-1 md:px-4 md:py-2 border">Photo</th>
                {selectedItems && (
                  <th className="px-2 py-1 md:px-4 md:py-2 border">Actions</th>
                )}
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <React.Fragment key={item.sno}>
                  <tr>
                    {selectedItems && (
                      <td className="px-2 py-1 md:px-4 md:py-2 border">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(item.sno)}
                          onChange={() => handleSelect(item.sno)}
                          className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        />
                      </td>
                    )}
                    {ispocreation && (
                      <td className="px-2 py-1 md:px-4 md:py-2 border">
                        {item.poDetails?.poNumber || 0}
                      </td>
                    )}
                    {ispocreation && (
                      <td className="px-2 py-1 md:px-4 md:py-2 border">
                        {item.poDetails?.poDate || 0}
                      </td>
                    )}
                    <td className="px-2 py-1 md:px-4 md:py-2 border">
                      {item.product || 0}
                    </td>
                    <td className="px-2 py-1 md:px-4 md:py-2 border">
                      {item.product_name || "NA"}
                    </td>
                    <td className="px-2 py-1 md:px-4 md:py-2 border">
                      {item.pieces || 0}
                    </td>
                    <td className="px-2 py-1 md:px-4 md:py-2 border">
                      {" "}
                      {item.rate || 0}
                    </td>
                    <td className="px-2 py-1 md:px-4 md:py-2 border">
                      {item.gross_weight || 0}
                    </td>
                    <td className="px-2 py-1 md:px-4 md:py-2 border">
                      {item.diamondwt || 0}
                    </td>
                    <td className="px-2 py-1 md:px-4 md:py-2 border">
                      {item.stone_weight || 0}
                    </td>
                    <td className="px-2 py-1 md:px-4 md:py-2 border">
                      {item.stone_cost || 0}
                    </td>
                    <td className="px-2 py-1 md:px-4 md:py-2 border">
                      {item.wax_weight || 0}
                    </td>
                    <td className="px-2 py-1 md:px-4 md:py-2 border">
                      {item.net_weight || 0}
                    </td>
                    <td className="px-2 py-1 md:px-4 md:py-2 border">
                      {item.amount || 0}
                    </td>
                    <td className="px-2 py-1 md:px-4 md:py-2 border">
                      {item.melting || 0}
                    </td>
                    <td className="px-2 py-1 md:px-4 md:py-2 border">
                      {item.wastage || 0}
                    </td>
                    <td className="px-2 py-1 md:px-4 md:py-2 border">
                      {item.makingCharges || 0}
                    </td>
                    <td className="px-2 py-1 md:px-4 md:py-2 border">
                      {item.pure_wt || 0}
                    </td>
                    <td className="px-2 py-1 md:px-4 md:py-2 border">
                      {item.product_image ? (
                        <img
                          src={item.product_image}
                          alt="Product"
                          className="w-16 h-16 object-cover"
                        />
                      ) : (
                        "NA"
                      )}
                    </td>
                    {selectedItems && (
                      <td className="px-2 py-1 md:px-4 md:py-2 border text-center">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => onEdit(item)}
                            className="text-blue-600 hover:text-blue-800 transition-colors"
                            title="Edit"
                          >
                            <Edit size={20} />
                          </button>
                          <button
                            onClick={() => setActiveModal(item.sno)}
                            className="text-red-600 hover:text-red-800 transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                  {renderConfirmModal(item)}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="block md:hidden">{data.map(renderMobileCard)}</div>
      </div>
    );
  };

  return (
    <div className="w-full">
      {fairData?.length > 0 &&
        renderTableContent(fairData, "Exhibitions Selection")}
      {officeData?.length > 0 &&
        renderTableContent(officeData, "Office Selection")}
      {console.log(fairData, officeData)}
      {/* {submittedData.length > 0 && fairData.length === 0 && officeData.length === 0 && (
        <div className="mt-4 text-center p-4 bg-yellow-50 border border-yellow-200 rounded">
          <p>No items found with metal type "fair" or "office". Displaying all items.</p>
          {renderTableContent(submittedData, "All Items")}
        </div>
      )} */}
      {submittedData.length === 0 && (
        <div className="mt-4 text-center p-4 bg-gray-50 border border-gray-200 rounded">
          <p>No data available.</p>
        </div>
      )}
    </div>
  );
}

export default SubmittedDataComp;
