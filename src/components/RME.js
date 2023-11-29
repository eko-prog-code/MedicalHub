import React from 'react';
import { Button } from 'primereact/button';

const RME = () => {
  const handleButtonClick = () => {
    // Buka tautan eksternal saat tombol "InovaRME Nexus" ditekan
    window.open('https://rekammedis.vercel.app', '_blank');
  };

  const handleDownloadButtonClick = () => {
    // Membuat elemen <a> untuk menginisiasi unduhan
    const downloadLink = document.createElement('a');
    downloadLink.href = 'https://drive.google.com/file/d/1zdRJCKgF0CsAkMAQr3Pi1_F6HYlP2Gi-/view?usp=sharing';
    downloadLink.target = '_blank';
    downloadLink.download = 'Modul_RME.pdf'; // Nama file yang akan diunduh
    downloadLink.click();
  };

  return (
    <div>
      <h3>RME</h3>
      <Button
        label="InovaRME Nexus"
        raised
        icon="pi pi-check"
        onClick={handleButtonClick}
        style={{ backgroundColor: '#001f3f', color: '#ffffff' }}
      />
      <Button
        label="Download Modul RME"
        raised
        icon="pi pi-download"
        onClick={handleDownloadButtonClick}
        style={{ marginLeft: '10px' }} // Memberikan jarak antara kedua tombol
      />
    </div>
  );
};

export default RME;
