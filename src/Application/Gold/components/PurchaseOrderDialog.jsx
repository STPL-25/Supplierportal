

// import React, { useState, useEffect, useRef } from "react";
// import {
//   ChevronRight,
//   ChevronLeft,
//   GripVertical,
//   Search,
//   Calendar,
// } from "lucide-react";
// import axios from "axios";
// import { API } from "../../../config/configData";
// import PurchaseOrderGenerator from "./PurchaseOrderGenerator";

// const COMPANY_PRESETS = {
//   tct: {
//     name: "THE CHENNAI TRADERS",
//     subTitle: "",
//     doorNo: "No.966-972",
//     streetName: "Crosscut Road",
//     city: "Coimbatore",
//     state: "Tamil Nadu",
//     pincode: "641012",
//     phone: "0422-2490888",
//     email: "info@sktm.in",
//     gstNo: "33AAKFK9153A1ZJ",
//     poPreFix: "TCT",
//   },
//   spacetextiles: {
//     name: "Sree Kumaran Thangamaligai",
//     subTitle: "(A Unit Of Space Textiles Pvt Ltd)",
//     doorNo: "A.Ku Towers",
//     streetName: "Crosscut Road",
//     city: "Coimbatore",
//     state: "Tamil Nadu",
//     pincode: "641012",
//     phone: "0422-2490888",
//     email: "info@sktm.in",
//     gstNo: "33AAKCS0757M1Z0",
//     poPreFix: "STPL",
//   },
//   garsons: {
//     name: "Sree Kumaran Thangamaligai",
//     subTitle: "(A Unit of Garsons Private Limited)",
//     doorNo: "A.Ku Towers",
//     streetName: "Crosscut Road",
//     city: "Coimbatore",
//     state: "Tamil Nadu",
//     pincode: "641012",
//     phone: "0422-2490888",
//     email: "info@garsons.in",
//     gstNo: "33AABCG8863D1ZP",
//     poPreFix: "GPL",
//   },
// };

// const PurchaseOrderDialog = ({ isOpen, onClose, onSubmit,metal_type,orderType,selectedItems }) => {
//   console.log(selectedItems);
//   const dialogRef = useRef(null);
//   console.log(onSubmit);
//   const initialState = {
//     from: {
//       name: "",
//       subTitle: "",
//       doorNo: "",
//       streetName: "",
//       city: "",
//       state: "",
//       pincode: "",
//       phone: "",
//       email: "",
//       gstNo: "",
//     },
//     supplier: {
//       name: "",
//       doorNo: "",
//       streetName: "",
//       city: "",
//       area: "",
//       state: "",
//       pincode: "",
//       phone: "",
//       email: "",
//       gstNo: "",
//     },
//     poDetails: {
//       poNumber: "",
//       poDate: new Date().toISOString().split("T")[0],
//       dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
//         .toISOString()
//         .split("T")[0],
//       mode: "purchase",
//     },
//     counterDetails: {
//       counter: "",
//       purchaseIncharge: "",
//       purchaseManager: "",
//     },
//     delivery: {
//       locationType: "direct",
//       address:
//         "A.Ku Towers, Crosscut Road,Coimbatore,Tamil Nadu,641012,0422-2490888",
//     },
//   };

//   const [currentStep, setCurrentStep] = useState(1);
//   const [companyType, setCompanyType] = useState("");
//   const [formData, setFormData] = useState(initialState);
//   const [position, setPosition] = useState({ x: 0, y: 0 });
//   // const [isDragging, setIsDragging] = useState(false);
//   // const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
//   const [errors, setErrors] = useState({});
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState([]);

//   // Reset the form state whenever the dialog is closed or submitted and then reopened
//   useEffect(() => {
//     if (isOpen) {
//       // Dialog has been opened - no need to reset state
//     } else {
//       // Dialog is closed - reset all state
//       setFormData(initialState);
//       setCompanyType("");
//       setCurrentStep(1);
//       setErrors({});
//       setSearchQuery("");
//       setSearchResults([]);
//     }
//   }, [isOpen]);

//   useEffect(() => {
//     const fetchNextPoNumber = async () => {
//       if (companyType && COMPANY_PRESETS[companyType]) {
//         try {
//           const prefix = COMPANY_PRESETS[companyType].poPreFix;
//           const response = await axios.get(
//             `${API}/gold_po/fetch_po_numbers/${prefix}/${metal_type}/${orderType}`
//           );
//           const nextPoNumber = response.data.nextPoNumber;
//           setFormData((prev) => ({
//             ...prev,
//             from: COMPANY_PRESETS[companyType],
//             poDetails: {
//               ...prev.poDetails,
//               poNumber: nextPoNumber,
//             },
//           }));
//         } catch (error) {
//           console.error("Error fetching PO number:", error);
//         }
//       }
//     };
//     fetchNextPoNumber();
//   }, [companyType]);

//   const fetchSupplierDetailsByName = async (name) => {
//     try {
//       if (!name) return;
//       const response = await axios.get(
//         `${API}/gold_po/fetch_supplier_by_name`,
//         {
//           params: { name },
//         }
//       );
//       setSearchResults(response.data || []);
//     } catch (error) {
//       console.error("Error fetching supplier details:", error);
//       setSearchResults([]);
//     }
//   };

//   const handleSupplierSelect = (supplier) => {
//     setFormData((prev) => ({
//       ...prev,
//       supplier: {
//         name: supplier.companyname,
//         doorNo: supplier.doorno,
//         streetName: supplier.street,
//         city: supplier.city,
//         area: supplier.area,
//         state: supplier.state,
//         pincode: supplier.pincode,
//         phone: supplier.mobilenumber,
//         email: supplier.email,
//         gstNo: supplier.gst,
//       },
//     }));
//     setSearchQuery(supplier.companyname);
//     setSearchResults([]);
//     validateStep("2")
//   };

//   const handleSearchChange = (e) => {
//     const query = e.target.value;
//     setSearchQuery(query);
//     if (query.length >= 2) {
//       fetchSupplierDetailsByName(query);
//     } else {
//       setSearchResults([]);
//     }
//   };

//   const validateStep = (step) => {
//     console.log(step);
//     const newErrors = {};

//     if (step === 1) {
//       if (!companyType) newErrors.companyType = "Please select a company";
//       // if (!formData.poDetails.poNumber)
//       //   newErrors["poDetails.poNumber"] = "PO Number is required";
//       if (!formData.poDetails.poDate)
//         newErrors["poDetails.poDate"] = "PO Date is required";
//       if (!formData.poDetails.dueDate)
//         newErrors["poDetails.dueDate"] = "Due Date is required";

//       if (formData.poDetails.dueDate < formData.poDetails.poDate) {
//         newErrors["poDetails.dueDate"] =
//           "Due Date cannot be earlier than PO Date";
//       }
//     } else if (step === 2) {
//       if (!formData.supplier.name)
//         newErrors["supplier.name"] = "Supplier name is required";
//       if (!formData.supplier.gstNo)
//         newErrors["supplier.gstNo"] = "GST No is required";
//       if (!formData.supplier.phone)
//         newErrors["supplier.phone"] = "Phone is required";
//       if (!formData.supplier.email)
//         newErrors["supplier.email"] = "Email is required";
//       if (!formData.supplier.doorNo)
//         newErrors["supplier.doorNo"] = "Door No is required";
//       if (!formData.supplier.streetName)
//         newErrors["supplier.streetName"] = "Street Name is required";
//       if (!formData.supplier.city)
//         newErrors["supplier.city"] = "City is required";
//       if (!formData.supplier.state)
//         newErrors["supplier.state"] = "State is required";
//       if (!formData.supplier.pincode)
//         newErrors["supplier.pincode"] = "Pincode is required";

//       // Validate email format
//       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//       if (
//         formData.supplier.email &&
//         !emailRegex.test(formData.supplier.email)
//       ) {
//         newErrors["supplier.email"] = "Invalid email format";
//       }

//       // Validate phone number
//       const phoneRegex = /^\d{10}$/;
//       if (
//         formData.supplier.phone &&
//         !phoneRegex.test(formData.supplier.phone)
//       ) {
//         newErrors["supplier.phone"] = "Phone number must be 10 digits";
//       }

//       // Validate GST number format
//       const gstRegex =
//         /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
//       if (formData.supplier.gstNo && !gstRegex.test(formData.supplier.gstNo)) {
//         newErrors["supplier.gstNo"] = "Invalid GST number format";
//       }
//     } else if (step === 3) {
//       if (!formData.counterDetails.purchaseManager)
//         newErrors["counterDetails.purchaseManager"] =
//           "Purchase Manager is required";
//       if (!formData.counterDetails.purchaseIncharge)
//         newErrors["counterDetails.purchaseIncharge"] =
//           "Purchase Incharge is required";
//       if (!formData.delivery.address)
//         newErrors["delivery.address"] = "Delivery address is required";
//     }

//     return newErrors;
//   };

//   // const handleInputChange = (section, field, value) => {
//   //   setFormData((prev) => ({
//   //     ...prev,
//   //     [section]: {
//   //       ...prev[section],
//   //       [field]: value,
//   //     },
//   //   }));
//   //   // Clear error when user starts typing
//   //   console.log(section, field, value);
//   //   if (errors[`${section}.${field}`]) {
//   //     setErrors((prev) => {
//   //       const newErrors = { ...prev };
//   //       delete newErrors[`${section}.${field}`];
//   //       return newErrors;
//   //     });
//   //   }
//   // };
//   const handleInputChange = (section, field, value,step) => {
//     console.log(step);
//     setFormData((prev) => ({
//       ...prev,
//       [section]: {
//         ...prev[section],
//         [field]: value,
//       },
//     }));
//     validateStep(step)
//     // Clear the specific error when a field is changed
//     const errorKey = `${section}.${field}`;
//     if (errors[errorKey]) {
//       setErrors((prev) => {
//         const newErrors = { ...prev };
//         delete newErrors[errorKey];
//         return newErrors;
//       });
//     }
//   };
//   console.log(errors);

//   const handleNext = () => {
//     const newErrors = validateStep(currentStep);
//     if (Object.keys(newErrors).length === 0) {
//       setCurrentStep((prev) => prev + 1);
//       setErrors({});
//     } else {
//       setErrors(newErrors);
//     }
//   };

//   const handlePrevious = () => {
//     setCurrentStep((prev) => prev - 1);
//     setErrors({});
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const newErrors = validateStep(currentStep);
//     if (Object.keys(newErrors).length === 0) {
//       onSubmit(formData);
//       onClose();
//     } else {
//       setErrors(newErrors);
//     }
//   };
//   const handleCompanyTypeChange = (e) => {
//     const value = e.target.value;
//     setCompanyType(value);

//     // Clear company type error when selected
//     if (errors.companyType) {
//       setErrors((prev) => {
//         const newErrors = { ...prev };
//         delete newErrors.companyType;
//         return newErrors;
//       });
//     }
//   };

//   const inputClasses = (errorKey) =>
//     `w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all ${
//       errors[errorKey]
//         ? "border-red-500 focus:ring-red-200"
//         : "border-gray-300 focus:border-blue-500"
//     }`;

//   const renderStep = () => {
//     switch (currentStep) {
//       case 1:
//         return (
//           <div className="space-y-6">
//             <div>
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">
//                 Company Selection
//               </h3>
//               <div className="space-y-2">
//                 <div className="relative">
                 
//                   <select
//                     value={companyType}
//                     onChange={handleCompanyTypeChange}
//                     className="w-full p-3 border rounded-lg bg-white appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   >
//                     <option value="" disabled>
//                       Select company type
//                     </option>
//                     {Object.entries(COMPANY_PRESETS).map(([key, preset]) => (
//                       <option key={key} value={key} className="py-2">
//                         {preset.name + " " + preset.subTitle}
//                       </option>
//                     ))}
//                   </select>
//                   {/* Custom dropdown arrow */}
//                   <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
//                     <svg
//                       className="w-4 h-4 text-gray-500"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M19 9l-7 7-7-7"
//                       />
//                     </svg>
//                   </div>
//                 </div>

//                 {/* Show selected option's subtitle if it exists */}
//                 {companyType && COMPANY_PRESETS[companyType]?.subTitle && (
//                   <p className="text-sm text-gray-500 mt-1">
//                     {COMPANY_PRESETS[companyType].subTitle}
//                   </p>
//                 )}

//                 {errors.companyType && (
//                   <p className="text-sm text-red-600">{errors.companyType}</p>
//                 )}
//               </div>
//             </div>
//             <div className="bg-white p-4 rounded-lg border border-gray-200">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">
//                 Purchase Order Details
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     PO Number
//                   </label>
//                   <input
//                     type="text"
//                     value={formData.poDetails.poNumber}
//                     className={`${inputClasses(
//                       "poDetails.poNumber"
//                     )} bg-gray-50`}
//                     disabled
//                   />
//                   {errors["poDetails.poNumber"] && (
//                     <p className="mt-1 text-sm text-red-600">
//                       {errors["poDetails.poNumber"]}
//                     </p>
//                   )}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     PO Date
//                   </label>
//                   <input
//                     type="date"
//                     value={formData.poDetails.poDate}
//                     onChange={(e) =>
//                       handleInputChange("poDetails", "poDate", e.target.value)
//                     }
//                     className={inputClasses("poDetails.poDate")}
//                   />
//                   {errors["poDetails.poDate"] && (
//                     <p className="mt-1 text-sm text-red-600">
//                       {errors["poDetails.poDate"]}
//                     </p>
//                   )}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Due Date
//                   </label>
//                   <input
//                     type="date"
//                     value={formData.poDetails.dueDate}
//                     onChange={(e) =>
//                       handleInputChange("poDetails", "dueDate", e.target.value)
//                     }
//                     className={inputClasses("poDetails.dueDate")}
//                   />
//                   {errors["poDetails.dueDate"] && (
//                     <p className="mt-1 text-sm text-red-600">
//                       {errors["poDetails.dueDate"]}
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {companyType && (
//               <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
//                 <h3 className="text-sm font-semibold text-gray-700 mb-3">
//                   Selected Company Preview
//                 </h3>
//                 <div className="space-y-2 text-sm text-gray-600">
//                   <p>
//                     {COMPANY_PRESETS[companyType].doorNo},{" "}
//                     {COMPANY_PRESETS[companyType].streetName}
//                   </p>
//                   <p>
//                     {COMPANY_PRESETS[companyType].city} -{" "}
//                     {COMPANY_PRESETS[companyType].pincode}
//                   </p>
//                   <p>{COMPANY_PRESETS[companyType].state}</p>
//                   <div className="pt-2 mt-2 border-t border-gray-200">
//                     <p>Phone: {COMPANY_PRESETS[companyType].phone}</p>
//                     <p>Email: {COMPANY_PRESETS[companyType].email}</p>
//                     <p>GST: {COMPANY_PRESETS[companyType].gstNo}</p>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         );

//       case 2:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">
//               Supplier Information
//             </h3>

//             <div className="relative">
//               <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                 Search Supplier
//               </label>
//               <div className="relative">
//                 <input
//                   type="text"
//                   value={searchQuery}
//                   onChange={handleSearchChange}
//                   className={`w-full p-2.5 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all ${
//                     errors["supplier.name"]
//                       ? "border-red-500"
//                       : "border-gray-300"
//                   }`}
//                   placeholder="Type supplier name to search..."
//                 />
//                 <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
//               </div>

//               {searchResults.length > 0 && (
//                 <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
//                   {searchResults.map((supplier, index) => (
//                     <div
//                       key={index}
//                       className="p-3 hover:bg-gray-50 cursor-pointer transition-colors"
//                       onClick={() => handleSupplierSelect(supplier)}
//                     >
//                       <p className="font-medium text-gray-900">
//                         {supplier.companyname}
//                       </p>
//                       <p className="text-sm text-gray-500">
//                         {supplier.city}, {supplier.state}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Supplier Name*
//                 </label>
//                 <input
//                   type="text"
//                   value={formData.supplier.name}
//                   onChange={(e) =>
//                     handleInputChange("supplier", "name", e.target.value,"2")
//                   }
//                   className={inputClasses("supplier.name")}
//                   placeholder="Enter supplier name"
//                 />
//                 {errors["supplier.name"] && (
//                   <p className="mt-1 text-sm text-red-600">
//                     {errors["supplier.name"]}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   GST Number*
//                 </label>
//                 <input
//                   type="text"
//                   value={formData.supplier.gstNo}
//                   onChange={(e) =>
//                     handleInputChange("supplier", "gstNo", e.target.value,"2")
//                   }
//                   className={inputClasses("supplier.gstNo")}
//                   placeholder="Enter GST number"
//                 />
//                 {errors["supplier.gstNo"] && (
//                   <p className="mt-1 text-sm text-red-600">
//                     {errors["supplier.gstNo"]}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Phone*
//                 </label>
//                 <input
//                   type="tel"
//                   value={formData.supplier.phone}
//                   onChange={(e) =>
//                     handleInputChange("supplier", "phone", e.target.value,"2")
//                   }
//                   className={inputClasses("supplier.phone")}
//                   placeholder="Enter phone number"
//                 />
//                 {errors["supplier.phone"] && (
//                   <p className="mt-1 text-sm text-red-600">
//                     {errors["supplier.phone"]}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Email*
//                 </label>
//                 <input
//                   type="email"
//                   value={formData.supplier.email}
//                   onChange={(e) =>
//                     handleInputChange("supplier", "email", e.target.value,'2')
//                   }
//                   className={inputClasses("supplier.email")}
//                   placeholder="Enter email address"
//                 />
//                 {errors["supplier.email"] && (
//                   <p className="mt-1 text-sm text-red-600">
//                     {errors["supplier.email"]}
//                   </p>
//                 )}
//               </div>

//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Address Details*
//                 </label>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <input
//                     type="text"
//                     placeholder="Door No"
//                     value={formData.supplier.doorNo}
//                     onChange={(e) =>
//                       handleInputChange("supplier", "doorNo", e.target.value,"2")
//                     }
//                     className={inputClasses("supplier.doorNo")}
//                   />
//                   <input
//                     type="text"
//                     placeholder="Street Name"
//                     value={formData.supplier.streetName}
//                     onChange={(e) =>
//                       handleInputChange(
//                         "supplier",
//                         "streetName",
//                         e.target.value
//                       )
//                     }
//                     className={inputClasses("supplier.streetName")}
//                   />
//                   <input
//                     type="text"
//                     placeholder="Area"
//                     value={formData.supplier.area}
//                     onChange={(e) =>
//                       handleInputChange("supplier", "area", e.target.value,"2")
//                     }
//                     className={inputClasses("supplier.area")}
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   City*
//                 </label>
//                 <input
//                   type="text"
//                   value={formData.supplier.city}
//                   onChange={(e) =>
//                     handleInputChange("supplier", "city", e.target.value,"2")
//                   }
//                   className={inputClasses("supplier.city")}
//                   placeholder="Enter city"
//                 />
//                 {errors["supplier.city"] && (
//                   <p className="mt-1 text-sm text-red-600">
//                     {errors["supplier.city"]}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   State*
//                 </label>
//                 <input
//                   type="text"
//                   value={formData.supplier.state}
//                   onChange={(e) =>
//                     handleInputChange("supplier", "state", e.target.value,"2")
//                   }
//                   className={inputClasses("supplier.state")}
//                   placeholder="Enter state"
//                 />
//                 {errors["supplier.state"] && (
//                   <p className="mt-1 text-sm text-red-600">
//                     {errors["supplier.state"]}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Pincode*
//                 </label>
//                 <input
//                   type="text"
//                   value={formData.supplier.pincode}
//                   onChange={(e) =>
//                     handleInputChange("supplier", "pincode", e.target.value,"2")
//                   }
//                   className={inputClasses("supplier.pincode")}
//                   placeholder="Enter pincode"
//                 />
//                 {errors["supplier.pincode"] && (
//                   <p className="mt-1 text-sm text-red-600">
//                     {errors["supplier.pincode"]}
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>
//         );

//       case 3:
//         return (
//           <div className="space-y-6">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-900 mb-4">
//                   Authorization Details
//                 </h3>
//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Purchase Incharge*
//                     </label>
//                     <input
//                       type="text"
//                       value={formData.counterDetails.purchaseIncharge}
//                       onChange={(e) =>
//                         handleInputChange(
//                           "counterDetails",
//                           "purchaseIncharge",
//                           e.target.value
//                         )
//                       }
//                       className={inputClasses(
//                         "counterDetails.purchaseIncharge"
//                       )}
//                       placeholder="Enter name"
//                     />
//                     {errors["counterDetails.purchaseIncharge"] && (
//                       <p className="mt-1 text-sm text-red-600">
//                         {errors["counterDetails.purchaseIncharge"]}
//                       </p>
//                     )}
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Purchase Manager*
//                     </label>
//                     <input
//                       type="text"
//                       value={formData.counterDetails.purchaseManager}
//                       onChange={(e) =>
//                         handleInputChange(
//                           "counterDetails",
//                           "purchaseManager",
//                           e.target.value
//                         )
//                       }
//                       className={inputClasses("counterDetails.purchaseManager")}
//                       placeholder="Enter name"
//                     />
//                     {errors["counterDetails.purchaseManager"] && (
//                       <p className="mt-1 text-sm text-red-600">
//                         {errors["counterDetails.purchaseManager"]}
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               <div>
//                 <h3 className="text-lg font-semibold text-gray-900 mb-4">
//                   Delivery Details
//                 </h3>
//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Delivery Type
//                     </label>
//                     <select
//                       value={formData.delivery.locationType}
//                       onChange={(e) =>
//                         handleInputChange(
//                           "delivery",
//                           "locationType",
//                           e.target.value
//                         )
//                       }
//                       className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//                     >
//                       <option value="direct">Direct</option>
//                       <option value="courier">Courier</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Delivery Address*
//                     </label>
//                     <textarea
//                       value={formData.delivery.address}
//                       onChange={(e) =>
//                         handleInputChange("delivery", "address", e.target.value)
//                       }
//                       className={inputClasses("delivery.address")}
//                       rows="3"
//                       placeholder="Enter delivery address"
//                     />
//                     {errors["delivery.address"] && (
//                       <p className="mt-1 text-sm text-red-600">
//                         {errors["delivery.address"]}
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 z-50 backdrop-blur-sm flex items-center justify-center overflow-y-auto">
//       <div
//         ref={dialogRef}
//         className="bg-white rounded-lg shadow-xl overflow-hidden mx-auto my-4 w-full max-w-4xl"
//         style={{
//           transform:
//             window.innerWidth >= 768
//               ? `translate(${position.x}px, ${position.y}px)`
//               : "none",
//         }}
//       >
//         <div className="p-6">
//           <div className="flex justify-between items-center mb-6">
//             <div className="flex items-center space-x-2">
//               <GripVertical className="text-gray-400 w-5 h-5 hidden sm:block" />
//               <h2 className="text-xl font-bold text-gray-800">
//                 Purchase Order Details
//               </h2>
//             </div>
//             <button
//               onClick={onClose}
//               className="text-gray-500 hover:text-gray-700 transition-colors"
//             >
//               ✕
//             </button>
//           </div>

//           <div className="mb-8">
//             <div className="flex items-center justify-between mb-4">
//               <div className="flex items-center space-x-2">
//                 {[1, 2, 3].map((step) => (
//                   <React.Fragment key={step}>
//                     <div
//                       className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
//                         currentStep === step
//                           ? "bg-blue-600 text-white"
//                           : currentStep > step
//                           ? "bg-green-500 text-white"
//                           : "bg-gray-200 text-gray-600"
//                       }`}
//                     >
//                       {step}
//                     </div>
//                     {step < 3 && <div className="w-8 h-0.5 bg-gray-300"></div>}
//                   </React.Fragment>
//                 ))}
//               </div>
//               <div className="text-sm text-gray-500">
//                 Step {currentStep} of 3
//               </div>
//             </div>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             {renderStep()}

//             <div className="mt-6 flex justify-end space-x-4">
//               {currentStep > 1 && (
//                 <button
//                   type="button"
//                   onClick={handlePrevious}
//                   className="flex items-center px-3 sm:px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
//                 >
//                   <ChevronLeft className="w-4 h-4 mr-1 sm:mr-2" />
//                   Previous
//                 </button>
//               )}
//               {currentStep < 3 ? (
//                 <button
//                   type="button"
//                   onClick={handleNext}
//                   className="flex items-center px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
//                 >
//                   Next <ChevronRight className="w-4 h-4 ml-1 sm:ml-2" />
//                 </button>
//               ) : (
//                 <button
//                   type="submit"
//                   className="px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
//                 >
//                   Generate PO
//                 </button>
//               )}
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PurchaseOrderDialog;

import React, { useState, useEffect, useRef ,useContext} from "react";
import {
  ChevronRight,
  ChevronLeft,
  GripVertical,
  Search,
  Calendar,
} from "lucide-react";
import axios from "axios";
import { API } from "../../../config/configData";
import PurchaseOrderGenerator from "./PurchaseOrderGenerator";
import { DashBoardContext } from "../../../DashBoardContext/DashBoardContext";
const COMPANY_PRESETS = {
  tct: {
    name: "THE CHENNAI TRADERS",
    subTitle: "",
    doorNo: "No.966-972",
    streetName: "Crosscut Road",
    city: "Coimbatore",
    state: "Tamil Nadu",
    pincode: "641012",
    phone: "0422-2490888",
    email: "info@sktm.in",
    gstNo: "33AAKFK9153A1ZJ",
    poPreFix: "TCT",
  },
  spacetextiles: {
    name: "Sree Kumaran Thangamaligai",
    subTitle: "(A Unit Of Space Textiles Pvt Ltd)",
    doorNo: "A.Ku Towers",
    streetName: "Crosscut Road",
    city: "Coimbatore",
    state: "Tamil Nadu",
    pincode: "641012",
    phone: "0422-2490888",
    email: "info@sktm.in",
    gstNo: "33AAKCS0757M1Z0",
    poPreFix: "STPL",
  },
  garsons: {
    name: "Sree Kumaran Thangamaligai",
    subTitle: "(A Unit of Garsons Private Limited)",
    doorNo: "A.Ku Towers",
    streetName: "Crosscut Road",
    city: "Coimbatore",
    state: "Tamil Nadu",
    pincode: "641012",
    phone: "0422-2490888",
    email: "info@garsons.in",
    gstNo: "33AABCG8863D1ZP",
    poPreFix: "GPL",
  },
};

const PurchaseOrderDialog = ({ isOpen, onClose, onSubmit, metal_type, orderType, selectedItems,pdftype }) => {
  const dialogRef = useRef(null);
  
  const initialState = {
    from: {
      name: "",
      subTitle: "",
      doorNo: "",
      streetName: "",
      city: "",
      state: "",
      pincode: "",
      phone: "",
      email: "",
      gstNo: "",
    },
    supplier: {
      name: "",
      doorNo: "",
      streetName: "",
      city: "",
      area: "",
      state: "",
      pincode: "",
      phone: "",
      email: "",
      gstNo: "",
    },
    poDetails: {
      // poNumber: "",
      poDate: new Date().toISOString().split("T")[0],
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      mode: "purchase",
    },
    counterDetails: {
      counter: "",
      purchaseIncharge: "",
      purchaseManager: "",
    },
    delivery: {
      locationType: "direct",
      paymentType:'',
      address:
        "A.Ku Towers, Crosscut Road,Coimbatore,Tamil Nadu,641012,0422-2490888",
    },
  };
  
  const [currentStep, setCurrentStep] = useState(1);
  const [companyType, setCompanyType] = useState("");
  const [formData, setFormData] = useState(initialState);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [errors, setErrors] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const {userRole}=useContext(DashBoardContext)

  // Reset the form state whenever the dialog is closed or submitted and then reopened
  useEffect(() => {
    if (!isOpen) {
      // Dialog is closed - reset all state
      setFormData(initialState);
      setCompanyType("");
      setCurrentStep(1);
      setErrors({});
      setSearchQuery("");
      setSearchResults([]);
    }
  }, [isOpen]);
  
  useEffect(() => {
    const fetchNextPoNumber = async () => {
      if (companyType && COMPANY_PRESETS[companyType]) {
        try {
          const prefix = COMPANY_PRESETS[companyType].poPreFix;
          const response = await axios.get(
            `${API}/gold_po/fetch_po_numbers/${prefix}/${metal_type}/${orderType}`
          );
          const nextPoNumber = response.data.nextPoNumber;
          setFormData((prev) => ({
            ...prev,
            from: COMPANY_PRESETS[companyType],
            // poDetails: {
            //   ...prev.poDetails,
            //   poNumber: nextPoNumber,
            // },
          }));
        } catch (error) {
          console.error("Error fetching PO number:", error);
        }
      }
    };
    
    fetchNextPoNumber();
  }, [companyType, metal_type, orderType]);
  
  const fetchSupplierDetailsByName = async (name) => {
    try {
      if (!name) return;
      const response = await axios.get(
        `${API}/gold_po/fetch_supplier_by_name`,
        {
          params: { name,userRole },
        }
      );
      setSearchResults(response.data || []);
    } catch (error) {
      console.error("Error fetching supplier details:", error);
      setSearchResults([]);
    }
  };
  
  const handleSupplierSelect = (supplier) => {
    // Update form data with selected supplier details
    setFormData((prev) => ({
      ...prev,
      supplier: {
        name: supplier.companyname || "",
        doorNo: supplier.doorno || "",
        streetName: supplier.street || "",
        city: supplier.city || "",
        area: supplier.area || "",
        state: supplier.state || "",
        pincode: supplier.pincode || "",
        phone: supplier.mobilenumber || "",
        email: supplier.email || "",
        gstNo: supplier.gst || "",
      },
    }));
    
    setSearchQuery(supplier.companyname);
    setSearchResults([]);
    
    // Define all supplier fields that need validation
    const supplierFieldsToValidate = [
      "name", "doorNo", "streetName", "city", "state", 
      "pincode", "phone", "email", "gstNo"
    ];
    
    // Create an object to store any validation errors
    const newErrors = {};
    
    // Validate each field
    supplierFieldsToValidate.forEach(field => {
      // Create temporary formData with the new supplier values for validation
      const tempFormData = {
        ...formData,
        supplier: {
          ...formData.supplier,
          [field]: supplier[fieldMapping[field]] || ""
        }
      };
      
      // Validate the field with the updated value
      const error = validateFieldWithData(tempFormData, "supplier", field);
      
      if (error) {
        newErrors[`supplier.${field}`] = error;
      }
    });
    
    // Update errors state with any validation errors found
    setErrors(prev => ({
      ...prev,
      ...newErrors
    }));
  };
  
  // Field mapping between supplier API response and form fields
  const fieldMapping = {
    name: "companyname",
    doorNo: "doorno",
    streetName: "street",
    city: "city",
    area: "area",
    state: "state",
    pincode: "pincode",
    phone: "mobilenumber",
    email: "email",
    gstNo: "gst"
  };
  
  // Create a modified validation function that takes formData as an argument
  const validateFieldWithData = (data, section, field) => {
    const value = data[section][field];
    
    // Common validation rules
    if (field === "name" && (!value || value.trim() === "")) {
      return "Name is required";
    }
    
    if (section === "supplier") {
      switch (field) {
        case "gstNo":
          if (!value || value.trim() === "") return "GST Number is required";
          const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
          if (!gstRegex.test(value)) return "Invalid GST format";
          break;
          
        case "phone":
          if (!value || value.trim() === "") return "Phone number is required";
          const phoneRegex = /^\d{10}$/;
          if (!phoneRegex.test(value)) return "Phone must be 10 digits";
          break;
          
        case "email":
          if (!value || value.trim() === "") return "Email is required";
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) return "Invalid email format";
          break;
          
        case "doorNo":
          if (!value || value.trim() === "") return "Door No is required";
          break;
          
        case "streetName":
          if (!value || value.trim() === "") return "Street Name is required";
          break;
          
        case "city":
          if (!value || value.trim() === "") return "City is required";
          break;
          
        case "state":
          if (!value || value.trim() === "") return "State is required";
          break;
          
        case "pincode":
          if (!value || value.trim() === "") return "Pincode is required";
          const pincodeRegex = /^\d{6}$/;
          if (!pincodeRegex.test(value)) return "Pincode must be 6 digits";
          break;
          
        default:
          break;
      }
    }
    
    return null;
  };
  
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length >= 2) {
      fetchSupplierDetailsByName(query);
    } else {
      setSearchResults([]);
    }
  };
  
  // Validate individual field
  const validateField = (section, field) => {
    const value = formData[section][field];
    
    // Common validation rules
    if (field === "name" && (!value || value.trim() === "")) {
      return "Name is required";
    }
    
    if (section === "supplier") {
      switch (field) {
        case "gstNo":
          if (!value || value.trim() === "") return "GST Number is required";
          const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
          if (!gstRegex.test(value)) return "Invalid GST format";
          break;
          
        case "phone":
          if (!value || value.trim() === "") return "Phone number is required";
          const phoneRegex = /^\d{10}$/;
          if (!phoneRegex.test(value)) return "Phone must be 10 digits";
          break;
          
        case "email":
          if (!value || value.trim() === "") return "Email is required";
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) return "Invalid email format";
          break;
          
        case "doorNo":
          if (!value || value.trim() === "") return "Door No is required";
          break;
          
        case "streetName":
          if (!value || value.trim() === "") return "Street Name is required";
          break;
          
        case "city":
          if (!value || value.trim() === "") return "City is required";
          break;
          
        case "state":
          if (!value || value.trim() === "") return "State is required";
          break;
          
        case "pincode":
          if (!value || value.trim() === "") return "Pincode is required";
          const pincodeRegex = /^\d{6}$/;
          if (!pincodeRegex.test(value)) return "Pincode must be 6 digits";
          break;
          
        default:
          break;
      }
    }
    
    if (section === "counterDetails") {
      if ((field === "purchaseIncharge" || field === "purchaseManager") && 
          (!value || value.trim() === "")) {
        return `${field === "purchaseIncharge" ? "Purchase Incharge" : "Purchase Manager"} is required`;
      }
    }
    
    if (section === "delivery" && field === "address" && (!value || value.trim() === "")) {
      return "Delivery address is required";
    }
    
    if (section === "poDetails") {
      if (field === "poDate" && !value) {
        return "PO Date is required";
      }
      
      if (field === "dueDate") {
        if (!value) return "Due Date is required";
        if (value < formData.poDetails.poDate) {
          return "Due Date cannot be earlier than PO Date";
        }
      }
    }
    
    return null;
  };
  
  // Validate all fields in a step
  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!companyType) {
        newErrors.companyType = "Please select a company";
      }
      
      // Validate PO Details
      // ["poNumber", "poDate", "dueDate"].forEach(field => {
      //   const error = validateField("poDetails", field);
      //   if (error) {
      //     newErrors[`poDetails.${field}`] = error;
      //   }
      // });
    } 
    else if (step === 2) {
      // Validate all supplier fields
      const supplierFields = [
        "name", "doorNo", "streetName", "city", "state", 
        "pincode", "phone", "email", "gstNo"
      ];
      
      supplierFields.forEach(field => {
        const error = validateField("supplier", field);
        if (error) {
          newErrors[`supplier.${field}`] = error;
        }
      });
    } 
    else if (step === 3) {
      // Validate counterDetails
      ["purchaseIncharge", "purchaseManager"].forEach(field => {
        const error = validateField("counterDetails", field);
        if (error) {
          newErrors[`counterDetails.${field}`] = error;
        }
      });
      
      // Validate delivery address
      const deliveryError = validateField("delivery", "address");
      if (deliveryError) {
        newErrors["delivery.address"] = deliveryError;
      }
    }
    
    return newErrors;
  };
  
  const handleInputChange = (section, field, value, step) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
    
    // Validate the field immediately when it changes
    const errorKey = `${section}.${field}`;
    const error = validateField(section, field);
    console.log(error);
    
    if (error) {
      setErrors(prev => ({
        ...prev,
        [errorKey]: error
      }));
    } else if (errors[errorKey]) {
      // Clear the error if it was previously set and now valid
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[errorKey];
        return newErrors;
      });
    }
  };
  
  const handleNext = () => {
    const newErrors = validateStep(currentStep);
    if (Object.keys(newErrors).length === 0) {
      setCurrentStep(prev => prev + 1);
      setErrors({});
    } else {
      setErrors(newErrors);
    }
  };
  
  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all steps before submitting
    const step1Errors = validateStep(1);
    const step2Errors = validateStep(2);
    const step3Errors = validateStep(3);
    
    const allErrors = {
      ...step1Errors,
      ...step2Errors,
      ...step3Errors
    };
    
    if (Object.keys(allErrors).length === 0) {
      // Form is valid, proceed with submission
      onSubmit(formData);
      onClose();
    } else {
      // Show errors for the current step
      setErrors(allErrors);
      
      // If there are errors in a previous step, go to that step
      if (Object.keys(step1Errors).length > 0) {
        setCurrentStep(1);
      } else if (Object.keys(step2Errors).length > 0 && currentStep > 2) {
        setCurrentStep(2);
      }
    }
  };
  
  const handleCompanyTypeChange = (e) => {
    const value = e.target.value;
    setCompanyType(value);
    
    // Clear company type error when selected
    if (errors.companyType) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.companyType;
        return newErrors;
      });
    }
  };
  
  const inputClasses = (errorKey) =>
    `w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all ${
      errors[errorKey]
        ? "border-red-500 focus:ring-red-200"
        : "border-gray-300 focus:border-blue-500"
    }`;
  
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Company Selection
              </h3>
              <div className="space-y-2">
                <div className="relative">
                  <select
                    value={companyType}
                    onChange={handleCompanyTypeChange}
                    className="w-full p-3 border rounded-lg bg-white appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="" disabled>
                        Select company type
                      </option>
                      {Object.entries(COMPANY_PRESETS).map(([key, preset]) => (
                        <option key={key} value={key} className="py-2">
                          {preset.name + " " + preset.subTitle}
                        </option>
                      ))}
                    </select>
                    {/* Custom dropdown arrow */}
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                  {/* Show selected option's subtitle if it exists */}
                  {companyType && COMPANY_PRESETS[companyType]?.subTitle && (
                    <p className="text-sm text-gray-500 mt-1">
                      {COMPANY_PRESETS[companyType].subTitle}
                    </p>
                  )}
                  {errors.companyType && (
                    <p className="text-sm text-red-600">{errors.companyType}</p>
                  )}
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Purchase Order Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      PO Number
                    </label>
                    <input
                      type="text"
                      value={formData.poDetails.poNumber}
                      className={`${inputClasses(
                        "poDetails.poNumber"
                      )} bg-gray-50`}
                      disabled
                    />
                    {errors["poDetails.poNumber"] && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors["poDetails.poNumber"]}
                      </p>
                    )}
                  </div> */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      PO Date*
                    </label>
                    <input
                      type="date"
                      value={formData.poDetails.poDate}
                      onChange={(e) =>
                        handleInputChange("poDetails", "poDate", e.target.value, "1")
                      }
                      className={inputClasses("poDetails.poDate")}
                    />
                    {errors["poDetails.poDate"] && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors["poDetails.poDate"]}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Due Date*
                    </label>
                    <input
                      type="date"
                      value={formData.poDetails.dueDate}
                      onChange={(e) =>
                        handleInputChange("poDetails", "dueDate", e.target.value, "1")
                      }
                      className={inputClasses("poDetails.dueDate")}
                    />
                    {errors["poDetails.dueDate"] && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors["poDetails.dueDate"]}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              {companyType && (
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">
                    Selected Company Preview
                  </h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>
                      {COMPANY_PRESETS[companyType].doorNo},{" "}
                      {COMPANY_PRESETS[companyType].streetName}
                    </p>
                    <p>
                      {COMPANY_PRESETS[companyType].city} -{" "}
                      {COMPANY_PRESETS[companyType].pincode}
                    </p>
                    <p>{COMPANY_PRESETS[companyType].state}</p>
                    <div className="pt-2 mt-2 border-t border-gray-200">
                      <p>Phone: {COMPANY_PRESETS[companyType].phone}</p>
                      <p>Email: {COMPANY_PRESETS[companyType].email}</p>
                      <p>GST: {COMPANY_PRESETS[companyType].gstNo}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
          case 2:
            return (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Supplier Information
                </h3>
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Search Supplier
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      className={`w-full p-2.5 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all ${
                        errors["supplier.name"]
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Type supplier name to search..."
                    />
                    <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  </div>
                  {searchResults.length > 0 && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {searchResults.map((supplier, index) => (
                        <div
                          key={index}
                          className="p-3 hover:bg-gray-50 cursor-pointer transition-colors"
                          onClick={() => handleSupplierSelect(supplier)}
                        >
                          <p className="font-medium text-gray-900">
                            {supplier.companyname}
                          </p>
                          <p className="text-sm text-gray-500">
                            {supplier.city}, {supplier.state}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Supplier Name*
                    </label>
                    <input
                      type="text"
                      value={formData.supplier.name}
                      onChange={(e) =>
                        handleInputChange("supplier", "name", e.target.value, "2")
                      }
                      className={inputClasses("supplier.name")}
                      placeholder="Enter supplier name"
                    />
                    {errors["supplier.name"] && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors["supplier.name"]}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      GST Number*
                    </label>
                    <input
                      type="text"
                      value={formData.supplier.gstNo}
                      onChange={(e) =>
                        handleInputChange("supplier", "gstNo", e.target.value, "2")
                      }
                      className={inputClasses("supplier.gstNo")}
                      placeholder="Enter GST number"
                    />
                    {errors["supplier.gstNo"] && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors["supplier.gstNo"]}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone*
                    </label>
                    <input
                      type="tel"
                      value={formData.supplier.phone}
                      onChange={(e) =>
                        handleInputChange("supplier", "phone", e.target.value, "2")
                      }
                      className={inputClasses("supplier.phone")}
                      placeholder="Enter phone number"
                    />
                    {errors["supplier.phone"] && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors["supplier.phone"]}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email*
                    </label>
                    <input
                      type="email"
                      value={formData.supplier.email}
                      onChange={(e) =>
                        handleInputChange("supplier", "email", e.target.value, "2")
                      }
                      className={inputClasses("supplier.email")}
                      placeholder="Enter email address"
                    />
                    {errors["supplier.email"] && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors["supplier.email"]}
                      </p>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address Details*
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <input
                          type="text"
                          placeholder="Door No*"
                          value={formData.supplier.doorNo}
                          onChange={(e) =>
                            handleInputChange("supplier", "doorNo", e.target.value, "2")
                          }
                          className={inputClasses("supplier.doorNo")}
                        />
                        {errors["supplier.doorNo"] && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors["supplier.doorNo"]}
                          </p>
                        )}
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Street Name*"
                          value={formData.supplier.streetName}
                          onChange={(e) =>
                            handleInputChange("supplier", "streetName", e.target.value, "2")
                          }
                          className={inputClasses("supplier.streetName")}
                        />
                        {errors["supplier.streetName"] && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors["supplier.streetName"]}
                          </p>
                        )}
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Area"
                          value={formData.supplier.area}
                          onChange={(e) =>
                            handleInputChange("supplier", "area", e.target.value, "2")
                          }
                          className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          City*
                        </label>
                        <input
                          type="text"
                          value={formData.supplier.city}
                          onChange={(e) =>
                            handleInputChange("supplier", "city", e.target.value, "2")
                          }
                          className={inputClasses("supplier.city")}
                          placeholder="Enter city"
                        />
                        {errors["supplier.city"] && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors["supplier.city"]}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          State*
                        </label>
                        <input
                          type="text"
                          value={formData.supplier.state}
                          onChange={(e) =>
                            handleInputChange("supplier", "state", e.target.value, "2")
                          }
                          className={inputClasses("supplier.state")}
                          placeholder="Enter state"
                        />
                        {errors["supplier.state"] && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors["supplier.state"]}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Pincode*
                        </label>
                        <input
                          type="text"
                          value={formData.supplier.pincode}
                          onChange={(e) =>
                            handleInputChange("supplier", "pincode", e.target.value, "2")
                          }
                          className={inputClasses("supplier.pincode")}
                          placeholder="Enter pincode"
                        />
                        {errors["supplier.pincode"] && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors["supplier.pincode"]}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
        case 3:
          return (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Authorization Details
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Purchase Incharge*
                      </label>
                      <input
                        type="text"
                        value={formData.counterDetails.purchaseIncharge}
                        onChange={(e) =>
                          handleInputChange(
                            "counterDetails",
                            "purchaseIncharge",
                            e.target.value,
                            "3"
                          )
                        }
                        className={inputClasses(
                          "counterDetails.purchaseIncharge"
                        )}
                        placeholder="Enter name"
                      />
                      {errors["counterDetails.purchaseIncharge"] && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors["counterDetails.purchaseIncharge"]}
                        </p>
                      )}
                      </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Purchase Manager*
                      </label>
                      <input
                        type="text"
                        value={formData.counterDetails.purchaseManager}
                        onChange={(e) =>
                          handleInputChange(
                            "counterDetails",
                            "purchaseManager",
                            e.target.value,
                            "3"
                          )
                        }
                        className={inputClasses("counterDetails.purchaseManager")}
                        placeholder="Enter name"
                      />
                      {errors["counterDetails.purchaseManager"] && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors["counterDetails.purchaseManager"]}
                        </p>
                      )}
                    </div>
                    {/* <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Counter (Optional)
                      </label>
                      <input
                        type="text"
                        value={formData.counterDetails.counter}
                        onChange={(e) =>
                          handleInputChange(
                            "counterDetails",
                            "counter",
                            e.target.value,
                            "3"
                          )
                        }
                        className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="Enter counter"
                      />
                    </div> */}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Delivery Details
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Delivery Type
                      </label>
                      <div className="flex gap-4">
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="locationType"
                            value="direct"
                            checked={formData.delivery.locationType === "direct"}
                            onChange={(e) =>
                              handleInputChange(
                                "delivery",
                                "locationType",
                                e.target.value,
                                "3"
                              )
                            }
                            className="form-radio h-4 w-4 text-blue-600"
                          />
                          <span className="ml-2 text-sm text-gray-700">Direct</span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="locationType"
                            value="courier"
                            checked={formData.delivery.locationType === "courier"}
                            onChange={(e) =>
                              handleInputChange(
                                "delivery",
                                "locationType",
                                e.target.value,
                                "3"
                              )
                            }
                            className="form-radio h-4 w-4 text-blue-600"
                          />
                          <span className="ml-2 text-sm text-gray-700">Courier</span>
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Payment Type
                      </label>
                      <div className="flex gap-4">
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="paymentType"
                            value="RTGS"
                            checked={formData.delivery.paymentType === "RTGS"}
                            onChange={(e) =>
                              handleInputChange(
                                "delivery",
                                "paymentType",
                                e.target.value,
                                "3"
                              )
                            }
                            className="form-radio h-4 w-4 text-blue-600"
                          />
                          <span className="ml-2 text-sm text-gray-700">RTGS</span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="paymentType"
                            value="MSB"
                            checked={formData.delivery.paymentType === "MSB"}
                            onChange={(e) =>
                              handleInputChange(
                                "delivery",
                                "paymentType",
                                e.target.value,
                                "3"
                              )
                            }
                            className="form-radio h-4 w-4 text-blue-600"
                          />
                          <span className="ml-2 text-sm text-gray-700">Metal Sale Bill</span>
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Delivery Address*
                      </label>
                      <textarea
                        value={formData.delivery.address}
                        onChange={(e) =>
                          handleInputChange(
                            "delivery",
                            "address",
                            e.target.value,
                            "3"
                          )
                        }
                        className={`${inputClasses(
                          "delivery.address"
                        )} resize-none min-h-[100px]`}
                        placeholder="Enter full delivery address"
                      ></textarea>
                      {errors["delivery.address"] && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors["delivery.address"]}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        case 4:
          return (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Review Purchase Order
              </h3>
              {/* <div className="bg-white rounded-lg border border-gray-200">
                <PurchaseOrderGenerator
                  formData={formData}
                  selectedItems={selectedItems}
                  preview={true}
                />
              </div> */}
            </div>
          );
        default:
          return null;
      }
    };
    
    const startDragging = (e) => {
      if (dialogRef.current) {
        const rect = dialogRef.current.getBoundingClientRect();
        setPosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
        
        document.addEventListener("mousemove", onDrag);
        document.addEventListener("mouseup", stopDragging);
      }
    };
    
    const onDrag = (e) => {
      if (dialogRef.current) {
        const newX = e.clientX - position.x;
        const newY = e.clientY - position.y;
        
        dialogRef.current.style.left = `${newX}px`;
        dialogRef.current.style.top = `${newY}px`;
      }
    };
    
    const stopDragging = () => {
      document.removeEventListener("mousemove", onDrag);
      document.removeEventListener("mouseup", stopDragging);
    };
    
    if (!isOpen) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div
          ref={dialogRef}
          className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden relative"
          >
          {/* Dialog header with drag handle */}
          <div
            className="flex items-center justify-between px-6 py-4 bg-gray-50 border-b cursor-move"
            onMouseDown={startDragging}
            >
            <div className="flex items-center">
              <GripVertical className="w-5 h-5 text-gray-400 mr-3" />
              <h2 className="text-xl font-semibold text-gray-800">
                {currentStep === 4 ? "Review" : "Create"} Purchase Order
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 focus:outline-none"
              >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                  />
              </svg>
            </button>
          </div>
          
          {/* Steps indicator */}
          <div className="px-6 py-4 bg-white border-b">
            <div className="flex items-center justify-between">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`flex items-center ${
                    step < 4 ? "flex-1" : ""
                  }`}
                  >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step <= currentStep
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-600"
                    }`}
                    >
                    {step}
                  </div>
                  {step < 4 && (
                    <div
                      className={`h-1 flex-1 mx-2 ${
                        step < currentStep ? "bg-blue-600" : "bg-gray-200"
                      }`}
                      ></div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="flex-1 text-center text-xs text-gray-500">
                Company & PO
              </div>
              <div className="flex-1 text-center text-xs text-gray-500">
                Supplier Details
              </div>
              <div className="flex-1 text-center text-xs text-gray-500">
                Additional Info
              </div>
              <div className="flex-1 text-center text-xs text-gray-500">
                Review
              </div>
            </div>
          </div>
          
          {/* Dialog body */}
          <div className="px-6 py-4 overflow-y-auto max-h-[calc(90vh-180px)]">
            {renderStep()}
          </div>
          
          {/* Dialog footer */}
          <div className="px-6 py-4 bg-gray-50 border-t flex justify-between">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
              Cancel
            </button>
            <div className="flex space-x-2">
              {currentStep > 1 && (
                <button
                  onClick={handlePrevious}
                  className="px-4 py-2 text-sm font-medium text-blue-600 bg-white border border-blue-300 rounded-md hover:bg-blue-50 flex items-center"
                  >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </button>
              )}
              {currentStep < 4 ? (
                <button
                  onClick={handleNext}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 flex items-center"
                  >
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700"
                  >
                  Generate PO
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default PurchaseOrderDialog;