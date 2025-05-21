from sqlalchemy import create_engine, text

class MYDB:
    def __init__(self):
        self.DATABASE_URL = "mysql+pymysql://root@localhost:3306/Car_RentingDB"
        self.engine = create_engine(self.DATABASE_URL)

    # Get all cars
    def get_all_cars(self):
        with self.engine.connect() as connection:
            result = connection.execute(text("SELECT * FROM Cars")).fetchall()
            return result
        
    # Get all orders
    def get_all_orders(self):
        with self.engine.connect() as connection:
            result = connection.execute(text("SELECT * FROM Orders")).fetchall()
            return result
            
    # Check the availability of a car the car has a vin number
    def check_availability(self, vin):
        with self.engine.connect() as connection:
            result = connection.execute(text("SELECT available FROM Cars WHERE vin = :vin"), {"vin": vin}).fetchone()
            return result[0] if result else None

    # Order a car and set the availability to false for the ordered car
    def order_car(self, customerName, customerEmail, customerPhone, startDate, endDate, driverLicense, vin):
        with self.engine.connect() as connection:
            connection.execute(text("INSERT INTO Orders (customerName, customerEmail, customerPhone, startDate, endDate, driverLicense, vin) VALUES (:customerName, :customerEmail, :customerPhone, :startDate, :endDate, :driverLicense, :vin)"), {
                "customerName": customerName,
                "customerEmail": customerEmail,
                "customerPhone": customerPhone,
                "startDate": startDate,
                "endDate": endDate,
                "driverLicense": driverLicense,
                "vin": vin
            })
            connection.commit()
        with self.engine.connect() as connection:
            connection.execute(text("UPDATE Cars SET availability = false WHERE vin = :vin"), {"vin": vin})
            connection.commit()
            return True