import React, { useState } from "react";
import spicyChickenImage from '../images/spicy-chicken-151_medium_US_en.png';
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Grid,
  Slide
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { styled } from '@mui/system';

const Background = styled(Box)({
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #fceabb 0%, #f8b500 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '40px 0',
  animation: 'fadeIn 1.5s ease-in-out',
  '@keyframes fadeIn': {
    from: { opacity: 0 },
    to: { opacity: 1 }
  }
});

const AnimatedPaper = styled(Paper)({
  padding: '32px',
  borderRadius: '16px',
  backgroundColor: '#ffffff',
  boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
  animation: 'slideUp 0.8s ease-out',
  '@keyframes slideUp': {
    from: { transform: 'translateY(40px)', opacity: 0 },
    to: { transform: 'translateY(0)', opacity: 1 }
  }
});

const MealImage = styled('img')({
  width: '80%',     
  maxWidth: '300px',  
  display: 'block',
  margin: '0 auto 24px',  
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
});

const Payment = () => {
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);

  const orderData = {
    orderId: 16811,
    restaurantId: 101,
    riderId: 65625,
    totalAmount: 2772,
    mealPrice: 2500,
    deliveryCharge: 372,
    numberOfMeals: 1,
    mealName: "Margherita Pizza",
    currency: "LKR",
  };

  const handlePay = () => {
    setShowDialog(true);
  };

  const handleCardPayment = async () => {
    try {
      const response = await fetch("http://localhost:8099/product/v1/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.sessionUrl) {
          window.location.href = data.sessionUrl;
        } else {
          alert("Payment URL not received.");
        }
      } else {
        alert("Error creating payment session");
      }
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Failed to initiate payment");
    }
  };

  const handleCod = () => {
    setShowDialog(false);
    navigate("/cod-confirmation");
  };

  return (
    <Background>
      <Container maxWidth="sm">
        <AnimatedPaper elevation={6}>
          <Box display="flex" alignItems="center" gap={2} mb={3}>
            <ShoppingCartIcon color="primary" fontSize="large" />
            <Typography variant="h4" fontWeight="bold" color="primary">
              Checkout
            </Typography>
          </Box>

          <MealImage src={spicyChickenImage} alt="Spicy Chicken Combo" />

          <Typography variant="h6" gutterBottom>
            Order Summary
          </Typography>

          <Box mb={2}>
            <Grid container justifyContent="space-between">
              <Grid item>
                <Typography fontWeight="medium">{orderData.mealName}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {orderData.numberOfMeals} × LKR {orderData.mealPrice.toFixed(2)}
                </Typography>
              </Grid>
              <Grid item>
                <Typography>LKR {(orderData.mealPrice * orderData.numberOfMeals).toFixed(2)}</Typography>
              </Grid>
            </Grid>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box mb={2}>
            <Grid container justifyContent="space-between">
              <Typography variant="body2">Subtotal</Typography>
              <Typography variant="body2">LKR {orderData.mealPrice.toFixed(2)}</Typography>
            </Grid>
            <Grid container justifyContent="space-between">
              <Typography variant="body2">Delivery</Typography>
              <Typography variant="body2">LKR {orderData.deliveryCharge.toFixed(2)}</Typography>
            </Grid>
          </Box>

          <Divider />

          <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" fontWeight="bold">
              Total
            </Typography>
            <Typography variant="h6" color="primary" fontWeight="bold">
              LKR {orderData.totalAmount.toFixed(2)}
            </Typography>
          </Box>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            sx={{ mt: 4, py: 1.5, fontWeight: 'bold' }}
            onClick={handlePay}
          >
            Proceed to Payment
          </Button>
        </AnimatedPaper>

        {/* Dialog Modal */}
        <Dialog
          open={showDialog}
          onClose={() => setShowDialog(false)}
          TransitionComponent={Slide}
          TransitionProps={{ direction: "up" }}
        >
          <DialogTitle>Select Payment Method</DialogTitle>
          <DialogContent>
            <Typography variant="body1" gutterBottom>
              Please choose a method to proceed with payment:
            </Typography>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button
              onClick={handleCod}
              startIcon={<LocalAtmIcon />}
              variant="outlined"
              color="secondary"
            >
              Cash on Delivery
            </Button>
            <Button
              onClick={handleCardPayment}
              startIcon={<CreditCardIcon />}
              variant="contained"
              color="primary"
            >
              Card Payment
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Background>
  );
};

export default Payment;
