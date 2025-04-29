import axios from 'axios';

const API_URL = 'http://localhost:8099/product/v1/payments';

export const fetchPayments = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
