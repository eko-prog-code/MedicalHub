// Home.js
import React from 'react';
import FloatingButton from './FloatingButton';
import MedTradeHub from './components/MedTradeHub';
import Produk from './components/Produk';
import Webinar from './components/Webinar';
import WebinarCard from './components/WebinarCard';
import NakesSkillShare from './components/NakesSkillShare';
import SkillShareCard from './components/SkillShareCard';
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
        <MedTradeHub />
        <Produk />
        <Webinar />
        <WebinarCard />
        <NakesSkillShare />
        <SkillShareCard />
        {/* Add additional content or components as needed */}
        <FloatingButton />
      </div>
    </div>
  );
};

export default Home;
