// src/components/PaymentCards.jsx
import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';

const cardColors = [
  '#1976d2', '#388e3c', '#f57c00', '#d32f2f',
  '#7b1fa2', '#0288d1', '#c2185b', '#512da8',
  '#00796b', '#5d4037'
];

const PaymentCards = ({ stats }) => {
  const cardData = [
    { title: 'Total Payments', value: stats.totalPayments },
    { title: 'Successful Payments', value: stats.successfulPayments },
    { title: 'Total Amount', value: `Rs. ${stats.totalAmount}` },
    { title: 'Average Payment', value: `Rs. ${stats.averagePayment}` },
    { title: 'Failed Payments', value: stats.failedPayments },
    { title: 'Refunded Payments', value: stats.refundedPayments },
    { title: 'Refund Amount', value: `Rs. ${stats.refundAmount}` },
    { title: 'Current Balance', value: `Rs. ${stats.currentBalance}` },
    { title: 'Total Refunds', value: stats.totalRefunds },
    { title: 'Unique Riders', value: stats.uniqueRiders },
  ];

  return (
    <Grid container spacing={2} justifyContent="center">
      {cardData.map((card, index) => (
        <Grid item xs={12} sm={6} md={2.4} key={index}>
          <Card
            sx={{
              background: cardColors[index % cardColors.length],
              color: 'white',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '140px',
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: 15,
              },
            }}
          >
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h6">{card.title}</Typography>
              <Typography variant="h5" fontWeight="bold">{card.value}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default PaymentCards;
