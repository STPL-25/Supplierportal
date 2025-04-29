

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Container } from "@mui/material";
import { DashBoardContext } from "../../DashBoardContext/DashBoardContext";
import { API } from "../.././config/configData";
import { Paperclip, X, Upload, Check, Eye } from "lucide-react";
function FormToCredit() {
  const { user } = useContext(DashBoardContext);
  const [formData, setFormData] = useState({
    Billno: "",
    Suppliername: "",
    mobileNumber: "",
    tQty: "",
    cRate: "",
    PureRate: "",
    pure999Rate: ""
  });
  const [files, setFiles] = useState([]);
  const [resData, setResData] = useState({});
  const [errors, setErrors] = useState({});
  const [selectedOption, setSelectedOption] = useState("999 Rate");
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [fieldErrors, setFieldErrors] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [supplierNames,setSupplierNames]=useState([])
  useEffect(() => {
    const updateScreenWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", updateScreenWidth);
    return () => {
      window.removeEventListener("resize", updateScreenWidth);
    };
  }, []);
  // const suppliers = [
  //   { id: 1, name: 'Supplier 1' },
  //   { id: 2, name: 'Supplier 2' },
  //   { id: 3, name: 'Supplier 3' },
  // ];
  useEffect(()=>{
    const fetchCompanyName=async()=>{
      try {
        const response= await axios.get(`${API}/getsupplier/rateconfirmation`, ); 
        // console.log(response.data)
        setSupplierNames(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchCompanyName()
  },[])
  useEffect(()=>{
    const fetchCompanyName=async()=>{
      try {
        const response= await axios.get(`${API}/mobileNumber/rateconfirmation/${formData.Suppliername}`, ); 
        console.log(response.data)
        setFormData({
          ...formData,
          ["mobileNumber"]: response.data.mobilenumber,
        });
        // setSupplierNames(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchCompanyName()
  },[formData.Suppliername])
  const handleInputChange = (e) => {
    // console.log(e.target.value)
    const { name, value } = e.target;
    let formattedValue = value;

    // Handle different field validations
    switch (name) {
      case "mobileNumber":
        formattedValue = value.replace(/\D/g, "").slice(0, 10);
        break;
      case "PureRate":
      case "cRate":
      case "9999 Rate":
        formattedValue = value.replace(/\D/g, "").slice(0, 4);
        break;
      // case "Suppliername":
      //   formattedValue = value.replace(/[^a-zA-Z\s]/g, ""); // Only allow letters and spaces
      //   break;
      case "Billno":
        // Split the value by | to handle before and after separately
        const parts = value.split("|");


        if (parts.length === 2) {
          // Before pipe: allow numbers, letters, and symbols like /, -
          const beforePipe = parts[0].replace(/[^0-9a-zA-Z\/\-_\.]/g, '');
          
          // After pipe: allow numbers and symbols like /, -
          const afterPipe = parts[1].replace(/[^0-9\/\-_\.]/g, "");
          
          formattedValue = `${beforePipe}|${afterPipe}`;
        } else {
          // If no | yet, allow numbers, letters, and symbols
          formattedValue = parts[0].replace(/[^0-9a-zA-Z\/\-_\.]/g, '');
        }
        break;
      default:
        formattedValue = value;


    }

    // Additional validation for tQty
    const validInput =
      name === "tQty" ? /^-?\d*\.?\d{0,3}$/.test(formattedValue) : true;

    if (validInput || value === "") {
      setFormData({
        ...formData,
        [name]: formattedValue,
      });

      // Clear error for this field if the input is valid
      const error = validateField(name, formattedValue);
      if (!error) {
        setFieldErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      } else {
        // Update error for this field
        setFieldErrors(prev => ({
          ...prev,
          [name]: error
        }));
      }
    }
  };


  const handleImageChange = (e) => {

    const selectedFiles = Array.from(e.target.files);
    const newFiles = [...files, ...selectedFiles];
    setFiles(newFiles);
    if (newFiles.length > 0) {
      setFieldErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.files;
        return newErrors;
      });
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length !== 0 || files.length === 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("Billno", formData.Billno.replace(/\s+/g, ''));
      formDataToSend.append("Suppliername", formData.Suppliername);
      formDataToSend.append("mobileNumber", formData.mobileNumber);
      formDataToSend.append("goldRate", selectedOption);
      formDataToSend.append("tQty", formData.tQty);

      selectedOption === "9999 Rate"
        ? formDataToSend.append("pure999Rate", formData.pure999Rate)
        : formDataToSend.append("pure999Rate", "");

      selectedOption === "999 Rate"
        ? formDataToSend.append("PureRate", formData.PureRate)
        : formDataToSend.append("PureRate", "");

      selectedOption === "995 Rate"
        ? formDataToSend.append("cRate", formData.cRate)
        : formDataToSend.append("cRate", "");

      files.forEach((file) => {
        formDataToSend.append("images", file);
      });

      const res = await axios.post(`${API}/datapost`, formDataToSend);

      setResData(res.data);
      if (res.status === 200) {
        // setTimeout(() => {
        //   window.location.reload();
        // }, 1000);
        handleCancel()
      }
    } catch (error) {
      setErrors({ message: error.response.data.message });
    }
  };

  const validateField = (name, value) => {
    switch (name) {
      case "Suppliername":
        if (!value.trim()) return "Supplier name is required";
        // if (value.length < 2) return "Supplier name must be at least 2 characters";
        // if (!/^[a-zA-Z\s]+$/.test(value)) return "Only letters and spaces allowed";
        return "";

      case "Billno":
        if (!value.trim()) return "Bill number is required";
        if (value.includes("|")) {
          const [billNo, date] = value.split("|");
          if (!billNo.trim()) return "Bill number is required";
          if (!date.trim()) return "Date is required";
          if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(date)) return "Invalid date format (DD/MM/YYYY)";
        }
        return "";

      case "mobileNumber":
        if (!value.trim()) return "Mobile number is required";
        if (!/^\d{10}$/.test(value)) return "Must be 10 digits";
        return "";

      case "tQty":
        if (!value.trim()) return "Quantity is required";
        if (isNaN(value) || parseFloat(value) <= 0) return "Must be a positive number";
        if (!/^\d*\.?\d{0,3}$/.test(value)) return "Max 3 decimal places";
        return "";

      case "pure999Rate":
      case "PureRate":
      case "cRate":
        if (!value.trim()) return "Rate is required";
        if (isNaN(value) || parseInt(value) <= 0) return "Must be a positive number";
        if (value.length > 4) return "Maximum 4 digits allowed";
        return "";
      // case "cRate":
      //   if (!value.trim()) return "Rate is required";
      //   if (isNaN(value) || parseInt(value) <= 0) return "Must be a positive number";
      //   if (value.length > 4) return "Maximum 4 digits allowed";
      //   return "";
      default:
        return "";
    }
  };
  const validateForm = () => {
    const errors = {};
    Object.keys(formData).forEach(key => {
      if (selectedOption === "999 Rate" && (key === "cRate" || key === "pure999Rate")) return;
      if (selectedOption === "995 Rate" && (key === "PureRate" || key === "pure999Rate")) return;
      if (selectedOption === "9999 Rate" && (key === "PureRate" || key === "cRate")) return;

      const error = validateField(key, formData[key]);
      if (error) errors[key] = error;
    });

    if (files.length === 0) {
      errors.files = "At least one image is required";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };


  const handleCancel = (e) => {
    e.preventDefault();
    setFiles([]);
    setFormData({
      Billno: "",
      Suppliername: "",
      mobileNumber: "",
      tQty: "",
      cRate: "",
      PureRate: "",
      pure999Rate: ""
    })
    setResData({})
    setErrors({})
    setSelectedOption("999 Rate")
    const [selectedOption, setSelectedOption] = useState("999 Rate");
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [fieldErrors, setFieldErrors] = useState({});
  };

  const handleChange = (event) => {
    const newSelectedOption = event.target.value;
    setSelectedOption(newSelectedOption);

    if (newSelectedOption === "999 Rate") {
      setFormData({ ...formData, cRate: "", pure999Rate: "" });
    }
    if (newSelectedOption === "995 Rate") {
      setFormData({ ...formData, PureRate: "", pure999Rate: "" });
    }
    if (newSelectedOption === "9999 Rate") {
      setFormData({ ...formData, PureRate: "", cRate: "" });
    }
  };

  const handleDelete = (i) => {
    const selectedFiles = [...files.slice(0, i), ...files.slice(i + 1)];
    setFiles(selectedFiles);
    document.getElementById("dropzone-file").value = "";
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    setFiles(droppedFiles);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-10">
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl p-6 md:p-8">
        <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">
          Gold Rate Fixing Form
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Supplier Name
              </label>
              <input
                type="text"
                name="Suppliername"
                placeholder="Enter Supplier Name"
                value={formData.Suppliername}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${fieldErrors.Suppliername ? 'border-red-500' : 'border-gray-300'
                  }`}
              />
              {fieldErrors.Suppliername && (
                <p className="mt-1 text-sm text-red-500">{fieldErrors.Suppliername}</p>
              )}
            </div>
            {/* <div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Supplier Name
  </label>
  <select
    name="Suppliername"
    value={formData.Suppliername}
    onChange={handleInputChange}
    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
      fieldErrors.Suppliername ? 'border-red-500' : 'border-gray-300'
    }`}
  >
    <option value="">Select Supplier</option>
    {supplierNames.map((supplier,index) => (
      <option key={index} value={supplier.companyname}>
        {supplier.companyname}
      </option>
    ))}
  </select>
  {fieldErrors.Suppliername && (
    <p className="mt-1 text-sm text-red-500">{fieldErrors.Suppliername}</p>
  )}
</div> */}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bill No | Date
              </label>
              <input
                type="text"
                name="Billno"
                placeholder="Enter Bill No"
                value={formData.Billno}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${fieldErrors.Billno ? 'border-red-500' : 'border-gray-300'
                  }`}
              />
              {fieldErrors.Billno && (
                <p className="mt-1 text-sm text-red-500">{fieldErrors.Billno}</p>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Number
              </label>
              <input
                type="tel"
                name="mobileNumber"
                placeholder="Phone Number"
                value={formData.mobileNumber}
                onChange={handleInputChange}
                maxLength={10}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${fieldErrors.mobileNumber ? 'border-red-500' : 'border-gray-300'
                  }`}
              />
              {fieldErrors.mobileNumber && (
                <p className="mt-1 text-sm text-red-500">{fieldErrors.mobileNumber}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total Qty In Pure-Grams
              </label>
              <input
                type="text"
                name="tQty"
                placeholder="Enter Qty in g"
                value={formData.tQty}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${fieldErrors.tQty ? 'border-red-500' : 'border-gray-300'
                  }`}
              />
              {fieldErrors.tQty && (
                <p className="mt-1 text-sm text-red-500">{fieldErrors.tQty}</p>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gold Purity
              </label>
              <select
                value={selectedOption}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="995 Rate">995 Rate</option>
                <option value="999 Rate">999 Rate</option>
                <option value="9999 Rate">9999 Rate</option>
              </select>
            </div>

            <div>
              {selectedOption === "9999 Rate" && (
                <>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Wt 9999 Rate
                  </label>
                  <input
                    type="text"
                    name="pure999Rate"
                    placeholder="Enter 9999 Rate"
                    value={formData.pure999Rate}
                    onChange={handleInputChange}
                    maxLength={5}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${fieldErrors.pure999Rate ? 'border-red-500' : 'border-gray-300'
                      }`}
                  />
                  {fieldErrors.pure999Rate && (
                    <p className="mt-1 text-sm text-red-500">{fieldErrors.pure999Rate}</p>
                  )}
                </>
              )}

              {selectedOption === "999 Rate" && (
                <>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Wt 999 Rate
                  </label>
                  <input
                    type="text"
                    name="PureRate"
                    placeholder="Enter 999 Rate"
                    value={formData.PureRate}
                    onChange={handleInputChange}
                    maxLength={4}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${fieldErrors.PureRate ? 'border-red-500' : 'border-gray-300'
                      }`}
                  />
                  {fieldErrors.PureRate && (
                    <p className="mt-1 text-sm text-red-500">{fieldErrors.PureRate}</p>
                  )}
                </>
              )}

              {selectedOption === "995 Rate" && (
                <>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Wt 995 Rate
                  </label>
                  <input
                    type="text"
                    name="cRate"
                    placeholder="Enter 995 Rate"
                    value={formData.cRate}
                    onChange={handleInputChange}
                    maxLength={4}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${fieldErrors.cRate ? 'border-red-500' : 'border-gray-300'
                      }`}
                  />
                  {fieldErrors.cRate && (
                    <p className="mt-1 text-sm text-red-500">{fieldErrors.cRate}</p>
                  )}
                </>
              )}
            </div>
          </div>

          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center ${fieldErrors.files ? 'border-red-500' : 'border-gray-300'
              }`}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <input
              type="file"
              id="dropzone-file"
              multiple
              className="hidden"
              onChange={handleImageChange}
            />
            <label
              htmlFor="dropzone-file"
              className="cursor-pointer flex flex-col items-center justify-center space-y-2"
            >
              <Upload className="w-12 h-12 text-blue-500" />
              <p className="text-gray-600">
                Click to upload or drag and drop files
              </p>
              <p className="text-xs text-gray-500">SVG, PNG, JPG (Max 2 files)</p>
            </label>

          </div>
          {files.length > 0 && (
            <div>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                {files.map((file, index) => (
                  <div key={index} className="relative group aspect-square">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Uploaded ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute top-1 right-1 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedImage(URL.createObjectURL(file));
                          setIsModalOpen(true);
                        }}
                        className="bg-blue-500 text-white rounded-full p-1 hover:bg-blue-600 transition-colors"
                        aria-label="Preview image"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(index)}
                        className="bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                        aria-label="Delete image"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                  <div className="bg-white rounded-lg p-4 max-w-3xl max-h-[90vh] w-full relative">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                      aria-label="Close preview"
                    >
                      <X className="w-6 h-6" />
                    </button>
                    <img
                      src={selectedImage}
                      alt="Preview"
                      className="w-full h-auto max-h-[80vh] object-contain"
                    />
                  </div>
                </div>
              )}
            </div>
          )}
          {fieldErrors.files && (
            <p className="mt-1 text-sm text-red-500">{fieldErrors.files}</p>
          )}
          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <Check className="mr-2" /> Submit
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center"
            >
              <X className="mr-2" /> Cancel
            </button>
          </div>

          {resData.message && (
            <div className="text-center text-green-600 font-medium">
              {resData.message}
            </div>
          )}

          {errors.message && (
            <div className="text-center text-red-600 font-medium">
              {errors.message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default FormToCredit;
