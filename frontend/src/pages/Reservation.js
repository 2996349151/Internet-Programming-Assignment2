import { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex, Button, Menu, Space, Input, message, Card, AutoComplete, Select, Form } from 'antd';
import { GlobalContext } from '../GlobalContext';
import { placeOrder } from '../api/api';

function Reservation() {
  const { cars, setCars, orders, setOrders, reservationForm, setReservationForm } =
    useContext(GlobalContext);
  const navigate = useNavigate();
  const selectedCar = cars.find((car) => car.vin === reservationForm.vin);
  const [isFormValid, setIsFormValid] = useState(false);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  function handleFormChange(_, allFields) {
    const isValid = allFields.every(
      (field) => field.errors.length === 0 && field.value !== undefined && field.value !== ''
    );
    setIsFormValid(isValid);
  }
  useEffect(() => {
    form
      .validateFields()
      .then(() => setIsFormValid(true))
      .catch(() => setIsFormValid(false));
  }, [form, reservationForm]);

  async function handleConfirmRent() {
    const response = await placeOrder(reservationForm);
    if (!response.data.error) {
      messageApi.open({
        type: 'success',
        content: 'Order placed successfully!',
      });

      setTimeout(() => {
        setReservationForm({
          customerName: '',
          customerEmail: '',
          customerPhone: '',
          startDate: '',
          rentPeriod: 0,
          driverLicense: '',
          vin: '',
        });
        navigate('/');
      }, 2000);
    } else {
      messageApi.open({
        type: 'error',
        content: 'Failed to place order because the car is not available.',
      });
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  }
  if (!selectedCar) {
    return (
      <div style={{ width: '80%', maxWidth: '600px', margin: '0 auto' }}>
        <p>No car selected. Please select one car.</p>
        <Button onClick={() => navigate('/')}>Back to Home</Button>
      </div>
    );
  }

  if (!selectedCar.available) {
    return (
      <div style={{ width: '80%', maxWidth: '600px', margin: '0 auto' }}>
        <p>{`${selectedCar.brand} ${selectedCar.carModel} ${selectedCar.carType}`}</p>
        <img src={'cars/' + selectedCar.image} alt="Car" style={{ width: '100%' }} />
        <p>Year: {selectedCar.yearOfManufacture}</p>
        <p>Mileage: {selectedCar.mileage}</p>
        <p>Fuel Type: {selectedCar.fuelType}</p>
        <p>Price per day: {selectedCar.pricePerDay}</p>
        <p>Description: {selectedCar.description}</p>
        <p style={{ color: 'red' }}>
          Sorry, this car is <b>not available</b> for reservation.
        </p>
        <Button onClick={() => navigate('/')}>Back to Home</Button>
      </div>
    );
  }

  return (
    <div>
      {contextHolder}
      <Form
        form={form}
        name="Reservation form"
        style={{ width: '80%', maxWidth: '600px', margin: '0 auto' }}
        onFieldsChange={handleFormChange}
        initialValues={reservationForm}
        onValuesChange={(changed, all) => setReservationForm({ ...reservationForm, ...all })}
      >
        <Form.Item label="Car Details">
          <br />
          <p>{`${selectedCar.brand} ${selectedCar.carModel} ${selectedCar.carType}`}</p>
          <img src={'cars/' + selectedCar.image} alt="Car" style={{ width: '100%' }} />
          <p>Year: {selectedCar.yearOfManufacture}</p>
          <p>Mileage: {selectedCar.mileage}</p>
          <p>Fuel Type: {selectedCar.fuelType}</p>
          <p>Price per day: {selectedCar.pricePerDay}</p>
          <p>Description: {selectedCar.description}</p>
        </Form.Item>
        <Form.Item
          label="Customer Name"
          name="customerName"
          rules={[
            { required: true, message: 'Please input your recipient name!' },
            { pattern: /^[a-zA-Z\s]+$/, message: 'Name should only contain letters!' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Customer Email"
          name="customerEmail"
          rules={[
            { required: true, message: 'Please input your recipient email!' },
            { type: 'email', message: 'Please enter a valid email!' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Customer Phone"
          name="customerPhone"
          rules={[
            { required: true, message: 'Please input your mobile number!' },
            { pattern: /^04[0-9]{8}$/, message: 'Please enter a valid mobile number!' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Start Date"
          name="startDate"
          rules={[{ required: true, message: 'Please input the start date!' }]}
        >
          <Input type="date" />
        </Form.Item>
        <Form.Item
          label="Rent Period"
          name="rentPeriod"
          rules={[
            { required: true, message: 'Please input the rent period!' },
            {
              validator: (_, value) =>
                value && Number(value) > 0
                  ? Promise.resolve()
                  : Promise.reject(new Error('Rent period must be a positive number!')),
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label="Driver License"
          name="driverLicense"
          rules={[
            { required: true, message: 'Please input your driver license!' },
            {
              pattern: /^[A-Z0-9]+$/,
              message: 'Driver license should only contain uppercase letters and numbers!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label={null}>
          {isFormValid && reservationForm.rentPeriod && selectedCar && (
            <div style={{ margin: '16px 0', fontWeight: 'bold', color: '#1677ff' }}>
              Total Price: ${Number(selectedCar.pricePerDay) * Number(reservationForm.rentPeriod)}
            </div>
          )}
          <Button onClick={() => navigate('/')}>Home</Button>
          <span style={{ display: 'inline-block', width: 16 }} />
          <Button type="primary" disabled={!isFormValid} onClick={() => handleConfirmRent()}>
            Confirm Rent
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
export default Reservation;
