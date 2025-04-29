// src/App.js
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout'; // Import your Layout
import RestaurantMonitoring from './pages/RestaurantMonitoring';
import RiderMonitoring from './pages/RiderMonitoring';
import PaymentMonitoringDashboard from './pages/PaymentMonitoringDashboard';
import Payment from './pages/Payment';
import Success from './pages/success';
import Cancel from './pages/cancel';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Payment />} />
          <Route path="/restaurant" element={<RestaurantMonitoring />} />
          <Route path="/rider" element={<RiderMonitoring />} />
          <Route path="/payment" element={<PaymentMonitoringDashboard />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
