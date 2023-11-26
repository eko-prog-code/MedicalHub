import React from 'react';
import MedTradeHub from './components/MedTradeHub';
import Term from './components/Term';
import Produk from './components/Produk';
import Webinar from './components/Webinar';
import NakesSkillShare from './components/NakesSkillShare';
import RxDoseCalculator from './components/RxDoseCalculator';
import './Home.css';

const Home = () => {
  return (
    <div className="container">
      <div className="content">
        <h1 className="main-title">Medical Hub!</h1>
        <p>#Ciptakan Industri Layanan Kesehatan untuk Tenaga Medis Indonesia</p>
        <p>Medical Hub: konektivitas digital untuk para tenaga medis</p>
        <RxDoseCalculator />
        <Term />
        <MedTradeHub />
        <Produk />
        <Webinar />
        <NakesSkillShare />
        {/* Add additional content or components as needed */}
      </div>
    </div>
  );
};

export default Home;
