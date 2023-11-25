import React from 'react';
import { Button } from 'primereact/button';

const RxDoseCalculator = () => {
  const handleButtonClick = () => {
    // Buka tautan eksternal saat tombol ditekan
    window.open('https://dosisakurat.vercel.app', '_blank');
  };

  return (
    <div>
      <h3>Rx Dose Calculator</h3>
      <Button label="Teknologi Otomatis Hitung Dosis Obat" raised icon="pi pi-check" onClick={handleButtonClick} />
    </div>
  );
};

export default RxDoseCalculator;
