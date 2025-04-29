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

const RestaurantMonitoring = () => {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1"];

  useEffect(() => {
    fetch("http://localhost:8099/product/v1/payments/restaurant/101")
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
    setFiltered(result);
  }, [statusFilter, search, data]);

  const totalRevenue = filtered.reduce((sum, p) => sum + p.totalAmount, 0);
  const totalOrders = filtered.length;
  const avgOrder = totalOrders ? (totalRevenue / totalOrders).toFixed(2) : 0;
  const refunds = filtered.filter(p => p.refundStatus === "REFUNDED").length;
  const completed = filtered.filter(p => p.paymentStatus === "COMPLETED").length;
  const pending = filtered.filter(p => p.paymentStatus === "PENDING").length;

  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  const paginatedData = filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };  

  const revenueByDate = Object.values(filtered.reduce((acc, p) => {
    const date = new Date(p.createdAt).toLocaleDateString();
    acc[date] = acc[date] || { date, revenue: 0 };
    acc[date].revenue += p.totalAmount;
    return acc;
  }, {}));

  const mealDistribution = Object.values(filtered.reduce((acc, p) => {
    acc[p.mealName] = acc[p.mealName] || { name: p.mealName, value: 0 };
    acc[p.mealName].value += p.numberOfMeals;
    return acc;
  }, {}));

  const paymentMethodData = Object.values(filtered.reduce((acc, p) => {
    acc[p.paymentType] = acc[p.paymentType] || { name: p.paymentType, value: 0 };
    acc[p.paymentType].value += 1;
    return acc;
  }, {}));

  const commissionVsBalance = filtered.map(p => ({
    name: p.mealName,
    Commission: p.companyCommission,
    Restaurant: p.restaurantBalance
  }));

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filtered);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Payments");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "Restaurant_Payments.xlsx");
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight="bold" mb={4}>
        Restaurant Monitoring Dashboard
      </Typography>

      {loading ? <CircularProgress /> : (
        <>
          {/* Metric Cards */}
          <Grid container spacing={2} justifyContent="center">
            {[{
              title: "Total Revenue",
              value: `LKR ${totalRevenue.toLocaleString()}`,
              color: "#1976d2"
            }, {
              title: "Total Orders",
              value: totalOrders,
              color: "#388e3c"
            }, {
              title: "Average Order Value",
              value: `LKR ${avgOrder}`,
              color: "#f57c00"
            }, {
              title: "Completed / Pending",
              value: `${completed} / ${pending}`,
              color: "#7b1fa2"
            }, {
              title: "Refunds Issued",
              value: refunds,
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
            {[
              {
                title: "Revenue Over Time",
                component: (
                  <LineChart width={400} height={300} data={revenueByDate}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
                  </LineChart>
                )
              },
              {
                title: "Meal Distribution",
                component: (
                  <PieChart width={400} height={300}>
                    <Pie data={mealDistribution} dataKey="value" nameKey="name" outerRadius={100} label>
                      {mealDistribution.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                )
              },
              {
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
              },
              {
                title: "Commission vs Restaurant Balance",
                component: (
                  <BarChart width={400} height={300} data={commissionVsBalance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Commission" fill="#8884d8" />
                    <Bar dataKey="Restaurant" fill="#82ca9d" />
                  </BarChart>
                )
              }
            ].map(({ title, component }, index) => (
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
                        transition: 'background-color 0.3s',
                        '&:hover': { backgroundColor: '#e3f2fd' },
                      }}
                    >
                      <TableCell>{new Date(p.createdAt).toLocaleString()}</TableCell>
                      <TableCell>{p.orderId}</TableCell>
                      <TableCell>{p.mealName}</TableCell>
                      <TableCell>{p.numberOfMeals}</TableCell>
                      <TableCell>{p.totalAmount}</TableCell>
                      <TableCell>{p.paymentType}</TableCell>
                      <TableCell>{p.paymentStatus}</TableCell>
                      <TableCell>{p.refundStatus}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[]}
                component="div"
                count={filtered.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
              />
            </TableContainer>
          </Box>
        </>
      )
      }
    </Container >
  );
};

export default RestaurantMonitoring;
