import { useState, useEffect, useContext } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Chip,
  Container,
  Stack,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
  darken
} from '@mui/material';
import {
  CalendarMonth as CalendarIcon,
  KeyboardArrowLeft as KeyboardArrowLeftIcon,
  KeyboardArrowRight as KeyboardArrowRightIcon,
  ArrowBack as ArrowBackIcon,
  Inventory as ProductIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  Scale as WeightIcon,
  Upload as UploadIcon,
} from '@mui/icons-material';
// import Image from 'next/image';
import axios from 'axios';
// import { useRouter } from 'next/navigation';
// import logo from '../../public/SPACE LOGO 3D 03.png';
// import theme from '../branch_rpt/theme';
import { API } from '../../config/configData';
import { DashBoardContext } from '../../DashBoardContext/DashBoardContext';
// Accept Dialog Component
const AcceptOrderDialog = ({ open, onClose, onAccept, isLoading }) => {
  const [weight, setWeight] = useState('');
  const [date, setDate] = useState('');
  const handleSubmit = () => {
    onAccept(weight, date);
    setWeight('');
    setDate('');
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Accept Order</DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 2 }}>
          <TextField
            label="Approximate Weight (g)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            fullWidth
            type="number"
            required
          />
          <TextField
            label="Approximate Finish Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            fullWidth
            type="date"
            required
            InputLabelProps={{ shrink: true }}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isLoading}>Cancel</Button>
        <Button 
          onClick={handleSubmit}
          variant="contained"
          color="success"
          disabled={isLoading || !weight || !date}
        >
          Accept
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// Reject Dialog Component
const RejectOrderDialog = ({ open, onClose, onReject, isLoading }) => {
  const [category, setCategory] = useState('');
  const [reason, setReason] = useState('');

  const rejectionCategories = [
    'Quality Issues',
    'Pricing Concerns',
    'Timeline Constraints',
    'Resource Unavailability',
    'Technical Limitations',
    'Other'
  ];

  const handleSubmit = () => {
    onReject(category, reason);
    setCategory('');
    setReason('');
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Reject Order</DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 2 }}>
          <FormControl fullWidth>
            <InputLabel>Rejection Category</InputLabel>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              label="Rejection Category"
              required
            >
              {rejectionCategories.map((cat) => (
                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Rejection Reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            fullWidth
            multiline
            rows={4}
            required
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isLoading}>Cancel</Button>
        <Button 
          onClick={handleSubmit}
          variant="contained"
          color="error"
          disabled={isLoading || !category || !reason}
        >
          Reject
        </Button>
      </DialogActions>
    </Dialog>
  );
};
const DispatchDialog = ({ open, onClose, onDispatch, isLoading, orderId }) => {
    const [purchaseOrder, setPurchaseOrder] = useState(null);
    const [additionalFile, setAdditionalFile] = useState(null);
    const [thirdFile, setThirdFile] = useState(null);
    const [finalWeight, setFinalWeight] = useState('');
    const [finalDate, setFinalDate] = useState('');
  
    const handleSubmit = () => {
      const formData = new FormData();
      
      // Add files to formData
      if (purchaseOrder) {
        formData.append('purchaseOrder', purchaseOrder);
      }
      if (additionalFile) {
        formData.append('additionalFile', additionalFile);
      }
      if (thirdFile) {
        formData.append('thirdFile', thirdFile);
      }
  
      // Add other form data
      formData.append('finalWeight', finalWeight);
      formData.append('finalDate', finalDate);
      formData.append('Supplier_status', 'C'); // Completed status
  
      onDispatch(formData);
      
      // Reset form
      setPurchaseOrder(null);
      setAdditionalFile(null);
      setThirdFile(null);
      setFinalWeight('');
      setFinalDate('');
    };
  
    return (
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Dispatch Order</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            {/* Final Weight Input */}
            <TextField
              label="Final Weight (g)"
              value={finalWeight}
              onChange={(e) => setFinalWeight(e.target.value)}
              fullWidth
              type="number"
              required
            />
  
            {/* Final Date Input */}
            <TextField
              label="Final Date"
              value={finalDate}
              onChange={(e) => setFinalDate(e.target.value)}
              fullWidth
              type="date"
              required
              InputLabelProps={{ shrink: true }}
            />
  
            {/* Purchase Order Upload */}
            <Box>
              <Typography variant="subtitle1" gutterBottom>Upload Purchase Order</Typography>
              <Button
                variant="outlined"
                component="label"
                startIcon={<UploadIcon />}
                fullWidth
              >
                Select Purchase Order
                <input
                  type="file"
                  hidden
                  onChange={(e) => setPurchaseOrder(e.target.files[0])}
                />
              </Button>
              {purchaseOrder && (
                <Typography variant="caption" color="primary">
                  Selected: {purchaseOrder.name}
                </Typography>
              )}
            </Box>
  
            {/* Additional File Upload */}
            <Box>
              <Typography variant="subtitle1" gutterBottom>Upload First Product Image</Typography>
              <Button
                variant="outlined"
                component="label"
                startIcon={<UploadIcon />}
                fullWidth
              >
                Select Image
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => setAdditionalFile(e.target.files[0])}
                />
              </Button>
              {additionalFile && (
                <Typography variant="caption" color="primary">
                  Selected: {additionalFile.name}
                </Typography>
              )}
            </Box>
  
            {/* Third File Upload */}
            <Box>
              <Typography variant="subtitle1" gutterBottom>Upload Second Product Image</Typography>
              <Button
                variant="outlined"
                component="label"
                startIcon={<UploadIcon />}
                fullWidth
              >
                Select Image
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => setThirdFile(e.target.files[0])}
                />
              </Button>
              {thirdFile && (
                <Typography variant="caption" color="primary">
                  Selected: {thirdFile.name}
                </Typography>
              )}
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={isLoading}>Cancel</Button>
          <Button 
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            disabled={isLoading || !finalWeight || !finalDate || !purchaseOrder || !additionalFile || !thirdFile}
          >
            Dispatch
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  const OrderCard = ({ order, onAccept, onReject, onDispatch }) => {
    const getStatusChip = (status) => {
      console.log(status)
      const statusConfig = {
        P: { color: 'warning', label: 'Pending' },
        A: { color: 'success', label: 'Accepted' },
        D: { color: 'error', label: 'Rejected' },
        C: { color: 'success', label: 'Completed' },
      };
  
      const config = statusConfig[status];
      return (
        <Chip
          label={config.label}
          color={config.color}
          sx={{ fontWeight: 'bold' }}
        />
      );
    };
  
    return (
      <Card elevation={3}>
        <Box 
          sx={{ 
            p: 2, 
            backgroundColor: 'primary.main',
            color: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Typography variant="h6">{order.orderId}</Typography>
          {getStatusChip(order.Supplier_status)}
        </Box>
        
        <CardContent>
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ProductIcon color="primary" />
              <Typography sx={{ fontWeight: 'bold' }}>
                Product Name: 
                <Typography component="span" sx={{ color: '#00008B', fontWeight: 'semibold' }}>
                  {` ${order.productName}`}
                </Typography>
              </Typography>
            </Box>
  
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <WeightIcon color="primary" />
              <Typography sx={{ fontWeight: 'bold' }}>
                Product Weight: 
                {order.approximate_wt ? (
                  <Typography component="span" sx={{ color: '#00008B', fontWeight: 'semibold' }}>
                    {` ${order.approximate_wt}g`}
                  </Typography>
                ) : (
                  <Typography component="span" sx={{ color: '#00008B', fontWeight: 'semibold' }}>
                    {' N/A'}
                  </Typography>
                )}
              </Typography>
            </Box>
  
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CalendarIcon color="primary" />
              <Typography sx={{ fontWeight: 'bold' }}>
                Product Due Date: 
                <Typography component="span" sx={{ color: '#00008B', fontWeight: 'semibold' }}>
                  {` ${order.approximate_date}`}
                </Typography>
              </Typography>
            </Box>
            {order.Supplier_status !== 'P' && (
              <Box sx={{ borderTop: 1, borderColor: 'divider', pt: 2, mt: 2 }}>
                {order.Supplier_status === 'A' ? (
                  <>
                    <Typography>
                      <strong>Supplier:</strong> {order.supplierName}
                    </Typography>
                    <Typography>
                      <strong>Approximate Weight:</strong> {order.approximateWeight}g
                    </Typography>
                    <Typography>
                      <strong>Finish Date:</strong>{' '}
                      {order.approximateFinishDate && new Date(order.approximateFinishDate).toLocaleDateString()}
                    </Typography>
                  </>
                ):order.Supplier_status === 'C' ? (
                    <>
                      <Typography>
                        <strong>Supplier:</strong> {order.supplierName}
                      </Typography>

                      <Typography>
                        <strong>Final Weight:</strong> {order.Completed_wt}g
                      </Typography>
                      <Typography>
                        <strong>Finish Date:</strong>{' '}
                        {order.Confirm_date && new Date(order.Confirm_date).toLocaleDateString()}
                      </Typography>
                    </>
                  ): (
                  <Typography color="error">
                    <strong>Reason:</strong> {order.HO_Reject}
                  </Typography>
                )}
              </Box>
            )}
          </Stack>
        </CardContent>
        <CardActions sx={{ p: 2, pt: 0 }}>
          {order.Supplier_status === 'P' ? (
            <>
              <Button
                variant="contained"
                color="success"
                startIcon={<CheckIcon />}
                fullWidth
                onClick={() => onAccept(order.orderId)}
                sx={{ mr: 1 }}
              >
                Accept
              </Button>
              <Button
                variant="contained"
                color="error"
                startIcon={<CloseIcon />}
                fullWidth
                onClick={() => onReject(order.orderId)}
              >
                Reject
              </Button>
            </>
          ) : order.Supplier_status === 'A' && (
            <Button
              variant="contained"
              color="primary"
              startIcon={<UploadIcon />}
              fullWidth
              onClick={() => onDispatch(order.orderId)}
            >
              Dispatch
            </Button>
          )}
        </CardActions>
      </Card>
    );
  };

function SupplierOrder() {
//   const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [acceptDialogOpen, setAcceptDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const {companyName}=useContext(DashBoardContext)
  const [dispatchDialogOpen, setDispatchDialogOpen] = useState(false);

  useEffect(() => {
    fetchOrders();
    
  }, []);

  const handleCloseNotification = () => {
    setNotification(prev => ({ ...prev, open: false }));
  };

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      console.log(companyName)
      const response = await axios.get(`${API}/report-order/${btoa(companyName)}`);
      const data = await response.data;
      console.log(data)
    //   const pendingOrders = data.filter(order => order.Supplier_status === 'P');
      setOrders(data);
    } catch (error) {
      setNotification({
        open: true,
        message: 'Error fetching orders',
        severity: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAcceptClick = (orderId) => {
    setSelectedOrderId(orderId);
    setAcceptDialogOpen(true);
  };

  const handleRejectClick = (orderId) => {
    setSelectedOrderId(orderId);
    setRejectDialogOpen(true);
  };

  const handleAcceptOrder = async (weight, date) => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      await axios.post(`${API}/order-accept`, {
        orderId: selectedOrderId,
        approximateWeight: weight,
        approximateFinishDate: date
      });
      setNotification({
        open: true,
        message: 'Order accepted successfully',
        severity: 'success'
      });
      setAcceptDialogOpen(false);
      await fetchOrders();
    } catch (error) {
      setNotification({
        open: true,
        message: 'Failed to accept order',
        severity: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRejectOrder = async (category, reason) => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      await axios.post(`${API}/order-delete`, {
        orderId: selectedOrderId,
        reason: `${category}: ${reason}`
      });
      setNotification({
        open: true,
        message: 'Order rejected successfully',
        severity: 'success'
      });
      setRejectDialogOpen(false);
      await fetchOrders();
    } catch (error) {
      setNotification({
        open: true,
        message: 'Failed to reject order',
        severity: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleDispatchClick = (orderId) => {
    setSelectedOrderId(orderId);
    setDispatchDialogOpen(true);
  };

  const handleDispatchOrder = async (formData) => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      const response = await axios.put(`${API}/orders/${selectedOrderId}/complete`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      setNotification({
        open: true,
        message: 'Order dispatched successfully',
        severity: 'success'
      });
      setDispatchDialogOpen(false);
      await fetchOrders();
    } catch (error) {
      console.error('Error dispatching order:', error);
      setNotification({
        open: true,
        message: 'Failed to dispatch order',
        severity: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <div className="flex justify-center items-center w-full h-full mb-3">
          {/* <img src="abc" alt="space" width={500} height={500} priority /> */}
        </div>
        <Typography
          variant="h5"
          component="h1"
          sx={{
            fontWeight: 700,
            background: 'linear-gradient(45deg, #4287f5 30%, #183bd6 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2,
          }}
        >
          Supplier Order Confirmation
        </Typography>
        <Typography 
          variant="h6"
          color="text.secondary"
          sx={{ fontSize: '12px', maxWidth: '600px', mx: 'auto' }}
        >
          Track And Manage Orders 
        </Typography>
      </Box>

      <Box sx={{ mb: 2 }}>
        {/* <IconButton 
        //   onClick={() => router.back()}
        //   sx={{ 
        //     backgroundColor: theme.palette.primary.main,
        //     color: 'white',
        //     '&:hover': {
        //       backgroundColor: darken(theme.palette.primary.main, 0.1),
        //     }
        //   }}
        >
          <ArrowBackIcon />
        </IconButton> */}
      </Box>
      {console.log(orders)}
      <Grid container spacing={3}>
        {orders.map((order) => (
          <Grid item xs={12} md={6} lg={4} key={order.orderId}>
           
            <OrderCard
              order={order}
              onAccept={handleAcceptClick}
              onReject={handleRejectClick}
              onDispatch={handleDispatchClick}
            />
          </Grid>
        ))}
        {orders.length === 0 && !isLoading && (
          <Grid item xs={12}>
            <Typography variant="body1" textAlign="center" color="text.secondary">
              No pending orders found
            </Typography>
          </Grid>
        )}
      </Grid>

      <AcceptOrderDialog
        open={acceptDialogOpen}
        onClose={() => setAcceptDialogOpen(false)}
        onAccept={handleAcceptOrder}
        isLoading={isLoading}
      />

      <RejectOrderDialog
        open={rejectDialogOpen}
        onClose={() => setRejectDialogOpen(false)}
        onReject={handleRejectOrder}
        isLoading={isLoading}
      />
      <DispatchDialog
        open={dispatchDialogOpen}
        onClose={() => setDispatchDialogOpen(false)}
        onDispatch={handleDispatchOrder}
        isLoading={isLoading}
        orderId={selectedOrderId}
      />
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default SupplierOrder;