import React from 'react';
import MedTradeHub from './components/MedTradeHub';
import Produk from './components/Produk';
import Webinar from './components/Webinar';
import NakesSkillShare from './components/NakesSkillShare';
import RxDoseCalculator from './components/RxDoseCalculator';

const Home = () => {
  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0,
  };

  const divStyle = {
    textAlign: 'center',
  };

  const h1Style = {
    color: 'blue',
  };

  return (
    <div style={containerStyle}>
      <div style={divStyle}>
        <h1 style={h1Style}>Welcome to Medical Hub!</h1>
        <p>#Ciptakan Industri Layanan Kesehatan untuk Tenaga Medis Indonesia</p>
        <p>Medical Hub: konektivitas digital untuk para tenaga medis</p>
        <RxDoseCalculator />
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
