import React, { useState } from 'react';
import { Box, Button, Typography, Card, CardContent, Collapse } from '@mui/material';
import { XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Cancel = () => {
  const [expanded, setExpanded] = useState(false);

  const handleReadMore = () => {
    setExpanded(!expanded);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #ff758c, #ff7eb3)',
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
        animate={{ x: [0, 20, 0], y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
        style={{
          position: 'absolute',
          width: 250,
          height: 250,
          background: '#ffffff',
          borderRadius: '50%',
          top: '5%',
          left: '5%',
          opacity: 0.1,
          zIndex: 0,
        }}
      />
      <motion.div
        animate={{ x: [0, -20, 0], y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 8 }}
        style={{
          position: 'absolute',
          width: 350,
          height: 350,
          background: '#ffcccb',
          borderRadius: '45% 55% 55% 45% / 55% 45% 55% 45%',
          bottom: '5%',
          right: '5%',
          opacity: 0.08,
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
            <XCircle size={90} color="#e53935" style={{ marginBottom: '20px' }} />
            <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
              Payment Failed!
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
              Unfortunately, your payment could not be processed. Please try again later.
            </Typography>

            <Collapse in={expanded}>
              <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
                There might be an issue with your card details, network connection, or payment gateway. 
                Please verify your information and try again. If the issue persists, contact customer support for assistance.
              </Typography>
            </Collapse>

            <Button
              onClick={handleReadMore}
              variant="contained"
              color="error"
              size="large"
              sx={{
                mt: 4,
                borderRadius: 8,
                textTransform: 'none',
                fontSize: '1.1rem',
                px: 6,
                transition: 'all 0.3s ease',
                ':hover': {
                  backgroundColor: '#d32f2f',
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
                color: '#e53935',
              },
            }}
          >
            Try Again
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
              backgroundColor: '#ffd6d6',
              color: '#000',
              px: 5,
              transition: 'all 0.3s ease',
              ':hover': {
                backgroundColor: '#ffbaba',
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

export default Cancel;
