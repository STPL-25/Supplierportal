import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { 
  Box, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Chip, 
  Tooltip,
  useMediaQuery,
  useTheme,
  Card,
  CardContent,
  Stack,
  Dialog,
  DialogContent,
  IconButton,
  DialogTitle,
  ToggleButtonGroup,
  ToggleButton,
  Divider
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import PendingIcon from "@mui/icons-material/Pending";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { API } from "../../config/configData.js";
import { DashBoardContext } from "../../DashBoardContext/DashBoardContext.jsx";

function SupplierDataDisplay() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState("P"); // Default to "Pending"
  const [imageDialog, setImageDialog] = useState({
    open: false,
    url: "",
    title: ""
  });
  const { companyName, userRole } = useContext(DashBoardContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    fetchSupplierData();
  }, [statusFilter, companyName]);

  const fetchSupplierData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API}/order-supplier-report/${companyName}/${statusFilter}`);
      console.log(response.data.supplierData);
      setSuppliers(response.data.supplierData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching supplier data:", error);
      setLoading(false);
    }
  };

  const handleImageView = (url, title = "Image Preview") => {
    setImageDialog({
      open: true,
      url,
      title
    });
  };

  const handleCloseDialog = () => {
    setImageDialog({
      open: false,
      url: "",
      title: ""
    });
  };

  const handleStatusFilterChange = (event, newFilter) => {
    if (newFilter !== null) {
      setStatusFilter(newFilter);
    }
  };

  const getStatusChip = (status) => {
    let chipProps = {
      icon: <PendingIcon />,
      label: "PENDING",
      color: "warning"
    };

    if (status === "C") {
      chipProps = {
        icon: <CheckCircleIcon />,
        label: "DISPATCHED",
        color: "success"
      };
    } else if (status === "R") {
      chipProps = {
        icon: <CancelIcon />,
        label: "REJECTED",
        color: "error"
      };
    } else if (status === "T") {
      chipProps = {
        icon: <ThumbUpIcon />,
        label: "ACCEPTED",
        color: "info"
      };
    }

    return <Chip {...chipProps} size="small" />;
  };

  // Status Filter Component
  const StatusFilterButtons = () => (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        mb: 3,
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: 'center',
        gap: isMobile ? 2 : 0
      }}
    >
      <Typography 
        variant="subtitle1" 
        sx={{ 
          mr: isMobile ? 0 : 2, 
          mb: isMobile ? 1 : 0, 
          fontWeight: 'medium' 
        }}
      >
        Filter by Status:
      </Typography>
      <ToggleButtonGroup
        value={statusFilter}
        exclusive
        onChange={handleStatusFilterChange}
        aria-label="status filter"
        size={isMobile ? "small" : "medium"}
        sx={{
          backgroundColor: '#ffffff',
          boxShadow: 1,
          borderRadius: 2,
          '& .MuiToggleButton-root': {
            textTransform: 'none',
            px: isMobile ? 1.5 : 2
          }
        }}
      >
        <ToggleButton value="P" aria-label="pending">
          <PendingIcon sx={{ mr: 1, color: theme.palette.warning.main }} />
          Pending
        </ToggleButton>
        <ToggleButton value="T" aria-label="accepted">
          <ThumbUpIcon sx={{ mr: 1, color: theme.palette.info.main }} />
          Accepted
        </ToggleButton>
        <ToggleButton value="C" aria-label="dispatched">
          <CheckCircleIcon sx={{ mr: 1, color: theme.palette.success.main }} />
          Dispatched
        </ToggleButton>
        <ToggleButton value="R" aria-label="rejected">
          <CancelIcon sx={{ mr: 1, color: theme.palette.error.main }} />
          Rejected
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );

  // Get table headers based on status
  const getTableHeaders = () => {
    const commonHeaders = ['S No', 'Order ID', 'Product', 'Metal Type', 'Status'];
    
    if (statusFilter === 'P') {
      return [...commonHeaders,  'Estimated Weight','Expected Date', 'Actions'];
    } else if (statusFilter === 'T') {
      return [...commonHeaders, 'Confirmed Weight', 'Confirmed Date', 'Actions'];
    } else if (statusFilter === 'C') {
      return [...commonHeaders, 'Confirmed Weight', 'Completed Weight', 'Invoice No', 'Completed Date', 'Actions'];
    } else if (statusFilter === 'R') {
      return [...commonHeaders, 'Rejection Reason', 'Rejection Date', 'Actions'];
    }
    
    return commonHeaders;
  };

  // Desktop Table View
  const DesktopView = () => (
    <TableContainer 
      component={Paper} 
      sx={{
        boxShadow: 3,
        borderRadius: 2,
        border: '1px solid #e0e0e0',
        overflow: "hidden"
      }}
    >
      <Table sx={{ minWidth: 700 }}>
        <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
          <TableRow>
            {getTableHeaders().map((header) => (
              <TableCell 
                key={header} 
                align="center" 
                sx={{ 
                  fontWeight: 'bold', 
                  color: '#34495e' 
                }}
              >
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {suppliers?.length > 0 ? suppliers?.map((supplier, index) => (
            <TableRow 
              key={supplier.id || index}
              hover
              sx={{
                '&:nth-of-type(even)': {
                  backgroundColor: '#f8f9fa'
                }
              }}
            >
              <TableCell align="center">{index + 1}</TableCell>
              <TableCell align="center">{supplier.orderid}</TableCell>
              <TableCell align="center">{supplier.customerOrderDetails?.productname || "-"}</TableCell>
              <TableCell align="center">{supplier.customerOrderDetails?.metaltype || "-"}</TableCell>
              <TableCell align="center">
                {getStatusChip(supplier.Supplier_status)}
              </TableCell>
              
              {/* Conditional cells based on status */}
              {statusFilter === 'P' && (
                <>
                  <TableCell align="center">{supplier.customerOrderDetails?.ho_approx_wt || "-"}</TableCell>
                  <TableCell align="center">{supplier.customerOrderDetails?.ho_approx_date || "-"}</TableCell>

                </>
              )}
              
              {statusFilter === 'T' && (
                <>
                  <TableCell align="center">{supplier.confirm_wt || "-"}</TableCell>
                  <TableCell align="center">{supplier.confirm_date || "-"}</TableCell>
                </>
              )}
              
              {statusFilter === 'C' && (
                <>
                  <TableCell align="center">{supplier.confirm_wt || "-"}</TableCell>
                  <TableCell align="center">{supplier.completed_wt || "-"}</TableCell>
                  <TableCell align="center">{supplier.invoice_no || "-"}</TableCell>
                  <TableCell align="center">{supplier.completed_date || "-"}</TableCell>
                </>
              )}
              
              {statusFilter === 'R' && (
                <>
                  <TableCell align="center">{supplier.supplier_rejection || "-"}</TableCell>
                  <TableCell align="center">
                    {supplier.rejection_date ? new Date(supplier.rejection_date).toLocaleDateString() : "-"}
                  </TableCell>
                </>
              )}
              
              {/* Actions column */}
              <TableCell align="center">
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                  {supplier.PurchaseOrderFile && (
                    <Tooltip title="View Purchase Order">
                      <IconButton 
                        size="small"
                        onClick={() => handleImageView(supplier.PurchaseOrderFile, "Purchase Order")}
                        sx={{ color: '#3498db' }}
                      >
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}
                  
                  {/* Show product images if dispatched */}
                  {supplier.Supplier_status === 'C' && (
                    <>
                      {supplier.completed_product1 && (
                        <Tooltip title="View Product Image 1">
                          <IconButton 
                            size="small"
                            onClick={() => handleImageView(supplier.completed_product1, "Product Image 1")}
                            sx={{ color: '#e74c3c' }}
                          >
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                      {supplier.completed_product2 && (
                        <Tooltip title="View Product Image 2">
                          <IconButton 
                            size="small"
                            onClick={() => handleImageView(supplier.completed_product2, "Product Image 2")}
                            sx={{ color: '#2ecc71' }}
                          >
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                    </>
                  )}
                  
                  {/* Show customer images for all statuses */}
                  {supplier.customerOrderDetails?.images && supplier.customerOrderDetails.images.length > 0 && (
                    <>
                    <Tooltip title="View Customer Design">
                      <IconButton 
                        size="small"
                        onClick={() => handleImageView(supplier.customerOrderDetails.images[0], "Customer Design")}
                        sx={{ color: '#9b59b6' }}
                      >
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="View Customer Design">
                    <IconButton 
                      size="small"
                      onClick={() => handleImageView(supplier.customerOrderDetails.images[1], "Customer Design")}
                      sx={{ color: '#9b59b6' }}
                    >
                      <VisibilityIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="View Customer Design">
                  <IconButton 
                    size="small"
                    onClick={() => handleImageView(supplier.customerOrderDetails.images[2], "Customer Design")}
                    sx={{ color: '#9b59b6' }}
                  >
                    <VisibilityIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="View Customer Design">
                <IconButton 
                  size="small"
                  onClick={() => handleImageView(supplier.customerOrderDetails.images[3], "Customer Design")}
                  sx={{ color: '#9b59b6' }}
                >
                  <VisibilityIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              </>
                  )}
                </Box>
              </TableCell>
            </TableRow>
          )) : (
            <TableRow>
              <TableCell colSpan={getTableHeaders().length} align="center" sx={{ py: 3 }}>
                <Typography variant="body1" color="text.secondary">
                  No {getStatusChip(statusFilter).props.label.toLowerCase()} orders found
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );

  // Mobile Card View
  const MobileView = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {suppliers.length > 0 ? suppliers.map((supplier, index) => (
        <Card 
          key={supplier.id || index}
          variant="outlined"
          sx={{ 
            borderRadius: 2,
            boxShadow: 1,
            transition: 'transform 0.2s',
            '&:hover': {
              transform: 'scale(1.02)'
            }
          }}
        >
          <CardContent>
            <Stack spacing={1.5}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Order ID: {supplier.orderid}
                </Typography>
                {getStatusChip(supplier.Supplier_status)}
              </Box>
              
              <Typography variant="body2">
                <strong>Product:</strong> {supplier.customerOrderDetails?.productname || "Not Available"}
              </Typography>
              
              <Typography variant="body2">
                <strong>Metal Type:</strong> {supplier.customerOrderDetails?.metaltype || "Not Available"}
              </Typography>
              
              {/* Conditional content based on status */}
              {statusFilter === 'P' && (
                <>
                  <Typography variant="body2">
                    <strong>Expected Date:</strong> {supplier.customerOrderDetails?.customer_date || "Not Available"}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Estimated Weight:</strong> {supplier.customerOrderDetails?.ho_approx_wt || "Not Available"}
                  </Typography>
                </>
              )}
              
              {statusFilter === 'T' && (
                <>
                  <Typography variant="body2">
                    <strong>Confirmed Weight:</strong> {supplier.confirm_wt || "Not Available"}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Confirmed Date:</strong> {supplier.confirm_date || "Not Available"}
                  </Typography>
                </>
              )}
              
              {statusFilter === 'C' && (
                <>
                  <Typography variant="body2">
                    <strong>Confirmed Weight:</strong> {supplier.confirm_wt || "Not Available"}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Completed Weight:</strong> {supplier.completed_wt || "Not Available"}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Invoice:</strong> {supplier.invoice_no || "Not Available"}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Completed Date:</strong> {supplier.completed_date || "Not Available"}
                  </Typography>
                </>
              )}
              
              {statusFilter === 'R' && (
                <>
                  <Typography variant="body2">
                    <strong>Rejection Reason:</strong> {supplier.supplier_rejection || "Not Available"}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Rejection Date:</strong> {supplier.rejection_date ? new Date(supplier.rejection_date).toLocaleDateString() : "Not Available"}
                    </Typography>
                </>
              )}
              
              {/* Actions */}
              <Box sx={{ display: 'flex', gap: 2, marginTop: 1 }}>
                {supplier.PurchaseOrderFile && (
                  <Tooltip title="View Purchase Order">
                    <IconButton 
                      size="small"
                      onClick={() => handleImageView(supplier.PurchaseOrderFile, "Purchase Order")}
                      sx={{ 
                        color: '#fff',
                        backgroundColor: '#3498db',
                        '&:hover': { backgroundColor: '#2980b9' }
                      }}
                    >
                      <VisibilityIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                )}
                
                {/* Show product images if dispatched */}
                {supplier.Supplier_status === 'C' && (
                  <>
                    {supplier.completed_product1 && (
                      <Tooltip title="View Product Image 1">
                        <IconButton 
                          size="small"
                          onClick={() => handleImageView(supplier.completed_product1, "Product Image 1")}
                          sx={{ 
                            color: '#fff',
                            backgroundColor: '#e74c3c',
                            '&:hover': { backgroundColor: '#c0392b' }
                          }}
                        >
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                    {supplier.completed_product2 && (
                      <Tooltip title="View Product Image 2">
                        <IconButton 
                          size="small"
                          onClick={() => handleImageView(supplier.completed_product2, "Product Image 2")}
                          sx={{ 
                            color: '#fff',
                            backgroundColor: '#2ecc71',
                            '&:hover': { backgroundColor: '#27ae60' }
                          }}
                        >
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </>
                )}
                
                {/* Show customer design image for all statuses */}
                {supplier.customerOrderDetails?.images && supplier.customerOrderDetails.images.length > 0 && (
                  <Tooltip title="View Customer Design">
                    <IconButton 
                      size="small"
                      onClick={() => handleImageView(supplier.customerOrderDetails.images[0], "Customer Design")}
                      sx={{ 
                        color: '#fff',
                        backgroundColor: '#9b59b6',
                        '&:hover': { backgroundColor: '#8e44ad' }
                      }}
                    >
                      <VisibilityIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                )}
              </Box>
            </Stack>
          </CardContent>
        </Card>
      )) : (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="body1" color="text.secondary">
            No {getStatusChip(statusFilter).props.label.toLowerCase()} orders found
          </Typography>
        </Box>
      )}
    </Box>
  );

  // Image Preview Dialog
  const ImageDialog = () => (
    <Dialog 
      open={imageDialog.open} 
      onClose={handleCloseDialog}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">{imageDialog.title}</Typography>
        <IconButton onClick={handleCloseDialog}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {imageDialog.url && imageDialog.url.endsWith('.pdf') ? (
          <iframe 
            src={imageDialog.url} 
            width="100%" 
            height="500px" 
            style={{ border: 'none' }}
            title="PDF Preview"
          />
        ) : (
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              width: '100%' 
            }}
          >
            <img 
              src={imageDialog.url} 
              alt={imageDialog.title} 
              style={{ 
                maxWidth: '100%',
                maxHeight: '70vh',
                objectFit: 'contain'
              }} 
            />
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );

  return (
    <Box 
      sx={{ 
        padding: 3, 
        backgroundColor: '#f9f9f9', 
        borderRadius: 2 
      }}
    >
      <Typography 
        variant="h4" 
        align="center" 
        gutterBottom 
        sx={{ 
          fontWeight: 'bold', 
          color: '#2c3e50', 
          marginBottom: 3 
        }}
      >
        Supplier Orders Report
      </Typography>

      {/* Status Filter Component */}
      <StatusFilterButtons />

      {loading ? (
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '200px' 
          }}
        >
          <Typography 
            variant="subtitle1" 
            color="textSecondary"
          >
            Loading supplier data...
          </Typography>
        </Box>
      ) : suppliers?.length === 0 ? (
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '200px' 
          }}
        >
          <Typography 
            variant="subtitle1" 
            color="textSecondary"
          >
            No {getStatusChip(statusFilter).props.label.toLowerCase()} orders found
          </Typography>
        </Box>
      ) : (
        // Conditional rendering based on screen size
        isMobile ? <MobileView /> : <DesktopView />
      )}

      <ImageDialog />
    </Box>
  );
}

export default SupplierDataDisplay;
                    