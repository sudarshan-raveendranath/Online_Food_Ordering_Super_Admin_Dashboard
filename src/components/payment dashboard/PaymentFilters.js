import React from 'react';
import { Grid, TextField, MenuItem, Box } from '@mui/material';

const PaymentFilters = ({ filters, handleFilterChange }) => {
  return (
    <Box mt={4}>
      <Grid container spacing={2}>
        {['paymentStatus', 'paymentType', 'currency', 'riderId', 'restaurantId'].map((field, index) => (
          <Grid item xs={12} sm={6} md={2.4} key={index}>
            {field === 'riderId' || field === 'restaurantId' ? (
  
              <TextField
                fullWidth
                label={field}
                name={field}
                value={filters[field]}
                onChange={handleFilterChange}
                InputLabelProps={{ shrink: true }}
                size="small"
                sx={{ minWidth: 120 }}
                placeholder={`Enter ${field}`}
              />
            ) : (

              <TextField
                select
                fullWidth
                label={field}
                name={field}
                value={filters[field]}
                onChange={handleFilterChange}
                InputLabelProps={{ shrink: true }}
                size="small"
                sx={{ minWidth: 120 }}
                SelectProps={{
                  displayEmpty: true,
                  renderValue: (selected) => {
                    if (selected === '') {
                      return 'All';
                    }
                    return selected;
                  }
                }}
              >
                <MenuItem value="">All</MenuItem>
                {field === 'paymentStatus' && ['COMPLETED', 'FAILED', 'PENDING'].map(option => (
                  <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
                {field === 'paymentType' && ['CARD', 'CASH_ON_DELIVERY'].map(option => (
                  <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
                {field === 'currency' && ['LKR', 'USD'].map(option => (
                  <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
              </TextField>
            )}
          </Grid>
        ))}


        <Grid item xs={12} sm={6} md={2.4}>
          <TextField
            type="date"
            fullWidth
            label="Start Date"
            InputLabelProps={{ shrink: true }}
            name="startDate"
            value={filters.startDate}
            onChange={handleFilterChange}
            size="small"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={2.4}>
          <TextField
            type="date"
            fullWidth
            label="End Date"
            InputLabelProps={{ shrink: true }}
            name="endDate"
            value={filters.endDate}
            onChange={handleFilterChange}
            size="small"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default PaymentFilters;
