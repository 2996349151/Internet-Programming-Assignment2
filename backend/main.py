from fastapi import FastAPI
from database import MYDB
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DB = MYDB()

@app.get("/")
def read_root():
    return {"Hello": "World"}

# get all cars
@app.get("/cars")
def get_all_cars():
    cars = DB.get_all_cars()
    cars = [dict(car._mapping) for car in cars]
    return {"cars": cars}

# get all orders
@app.get("/orders")
def get_all_orders():
    orders = DB.get_all_orders()
    orders = [dict(order._mapping) for order in orders]
    return {"orders": orders}

# check the availability of a car by vin number
@app.get("/check_availability/{vin}")
def check_availability(vin: str):
    availability = DB.check_availability(vin)
    if availability is not None:
        return {"availability": availability}
    else:
        return {"error": "Car not found"}
    
class Order(BaseModel):
    customerName: str
    customerEmail: str
    customerPhone: str
    startDate: str
    rentPeriod: int
    driverLicense: str
    vin: str
    
# order a car and set the availability to false for the ordered car
@app.post("/place_order")
def place_order(order: Order):
    # Check if the car is available
    availability = DB.check_availability(order.vin)
    if availability:
        # Place the order
        DB.order_car(order.customerName, order.customerEmail, order.customerPhone, order.startDate, order.rentPeriod, order.driverLicense, order.vin)
        return {"message": "Order placed successfully"}
    else:
        return {"error": "Car not available"}
    
