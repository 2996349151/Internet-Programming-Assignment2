import { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex, Button, Menu, Space, Input, message, Card, AutoComplete, Select, Table } from 'antd';
import { GlobalContext } from '../GlobalContext';
import { getCars, getOrders } from '../api/api';

function Homepage() {
  const { cars, setCars, orders, setOrders, reservationForm, setReservationForm } =
    useContext(GlobalContext);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [selectedCars, setSelectedCars] = useState([]);
  const [search, setSearch] = useState('');
  const [carType, setCarType] = useState('');
  const [brand, setBrand] = useState('');
  const [chosenCardVin, setChosenCardVin] = useState(null);
  const carTypes = [...new Set(cars.map((car) => car.carType))];
  const brands = [...new Set(cars.map((car) => car.brand))];

  const brandSuggestions = [...new Set(cars.map((car) => car.brand))].map((brand) => ({
    value: brand,
    label: brand,
    type: 'brand',
  }));
  const carTypeSuggestions = [...new Set(cars.map((car) => car.carType))].map((type) => ({
    value: type,
    label: type,
    type: 'carType',
  }));
  const carModelSuggestions = [...new Set(cars.map((car) => car.carModel))].map((model) => ({
    value: model,
    label: model,
    type: 'carModel',
  }));
  const combineSet = new Set();
  const combineSuggestions = cars
    .map((car) => {
      const key = `${car.brand} ${car.carModel} ${car.carType}`;
      if (combineSet.has(key)) return null;
      combineSet.add(key);
      return {
        value: key,
        label: key,
        car,
        type: 'combine',
      };
    })
    .filter(Boolean);

  const suggestions = [
    ...brandSuggestions,
    ...carTypeSuggestions,
    ...carModelSuggestions,
    ...combineSuggestions,
  ];

  const selectedSuggestions = search
    ? [
        ...brandSuggestions.filter((s) => s.value.toLowerCase().includes(search.toLowerCase())),
        ...carTypeSuggestions.filter((s) => s.value.toLowerCase().includes(search.toLowerCase())),
        ...carModelSuggestions.filter((s) => s.value.toLowerCase().includes(search.toLowerCase())),
        ...combineSuggestions.filter(
          (s) =>
            s.value.toLowerCase().includes(search.toLowerCase()) ||
            (s.car &&
              s.car.description &&
              s.car.description.toLowerCase().includes(search.toLowerCase()))
        ),
      ]
    : suggestions;

  useEffect(() => {
    let searchResult = cars;
    if (search) {
      const keywords = search.toLowerCase().split(/\s+/).filter(Boolean);
      searchResult = searchResult.filter((car) =>
        keywords.every(
          (kw) =>
            car.carType.toLowerCase().includes(kw) ||
            car.brand.toLowerCase().includes(kw) ||
            car.carModel.toLowerCase().includes(kw) ||
            (car.description && car.description.toLowerCase().includes(kw))
        )
      );
    }
    if (carType) {
      searchResult = searchResult.filter((car) => car.carType === carType);
    }
    if (brand) {
      searchResult = searchResult.filter((car) => car.brand === brand);
    }
    setSelectedCars(searchResult);
  }, [search, carType, brand, cars]);

  useEffect(() => {
    const fetchCars = async () => {
      const response = await getCars();
      setCars(response.data.cars);
    };

    fetchCars();
  }, []);

  function handleClickRent(car) {
    setReservationForm({ ...reservationForm, vin: car.vin });
    navigate('/reservation');
  }

  function handleClickCard(car) {
    setChosenCardVin(car.vin);
    setReservationForm({ ...reservationForm, vin: car.vin });
  }

  return (
    <div>
      {contextHolder}

      <Space>
        <p>Search:</p>
        <AutoComplete
          style={{ width: 200 }}
          options={selectedSuggestions}
          placeholder="Input to search"
          value={search}
          onChange={setSearch}
          allowClear
        />
        <p>Cat type:</p>
        <Select
          style={{ width: 150 }}
          placeholder="Car Type"
          allowClear
          value={carType}
          onChange={setCarType}
        >
          {carTypes.map((type) => (
            <Select.Option key={type} value={type}>
              {type}
            </Select.Option>
          ))}
        </Select>
        <p>Brand:</p>
        <Select
          style={{ width: 150 }}
          placeholder="Brand"
          allowClear
          value={brand}
          onChange={setBrand}
        >
          {brands.map((brand) => (
            <Select.Option key={brand} value={brand}>
              {brand}
            </Select.Option>
          ))}
        </Select>
        <Button onClick={() => navigate('/reservation')}>Reservation</Button>
        <Button onClick={() => navigate('/order')}>Order</Button>
      </Space>

      <Flex wrap gap="small">
        {Array.from({ length: selectedCars.length }, (_, index) => (
          <Card
            title={
              selectedCars[index].brand +
              ' ' +
              selectedCars[index].carModel +
              ' ' +
              selectedCars[index].carType
            }
            style={{
              width: '18%',
              justifyContent: 'center',
              border: selectedCars[index].vin === chosenCardVin ? '2px solid #1677ff' : undefined,
              boxShadow: selectedCars[index].vin === chosenCardVin ? '0 0 8px #1677ff' : undefined,
            }}
            hoverable
            onClick={() => {
              handleClickCard(selectedCars[index]);
            }}
          >
            <img
              src={'cars/' + selectedCars[index].image}
              alt="Car image"
              style={{
                width: '100%',
                height: '140px',
              }}
            />
            <p>Year of manifacture: {selectedCars[index].yearOfManifacture}</p>
            <p>Mileage: {selectedCars[index].mileage}</p>
            <p>Fuel Type: {selectedCars[index].fuelType}</p>
            <p>
              {selectedCars[index].available == 1 ? (
                <span style={{ color: 'green' }}>Availabe</span>
              ) : (
                <span style={{ color: 'red' }}>Not available</span>
              )}
            </p>
            <p>Price per day: {selectedCars[index].pricePerDay}</p>
            <p>Description: {selectedCars[index].description}</p>
            <Button
              disabled={!selectedCars[index].available}
              onClick={() => handleClickRent(selectedCars[index])}
            >
              Rent
            </Button>
          </Card>
        ))}
      </Flex>
    </div>
  );
}

export default Homepage;
