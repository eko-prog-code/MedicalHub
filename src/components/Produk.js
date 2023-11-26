import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Produk.css';

const Produk = () => {
  const [produkList, setProdukList] = useState([]);
  const [currentTimestamp, setCurrentTimestamp] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');

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

  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const filteredProdukList = produkList.filter((produk) =>
    produk.productName.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <div>
      {/* Search form */}
      <div style={{ textAlign: 'center', marginBottom: '16px', width: '100%' }}>
        <input
          type="text"
          placeholder="Search by Product Name"
          value={searchKeyword}
          onChange={handleSearchChange}
        />
      </div>

      {/* Display current timestamp above the cards */}
      <div style={{ textAlign: 'center', marginBottom: '16px', width: '100%' }}>
        <p>Tanggal dan Waktu Terkini: {currentTimestamp}</p>
      </div>

      {/* Product cards */}
      <div className="produk-container">
        {filteredProdukList.map((produk) => (
          <div key={produk.id} className="produk-card">
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
