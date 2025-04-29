import React, { useMemo } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import {
  PieChart,
  pieArcLabelClasses,
  BarChart,
  LineChart
} from '@mui/x-charts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6384', '#36A2EB'];

const ChartCard = ({ title, children, hasData }) => (
  <Paper
    sx={{
      p: 2,
      height: 350,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      bgcolor: '#f4f4f4',
      border: '1px solid #ccc',
      borderRadius: 2,
      boxShadow: 2
    }}
  >
    {hasData ? (
      <>
        <Typography variant="h6" align="center" mb={1}>{title}</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>{children}</Box>
      </>
    ) : (
      <Typography align="center" color="textSecondary">
        No {title} Data
      </Typography>
    )}
  </Paper>
);

const PaymentCharts = ({ payments }) => {
  const { statusData, typeData, balanceData, trendData } = useMemo(() => {
    const statusCounts = {};
    const typeCounts = {};
    const balances = [];
    const trends = [];

    payments.forEach((payment) => {
      const status = payment.paymentStatus || 'UNKNOWN';
      const type = payment.paymentType || 'UNKNOWN';
      const balance = payment.restaurantBalance || 0;
      const amount = payment.totalAmount || 0;

      const createdAt = payment.createdAt ? new Date(payment.createdAt) : null;
      const formattedDate = createdAt && !isNaN(createdAt.getTime())
        ? createdAt.toLocaleDateString()
        : 'Unknown';

      statusCounts[status] = (statusCounts[status] || 0) + 1;
      typeCounts[type] = (typeCounts[type] || 0) + 1;

      balances.push({ name: `Rest ${payment.restaurantId || 'Unknown'}`, balance });
      trends.push({ date: formattedDate, amount });
    });

    return {
      statusData: Object.entries(statusCounts).map(([label, value], idx) => ({ id: idx, label, value })),
      typeData: Object.entries(typeCounts).map(([label, value], idx) => ({ id: idx, label, value })),
      balanceData: balances,
      trendData: trends
    };
  }, [payments]);

  return (
    <Box
      display="grid"
      gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }}
      gap={2}
      mt={4}
    >
      <ChartCard title="Payment Status" hasData={statusData.length > 0}>
        <PieChart
          series={[{
            data: statusData,
            arcLabel: (item) => `${item.label} (${item.value})`,
          }]}
          sx={{
            [`& .${pieArcLabelClasses.root}`]: {
              fill: 'white',
              fontSize: 12,
            },
          }}
          width={250}
          height={300}
        />
      </ChartCard>

      <ChartCard title="Restaurant Balances" hasData={balanceData.length > 0}>
        <BarChart
          xAxis={[{ scaleType: 'band', data: balanceData.map(b => b.name) }]}
          series={[{ data: balanceData.map(b => b.balance), label: 'Balance', color: '#8884d8' }]}
          width={450}
          height={300}
        />
      </ChartCard>

      <ChartCard title="Payment Types" hasData={typeData.length > 0}>
        <PieChart
          series={[{
            data: typeData,
            arcLabel: (item) => `${item.label} (${item.value})`,
          }]}
          sx={{
            [`& .${pieArcLabelClasses.root}`]: {
              fill: 'white',
              fontSize: 12,
            },
          }}
          width={250}
          height={300}
        />
      </ChartCard>

      <ChartCard title="Payment Trends" hasData={trendData.length > 0}>
        <LineChart
          xAxis={[{ data: trendData.map(t => t.date), scaleType: 'point' }]}
          series={[{ data: trendData.map(t => t.amount), label: 'Amount', color: '#82ca9d' }]}
          width={450}
          height={300}
        />
      </ChartCard>
    </Box>
  );
};

export default PaymentCharts;
