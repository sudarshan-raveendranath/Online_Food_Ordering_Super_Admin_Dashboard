import React, { useEffect, useState } from 'react';
import { Container, Typography, CssBaseline, ThemeProvider, Box } from '@mui/material';
import { fetchPayments } from '../services/PaymentService';
import PaymentCards from '../components/payment dashboard/PaymentCards';
import PaymentFilters from '../components/payment dashboard/PaymentFilters';
import PaymentCharts from '../components/payment dashboard/PaymentCharts';
import PaymentTable from '../components/payment dashboard/PaymentTable';
import ThemeToggle from '../theme/ThemeToggle';
import { getTheme } from '../theme/Theme';

const Dashboard = () => {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [filters, setFilters] = useState({
    paymentStatus: '',
    paymentType: '',
    currency: '',
    riderId: '',
    restaurantId: '',
    startDate: '',
    endDate: '',
  });
  const [darkMode, setDarkMode] = useState(false);

  const loadPayments = async () => {
    const data = await fetchPayments();
    setPayments(data);
    setFilteredPayments(data);
  };

  useEffect(() => {
    loadPayments();
  }, []);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  useEffect(() => {
    let filtered = payments;
    if (filters.paymentStatus) {
      filtered = filtered.filter(p => p.paymentStatus === filters.paymentStatus);
    }
    if (filters.paymentType) {
      filtered = filtered.filter(p => p.paymentType === filters.paymentType);
    }
    if (filters.currency) {
      filtered = filtered.filter(p => p.currency === filters.currency);
    }
    if (filters.riderId) {
      filtered = filtered.filter(p => 
        String(p.riderId || '').toLowerCase().includes(filters.riderId.toLowerCase())
      );
    }
    if (filters.restaurantId) {
      filtered = filtered.filter(p => 
        String(p.restaurantId || '').toLowerCase().includes(filters.restaurantId.toLowerCase())
      );
    }
    if (filters.startDate) {
      filtered = filtered.filter(p => new Date(p.createdAt) >= new Date(filters.startDate));
    }
    if (filters.endDate) {
      filtered = filtered.filter(p => new Date(p.createdAt) <= new Date(filters.endDate));
    }
    setFilteredPayments(filtered);
  }, [filters, payments]);

  const stats = {
    totalPayments: payments.length,
    successfulPayments: payments.filter(p => p.paymentStatus === 'COMPLETED').length,
    totalAmount: payments.reduce((sum, p) => sum + p.totalAmount, 0),
    averagePayment: (payments.reduce((sum, p) => sum + p.totalAmount, 0) / payments.length || 0).toFixed(2),
    failedPayments: payments.filter(p => p.paymentStatus === 'FAILED').length,
    refundedPayments: payments.filter(p => p.refundStatus === 'COMPLETED').length,
    refundAmount: payments.reduce((sum, p) => sum + (p.refundStatus === 'COMPLETED' ? p.totalAmount : 0), 0),
    currentBalance: payments.reduce((sum, p) => sum + p.restaurantBalance, 0),
    totalRefunds: payments.filter(p => p.refundStatus === 'COMPLETED').length,
    uniqueRiders: new Set(payments.map(p => p.riderId)).size,
  };

  return (
    <ThemeProvider theme={getTheme(darkMode ? 'dark' : 'light')}>
      <CssBaseline />
      <Container
        maxWidth="xl"
        sx={{
          overflowX: 'hidden',
          paddingLeft: 0, 
          paddingRight: 0, 
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" my={4}>
          <Typography variant="h4" fontWeight={900}>
            Payment Monitoring Dashboard
          </Typography>
          <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        </Box>


        <Box mb={6} pb={4} borderBottom="2px solid gray">
          <PaymentCards stats={stats} />
        </Box>


        <Box mb={6} pb={4} borderBottom="2px solid gray">
          <PaymentFilters filters={filters} handleFilterChange={handleFilterChange} />
        </Box>


        <Box mb={6} pb={4} borderBottom="2px solid gray">
          <PaymentCharts payments={filteredPayments} />
        </Box>


        <Box mb={4} pb={4}>
          <PaymentTable payments={filteredPayments} />
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Dashboard;
