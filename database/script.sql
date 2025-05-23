DROP DATABASE IF EXISTS Car_RentingDB;

CREATE DATABASE Car_RentingDB;

USE Car_RentingDB;

CREATE TABLE Cars (
    vin VARCHAR(17) PRIMARY KEY,
    carType VARCHAR(50) NOT NULL,
    brand VARCHAR(50) NOT NULL,
    carModel VARCHAR(50) NOT NULL,
    image VARCHAR(255) NOT NULL,
    yearOfManufacture INT NOT NULL,
    mileage VARCHAR(50) NOT NULL,
    fuelType VARCHAR(50) NOT NULL,
    available BOOLEAN NOT NULL,
    pricePerDay INT NOT NULL,
    description TEXT NOT NULL
)

CREATE TABLE Orders (
    orderID INT AUTO_INCREMENT PRIMARY KEY, 
    customerName VARCHAR(100) NOT NULL,
    customerEmail VARCHAR(100) NOT NULL,
    customerPhone VARCHAR(15) NOT NULL,
    startDate DATE NOT NULL,
    rentPeriod INT NOT NULL,
    driverLicense VARCHAR(50) NOT NULL, 
    vin VARCHAR(17) NOT NULL,           
    FOREIGN KEY (vin) REFERENCES Cars(vin)
)

INSERT INTO Cars (vin, carType, brand, carModel, image, yearOfManufacture, mileage, fuelType, available, pricePerDay, description) VALUES
('1HGCM82633A000031', 'Sedan', 'Honda', 'Accord', 'accord.jpg', 2019, '22000', 'Petrol', TRUE, 52, 'Accord with low mileage.'),
('1HGCM82633A000033', 'SUV', 'Toyota', 'RAV4', 'rav4.jpg', 2021, '12000', 'Hybrid', TRUE, 70, 'Latest RAV4 hybrid.'),
('1HGCM82633A000035', 'Sedan', 'Toyota', 'Camry', 'camry.jpg', 2020, '15000', 'Petrol', TRUE, 58, 'New Camry, great condition.'),
('1HGCM82633A000037', 'Hatchback', 'Volkswagen', 'Golf', 'golf.jpg', 2018, '25000', 'Diesel', TRUE, 47, 'Golf with good mileage.'),
('1HGCM82633A000039', 'SUV', 'Ford', 'Explorer', 'explorer.jpg', 2022, '5000', 'Petrol', TRUE, 85, 'Brand new Explorer.'),
('1HGCM82633A000041', 'Sedan', 'BMW', '3 Series', 'bmw3.jpg', 2019, '21000', 'Petrol', TRUE, 95, 'BMW 3 Series, sporty.'),
('1HGCM82633A000043', 'SUV', 'Audi', 'Q5', 'audiq5.jpg', 2021, '9000', 'Diesel', FALSE, 110, 'Audi Q5, premium SUV.'),
('1HGCM82633A000045', 'Convertible', 'Mazda', 'MX-5', 'mx5.jpg', 2019, '17000', 'Petrol', TRUE, 68, 'MX-5, fun to drive.'),
('1HGCM82633A000047', 'Sedan', 'Mercedes', 'C-Class', 'cclass.jpg', 2018, '25000', 'Petrol', TRUE, 100, 'C-Class, luxury sedan.'),
('1HGCM82633A000049', 'SUV', 'Hyundai', 'Tucson', 'tucson.jpg', 2022, '4000', 'Hybrid', TRUE, 65, 'Tucson, latest model.'),
('1HGCM82633A000051', 'Hatchback', 'Ford', 'Focus', 'focus.jpg', 2018, '27000', 'Petrol', TRUE, 43, 'Focus, city car.'),
('1HGCM82633A000053', 'Sedan', 'Nissan', 'Altima', 'altima.jpg', 2019, '19000', 'Petrol', TRUE, 53, 'Altima, family sedan.'),
('1HGCM82633A000055', 'SUV', 'Kia', 'Sportage', 'sportage.jpg', 2021, '8000', 'Diesel', FALSE, 60, 'Sportage, sporty SUV.'),
('1HGCM82633A000057', 'Sedan', 'Hyundai', 'Elantra', 'elantra.jpg', 2021, '7000', 'Petrol', TRUE, 52, 'Elantra, modern sedan.'),
('1HGCM82633A000059', 'SUV', 'Chevrolet', 'Equinox', 'equinox.jpg', 2020, '16000', 'Petrol', TRUE, 62, 'Equinox, family SUV.'),
('1HGCM82633A000061', 'Sedan', 'Tesla', 'Model 3', 'model3.jpg', 2022, '3000', 'Electric', TRUE, 130, 'Model 3, autopilot.'),
('1HGCM82633A000063', 'SUV', 'Tesla', 'Model X', 'modelx.jpg', 2021, '9000', 'Electric', TRUE, 155, 'Model X, luxury.'),
('1HGCM82633A000065', 'Hatchback', 'Honda', 'Fit', 'fit.jpg', 2018, '23000', 'Petrol', TRUE, 40, 'Fit, great mileage.'),
('1HGCM82633A000067', 'Sedan', 'Lexus', 'ES', 'lexuses.jpg', 2020, '12000', 'Hybrid', FALSE, 115, 'Lexus ES, luxury hybrid.'),
('1HGCM82633A000069', 'SUV', 'Subaru', 'Forester', 'forester.jpg', 2021, '7000', 'Petrol', TRUE, 68, 'Forester, AWD.'),
('1HGCM82633A000071', 'Sedan', 'Chevrolet', 'Malibu', 'malibu.jpg', 2018, '25000', 'Petrol', TRUE, 50, 'Malibu, comfortable.'),
('1HGCM82633A000073', 'SUV', 'Mazda', 'CX-5', 'cx5.jpg', 2021, '9000', 'Diesel', TRUE, 72, 'CX-5, stylish SUV.'),
('1HGCM82633A000075', 'Sedan', 'Audi', 'A4', 'audia4.jpg', 2020, '11000', 'Petrol', TRUE, 105, 'Audi A4, premium.'),
('1HGCM82633A000077', 'SUV', 'BMW', 'X3', 'bmwx3.jpg', 2022, '2000', 'Diesel', TRUE, 115, 'BMW X3, luxury compact.'),
('1HGCM82633A000079', 'Hatchback', 'Toyota', 'Yaris', 'yaris.jpg', 2018, '27000', 'Petrol', TRUE, 38, 'Yaris, economical.');