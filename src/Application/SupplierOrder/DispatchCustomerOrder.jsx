import axios from "axios";
import { DashBoardContext } from "../../DashBoardContext/DashBoardContext";
import { useContext, useEffect, useState } from "react";
import { API } from "../../config/configData";
import ContentLoader from "../../DashBoardContext/ContentLoader";

function DispatchCustomerOrder() {
  const { companyName, userRole } = useContext(DashBoardContext);
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageIndices, setImageIndices] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  // New state for rejection modal
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [rejectedOrderId, setRejectedOrderId] = useState(null);

  // New state for dispatch modal
  const [dispatchModalOpen, setDispatchModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [confirmWeight, setConfirmWeight] = useState("");
  const [confirmDate, setConfirmDate] = useState("");
  const [invNo,setInvNo]=useState("")
  const [invDate,setInvDate]=useState('')
  const [dispatchImages, setDispatchImages] = useState([]);
  const [invoice, setInvoice] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchDatas();
  }, [companyName]);

  const fetchDatas = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${API}/order-supplier/${companyName}/${userRole}/dispatch`
      );
      const orders = response.data.enrichedOrders;
      if (orders&&orders.length === 0) setLoading(false);
      setOrderDetails(orders);
      console.log(orders);

      // Initialize image indices for each order
      const initialIndices = {};
      orders?.forEach((order) => {
        initialIndices[order.orderid] = 0;
      });
      setImageIndices(initialIndices);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load order details");
      setLoading(false);
    }
  };

  const handleAccept = async (orderId) => {
    try {
      await axios.post(`${API}/supplier-order/orderaccept`, {
        orderId,
        companyName,
      });
      fetchDatas();
    } catch (error) {
      console.error("Error accepting order:", error);
    }
  };

  // Open dispatch modal
  const openDispatchModal = (orderId) => {
    const order = orderDetails.find((o) => o.orderid === orderId);
    if (order) {
      setSelectedOrderId(orderId);
      setConfirmWeight("");
      setConfirmDate("");
      setDispatchImages([]);
      setInvoice(null);
      setDispatchModalOpen(true);
    }
  }

  // Close dispatch modal

  const closeDispatchModal = () => {
    console.log("data cancelled");
    setDispatchModalOpen(false);
    setSelectedOrderId(null);
    setConfirmWeight("");  // Reset to empty string
    setConfirmDate("");    // Reset to empty string
    setInvDate("");
    setInvNo("");
    setDispatchImages([]);
    setInvoice(null);
  };

  // Handle image uploads for dispatch
  const handleDispatchImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      // Limit to 2 images
      const newImages = [...dispatchImages];
      files.forEach((file) => {
        if (newImages.length < 2) {
          newImages.push(file);
        }
      });
      setDispatchImages(newImages);
    }
  };

  // Handle invoice upload
  const handleInvoiceChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setInvoice(e.target.files[0]);
    }
  };

  // Remove dispatch image
  const removeDispatchImage = (index) => {
    setDispatchImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Remove invoice
  const removeInvoice = () => {
    setInvoice(null);
  };

  // Submit dispatch order
  const submitDispatch = async () => {
    if (dispatchImages.length === 0) {
      alert("Please upload at least one image");
      return;
    }

    if (!invoice) {
      alert("Please upload an invoice");
      return;
    }

    if (!confirmWeight.trim()) {
      alert("Please confirm the weight");
      return;
    }

    if (!confirmDate.trim()) {
      alert("Please confirm the date");
      return;
    }

    try {
      setIsSubmitting(true);

      // Create a FormData object to send files
      const formData = new FormData();
      formData.append("orderId", selectedOrderId);
      formData.append("companyName", companyName);
      formData.append("invoice_no", invNo);
      
      formData.append("invoice_date", invDate);
      formData.append("confirmWeight", confirmWeight);
      formData.append("confirmDate", confirmDate);

      // Append dispatch images
      dispatchImages.forEach((image, index) => {
        formData.append(`dispatchImages`, image);
      });

      // Append invoice
      formData.append("invoice", invoice);

      // Send the request
      await axios.post(`${API}/supplier-order/product-dispatch`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Refresh the data after successful dispatch
      fetchDatas();

      // Close the modal
      closeDispatchModal();

      // Show success message
      alert("Order dispatched successfully");
    } catch (error) {
      console.error("Error dispatching order:", error);
      alert("Failed to dispatch order");
    } finally {
      setIsSubmitting(false);
    }
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

      // Update the local state after successful rejection
      // setOrderDetails(prevOrders =>
      //   prevOrders.map(order =>
      //     order.orderid === rejectedOrderId ? {...order, status: "Rejected"} : order
      //   )
      // );

      // Close the modal
      closeRejectModal();
    } catch (error) {
      console.error("Error rejecting order:", error);
    }
  };

  // Image carousel navigation functions
  const nextImage = (orderId) => {
    const order = orderDetails.find((o) => o.orderid === orderId);
    if (!order || !order.images || order.images.length <= 1) return;

    setImageIndices((prev) => ({
      ...prev,
      [orderId]: (prev[orderId] + 1) % order.images.length,
    }));
  };

  const prevImage = (orderId) => {
    const order = orderDetails.find((o) => o.orderid === orderId);
    if (!order || !order.images || order.images.length <= 1) return;

    setImageIndices((prev) => ({
      ...prev,
      [orderId]:
        (prev[orderId] - 1 + order.images.length) % order.images.length,
    }));
  };

  const setImageIndex = (orderId, index) => {
    setImageIndices((prev) => ({
      ...prev,
      [orderId]: index,
    }));
  };

  // Function to open modal and show full-size image
  const openImageModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
  };

  // Format date for input element
  const formatDateForInput = (dateString) => {

    if (!dateString) return "";
    // Check if the date is in DD/MM/YYYY format
    const ddmmyyyy = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
    if (ddmmyyyy.test(dateString)) {
      const [day, month, year] = dateString.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    }

    // If it's already in YYYY-MM-DD format or another format, return as is
    return dateString;
  };

  // Format date for display
  const formatDateForDisplay = (dateString) => {
    if (!dateString) return "";

    try {
      // Check if dateString is in YYYY-MM-DD format
      if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
        const [year, month, day] = dateString.split("-");
        return `${day}/${month}/${year}`;
      }
      return dateString;
    } catch (error) {
      return dateString;
    }
  };

  if (loading) return <ContentLoader variant="skeleton" />;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;
  if (orderDetails?.length === 0)
    return <div className="text-center p-4">No orders found</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-8 mt-8 text-center">
        Dispatch Orders
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orderDetails?.map((order) => (
          <div
            key={order.orderid}
            className="bg-gray-50 rounded-3xl shadow-sm overflow-hidden"
          >
            <div className="bg-indigo-50 rounded-2xl p-6 text-center shadow-sm m-3">
              {/* Order ID */}
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Order: {order.orderid}
              </h2>

              {/* Status Badge */}
              <div className="flex justify-center mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs bg-green-100 text-green-800`}
                >
                  Accepted
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
                          order.images[imageIndices[order.orderid] || 0]
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
                  <div className="font-medium text-gray-700">
                    Confirmed Weight
                  </div>
                  <div className="text-gray-600">
                    {order.confirm_wt || "Not specified"} g
                  </div>

                  <div className="font-medium text-gray-700">Confirmed Date</div>
                  <div className="text-gray-600">
                    {order.confirm_date || "Not specified"}
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              {order.status === "Z" && (
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => openDispatchModal(order.orderid)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition duration-200 font-medium text-sm w-24"
                  >
                    Dispatch
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

      {/* Dispatch Modal */}
      {dispatchModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full max-h-screen overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Dispatch Order
              </h3>
              <button
                onClick={closeDispatchModal}
                className="text-gray-500 hover:text-gray-700"
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
            </div>

            <div className="space-y-4">
              {/* Upload Images - Allow up to 2 images */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Images (Max 2)
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {dispatchImages.map((image, index) => (
                    <div
                      key={index}
                      className="relative bg-gray-100 rounded-md p-2 w-24 h-24 flex items-center justify-center"
                    >
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Preview ${index}`}
                        className="max-w-full max-h-full object-contain"
                      />
                      <button
                        onClick={() => removeDispatchImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                      >
                        ×
                      </button>
                    </div>
                  ))}

                  {dispatchImages.length < 2 && (
                    <label className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
                      <svg
                        className="w-8 h-8 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        ></path>
                      </svg>
                      <span className="text-xs text-gray-500 mt-1">
                        Add Image
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleDispatchImageChange}
                        multiple={dispatchImages.length === 0}
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Upload Invoice */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Invoice
                </label>
                {invoice ? (
                  <div className="relative bg-gray-100 rounded-md p-2 flex items-center">
                    <svg
                      className="w-6 h-6 text-gray-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      ></path>
                    </svg>
                    <span className="text-sm text-gray-800 truncate flex-1">
                      {invoice.name}
                    </span>
                    <button
                      onClick={removeInvoice}
                      className="text-red-500 hover:text-red-700"
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
                          d="M6 18L18 6M6 6l12 12"
                        ></path>
                      </svg>
                    </button>
                  </div>
                ) : (
                  <label className="block w-full border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer hover:bg-gray-50">
                    <svg
                      className="w-8 h-8 text-gray-400 mx-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      ></path>
                    </svg>
                    <span className="text-sm text-gray-500 mt-2 block">
                      Click to upload invoice
                    </span>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      className="hidden"
                      onChange={handleInvoiceChange}
                    />
                  </label>
                )}
              </div>
               {/* Confirm Weight */}
               <div>
               <label
                  htmlFor="invno"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Invoice No
                </label>
                <input
                  type="text"
                  id="invno"
                  value={invNo}
                  onChange={(e) => setInvNo(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                <label
                  htmlFor="invdate"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                 Invoice Date
                </label>
                <input
                  type="date"
                  id="invdate"
                  value={formatDateForInput(invDate)}
                  onChange={(e) => setInvDate(e.target.value)}
                  // placeholder="Enter weight in grams"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  step="0.01"
                  min="0"
                />
              </div>
 {/* Confirm Date */}
 <div>
              
              </div>
              {/* Confirm Weight */}
              <div>
                <label
                  htmlFor="confirmWeight"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Completed Weight (g)
                </label>
                <input
                  type="number"
                  id="confirmWeight"
                  value={confirmWeight}
                  onChange={(e) => setConfirmWeight(e.target.value)}
                  placeholder="Enter weight in grams"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  step="0.01"
                  min="0"
                />
              </div>

              {/* Confirm Date */}
              <div>
                <label
                  htmlFor="confirmDate"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Completed Date
                </label>
                <input
                  type="date"
                  id="confirmDate"
                  value={formatDateForInput(confirmDate)}
                  onChange={(e) => setConfirmDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={closeDispatchModal}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                onClick={submitDispatch}
                disabled={isSubmitting}
                className={`px-4 py-2 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Dispatching..." : "Dispatch Order"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DispatchCustomerOrder;
