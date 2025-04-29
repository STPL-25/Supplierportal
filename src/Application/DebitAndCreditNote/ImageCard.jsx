import { useContext, useEffect, useState } from 'react';
import { DashBoardContext } from '../../DashBoardContext/DashBoardContext';
import axios from 'axios';
import "react-widgets/styles.css";
// import Combobox from "react-widgets/Combobox";
import { API } from "../../config/configData";
// import acceptImg from "../../assets/accept.png";
// import rejectImg from "../../assets/cancel.png";


// import { Button } from '../../components/ui/button';
import { Check, X } from 'lucide-react';
function ImageCard() {
  const { userRole, companyName } = useContext(DashBoardContext);
  const [suppliers, setSuppliers] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [imgCards, setImgCards] = useState({
    debitNote: [],
    creditNote: [],
    accDebitNote: [],
    rejDebitNote: [],
    accCreditNote: [],
    rejCreditNote: [],
    ledgerFiles: []
  });
  const [selectedSupplier, setSelectedSupplier] = useState('');
  const [selectedInvoice, setSelectedInvoice] = useState('');
  const [accImgs, setAccImgs] = useState({
    accCreditNotes: [],
    accDebitNotes: []
  })
  const [rejImgs, setRejImgs] = useState({
    rejCreditNotes: [],
    rejDebitNotes: []
  })
  const [selectedStatus, setSelectedStatus] = useState("Pending")
  const fetchSupplier = async () => {
    try {
      const response = await axios.get(`${API}/debitandCredit/getsuppliernames/debitorcreditapproval`);
      setSuppliers(response.data);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  };

  useEffect(() => {
    fetchSupplier();
  }, []);

  const fetchInvDetails = async () => {
    if (!selectedSupplier) return; // Ensure selectedSupplier is valid
    try {
      const payload = {
        selectedSupplier, // Correct payload structure
      };

      const response = await axios.put(
        `${API}/debitandCredit/getinvoices/debitorcreditapproval`,
        payload
      );
      console.log("/////", response.data)
      setInvoices(response.data); // Update invoices state with the response data
    } catch (error) {
      console.error("Error fetching invoices:", error); // Log any errors
    }
  };
  useEffect(() => {
    fetchInvDetails();
  }, [selectedSupplier]);

  const fetchImagesData = async () => {
    if (!selectedInvoice) return;
    try {
      const response = await axios.put(`${API}/debitandCredit/getdebitandcreditdetails/debitorcreditapproval`, { selectedInvoice, userRole });
      const { supCredit, supDebit, KTMDebitAcceptImg, KTMDebitRejectImg, KTMCreditAcceptImg, KTMCreditRejectImg, id, SupLedger } = response.data;
      setImgCards((prevalue) => ({
        ...prevalue,
        id: id,
        debitNote: supCredit,
        creditNote: supDebit,
        accDebitNote: KTMDebitAcceptImg,
        rejDebitNote: KTMDebitRejectImg,
        accCreditNote: KTMCreditAcceptImg,
        rejCreditNote: KTMCreditRejectImg,
        ledgerFiles: SupLedger
      }));
    } catch (error) {
      console.error("Error fetching credit/debit notes:", error);
    }
  };
  const handleAccept = async (img, id, value) => {
    try {
      console.log(img, id, value);

      setAccImgs((prevImgs) => {
        const updatedImages = { ...prevImgs };

        if (value === "KtmCredit") {
          // Remove the image from rejected list if it exists
          setRejImgs((prevRejImgs) => ({
            ...prevRejImgs,
            rejCreditNotes: (prevRejImgs.rejCreditNotes || []).filter(
              (item) => item !== img
            ),
          }));

          // Add the image to accepted list if not already present
          updatedImages.accCreditNotes = [
            ...(updatedImages.accCreditNotes || []),
            img,
          ].filter((item, index, self) => self.indexOf(item) === index);
        }

        if (value === "KtmDebit") {
          setRejImgs((prevRejImgs) => ({
            ...prevRejImgs,
            rejDebitNotes: (prevRejImgs.rejDebitNotes || []).filter(
              (item) => item !== img
            ),
          }));

          updatedImages.accDebitNotes = [
            ...(updatedImages.accDebitNotes || []),
            img,
          ].filter((item, index, self) => self.indexOf(item) === index);
        }

        return updatedImages;
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleReject = async (img, id, value) => {
    try {
      console.log(img, id, value);

      setRejImgs((prevImgs) => {
        const updatedImages = { ...prevImgs };

        if (value === "KtmCredit") {
          // Remove the image from accepted list if it exists
          setAccImgs((prevAccImgs) => ({
            ...prevAccImgs,
            accCreditNotes: (prevAccImgs.accCreditNotes || []).filter(
              (item) => item !== img
            ),
          }));

          // Add the image to rejected list if not already present
          updatedImages.rejCreditNotes = [
            ...(updatedImages.rejCreditNotes || []),
            img,
          ].filter((item, index, self) => self.indexOf(item) === index);
        }

        if (value === "KtmDebit") {
          setAccImgs((prevAccImgs) => ({
            ...prevAccImgs,
            accDebitNotes: (prevAccImgs.accDebitNotes || []).filter(
              (item) => item !== img
            ),
          }));

          updatedImages.rejDebitNotes = [
            ...(updatedImages.rejDebitNotes || []),
            img,
          ].filter((item, index, self) => self.indexOf(item) === index);
        }

        return updatedImages;
      });
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(`${API}/debitandCredit/actiondebitandcreditdetails`, { selectedInvoice, accImgs, rejImgs })
      if (response.status === 201) {
        fetchImagesData()
      }
      console.log(response.data)

      console.log(selectedInvoice, accImgs, rejImgs)
    } catch (error) {

    }
  }
  useEffect(() => {
    fetchImagesData();
  }, [selectedInvoice, selectedSupplier]);
  console.log(selectedStatus)
  console.log(userRole)
  const statuses = ["Accepted", "Pending", "Rejected"]
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-blue-50 border-b px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-800 text-center">
            Supplier Invoices Management
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Supplier Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Choose Supplier
            </label>
            <select
              value={selectedSupplier}
              onChange={(e) => setSelectedSupplier(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Supplier</option>
              {suppliers.map((supplier, index) => (
                <option key={index} value={supplier}>
                  {supplier}
                </option>
              ))}
            </select>
          </div>

          {/* Invoice Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Choose Invoice
            </label>
            <select
              value={selectedInvoice}
              onChange={(e) => setSelectedInvoice(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Invoice</option>
              {invoices.map((invoice, index) => (
                <option key={index} value={invoice}>
                  {invoice}
                </option>
              ))}
            </select>
          </div>

          {/* Status Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Status</option>
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          {/* Notes Display */}
          {['creditNote', 'debitNote'].map((noteType) => (
            <div key={noteType} className="space-y-4">
              {/* Pending Notes */}
              {imgCards[noteType].length > 0 && selectedStatus === "Pending" && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 capitalize">
                    {noteType.replace('Note', ' Notes')}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {imgCards[noteType]
                      .filter(
                        (img) =>
                          !imgCards[`acc${noteType.charAt(0).toUpperCase() + noteType.slice(1)}`].includes(img) &&
                          !imgCards[`rej${noteType.charAt(0).toUpperCase() + noteType.slice(1)}`].includes(img)
                      )
                      .map((img, index) => (
                        <div
                          key={index}
                          className="bg-white border rounded-lg overflow-hidden shadow-sm"
                        >
                          <img
                            src={img}
                            alt={`${noteType.replace('Note', '')} ${index + 1}`}
                            className="w-full h-64 object-contain"
                          />
                          <div className="flex justify-center space-x-4 p-4 bg-gray-50">
                            <button
                              type="button"
                              onClick={() => handleAccept(img, noteType, noteType === "creditNote" ? "KtmCredit" : "KtmDebit")}
                              className="text-green-600 hover:bg-green-100 p-2 rounded-full transition"
                            >
                              <Check className="h-6 w-6" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleReject(img, noteType, noteType === "creditNote" ? "KtmCredit" : "KtmDebit")}
                              className="text-red-600 hover:bg-red-100 p-2 rounded-full transition"
                            >
                              <X className="h-6 w-6" />
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
              {imgCards[`acc${noteType.charAt(0).toUpperCase() + noteType.slice(1)}`].length > 0 && selectedStatus === "Accepted" && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 capitalize">
                    {noteType.replace('Note', ' Notes')}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {imgCards[`acc${noteType.charAt(0).toUpperCase() + noteType.slice(1)}`]

                      .map((img, index) => (
                        <div
                          key={index}
                          className="bg-white border rounded-lg overflow-hidden shadow-sm"
                        >
                          <img
                            src={img}
                            alt={`${noteType.replace('Note', '')} ${index + 1}`}
                            className="w-full h-64 object-contain"
                          />

                        </div>
                      ))}
                  </div>
                </div>
              )}
              {imgCards[`rej${noteType.charAt(0).toUpperCase() + noteType.slice(1)}`].length > 0 && selectedStatus === "Rejected" && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 capitalize">
                    {noteType.replace('Note', ' Notes')}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {imgCards[`rej${noteType.charAt(0).toUpperCase() + noteType.slice(1)}`]

                      .map((img, index) => (
                        <div
                          key={index}
                          className="bg-white border rounded-lg overflow-hidden shadow-sm"
                        >
                          <img
                            src={img}
                            alt={`${noteType.replace('Note', '')} ${index + 1}`}
                            className="w-full h-64 object-contain"
                          />

                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          {imgCards.ledgerFiles?.length > 0 &&
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 capitalize">
                Ledger Files
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {imgCards.ledgerFiles

                  .map((img, index) => (
                    <div
                      key={index}
                      className="bg-white border rounded-lg overflow-hidden shadow-sm"
                    >
                      <img
                        src={img}
                        alt="ledgerImage"
                        className="w-full h-64 object-contain"
                      />

                    </div>
                  ))}
              </div>
            </div>
          }
          {/* Submit Button */}
          {selectedStatus === "Pending" && (
            <div className="text-center mt-6">
              <button
                type="submit"
                className="w-full max-w-xs bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition"
              >
                Submit
              </button>
            </div>
          )}

          {/* No Data Fallback */}
          {imgCards.creditNote.length === 0 && imgCards.debitNote.length === 0 && (
            <p className="text-center text-gray-500 italic">
              No notes available. Please select a supplier and invoice to view details.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ImageCard;
