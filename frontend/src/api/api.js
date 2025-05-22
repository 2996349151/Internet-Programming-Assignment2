import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

export const getCars = async () => {
  const response = await axios.get(`${BASE_URL}/cars`);
  return response;
};
export const getOrders = async () => {
  const response = await axios.get(`${BASE_URL}/orders`);
  return response;
};

export const checkAvailability = async (vin) => {
  const response = await axios.get(`${BASE_URL}/check_availability/${vin}`);
  return response;
};

export const placeOrder = async (orderData) => {
  const response = await axios.post(`${BASE_URL}/place_order`, {
    customerName: orderData.customerName,
    customerEmail: orderData.customerEmail,
    customerEmail: orderData.customerEmail,
    customerPhone: orderData.customerPhone,
    startDate: orderData.startDate,
    rentPeriod: orderData.rentPeriod,
    driverLicense: orderData.driverLicense,
    vin: orderData.vin,
  });
  return response;
};
