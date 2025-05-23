import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { GlobalContext } from '../GlobalContext';
import { Space, Button } from 'antd';
import { getOrders } from '../api/api';

function Order() {
  const { orders, setOrders } = useContext(GlobalContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchOrders() {
      const response = await getOrders();
      setOrders(response.data.orders);
    }
    fetchOrders();
  }, []);

  return (
    <div>
      <Button onClick={() => navigate('/')}>Back to Home</Button>
      <p>Orders:</p>
      <Space>
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              <p>Order ID: {order.orderID}</p>
              <p>Customer Name: {order.customerName}</p>
              <p>Customer Email: {order.customerEmail}</p>
              <p>Customer Phone: {order.customerPhone}</p>
              <p>Driver License: {order.driverLicense}</p>
              <p>Car VIN: {order.vin}</p>
              <p>Start Date: {order.startDate}</p>
              <p>Rent Period: {order.rentPeriod} days</p>
            </li>
          ))}
        </ul>
      </Space>
    </div>
  );
}

export default Order;
