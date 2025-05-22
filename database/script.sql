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
('1HGCM82633A000001', 'Sedan', 'Honda', 'Accord', 'accord.jpg', 2018, '35000', 'Petrol', TRUE, 50, 'Comfortable and reliable sedan.'),
('1HGCM82633A000002', 'SUV', 'Toyota', 'RAV4', 'rav4.jpg', 2020, '22000', 'Hybrid', TRUE, 65, 'Spacious SUV with hybrid engine.'),
('1HGCM82633A000003', 'Sedan', 'Toyota', 'Camry', 'camry.jpg', 2019, '28000', 'Petrol', FALSE, 55, 'Popular mid-size sedan.'),
('1HGCM82633A000004', 'Hatchback', 'Volkswagen', 'Golf', 'golf.jpg', 2017, '40000', 'Diesel', TRUE, 45, 'Efficient hatchback for city driving.'),
('1HGCM82633A000005', 'SUV', 'Ford', 'Explorer', 'explorer.jpg', 2021, '15000', 'Petrol', TRUE, 80, 'Large SUV with advanced features.'),
('1HGCM82633A000006', 'Sedan', 'BMW', '3 Series', 'bmw3.jpg', 2018  , '32000', 'Petrol', TRUE, 90, 'Luxury sedan with sporty feel.'),
('1HGCM82633A000007', 'SUV', 'Audi', 'Q5', 'audiq5.jpg', 2019, '25000', 'Diesel', FALSE, 100, 'Premium SUV with comfort.'),
('1HGCM82633A000008', 'Convertible', 'Mazda', 'MX-5', 'mx5.jpg', 2020, '12000', 'Petrol', TRUE, 70, 'Fun convertible for sunny days.'),
('1HGCM82633A000009', 'Sedan', 'Mercedes', 'C-Class', 'cclass.jpg', 2017, '41000', 'Petrol', TRUE, 95, 'Elegant and comfortable sedan.'),
('1HGCM82633A000010', 'SUV', 'Hyundai', 'Tucson', 'tucson.jpg', 2021, '10000', 'Hybrid', TRUE, 60, 'Modern SUV with hybrid tech.'),
('1HGCM82633A000011', 'Hatchback', 'Ford', 'Focus', 'focus.jpg', 2016, '50000', 'Petrol', TRUE, 40, 'Compact and efficient.'),
('1HGCM82633A000012', 'Sedan', 'Nissan', 'Altima', 'altima.jpg', 2018, '33000', 'Petrol', TRUE, 50, 'Reliable family sedan.'),
('1HGCM82633A000013', 'SUV', 'Kia', 'Sportage', 'sportage.jpg', 2019, '27000', 'Diesel', TRUE, 55, 'Sporty and practical SUV.'),
('1HGCM82633A000014', 'Sedan', 'Hyundai', 'Elantra', 'elantra.jpg', 2020, '21000', 'Petrol', TRUE, 48, 'Affordable and modern sedan.'),
('1HGCM82633A000015', 'SUV', 'Chevrolet', 'Equinox', 'equinox.jpg', 2018, '36000', 'Petrol', TRUE, 58, 'Comfortable SUV for families.'),
('1HGCM82633A000016', 'Sedan', 'Tesla', 'Model 3', 'model3.jpg', 2021, '8000', 'Electric', TRUE, 120, 'Electric sedan with autopilot.'),
('1HGCM82633A000017', 'SUV', 'Tesla', 'Model X', 'modelx.jpg', 2020, '12000', 'Electric', TRUE, 150, 'Luxury electric SUV.'),
('1HGCM82633A000018', 'Hatchback', 'Honda', 'Fit', 'fit.jpg', 2017, '42000', 'Petrol', TRUE, 38, 'Compact hatchback with great mileage.'),
('1HGCM82633A000019', 'Sedan', 'Lexus', 'ES', 'lexuses.jpg', 2019, '26000', 'Hybrid', TRUE, 110, 'Luxury hybrid sedan.'),
('1HGCM82633A000020', 'SUV', 'Subaru', 'Forester', 'forester.jpg', 2018, '34000', 'Petrol', TRUE, 62, 'All-wheel drive SUV.'),
('1HGCM82633A000021', 'Sedan', 'Chevrolet', 'Malibu', 'malibu.jpg', 2017, '39000', 'Petrol', TRUE, 47, 'Spacious and comfortable.'),
('1HGCM82633A000022', 'SUV', 'Mazda', 'CX-5', 'cx5.jpg', 2020, '18000', 'Diesel', TRUE, 68, 'Stylish and efficient SUV.'),
('1HGCM82633A000023', 'Sedan', 'Audi', 'A4', 'audia4.jpg', 2018, '31000', 'Petrol', TRUE, 98, 'Premium sedan with tech features.'),
('1HGCM82633A000024', 'SUV', 'BMW', 'X3', 'bmwx3.jpg', 2019, '23000', 'Diesel', TRUE, 105, 'Luxury compact SUV.'),
('1HGCM82633A000025', 'Hatchback', 'Toyota', 'Yaris', 'yaris.jpg', 2016, '48000', 'Petrol', TRUE, 36, 'Economical hatchback.'),
('1HGCM82633A000026', 'Sedan', 'Kia', 'Optima', 'optima.jpg', 2017, '37000', 'Petrol', TRUE, 49, 'Reliable and stylish sedan.'),
('1HGCM82633A000027', 'SUV', 'Honda', 'CR-V', 'crv.jpg', 2021, '9000', 'Hybrid', TRUE, 72, 'Popular hybrid SUV.'),
('1HGCM82633A000028', 'Sedan', 'Ford', 'Fusion', 'fusion.jpg', 2018, '35000', 'Petrol', TRUE, 53, 'Comfortable and efficient.'),
('1HGCM82633A000029', 'SUV', 'Nissan', 'Rogue', 'rogue.jpg', 2019, '24000', 'Petrol', TRUE, 59, 'Versatile compact SUV.'),
('1HGCM82633A000030', 'Sedan', 'Volkswagen', 'Passat', 'passat.jpg', 2017, '43000', 'Diesel', TRUE, 52, 'Spacious and efficient sedan.');

-- Insert 3 orders (using vins from above)
