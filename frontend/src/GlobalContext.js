import { createContext, useState, useEffect, use } from 'react';
import { getCars, getOrders, checkAvailability, placeOrder } from './api/api';
export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [cars, setCars] = useState([]);
  const [orders, setOrders] = useState([]);
  const [reservationForm, setReservationForm] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    startDate: '',
    rentPeriod: 0,
    driverLicense: '',
    vin: '',
  });

  // Function to get cars
  useEffect(() => {
    const fetchCars = async () => {
      const response = await getCars();
      setCars(response.data.cars);
    };
    fetchCars();
  }, []);

  // Function to get orders
  useEffect(() => {
    const fetchOrders = async () => {
      const response = await getOrders();
      setOrders(response.data.orders);
    };
    fetchOrders();
  }, []);

  // Function to check availability
  const checkCarAvailability = async (vin) => {
    const response = await checkAvailability(vin);
    return response.data.available;
  };

  // Function to place an order
  const placeCarOrder = async (orderData) => {
    const response = await placeOrder(orderData);
    if (response.data.error === null) {
      return true;
    }
    return false;
  };

  return (
    <GlobalContext.Provider
      value={{
        cars,
        setCars,
        orders,
        setOrders,
        reservationForm,
        setReservationForm,
        placeCarOrder,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
