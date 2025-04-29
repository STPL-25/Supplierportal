// import axios from "axios";
// import { DashBoardContext } from "../../DashBoardContext/DashBoardContext";
// import { useContext, useEffect, useState } from "react";
// import { API } from "../../config/configData";
// import ContentLoader from "../../DashBoardContext/ContentLoader";

// function PendingCustomerOrder() {
//   const { companyName, userRole } = useContext(DashBoardContext);
//   const [orderDetails, setOrderDetails] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [imageIndices, setImageIndices] = useState({});
//   const [modalOpen, setModalOpen] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);
//   // New state for rejection modal
//   const [rejectModalOpen, setRejectModalOpen] = useState(false);
//   const [rejectReason, setRejectReason] = useState("");
//   const [rejectedOrderId, setRejectedOrderId] = useState(null);

//   useEffect(() => {
//     fetchDatas();
//   }, [companyName]);

//   const fetchDatas = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(
//         `${API}/order-supplier/${companyName}/${userRole}/pending`
//       );
//       const orders = response.data.findGivenOrders;
//       if (orders.length === 0) setLoading(false);
//       setOrderDetails(orders);

//       // Initialize image indices for each order
//       const initialIndices = {};
//       orders.forEach((order) => {
//         initialIndices[order.orderid] = 0;
//       });
//       setImageIndices(initialIndices);

//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setError("Failed to load order details");
//       setLoading(false);
//     }
//   };

//   const handleAccept = async (orderId) => {
//     try {
//       await axios.post(`${API}/supplier-order/orderaccept`, {
//         orderId,
//         companyName,
//       });
//       fetchDatas();
//     } catch (error) {
//       console.error("Error accepting order:", error);
//     }
//   };

//   // Open rejection modal
//   const openRejectModal = (orderId) => {
//     setRejectedOrderId(orderId);
//     setRejectReason("");
//     setRejectModalOpen(true);
//   };

//   // Close rejection modal
//   const closeRejectModal = () => {
//     setRejectModalOpen(false);
//     setRejectedOrderId(null);
//     setRejectReason("");
//   };

//   // Submit rejection with reason
//   const submitRejection = async () => {
//     if (!rejectReason.trim()) {
//       // You could add validation here
//       alert("Please provide a reason for rejection");
//       return;
//     }

//     try {
//       await axios.post(`${API}/supplier/order-reject`, {
//         orderId: rejectedOrderId,
//         companyName,
//         rejectReason,
//       });
//       fetchDatas();

//       // Update the local state after successful rejection
//       // setOrderDetails(prevOrders =>
//       //   prevOrders.map(order =>
//       //     order.orderid === rejectedOrderId ? {...order, status: "Rejected"} : order
//       //   )
//       // );

//       // Close the modal
//       closeRejectModal();
//     } catch (error) {
//       console.error("Error rejecting order:", error);
//     }
//   };

//   // Image carousel navigation functions
//   const nextImage = (orderId) => {
//     const order = orderDetails.find((o) => o.orderid === orderId);
//     if (!order || !order.images || order.images.length <= 1) return;

//     setImageIndices((prev) => ({
//       ...prev,
//       [orderId]: (prev[orderId] + 1) % order.images.length,
//     }));
//   };

//   const prevImage = (orderId) => {
//     const order = orderDetails.find((o) => o.orderid === orderId);
//     if (!order || !order.images || order.images.length <= 1) return;

//     setImageIndices((prev) => ({
//       ...prev,
//       [orderId]:
//         (prev[orderId] - 1 + order.images.length) % order.images.length,
//     }));
//   };

//   const setImageIndex = (orderId, index) => {
//     setImageIndices((prev) => ({
//       ...prev,
//       [orderId]: index,
//     }));
//   };

//   // Function to open modal and show full-size image
//   const openImageModal = (imageUrl) => {
//     setSelectedImage(imageUrl);
//     setModalOpen(true);
//   };

//   // Function to close the modal
//   const closeModal = () => {
//     setModalOpen(false);
//     setSelectedImage(null);
//   };

//   if (loading) return <ContentLoader variant="skeleton" />;
//   if (error) return <div className="text-center p-4 text-red-500">{error}</div>;
//   if (orderDetails.length === 0)
//     return <div className="text-center p-4">No orders found</div>;

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold mb-8 mt-8 text-center">Ready Orders</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {orderDetails.map((order) => (
//           <div
//             key={order.orderid}
//             className="bg-stone-200 rounded-3xl shadow-sm overflow-hidden"
//           >
//             <div className="bg-blue-100 rounded-2xl p-6 text-center shadow-sm m-3">
//               {/* Order ID */}
//               <h2 className="text-lg font-semibold text-gray-800 mb-4">
//                 Order: {order.orderid}
//               </h2>

//               {/* Status Badge */}
//               <div className="flex justify-center mb-4">
//                 <span
//                   className={`px-3 py-1 rounded-full text-xs ${
//                     order.status === "Z"
//                       ? "bg-yellow-100 text-yellow-800"
//                       : order.status === "Accepted"
//                       ? "bg-green-100 text-green-800"
//                       : "bg-red-100 text-red-800"
//                   }`}
//                 >
//                   {order.status === "Z" ? "Pending" : order.status}
//                 </span>
//               </div>

//               {/* Image Carousel */}
//               {order?.images?.length > 0 ? (
//                 <div className="mb-4 relative h-48">
//                   <div className="relative w-full h-full rounded-lg overflow-hidden">
//                     {/* Current image display - now clickable */}
//                     <img
//                       src={order.images[imageIndices[order.orderid] || 0]}
//                       alt="Order item"
//                       className="w-full h-full object-cover cursor-pointer"
//                       onClick={() =>
//                         openImageModal(
//                           order.images[imageIndices[order.orderid] || 0]
//                         )
//                       }
//                     />

//                     {/* Only show navigation if there's more than one image */}
//                     {order.images.length > 1 && (
//                       <>
//                         {/* Navigation arrows */}
//                         <button
//                           onClick={() => prevImage(order.orderid)}
//                           className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 shadow-md z-10 hover:bg-opacity-90 transition-all"
//                         >
//                           <svg
//                             className="w-5 h-5"
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24"
//                             xmlns="http://www.w3.org/2000/svg"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth="2"
//                               d="M15 19l-7-7 7-7"
//                             ></path>
//                           </svg>
//                         </button>

//                         <button
//                           onClick={() => nextImage(order.orderid)}
//                           className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 shadow-md z-10 hover:bg-opacity-90 transition-all"
//                         >
//                           <svg
//                             className="w-5 h-5"
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24"
//                             xmlns="http://www.w3.org/2000/svg"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth="2"
//                               d="M9 5l7 7-7 7"
//                             ></path>
//                           </svg>
//                         </button>

//                         {/* Image indicators */}
//                         <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2">
//                           {order.images.map((_, index) => (
//                             <div
//                               key={index}
//                               onClick={() =>
//                                 setImageIndex(order.orderid, index)
//                               }
//                               className={`w-2 h-2 rounded-full cursor-pointer ${
//                                 index === (imageIndices[order.orderid] || 0)
//                                   ? "bg-white"
//                                   : "bg-gray-400 bg-opacity-50"
//                               }`}
//                             />
//                           ))}
//                         </div>
//                       </>
//                     )}
//                   </div>
//                 </div>
//               ) : (
//                 <div className="mb-4 relative">
//                   <div className="w-16 h-16 bg-white rounded-full mx-auto flex items-center justify-center shadow-md relative z-10">
//                     <svg
//                       className="w-10 h-10 text-gray-200"
//                       xmlns="http://www.w3.org/2000/svg"
//                       viewBox="0 0 24 24"
//                       fill="currentColor"
//                     >
//                       <path d="M4.5 10.5C5.88 10.5 7.15 9.93 8.02 9H8C9.66 9 11 7.66 11 6C11 4.34 9.66 3 8 3C7.22 3 6.5 3.29 5.97 3.76C5.83 2.21 4.54 1 3 1C1.34 1 0 2.34 0 4C0 5.66 1.34 7 3 7H3.18C3.07 7.32 3 7.65 3 8C3 9.66 4.34 11 6 11H6.02C5.51 10.79 5.04 10.5 4.5 10.5Z" />
//                     </svg>
//                   </div>
//                 </div>
//               )}

//               {/* Divider */}
//               <div className="border-t border-gray-200 my-3 mx-auto w-32"></div>

//               {/* Order details */}
//               <div className="bg-white rounded-xl p-4 shadow-sm">
//                 <div className="grid grid-cols-2 gap-2 text-sm text-left">
//                   <div className="font-medium text-gray-700">Product</div>
//                   <div className="text-gray-600">
//                     {order.productname || "Not specified"}
//                   </div>

//                   <div className="font-medium text-gray-700">Metal Type</div>
//                   <div className="text-gray-600">
//                     {order.metaltype || "Not specified"}
//                   </div>

//                   <div className="font-medium text-gray-700">
//                     Estimation Weight
//                   </div>
//                   <div className="text-gray-600">
//                     {order.ho_approx_wt || "Not specified"} g
//                   </div>

//                   <div className="font-medium text-gray-700">Expected Date</div>
//                   <div className="text-gray-600">
//                     {order.ho_approx_date || "Not specified"}
//                   </div>
//                 </div>
//               </div>

//               {/* Action buttons */}
//               {order.status === "Z" && (
//                 <div className="flex justify-between mt-4">
//                   <button
//                     onClick={() => handleAccept(order.orderid)}
//                     className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition duration-200 font-medium text-sm w-24"
//                   >
//                     Accept
//                   </button>
//                   <button
//                     onClick={() => openRejectModal(order.orderid)}
//                     className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-200 font-medium text-sm w-24"
//                   >
//                     Reject
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Image Modal */}
//       {modalOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
//           onClick={closeModal}
//         >
//           <div className="relative max-w-4xl max-h-screen p-4">
//             {/* Close button */}
//             <button
//               onClick={closeModal}
//               className="absolute top-0 right-0 -mt-12 -mr-12 bg-white rounded-full p-2 text-gray-800 hover:bg-gray-100"
//             >
//               <svg
//                 className="w-6 h-6"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M6 18L18 6M6 6l12 12"
//                 ></path>
//               </svg>
//             </button>

//             {/* Full-size image */}
//             <img
//               src={selectedImage}
//               alt="Full size"
//               className="max-w-full max-h-screen object-contain"
//               onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the image
//             />
//           </div>
//         </div>
//       )}

//       {/* Rejection Reason Modal */}
//       {rejectModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div
//             className="bg-white rounded-lg p-6 max-w-md w-full"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <h2 className="text-xl font-semibold mb-4">Reject Order</h2>
//             <p className="text-gray-600 mb-4">
//               Please provide a reason for rejecting this order:
//             </p>

//             <textarea
//               value={rejectReason}
//               onChange={(e) => setRejectReason(e.target.value)}
//               className="w-full border border-gray-300 rounded-lg p-3 mb-4 h-32 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//               placeholder="Enter rejection reason..."
//             />

//             <div className="flex justify-end space-x-3">
//               <button
//                 onClick={closeRejectModal}
//                 className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition duration-200"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={submitRejection}
//                 className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
//                 disabled={!rejectReason.trim()}
//               >
//                 Submit Rejection
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default PendingCustomerOrder;

// import axios from "axios";
// import { DashBoardContext } from "../../DashBoardContext/DashBoardContext";
// import { useContext, useEffect, useState } from "react";
// import { API } from "../../config/configData";
// import ContentLoader from "../../DashBoardContext/ContentLoader";

// function PendingCustomerOrder() {
//   const { companyName, userRole } = useContext(DashBoardContext);
//   const [orderDetails, setOrderDetails] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [imageIndices, setImageIndices] = useState({});
//   const [modalOpen, setModalOpen] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);
//   // New state for rejection modal
//   const [rejectModalOpen, setRejectModalOpen] = useState(false);
//   const [rejectReason, setRejectReason] = useState("");
//   const [rejectedOrderId, setRejectedOrderId] = useState(null);
//   // Track viewed images for each order
//   const [viewedImages, setViewedImages] = useState({});

//   useEffect(() => {
//     fetchDatas();
//   }, [companyName]);

//   const fetchDatas = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(
//         `${API}/order-supplier/${companyName}/${userRole}/pending`
//       );
//       const orders = response.data.findGivenOrders;
//       if (orders.length === 0) setLoading(false);
//       setOrderDetails(orders);

//       // Initialize image indices for each order
//       const initialIndices = {};
//       const initialViewedImages = {};
//       orders.forEach((order) => {
//         initialIndices[order.orderid] = 0;
//         // Initialize viewed images tracking for each order
//         if (order.images && order.images.length > 0) {
//           initialViewedImages[order.orderid] = { 0: true };
//         } else {
//           // If no images, mark as all viewed
//           initialViewedImages[order.orderid] = { allViewed: true };
//         }
//       });
//       setImageIndices(initialIndices);
//       setViewedImages(initialViewedImages);

//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setError("Failed to load order details");
//       setLoading(false);
//     }
//   };

//   const handleAccept = async (orderId) => {
//     try {
//       await axios.post(`${API}/supplier-order/orderaccept`, {
//         orderId,
//         companyName,
//       });
//       fetchDatas();
//     } catch (error) {
//       console.error("Error accepting order:", error);
//     }
//   };

//   // Open rejection modal
//   const openRejectModal = (orderId) => {
//     setRejectedOrderId(orderId);
//     setRejectReason("");
//     setRejectModalOpen(true);
//   };

//   // Close rejection modal
//   const closeRejectModal = () => {
//     setRejectModalOpen(false);
//     setRejectedOrderId(null);
//     setRejectReason("");
//   };

//   // Submit rejection with reason
//   const submitRejection = async () => {
//     if (!rejectReason.trim()) {
//       // You could add validation here
//       alert("Please provide a reason for rejection");
//       return;
//     }

//     try {
//       await axios.post(`${API}/supplier/order-reject`, {
//         orderId: rejectedOrderId,
//         companyName,
//         rejectReason,
//       });
//       fetchDatas();

//       // Close the modal
//       closeRejectModal();
//     } catch (error) {
//       console.error("Error rejecting order:", error);
//     }
//   };

//   // Check if all images have been viewed for a specific order
//   const haveAllImagesBeenViewed = (orderId) => {
//     const order = orderDetails.find((o) => o.orderid === orderId);
    
//     // If no images, return true
//     if (!order || !order.images || order.images.length === 0) {
//       return true;
//     }
    
//     // Get viewed images for this order
//     const orderViewedImages = viewedImages[orderId] || {};
    
//     // Check if all images have been viewed
//     return order.images.every((_, index) => orderViewedImages[index]);
//   };

//   // Image carousel navigation functions with tracking
//   const nextImage = (orderId) => {
//     const order = orderDetails.find((o) => o.orderid === orderId);
//     if (!order || !order.images || order.images.length <= 1) return;

//     const newIndex = (imageIndices[orderId] + 1) % order.images.length;
    
//     // Mark the new image as viewed
//     setViewedImages(prev => ({
//       ...prev,
//       [orderId]: {
//         ...prev[orderId],
//         [newIndex]: true
//       }
//     }));

//     setImageIndices((prev) => ({
//       ...prev,
//       [orderId]: newIndex,
//     }));
//   };

//   const prevImage = (orderId) => {
//     const order = orderDetails.find((o) => o.orderid === orderId);
//     if (!order || !order.images || order.images.length <= 1) return;

//     const newIndex = (imageIndices[orderId] - 1 + order.images.length) % order.images.length;
    
//     // Mark the new image as viewed
//     setViewedImages(prev => ({
//       ...prev,
//       [orderId]: {
//         ...prev[orderId],
//         [newIndex]: true
//       }
//     }));

//     setImageIndices((prev) => ({
//       ...prev,
//       [orderId]: newIndex,
//     }));
//   };

//   const setImageIndex = (orderId, index) => {
//     // Mark the new image as viewed
//     setViewedImages(prev => ({
//       ...prev,
//       [orderId]: {
//         ...prev[orderId],
//         [index]: true
//       }
//     }));

//     setImageIndices((prev) => ({
//       ...prev,
//       [orderId]: index,
//     }));
//   };

//   // Function to open modal and show full-size image
//   const openImageModal = (imageUrl, orderId, index) => {
//     // Mark this image as viewed
//     setViewedImages(prev => ({
//       ...prev,
//       [orderId]: {
//         ...prev[orderId],
//         [index]: true
//       }
//     }));
    
//     setSelectedImage(imageUrl);
//     setModalOpen(true);
//   };

//   // Function to close the modal
//   const closeModal = () => {
//     setModalOpen(false);
//     setSelectedImage(null);
//   };

//   if (loading) return <ContentLoader variant="skeleton" />;
//   if (error) return <div className="text-center p-4 text-red-500">{error}</div>;
//   if (orderDetails.length === 0)
//     return <div className="text-center p-4">No orders found</div>;

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold mb-8 mt-8 text-center">Ready Orders</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {orderDetails.map((order) => (
//           <div
//             key={order.orderid}
//             className="bg-stone-200 rounded-3xl shadow-sm overflow-hidden"
//           >
//             <div className="bg-blue-100 rounded-2xl p-6 text-center shadow-sm m-3">
//               {/* Order ID */}
//               <h2 className="text-lg font-semibold text-gray-800 mb-4">
//                 Order: {order.orderid}
//               </h2>

//               {/* Status Badge */}
//               <div className="flex justify-center mb-4">
//                 <span
//                   className={`px-3 py-1 rounded-full text-xs ${
//                     order.status === "Z"
//                       ? "bg-yellow-100 text-yellow-800"
//                       : order.status === "Accepted"
//                       ? "bg-green-100 text-green-800"
//                       : "bg-red-100 text-red-800"
//                   }`}
//                 >
//                   {order.status === "Z" ? "Pending" : order.status}
//                 </span>
//               </div>

//               {/* Image Carousel */}
//               {order?.images?.length > 0 ? (
//                 <div className="mb-4 relative h-48">
//                   <div className="relative w-full h-full rounded-lg overflow-hidden">
//                     {/* Current image display - now clickable */}
//                     <img
//                       src={order.images[imageIndices[order.orderid] || 0]}
//                       alt="Order item"
//                       className="w-full h-full object-cover cursor-pointer"
//                       onClick={() =>
//                         openImageModal(
//                           order.images[imageIndices[order.orderid] || 0],
//                           order.orderid,
//                           imageIndices[order.orderid] || 0
//                         )
//                       }
//                     />

//                     {/* Only show navigation if there's more than one image */}
//                     {order.images.length > 1 && (
//                       <>
//                         {/* Navigation arrows */}
//                         <button
//                           onClick={() => prevImage(order.orderid)}
//                           className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 shadow-md z-10 hover:bg-opacity-90 transition-all"
//                         >
//                           <svg
//                             className="w-5 h-5"
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24"
//                             xmlns="http://www.w3.org/2000/svg"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth="2"
//                               d="M15 19l-7-7 7-7"
//                             ></path>
//                           </svg>
//                         </button>

//                         <button
//                           onClick={() => nextImage(order.orderid)}
//                           className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 shadow-md z-10 hover:bg-opacity-90 transition-all"
//                         >
//                           <svg
//                             className="w-5 h-5"
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24"
//                             xmlns="http://www.w3.org/2000/svg"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth="2"
//                               d="M9 5l7 7-7 7"
//                             ></path>
//                           </svg>
//                         </button>

//                         {/* Image indicators */}
//                         <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2">
//                           {order.images.map((_, index) => (
//                             <div
//                               key={index}
//                               onClick={() =>
//                                 setImageIndex(order.orderid, index)
//                               }
//                               className={`w-2 h-2 rounded-full cursor-pointer ${
//                                 index === (imageIndices[order.orderid] || 0)
//                                   ? "bg-white"
//                                   : viewedImages[order.orderid]?.[index]
//                                   ? "bg-green-400"
//                                   : "bg-gray-400 bg-opacity-50"
//                               }`}
//                             />
//                           ))}
//                         </div>
//                       </>
//                     )}
//                   </div>
//                 </div>
//               ) : (
//                 <div className="mb-4 relative">
//                   <div className="w-16 h-16 bg-white rounded-full mx-auto flex items-center justify-center shadow-md relative z-10">
//                     <svg
//                       className="w-10 h-10 text-gray-200"
//                       xmlns="http://www.w3.org/2000/svg"
//                       viewBox="0 0 24 24"
//                       fill="currentColor"
//                     >
//                       <path d="M4.5 10.5C5.88 10.5 7.15 9.93 8.02 9H8C9.66 9 11 7.66 11 6C11 4.34 9.66 3 8 3C7.22 3 6.5 3.29 5.97 3.76C5.83 2.21 4.54 1 3 1C1.34 1 0 2.34 0 4C0 5.66 1.34 7 3 7H3.18C3.07 7.32 3 7.65 3 8C3 9.66 4.34 11 6 11H6.02C5.51 10.79 5.04 10.5 4.5 10.5Z" />
//                     </svg>
//                   </div>
//                 </div>
//               )}

//               {/* Divider */}
//               <div className="border-t border-gray-200 my-3 mx-auto w-32"></div>

//               {/* Order details */}
//               <div className="bg-white rounded-xl p-4 shadow-sm">
//                 <div className="grid grid-cols-2 gap-2 text-sm text-left">
//                   <div className="font-medium text-gray-700">Product</div>
//                   <div className="text-gray-600">
//                     {order.productname || "Not specified"}
//                   </div>

//                   <div className="font-medium text-gray-700">Metal Type</div>
//                   <div className="text-gray-600">
//                     {order.metaltype || "Not specified"}
//                   </div>

//                   <div className="font-medium text-gray-700">
//                     Estimation Weight
//                   </div>
//                   <div className="text-gray-600">
//                     {order.ho_approx_wt || "Not specified"} g
//                   </div>

//                   <div className="font-medium text-gray-700">Expected Date</div>
//                   <div className="text-gray-600">
//                     {order.ho_approx_date || "Not specified"}
//                   </div>
//                 </div>
//               </div>

//               {/* Viewing Status */}
//               {order.images && order.images.length > 0 && !haveAllImagesBeenViewed(order.orderid) && (
//                 <div className="mt-4 text-sm text-amber-600">
//                   Please view all {order.images.length} images to continue
//                 </div>
//               )}

//               {/* Action buttons - only show if all images have been viewed or if there are no images */}
//               {order.status === "Z" && haveAllImagesBeenViewed(order.orderid) && (
//                 <div className="flex justify-between mt-4">
//                   <button
//                     onClick={() => handleAccept(order.orderid)}
//                     className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition duration-200 font-medium text-sm w-24"
//                   >
//                     Accept
//                   </button>
//                   <button
//                     onClick={() => openRejectModal(order.orderid)}
//                     className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-200 font-medium text-sm w-24"
//                   >
//                     Reject
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Image Modal */}
//       {modalOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
//           onClick={closeModal}
//         >
//           <div className="relative max-w-4xl max-h-screen p-4">
//             {/* Close button */}
//             <button
//               onClick={closeModal}
//               className="absolute top-0 right-0 -mt-12 -mr-12 bg-white rounded-full p-2 text-gray-800 hover:bg-gray-100"
//             >
//               <svg
//                 className="w-6 h-6"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M6 18L18 6M6 6l12 12"
//                 ></path>
//               </svg>
//             </button>

//             {/* Full-size image */}
//             <img
//               src={selectedImage}
//               alt="Full size"
//               className="max-w-full max-h-screen object-contain"
//               onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the image
//             />
//           </div>
//         </div>
//       )}

//       {/* Rejection Reason Modal */}
//       {rejectModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div
//             className="bg-white rounded-lg p-6 max-w-md w-full"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <h2 className="text-xl font-semibold mb-4">Reject Order</h2>
//             <p className="text-gray-600 mb-4">
//               Please provide a reason for rejecting this order:
//             </p>

//             <textarea
//               value={rejectReason}
//               onChange={(e) => setRejectReason(e.target.value)}
//               className="w-full border border-gray-300 rounded-lg p-3 mb-4 h-32 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//               placeholder="Enter rejection reason..."
//             />

//             <div className="flex justify-end space-x-3">
//               <button
//                 onClick={closeRejectModal}
//                 className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition duration-200"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={submitRejection}
//                 className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
//                 disabled={!rejectReason.trim()}
//               >
//                 Submit Rejection
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default PendingCustomerOrder;
import axios from "axios";
import { DashBoardContext } from "../../DashBoardContext/DashBoardContext";
import { useContext, useEffect, useState } from "react";
import { API } from "../../config/configData";
import ContentLoader from "../../DashBoardContext/ContentLoader";

function PendingCustomerOrder() {
  const { companyName, userRole } = useContext(DashBoardContext);
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageIndices, setImageIndices] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  
  // New state for accept confirmation modal
  const [acceptModalOpen, setAcceptModalOpen] = useState(false);
  const [confirmWeight, setConfirmWeight] = useState("");
  const [confirmDate, setConfirmDate] = useState("");
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  
  // Existing states for rejection
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [rejectedOrderId, setRejectedOrderId] = useState(null);
  
  // Track viewed images for each order
  const [viewedImages, setViewedImages] = useState({});

  useEffect(() => {
    fetchDatas();
  }, [companyName]);

  const fetchDatas = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${API}/order-supplier/${companyName}/${userRole}/pending`
      );
      const orders = response.data.enrichedOrders;
      if (orders.length === 0) setLoading(false);
      setOrderDetails(orders);

      // Initialize image indices for each order
      const initialIndices = {};
      const initialViewedImages = {};
      orders.forEach((order) => {
        initialIndices[order.orderid] = 0;
        // Initialize viewed images tracking for each order
        if (order.images && order.images.length > 0) {
          initialViewedImages[order.orderid] = { 0: true };
        } else {
          // If no images, mark as all viewed
          initialViewedImages[order.orderid] = { allViewed: true };
        }
      });
      setImageIndices(initialIndices);
      setViewedImages(initialViewedImages);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load order details");
      setLoading(false);
    }
  };

  // New method to open accept confirmation modal
  const openAcceptModal = (orderId) => {
    setSelectedOrderId(orderId);
    setConfirmWeight("");
    setConfirmDate("");
    setAcceptModalOpen(true);
  };

  // New method to submit order acceptance with confirmed details
  const submitAcceptance = async () => {
    // Basic validation
    if (!confirmWeight || !confirmDate) {
      alert("Please enter both confirmed weight and date");
      return;
    }

    try {
      await axios.post(`${API}/supplier-order/orderaccept`, {
        orderId: selectedOrderId,
        companyName,
        confirmedWeight: confirmWeight,
        confirmedDate: confirmDate
      });
      
      // Refresh data and close modal
      fetchDatas();
      setAcceptModalOpen(false);
    } catch (error) {
      console.error("Error accepting order:", error);
      alert("Failed to accept order. Please try again.");
    }
  };

  // Close accept confirmation modal
  const closeAcceptModal = () => {
    setAcceptModalOpen(false);
    setSelectedOrderId(null);
    setConfirmWeight("");
    setConfirmDate("");
  };

  // Open rejection modal
  const openRejectModal = (orderId) => {
    setRejectedOrderId(orderId);
    setRejectReason("");
    setRejectModalOpen(true);
  };

  // Close rejection modal
  const closeRejectModal = () => {
    setRejectModalOpen(false);
    setRejectedOrderId(null);
    setRejectReason("");
  };

  // Submit rejection with reason
  const submitRejection = async () => {
    if (!rejectReason.trim()) {
      // You could add validation here
      alert("Please provide a reason for rejection");
      return;
    }

    try {
      await axios.post(`${API}/supplier/order-reject`, {
        orderId: rejectedOrderId,
        companyName,
        rejectReason,
      });
      fetchDatas();

      // Close the modal
      closeRejectModal();
    } catch (error) {
      console.error("Error rejecting order:", error);
    }
  };

  // Check if all images have been viewed for a specific order
  const haveAllImagesBeenViewed = (orderId) => {
    const order = orderDetails.find((o) => o.orderid === orderId);
    
    // If no images, return true
    if (!order || !order.images || order.images.length === 0) {
      return true;
    }
    
    // Get viewed images for this order
    const orderViewedImages = viewedImages[orderId] || {};
    
    // Check if all images have been viewed
    return order.images.every((_, index) => orderViewedImages[index]);
  };

  // Image carousel navigation functions with tracking
  const nextImage = (orderId) => {
    const order = orderDetails.find((o) => o.orderid === orderId);
    if (!order || !order.images || order.images.length <= 1) return;

    const newIndex = (imageIndices[orderId] + 1) % order.images.length;
    
    // Mark the new image as viewed
    setViewedImages(prev => ({
      ...prev,
      [orderId]: {
        ...prev[orderId],
        [newIndex]: true
      }
    }));

    setImageIndices((prev) => ({
      ...prev,
      [orderId]: newIndex,
    }));
  };

  const prevImage = (orderId) => {
    const order = orderDetails.find((o) => o.orderid === orderId);
    if (!order || !order.images || order.images.length <= 1) return;

    const newIndex = (imageIndices[orderId] - 1 + order.images.length) % order.images.length;
    
    // Mark the new image as viewed
    setViewedImages(prev => ({
      ...prev,
      [orderId]: {
        ...prev[orderId],
        [newIndex]: true
      }
    }));

    setImageIndices((prev) => ({
      ...prev,
      [orderId]: newIndex,
    }));
  };

  const setImageIndex = (orderId, index) => {
    // Mark the new image as viewed
    setViewedImages(prev => ({
      ...prev,
      [orderId]: {
        ...prev[orderId],
        [index]: true
      }
    }));

    setImageIndices((prev) => ({
      ...prev,
      [orderId]: index,
    }));
  };

  // Function to open modal and show full-size image
  const openImageModal = (imageUrl, orderId, index) => {
    // Mark this image as viewed
    setViewedImages(prev => ({
      ...prev,
      [orderId]: {
        ...prev[orderId],
        [index]: true
      }
    }));
    
    setSelectedImage(imageUrl);
    setModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
  };

  if (loading) return <ContentLoader variant="skeleton" />;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;
  if (orderDetails.length === 0)
    return <div className="text-center p-4">No orders found</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-8 mt-8 text-center">Ready Orders</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orderDetails.map((order) => (
          <div
            key={order.orderid}
            className="bg-stone-200 rounded-3xl shadow-sm overflow-hidden"
          >
            <div className="bg-blue-100 rounded-2xl p-6 text-center shadow-sm m-3">
              {/* Order ID */}
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Order: {order.orderid}
              </h2>

              {/* Status Badge */}
              <div className="flex justify-center mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs ${
                    order.status === "Z"
                      ? "bg-yellow-100 text-yellow-800"
                      : order.status === "Accepted"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {order.status === "Z" ? "Pending" : order.status}
                </span>
              </div>

              {/* Image Carousel */}
              {order?.images?.length > 0 ? (
                <div className="mb-4 relative h-48">
                  <div className="relative w-full h-full rounded-lg overflow-hidden">
                    {/* Current image display - now clickable */}
                    <img
                      src={order.images[imageIndices[order.orderid] || 0]}
                      alt="Order item"
                      className="w-full h-full object-cover cursor-pointer"
                      onClick={() =>
                        openImageModal(
                          order.images[imageIndices[order.orderid] || 0],
                          order.orderid,
                          imageIndices[order.orderid] || 0
                        )
                      }
                    />

                    {/* Only show navigation if there's more than one image */}
                    {order.images.length > 1 && (
                      <>
                        {/* Navigation arrows */}
                        <button
                          onClick={() => prevImage(order.orderid)}
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 shadow-md z-10 hover:bg-opacity-90 transition-all"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 19l-7-7 7-7"
                            ></path>
                          </svg>
                        </button>

                        <button
                          onClick={() => nextImage(order.orderid)}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 shadow-md z-10 hover:bg-opacity-90 transition-all"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 5l7 7-7 7"
                            ></path>
                          </svg>
                        </button>

                        {/* Image indicators */}
                        <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2">
                          {order.images.map((_, index) => (
                            <div
                              key={index}
                              onClick={() =>
                                setImageIndex(order.orderid, index)
                              }
                              className={`w-2 h-2 rounded-full cursor-pointer ${
                                index === (imageIndices[order.orderid] || 0)
                                  ? "bg-white"
                                  : viewedImages[order.orderid]?.[index]
                                  ? "bg-green-400"
                                  : "bg-gray-400 bg-opacity-50"
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <div className="mb-4 relative">
                  <div className="w-16 h-16 bg-white rounded-full mx-auto flex items-center justify-center shadow-md relative z-10">
                    <svg
                      className="w-10 h-10 text-gray-200"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M4.5 10.5C5.88 10.5 7.15 9.93 8.02 9H8C9.66 9 11 7.66 11 6C11 4.34 9.66 3 8 3C7.22 3 6.5 3.29 5.97 3.76C5.83 2.21 4.54 1 3 1C1.34 1 0 2.34 0 4C0 5.66 1.34 7 3 7H3.18C3.07 7.32 3 7.65 3 8C3 9.66 4.34 11 6 11H6.02C5.51 10.79 5.04 10.5 4.5 10.5Z" />
                    </svg>
                  </div>
                </div>
              )}

              {/* Divider */}
              <div className="border-t border-gray-200 my-3 mx-auto w-32"></div>

              {/* Order details */}
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="grid grid-cols-2 gap-2 text-sm text-left">
                  <div className="font-medium text-gray-700">Product</div>
                  <div className="text-gray-600">
                    {order.productname || "Not specified"}
                  </div>

                  <div className="font-medium text-gray-700">Metal Type</div>
                  <div className="text-gray-600">
                    {order.metaltype || "Not specified"}
                  </div>

                  <div className="font-medium text-gray-700">
                    Estimation Weight
                  </div>
                  <div className="text-gray-600">
                    {order.ho_approx_wt || "Not specified"} g
                  </div>

                  <div className="font-medium text-gray-700">Expected Date</div>
                  <div className="text-gray-600">
                    {order.ho_approx_date || "Not specified"}
                    </div>
                </div>
              </div>

              {/* Viewing Status */}
              {order.images && order.images.length > 0 && !haveAllImagesBeenViewed(order.orderid) && (
                <div className="mt-4 text-sm text-amber-600">
                  Please view all {order.images.length} images to continue
                </div>
              )}

              {/* Action buttons - only show if all images have been viewed or if there are no images */}
              {order.status === "Z" && haveAllImagesBeenViewed(order.orderid) && (
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => openAcceptModal(order.orderid)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition duration-200 font-medium text-sm w-24"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => openRejectModal(order.orderid)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-200 font-medium text-sm w-24"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Image Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div className="relative max-w-4xl max-h-screen p-4">
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-0 right-0 -mt-12 -mr-12 bg-white rounded-full p-2 text-gray-800 hover:bg-gray-100"
            >
              <svg
                className="w-6 h-6"
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
            </button>

            {/* Full-size image */}
            <img
              src={selectedImage}
              alt="Full size"
              className="max-w-full max-h-screen object-contain"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the image
            />
          </div>
        </div>
      )}

      {/* Accept Confirmation Modal */}
      {acceptModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div 
            className="bg-white rounded-lg p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-4">Confirm Order Acceptance</h2>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Confirmed Weight (g)</label>
              <input 
                type="number" 
                value={confirmWeight}
                onChange={(e) => setConfirmWeight(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter confirmed weight"
                min="0"
                step="0.01"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Confirmed Date</label>
              <input 
                type="date" 
                value={confirmDate}
                onChange={(e) => setConfirmDate(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={closeAcceptModal}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={submitAcceptance}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200"
                disabled={!confirmWeight || !confirmDate}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rejection Reason Modal */}
      {rejectModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className="bg-white rounded-lg p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-4">Reject Order</h2>
            <p className="text-gray-600 mb-4">
              Please provide a reason for rejecting this order:
            </p>

            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 mb-4 h-32 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter rejection reason..."
            />

            <div className="flex justify-end space-x-3">
              <button
                onClick={closeRejectModal}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={submitRejection}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
                disabled={!rejectReason.trim()}
              >
                Submit Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PendingCustomerOrder;