import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Reservation from './pages/Reservation';
import Order from './pages/Order';
import Header from './components/Header';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/order" element={<Order />} />
      </Routes>
    </>
  );
}

export default App;
