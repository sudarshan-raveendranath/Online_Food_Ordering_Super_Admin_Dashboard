import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TablePagination, Paper, Chip } from '@mui/material';

const PaymentTable = ({ payments }) => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('paymentId');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const sortRows = (array) => {

    const copiedArray = [...array];

    return copiedArray.sort((a, b) => {
      if (a[orderBy] < b[orderBy]) {
        return order === 'asc' ? -1 : 1;
      }
      if (a[orderBy] > b[orderBy]) {
        return order === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };

  const sortedPayments = sortRows(payments);

  const getRowBackgroundColor = (status) => {
    switch (status) {
      case 'COMPLETED':
        return '#c8e6c9';
      case 'FAILED':
        return '#ffcdd2';
      case 'PENDING':
        return '#ffe0b2';
      default:
        return 'transparent';
    }
  };

  const getChipColor = (status) => {
    switch (status) {
      case 'COMPLETED':
        return 'success';
      case 'FAILED':
        return 'error';
      case 'PENDING':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getChipStyle = (status) => ({
    fontWeight: 'bold',
    fontSize: '0.9rem',
    textTransform: 'capitalize',
    padding: '5px 10px',
    ...(status === 'COMPLETED' && { backgroundColor: '#388e3c', color: 'white' }),
    ...(status === 'FAILED' && { backgroundColor: '#d32f2f', color: 'white' }),
    ...(status === 'PENDING' && { backgroundColor: '#ffa000', color: 'white' }),
  });

  return (
    <Paper elevation={6} sx={{ marginTop: 4, padding: 2, borderRadius: 4 }}>
      <TableContainer>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell sortDirection={orderBy === 'paymentId' ? order : false} sx={{ fontWeight: 'bold' }}>
                <TableSortLabel
                  active={orderBy === 'paymentId'}
                  direction={orderBy === 'paymentId' ? order : 'asc'}
                  onClick={() => handleRequestSort('paymentId')}
                >
                  Payment ID
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={orderBy === 'orderId' ? order : false} sx={{ fontWeight: 'bold' }}>
                <TableSortLabel
                  active={orderBy === 'orderId'}
                  direction={orderBy === 'orderId' ? order : 'asc'}
                  onClick={() => handleRequestSort('orderId')}
                >
                  Order ID
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={orderBy === 'restaurantId' ? order : false} sx={{ fontWeight: 'bold' }}>
                <TableSortLabel
                  active={orderBy === 'restaurantId'}
                  direction={orderBy === 'restaurantId' ? order : 'asc'}
                  onClick={() => handleRequestSort('restaurantId')}
                >
                  Restaurant ID
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={orderBy === 'riderId' ? order : false} sx={{ fontWeight: 'bold' }}>
                <TableSortLabel
                  active={orderBy === 'riderId'}
                  direction={orderBy === 'riderId' ? order : 'asc'}
                  onClick={() => handleRequestSort('riderId')}
                >
                  Rider ID
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={orderBy === 'paymentType' ? order : false} sx={{ fontWeight: 'bold' }}>
                <TableSortLabel
                  active={orderBy === 'paymentType'}
                  direction={orderBy === 'paymentType' ? order : 'asc'}
                  onClick={() => handleRequestSort('paymentType')}
                >
                  Type
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={orderBy === 'totalAmount' ? order : false} sx={{ fontWeight: 'bold' }}>
                <TableSortLabel
                  active={orderBy === 'totalAmount'}
                  direction={orderBy === 'totalAmount' ? order : 'asc'}
                  onClick={() => handleRequestSort('totalAmount')}
                >
                  Total (Rs.)
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={orderBy === 'mealName' ? order : false} sx={{ fontWeight: 'bold' }}>
                <TableSortLabel
                  active={orderBy === 'mealName'}
                  direction={orderBy === 'mealName' ? order : 'asc'}
                  onClick={() => handleRequestSort('mealName')}
                >
                  Meal
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={orderBy === 'currency' ? order : false} sx={{ fontWeight: 'bold' }}>
                <TableSortLabel
                  active={orderBy === 'currency'}
                  direction={orderBy === 'currency' ? order : 'asc'}
                  onClick={() => handleRequestSort('currency')}
                >
                  Currency
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={orderBy === 'paymentStatus' ? order : false} sx={{ fontWeight: 'bold' }}>
                <TableSortLabel
                  active={orderBy === 'paymentStatus'}
                  direction={orderBy === 'paymentStatus' ? order : 'asc'}
                  onClick={() => handleRequestSort('paymentStatus')}
                >
                  Payment Status
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={orderBy === 'createdAt' ? order : false} sx={{ fontWeight: 'bold' }}>
                <TableSortLabel
                  active={orderBy === 'createdAt'}
                  direction={orderBy === 'createdAt' ? order : 'asc'}
                  onClick={() => handleRequestSort('createdAt')}
                >
                  Created At
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedPayments
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((payment) => (
                <TableRow hover key={payment.paymentId} sx={{ backgroundColor: getRowBackgroundColor(payment.paymentStatus) }}>
                  <TableCell>{payment.paymentId}</TableCell>
                  <TableCell>{payment.orderId}</TableCell>
                  <TableCell>{payment.restaurantId}</TableCell>
                  <TableCell>{payment.riderId}</TableCell>
                  <TableCell>{payment.paymentType}</TableCell>
                  <TableCell>{payment.totalAmount}</TableCell>
                  <TableCell>{payment.mealName}</TableCell>
                  <TableCell>{payment.currency}</TableCell>
                  <TableCell>
                    <Chip
                      label={payment.paymentStatus}
                      color={getChipColor(payment.paymentStatus)}
                      size="small"
                      sx={getChipStyle(payment.paymentStatus)}
                    />
                  </TableCell>
                  <TableCell>{payment.createdAt}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={payments.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default PaymentTable;
