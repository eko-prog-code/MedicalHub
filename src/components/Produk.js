import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Produk = () => {
  const [produkList, setProdukList] = useState([]);
  const [currentTimestamp, setCurrentTimestamp] = useState('');

  useEffect(() => {
    // Fetch data from Firebase Realtime Database
    const fetchData = async () => {
      try {
        const response = await axios.get('https://medicalhub-2023-default-rtdb.europe-west1.firebasedatabase.app/MedTradeHub.json');

        // Response data is an object, convert it to an array
        const produkArray = Object.keys(response.data).map((key) => ({
          id: key,
          ...response.data[key],
        }));

        setProdukList(produkArray.reverse()); // Reverse the array

        // Set the current timestamp
        updateCurrentTimestamp(); // Initial update
        setInterval(updateCurrentTimestamp, 1000); // Update every second
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const updateCurrentTimestamp = () => {
    const currentDate = new Date();
    const currentTimestampOptions = {
      timeZone: 'Asia/Jakarta',
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    };
    const formattedCurrentTimestamp = new Intl.DateTimeFormat('id-ID', currentTimestampOptions).format(currentDate);
    setCurrentTimestamp(formattedCurrentTimestamp);
  };

  return (
    <div style={{ width: '100%', overflowX: 'auto' }}>
      {/* Display current timestamp above the cards */}
      <div style={{ textAlign: 'center', marginBottom: '16px', width: '100%' }}>
        <p>Tanggal dan Waktu Terkini: {currentTimestamp}</p>
      </div>
      <div style={{ display: 'flex', flexWrap: 'nowrap', padding: '16px' }}>
        {produkList.map((produk) => (
          <div key={produk.id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '16px', margin: '0 16px', minWidth: '200px' }}>
            {/* Display the timestamp of the product */}
            <p style={{ fontSize: '12px', marginBottom: '8px' }}>Tanggal Terbit Penjualan: {produk.timestamp}</p>

            <h3>{produk.productName}</h3>
            <p>{produk.description}</p>
            <p>Quantity: {produk.quantity}</p>
            <p>Price: {produk.price}</p>
            {produk.image && (
              <img
                src={produk.image}
                alt={produk.productName}
                style={{ width: '100%', height: '150px', objectFit: 'cover', marginBottom: '8px' }}
              />
            )}
            <p>Location: {produk.location}</p>
            <p>WhatsApp: {produk.whatsapp}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Produk;
