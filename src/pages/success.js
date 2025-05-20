import React, { useState } from 'react';
import { Box, Button, Typography, Card, CardContent, Collapse } from '@mui/material';
import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Success = () => {
  const [expanded, setExpanded] = useState(false);

  const handleReadMore = () => {
    setExpanded(!expanded);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #6E8EFB, #A777E3)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
        padding: 6,
      }}
    >


      <motion.div
        animate={{ x: [0, 30, 0], y: [0, 30, 0] }}
        transition={{ repeat: Infinity, duration: 5 }}
        style={{
          position: 'absolute',
          width: 250,
          height: 250,
          background: 'rgba(255, 255, 255, 0.25)',
          borderRadius: '50%',
          top: '8%',
          left: '8%',
          zIndex: 0,
        }}
      />


      <motion.div
        animate={{ x: [0, -30, 0], y: [0, -30, 0] }}
        transition={{ repeat: Infinity, duration: 7 }}
        style={{
          position: 'absolute',
          width: 400,
          height: 400,
          background: 'rgba(255, 215, 0, 0.25)',
          borderRadius: '45% 55% 55% 45% / 55% 45% 55% 45%',
          bottom: '5%',
          right: '5%',
          zIndex: 0,
        }}
      />


      <motion.div
        animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
        style={{
          position: 'absolute',
          width: 150,
          height: 150,
          background: 'rgba(110, 142, 251, 0.25)',
          borderRadius: '50%',
          top: '20%',
          right: '15%',
          zIndex: 0,
        }}
      />

      <motion.div
        animate={{ x: [0, -15, 0], y: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 8 }}
        style={{
          position: 'absolute',
          width: 100,
          height: 100,
          background: 'rgba(167, 119, 227, 0.25)',
          borderRadius: '50%',
          bottom: '15%',
          left: '20%',
          zIndex: 0,
        }}
      />

      <motion.div
        animate={{ x: [0, 25, 0], y: [0, -25, 0] }}
        transition={{ repeat: Infinity, duration: 10 }}
        style={{
          position: 'absolute',
          width: 80,
          height: 80,
          background: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '50%',
          bottom: '30%',
          right: '30%',
          zIndex: 0,
        }}
      />


      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={{ zIndex: 1 }}
      >
        <Card
          sx={{
            width: 600,
            textAlign: 'center',
            p: 4,
            borderRadius: 5,
            boxShadow: 12,
            background: 'linear-gradient(to bottom right, #ffffff, #f7f7f7)',
          }}
        >
          <CardContent>
            <CheckCircle size={90} color="#4caf50" style={{ marginBottom: '20px' }} />
            <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
              Payment Successful!
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
              Thank you for your payment. Your transaction has been completed successfully.
            </Typography>

            <Collapse in={expanded}>
              <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
                Your order has been processed and will be shipped shortly.
                You can track your order or return to the home page to continue shopping.
                A confirmation email has also been sent to your registered address.
              </Typography>
            </Collapse>

            <Button
              onClick={handleReadMore}
              variant="contained"
              color="primary"
              size="large"
              sx={{
                mt: 4,
                borderRadius: 8,
                textTransform: 'none',
                fontSize: '1.1rem',
                px: 6,
                transition: 'all 0.3s ease',
                ':hover': {
                  backgroundColor: '#5a7dfb',
                },
              }}
            >
              {expanded ? 'Show Less' : 'Read More'}
            </Button>
          </CardContent>
        </Card>
      </motion.div>


      <Box
        sx={{
          display: 'flex',
          gap: 3,
          mt: 6,
          zIndex: 1,
        }}
      >
        <motion.div whileHover={{ scale: 1.1 }}>
          <Button
            variant="outlined"
            size="large"
            sx={{
              borderRadius: 8,
              textTransform: 'none',
              fontSize: '1.1rem',
              borderColor: '#fff',
              color: '#fff',
              px: 5,
              transition: 'all 0.3s ease',
              ':hover': {
                backgroundColor: '#fff',
                color: '#6E8EFB',
              },
            }}
          >
            View Order
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.1 }}>
          <Button
            variant="contained"
            size="large"
            sx={{
              borderRadius: 8,
              textTransform: 'none',
              fontSize: '1.1rem',
              backgroundColor: '#FFD700',
              color: '#000',
              px: 5,
              transition: 'all 0.3s ease',
              ':hover': {
                backgroundColor: '#FFC300',
              },
            }}
          >
            Home
          </Button>
        </motion.div>
      </Box>
    </Box>
  );
};

export default Success;
