import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import HotelList from './components/HotelList';
import HotelDetails from './components/HotelDetails';
import HotelForm from './components/HotelForm';
import EditHotelForm from './components/EditHotelForm';
import Favoritos from './components/Favoritos'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const App = () => {
  const [update, setUpdate] = useState(false);

  const handleHotelAdded = () => {
    setUpdate(prev => !prev);
  };

  return (
    <Routes>
      <Route path="/" element={<HotelList onHotelAdded={update} />} />
      <Route path="/hotel/:id" element={<HotelDetails />} />
      <Route path="/cadastro" element={<HotelForm onHotelAdded={handleHotelAdded} />} />
      <Route path="/editar/:id" element={<EditHotelForm />} />
      <Route path="/favoritos" element={<Favoritos />} /> 
    </Routes>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
