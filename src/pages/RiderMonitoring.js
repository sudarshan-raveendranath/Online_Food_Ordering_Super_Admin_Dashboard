import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Container,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  TextField,
  TablePagination
} from "@mui/material";
import { Download } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from "recharts";
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

const RiderMonitoring = () => {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");
  const [timeFilter, setTimeFilter] = useState("ALL");

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1"];

  useEffect(() => {
    fetch("http://localhost:8099/product/v1/payments/rider/202")
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setFiltered(res);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let result = [...data];
    if (statusFilter) {
      result = result.filter(p => p.paymentStatus === statusFilter);
    }
    if (search) {
      result = result.filter(p => p.mealName.toLowerCase().includes(search.toLowerCase()));
    }
    if (timeFilter !== "ALL") {
      result = filterByTime(result, timeFilter);
    }
    setFiltered(result);
  }, [statusFilter, search, timeFilter, data]);

  const filterByTime = (data, timeRange) => {
    const now = new Date();
    return data.filter(p => {
      const createdAt = new Date(p.createdAt);
      switch (timeRange) {
        case "TODAY":
          return createdAt.toDateString() === now.toDateString();
        case "THIS_WEEK":
          const startOfWeek = now.getDate() - now.getDay();
          const startOfWeekDate = new Date(now.setDate(startOfWeek));
          return createdAt >= startOfWeekDate;
        case "THIS_MONTH":
          return createdAt.getMonth() === now.getMonth() && createdAt.getFullYear() === now.getFullYear();
        case "THIS_YEAR":
          return createdAt.getFullYear() === now.getFullYear();
        default:
          return true; 
      }
    });
  };

  const totalEarnings = filtered.reduce((sum, p) => sum + p.totalAmount, 0);
  const totalDeliveries = filtered.length;
  const avgEarningsPerDelivery = totalDeliveries ? (totalEarnings / totalDeliveries).toFixed(2) : 0;
  const completedDeliveries = filtered.filter(p => p.paymentStatus === "COMPLETED").length;
  const pendingDeliveries = filtered.filter(p => p.paymentStatus === "PENDING").length;
  const failedDeliveries = filtered.filter(p => p.paymentStatus === "FAILED").length;

  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  const paginatedData = filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };


  const earningsByDate = Object.values(filtered.reduce((acc, p) => {
    const date = new Date(p.createdAt).toLocaleDateString();
    acc[date] = acc[date] || { date, earnings: 0 };
    acc[date].earnings += p.totalAmount;
    return acc;
  }, {}));

  const deliveryStatusDistribution = Object.values(filtered.reduce((acc, p) => {
    acc[p.paymentStatus] = acc[p.paymentStatus] || { name: p.paymentStatus, value: 0 };
    acc[p.paymentStatus].value += 1;
    return acc;
  }, {}));

  const paymentMethodData = Object.values(filtered.reduce((acc, p) => {
    acc[p.paymentType] = acc[p.paymentType] || { name: p.paymentType, value: 0 };
    acc[p.paymentType].value += 1;
    return acc;
  }, {}));

  const earningsVsDeliveryCount = filtered.map(p => ({
    name: p.mealName,
    Earnings: p.totalAmount,
    Deliveries: p.numberOfMeals
  }));


  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filtered);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "RiderPayments");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "Rider_Payments.xlsx");
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight="bold" mb={4}>
        Rider Monitoring Dashboard
      </Typography>

      {loading ? <CircularProgress /> : (
        <>

          <Grid container spacing={2} justifyContent="center">
            {[{
              title: "Total Earnings",
              value: `LKR ${totalEarnings.toLocaleString()}`,
              color: "#1976d2"
            }, {
              title: "Total Deliveries",
              value: totalDeliveries,
              color: "#388e3c"
            }, {
              title: "Avg. Earnings Per Delivery",
              value: `LKR ${avgEarningsPerDelivery}`,
              color: "#f57c00"
            }, {
              title: "Completed / Pending",
              value: `${completedDeliveries} / ${pendingDeliveries}`,
              color: "#7b1fa2"
            }, {
              title: "Failed Deliveries",
              value: failedDeliveries,
              color: "#d32f2f"
            }].map(({ title, value, color }, i) => (
              <Grid item xs={12} sm={6} md={2.4} key={i}>
                <Card
                  sx={{
                    backgroundColor: color,
                    color: "#fff",
                    height: "100%",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: 6
                    }
                  }}
                >
                  <CardContent>
                    <Typography variant="subtitle2" color="inherit">
                      {title}
                    </Typography>
                    <Typography variant="h6" fontWeight="bold" color="inherit">
                      {value}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>


          <Box
            display="grid"
            gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }}
            gap={2}
            mt={3}
          >
            {[{
              title: "Earnings Over Time",
              component: (
                <LineChart width={400} height={300} data={earningsByDate}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="earnings" stroke="#8884d8" />
                </LineChart>
              )
            }, {
              title: "Delivery Status Distribution",
              component: (
                <PieChart width={400} height={300}>
                  <Pie data={deliveryStatusDistribution} dataKey="value" nameKey="name" outerRadius={100} label>
                    {deliveryStatusDistribution.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              )
            }, {
              title: "Payment Method Split",
              component: (
                <PieChart width={400} height={300}>
                  <Pie data={paymentMethodData} dataKey="value" nameKey="name" outerRadius={100} label>
                    {paymentMethodData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              )
            }, {
              title: "Earnings vs Deliveries",
              component: (
                <BarChart width={400} height={300} data={earningsVsDeliveryCount}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Earnings" fill="#8884d8" />
                  <Bar dataKey="Deliveries" fill="#82ca9d" />
                </BarChart>
              )
            }].map(({ title, component }, index) => (
              <Paper
                key={index}
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  height: 400,
                  overflow: "hidden",
                  bgcolor: "#f4f4f4",
                  border: "1px solid #ccc",
                  borderRadius: 2,
                  boxShadow: 2
                }}
              >
                <Typography variant="h6" mb={1}>{title}</Typography>
                {component}
              </Paper>
            ))}
          </Box>


          <Box mt={5}>
            <Grid container spacing={2} alignItems="center" mb={2}>
              <Grid item>
                <FormControl size="small" sx={{ minWidth: 200 }}>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    label="Status"
                  >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="COMPLETED">Completed</MenuItem>
                    <MenuItem value="PENDING">Pending</MenuItem>
                    <MenuItem value="FAILED">Failed</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item>
                <TextField
                  size="small"
                  label="Search Meal"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  sx={{ minWidth: 200 }}
                />
              </Grid>
              <Grid item>
                <FormControl size="small" sx={{ minWidth: 200 }}>
                  <InputLabel>Time Filter</InputLabel>
                  <Select
                    value={timeFilter}
                    onChange={(e) => setTimeFilter(e.target.value)}
                    label="Time Filter"
                  >
                    <MenuItem value="ALL">All</MenuItem>
                    <MenuItem value="TODAY">Today</MenuItem>
                    <MenuItem value="THIS_WEEK">This Week</MenuItem>
                    <MenuItem value="THIS_MONTH">This Month</MenuItem>
                    <MenuItem value="THIS_YEAR">This Year</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  startIcon={<Download />}
                  onClick={exportToExcel}
                  sx={{ minWidth: 200 }}
                >
                  Export CSV
                </Button>
              </Grid>
            </Grid>

            <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#1976d2' }}>
                    {['Date', 'Order ID', 'Meal', 'Qty', 'Total (LKR)', 'Payment', 'Status', 'Refund'].map((header) => (
                      <TableCell key={header} sx={{ color: 'white', fontWeight: 'bold' }}>
                        {header}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedData.map((p, idx) => (
                    <TableRow
                      key={idx}
                      hover
                      sx={{
                        backgroundColor: idx % 2 === 0 ? '#f5f5f5' : 'white',
                        cursor: 'pointer'
                      }}
                    >
                      <TableCell>{new Date(p.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>{p.orderId}</TableCell>
                      <TableCell>{p.mealName}</TableCell>
                      <TableCell>{p.numberOfMeals}</TableCell>
                      <TableCell>{p.totalAmount.toLocaleString()}</TableCell>
                      <TableCell>{p.paymentType}</TableCell>
                      <TableCell>{p.paymentStatus}</TableCell>
                      <TableCell>{p.refund ? 'Yes' : 'No'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              component="div"
              count={filtered.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </Box>
        </>
      )}
    </Container>
  );
};

export default RiderMonitoring;
