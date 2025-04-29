// import  {useContext}from 'react';
// import { KycContext } from '../KycContext/KycContex';
// import { DashBoardContext } from '../../../DashBoardContext/DashBoardContext';
// import { useState } from 'react';

// function BusinessInformation() {
//     const{tradeBusinessInfo,setTradeBusinessInfo,handleTradeBusinessInputChange,validateBusinessInfo,errors,setErrors}=useContext(KycContext)
//     const {setActiveSection}=useContext(DashBoardContext)
//     // const [errors,setErrors]=useState({})
//     const handleValidate = () => {
//         const validationErrors = validateBusinessInfo(tradeBusinessInfo);
//         setErrors((prevErrors) => ({
//             ...prevErrors,
//             ...validationErrors,
//           }));
//         return Object.keys(validationErrors).length === 0;
//     };

//     // Handle navigation to the next section
//     const handleNext = () => {
//         if (handleValidate()) {
//             setActiveSection("Trade Information");
//         } else {
//             console.log("Form has errors. Cannot proceed to next section.");
//         }
//     };

//     // Handle input changes with validation
//     const handleInputChangeWithValidation = (event) => {
//         handleTradeBusinessInputChange(event); // Update the form data
//         const { name, value } = event.target;

//         // Validate the specific field
//         const fieldErrors = validateBusinessInfo({ ...tradeBusinessInfo, [name]: value });
//         setErrors((prevErrors) => ({
//             ...prevErrors,
//             [name]: fieldErrors[name]
//         }));
//     };

// console.log(errors)
// return (
//     <div className='mt-10'>
//       <form  >
//            <h3  className="font-bold text-center mb-6">Business Information</h3>
//             <div className="grid grid-cols-1">
//                <div className="md:flex md:items-center mt-2 mb-6">
//                   <div className='md:w-1/3 text-center block font-medium'>
//                     <label> Nature of Business / Trade:</label>
//                     </div>
//                     <div className="md:w-1/3">
//                     <select className={`md:w-full rounded-md border ${
//                                         errors.natureOfBusiness ? 'border-red-500' : 'border-gray-400'
//                                     } bg-white py-1 px-6 text-base font-medium text-black outline-none focus:border-black focus:shadow-md`} name='natureOfBusiness'
//                     value={tradeBusinessInfo.natureOfBusiness}
//                     onChange={handleInputChangeWithValidation}
//                      >
//                         <option ></option>
//                         <option value="Manufacturer">Manufacturer</option>
//                         <option value="WholeSaler">WholeSaler</option>
//                         <option value="Retailer">Retailer</option>

//                     </select> 
//                     {errors.natureOfBusiness && (
//                                     <p className="text-red-500 text-sm mt-1">{errors.natureOfBusiness}</p>
//                                 )}
//                     </div> 
//                     </div>
//                     <div className="md:flex md:items-center mt-2 mb-6">
//                   <div className='md:w-1/3 text-center block font-medium'>
//                     <label>Are you an authorized distributor/Agent for any brand:</label>
//                     </div>
//                     <div className="md:w-1/3">

//                     <select className={`md:w-full rounded-md border ${
//                                         errors.authDistributor ? 'border-red-500' : 'border-gray-400'
//                                     } bg-white py-1 px-6 text-base font-medium text-black outline-none focus:border-black focus:shadow-md`} name='authDistributor'
//                     value={tradeBusinessInfo.authDistributor}
//                     onChange={handleInputChangeWithValidation}
//                     >
//                         <option ></option>
//                         <option value="Yes">Yes</option>
//                         <option value="No">No</option>
//                         {/* <option value="Proprietor">Proprietor</option> */}

//                     </select> 
//                     {errors.authDistributor && (
//                                     <p className="text-red-500 text-sm mt-1">{errors.authDistributor}</p>
//                                 )}
//                     </div> 
//                     </div> 
//                     <div className="md:flex md:items-center mt-2 mb-6">
//                     <div className='md:w-1/3 text-center block font-medium'>
//                     <label> Are you Running Retail Jewellery:</label>
//                     </div>
//                     <div className="md:w-1/3">

//                     <select className={`md:w-full rounded-md border ${
//                                         errors.retailJeweller ? 'border-red-500' : 'border-gray-400'
//                                     } bg-white py-1 px-6 text-base font-medium text-black outline-none focus:border-black focus:shadow-md`} name='retailJeweller'
//                        value={tradeBusinessInfo.retailJeweller}
//                        onChange={handleInputChangeWithValidation}
//                        >
//                         <option ></option>
//                         <option value="Yes">Yes</option>
//                         <option value="No">No</option>
//                         {/* <option value="Proprietor">Proprietor</option> */}

//                     </select> 
//                     {errors.retailJeweller && (
//                                     <p className="text-red-500 text-sm mt-1">{errors.retailJeweller}</p>
//                                 )}
//                     </div> 
//                     </div> 
//                     </div>
//                    <div className='flex justify-center'>
//                      <button
//                         type="button"
//                         className="mt-4 rounded-md bg-blue-500 py-2 px-6 text-base font-semibold text-white outline-none hover:shadow-form"
//                         onClick={handleNext}
//                     >
//                         Next
//                      </button>
//                     </div>
                   
//                     </form>
//     </div>
// );
// }

// export default BusinessInformation;