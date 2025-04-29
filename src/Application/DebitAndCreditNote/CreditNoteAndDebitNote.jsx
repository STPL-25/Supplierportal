import { useEffect, useState, useContext ,useMemo} from "react";
import "react-widgets/styles.css";
import Combobox from "react-widgets/Combobox";
import { API } from "../../config/configData";
import axios from "axios";
import { DashBoardContext } from "../../DashBoardContext/DashBoardContext";
import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

function CreditNoteAndDebitNote() {
  const [debitFiles, setDebitFiles] = useState([]);
  const [creditFiles, setCreditFiles] = useState([]);
  // const [supDebitFiles, setSupDebitFiles] = useState([]);
  // const [supCreditFiles, setSupCreditFiles] = useState([]);
  const [selectionType, setSelectionType] = useState("Gold");
  const [noteType, setNoteType] = useState("Credit");
  const [comboBoxData, setComboBoxData] = useState([]);
  const [supplierNames, setSupplierNames] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const { userRole } = useContext(DashBoardContext);
  const [errors, setErrors] = useState({});
  const [filter, setFilter] = useState('');

  const handleRadioChange = (event) => {
    setSelectionType(event.target.id);
  };

  const handleRadioNoteTypeChange = (event) => {
    setNoteType(event.target.id);
  };
  const filteredSuppliers = useMemo(() => {
    if (!filter) return supplierNames;
    
    return supplierNames.filter(supplier => 
      supplier.toLowerCase().includes(filter.toLowerCase())
    );
  }, [supplierNames, filter]);

  useEffect(() => {
    const fetchDatas = async () => {
      try {
        const response = await axios.put(
          `${API}/debitandCredit/gettinginvdetails`,
          { userRole, selectedSupplier, selectionType }
        );
        setComboBoxData(response.data?.consolidateInvDetails || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setComboBoxData([]);
      }
    };
    fetchDatas();
  }, [noteType, selectedSupplier]);

  useEffect(() => {
    const fetchDatas = async () => {
      try {
        const response = await axios.put(
          `${API}/debitandCredit/fetchSuppliernames`,
          { userRole, selectionType }
        );
        setSupplierNames(response?.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setSupplierNames([]);
      }
    };
    fetchDatas();
  }, [selectionType]);

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setErrors(prevErrors => {
      const { files, ...remainingErrors } = prevErrors;
      return remainingErrors;
  });

    if (noteType === "Credit") {
      setCreditFiles(selectedFiles);
      setDebitFiles([]);
    } else if (noteType === "Debit") {
      setDebitFiles(selectedFiles);
      setCreditFiles([]);
    }
  };
  const resetForm = () => {
    // Resets form fields to their default values
    setSelectionType("Gold");          // Default selection type
    setNoteType("Credit");             // Default note type
    setSelectedInvoice(null);          // Clear selected invoice
    setSelectedSupplier(null);         // Clear selected supplier
    setErrors({});                     // Clear validation errors
    setComboBoxData([]);               // Clear combo box data
    setSupplierNames([]);              // Clear supplier names
    setCreditFiles([])
    setDebitFiles([])
};

  const validateForm = () => {
    const newErrors = {};

    // Validate Selection Type
    if (!selectionType) {
      newErrors.selectionType = "Please select a category (Gold or Diamond)";
    }

    // Validate Note Type
    if (!noteType) {
      newErrors.noteType = "Please select a note type (Credit or Debit)";
    }

    // Validate Supplier Name
    if (!selectedSupplier) {
      newErrors.supplier = "Please select a supplier";
    }

    // Validate Invoice Selection
    if (!selectedInvoice) {
      newErrors.invoice = "Please select an invoice";
    }

    // Validate File Upload
    const totalFiles = [...debitFiles, ...creditFiles].length;
    if (totalFiles === 0) {
      newErrors.files = "Please upload at least one image";
    }

    // Optional: File type and size validation
    const allowedTypes = ['image/jpeg', 'image/png', 'image/svg+xml'];
    const maxFileSize = 1 * 1024 * 1024; 
    const invalidFiles = [...debitFiles, ...creditFiles].filter(file =>
      !allowedTypes.includes(file.type) || file.size > maxFileSize
    );

    if (invalidFiles.length > 0) {
      newErrors.files = "Invalid file type or size. Only JPG, PNG, SVG files under 5MB are allowed.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  console.log(errors)
  const handleFileDelete = (fileType, fileData) => {
    console.log(fileType)
    if (fileType === "debitFiles") {
      setDebitFiles(debitFiles.filter((file) => file !== fileData))
    }
    if (fileType === "creditFiles") {
      setCreditFiles(creditFiles.filter((file) => file !== fileData))
    }
    if (fileType === "ledgerfile") {
      setLedgerFile(ledgerFile.filter((file) => file !== fileData))
    }

  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      toast.error("Please correct the errors in the form.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("selectionType", selectionType);
      formData.append("Suppliername", selectedSupplier);
      formData.append("noteType", noteType);
      formData.append("selectedInvoice", selectedInvoice);
      formData.append("role", userRole);

      debitFiles.forEach((file) => {
        formData.append("debitFileImg", file);
      });
      creditFiles.forEach((file) => {
        formData.append("creditFileImg", file);
      });

      const response = await axios.post(
        `${API}/debitandCredit/postingdebitandcreditnote`,
        formData
      );
      console.log(response.status)
      if (response.status === 200) {
        console.log(response.status)
        resetForm()
      }
      toast.success("Form submitted successfully!",);
    } catch (error) {
      toast.error("Error submitting the form. Please try again.");
      console.error(error);
    }
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="bg-blue-600 text-white py-4 px-6">
          <h1 className="text-xl font-bold text-center">Credit/Debit Note Submission</h1>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Category Selection */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Select Category
            </label>
            <div className="flex space-x-4">
              <label className="flex-1">
                <input
                  type="radio"
                  name="type"
                  id="Gold"
                  checked={selectionType === "Gold"}
                  onChange={handleRadioChange}
                  className="sr-only peer"
                />
                <div className={`
                    cursor-pointer 
                    w-full 
                    p-3 
                    rounded-lg 
                    border-2 
                    text-center 
                    transition-all 
                    ${selectionType === "Gold"
                    ? 'bg-yellow-100 border-yellow-500 text-yellow-700'
                    : 'border-gray-300 hover:bg-gray-100'
                  }
                    ${errors.selectionType ? 'border-red-500' : ''}
                  `}>
                  Gold
                </div>
              </label>
              <label className="flex-1">
                <input
                  type="radio"
                  name="type"
                  id="Diamond"
                  checked={selectionType === "Diamond"}
                  onChange={handleRadioChange}
                  className="sr-only peer"
                />
                <div className={`
                    cursor-pointer 
                    w-full 
                    p-3 
                    rounded-lg 
                    border-2 
                    text-center 
                    transition-all 
                    ${selectionType === "Diamond"
                    ? 'bg-blue-100 border-blue-500 text-blue-700'
                    : 'border-gray-300 hover:bg-gray-100'
                  }
                    ${errors.selectionType ? 'border-red-500' : ''}
                  `}>
                  Diamond
                </div>
              </label>
            </div>
            {errors.selectionType && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                {errors.selectionType}
              </p>
            )}
          </div>

          {/* Note Type Selection */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Select Note Type
            </label>
            <div className="flex space-x-4">
              <label className="flex-1">
                <input
                  type="radio"
                  name="noteType"
                  id="Credit"
                  checked={noteType === "Credit"}
                  onChange={handleRadioNoteTypeChange}
                  className="sr-only peer"
                />
                <div className={`
                    cursor-pointer 
                    w-full 
                    p-3 
                    rounded-lg 
                    border-2 
                    text-center 
                    transition-all 
                    ${noteType === "Credit"
                    ? 'bg-green-100 border-green-500 text-green-700'
                    : 'border-gray-300 hover:bg-gray-100'
                  }
                    ${errors.noteType ? 'border-red-500' : ''}
                  `}>
                  Credit Note
                </div>
              </label>
              <label className="flex-1">
                <input
                  type="radio"
                  name="noteType"
                  id="Debit"
                  checked={noteType === "Debit"}
                  onChange={handleRadioNoteTypeChange}
                  className="sr-only peer"
                />
                <div className={`
                    cursor-pointer 
                    w-full 
                    p-3 
                    rounded-lg 
                    border-2 
                    text-center 
                    transition-all 
                    ${noteType === "Debit"
                    ? 'bg-red-100 border-red-500 text-red-700'
                    : 'border-gray-300 hover:bg-gray-100'
                  }
                    ${errors.noteType ? 'border-red-500' : ''}
                  `}>
                  Debit Note
                </div>
              </label>
            </div>
            {errors.noteType && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                {errors.noteType}
              </p>
            )}
          </div>

          {/* Supplier Combobox */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Supplier Name
            </label>
            <div className={`
                transition-all 
                ${errors.supplier
                ? 'ring-2 ring-red-500 rounded-lg'
                : 'hover:ring-2 hover:ring-blue-300 focus-within:ring-2 focus-within:ring-blue-500'
              }
              `}>
              <Combobox
      data={filteredSuppliers}
      placeholder="Select a Supplier"
      onSearch={(searchTerm) => setFilter(searchTerm)}
      value={selectedSupplier}
      onChange={(value) => {
        setSelectedSupplier(value);
        if (errors.supplier) {
          setErrors(prev => ({ ...prev, supplier: undefined }));
        }
      }}
      className="w-full rounded-lg border-gray-300 focus:border-blue-500"
    />
            </div>
            {errors.supplier && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                {errors.supplier}
              </p>
            )}
          </div>

          {/* Invoice Combobox */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Invoice No
            </label>
            <div className={`
                transition-all 
                ${errors.invoice
                ? 'ring-2 ring-red-500 rounded-lg'
                : 'hover:ring-2 hover:ring-blue-300 focus-within:ring-2 focus-within:ring-blue-500'
              }
              `}>
              <Combobox
                data={comboBoxData}
                placeholder="Select an Invoice"
                value={selectedInvoice}
                onChange={(value) => {
                  setSelectedInvoice(value);
                  if (errors.invoice) {
                    setErrors(prev => ({ ...prev, invoice: undefined }));
                  }
                }}
                className="w-full rounded-lg border-gray-300 focus:border-blue-500"
              />
            </div>
            {errors.invoice && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                {errors.invoice}
              </p>
            )}
          </div>

          {/* File Upload Section */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Upload Images
            </label>
            <label
              htmlFor="dropzone-file"
              className={`
                  block 
                  w-full 
                  p-6 
                  text-center 
                  border-2 
                  border-dashed 
                  rounded-lg 
                  cursor-pointer 
                  transition-all 
                  hover:bg-blue-50 
                  ${errors.files
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-300'
                }
                `}
            >
              <div className="flex flex-col items-center justify-center space-y-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`w-10 h-10 ${errors.files ? 'text-red-500' : 'text-gray-400'}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p className={`text-sm ${errors.files ? 'text-red-600' : 'text-gray-600'}`}>
                  Click to upload or drag and drop
                </p>
                <p className={`text-xs ${errors.files ? 'text-red-400' : 'text-gray-400'}`}>
                  SVG, PNG, JPG (MAX. 5MB)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                multiple
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
            {errors.files && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                {errors.files}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="
                w-full 
                py-3 
                bg-blue-600 
                text-white 
                rounded-lg 
                hover:bg-blue-700 
                focus:outline-none 
                focus:ring-2 
                focus:ring-blue-500 
                focus:ring-offset-2 
                transition-all 
                transform 
                hover:scale-[1.02]
              "
          >
            Submit Note
          </button>
          <div className="space-y-4 mt-6">
          {/* Debit Note Files */}
          {debitFiles.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-red-600">Debit Note Files</h3>
              <div className="grid grid-cols-2 gap-4">
                {debitFiles.map((file, index) => (
                  <div
                    key={index}
                    className="relative flex flex-col items-center p-2 border rounded-lg"
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Debit File ${index + 1}`}
                      className="w-full h-40 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => handleFileDelete("debitFiles", file)}
                      className="absolute top-1 right-1 bg-red-500 text-white text-xs p-1 rounded-full hover:bg-red-700"
                    >
                      X
                    </button>
                    <p className="text-xs mt-2 truncate">{file.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Credit Note Files */}
          {creditFiles.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-green-600">Credit Note Files</h3>
              <div className="grid grid-cols-2 gap-4">
                {creditFiles.map((file, index) => (
                  <div
                    key={index}
                    className="relative flex flex-col items-center p-2 border rounded-lg"
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Credit File ${index + 1}`}
                      className="w-full h-40 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => handleFileDelete("creditFiles", file)}
                      className="absolute top-1 right-1 bg-red-500 text-white text-xs p-1 rounded-full hover:bg-red-700"
                    >
                      X
                    </button>
                    <p className="text-xs mt-2 truncate">{file.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default CreditNoteAndDebitNote;
