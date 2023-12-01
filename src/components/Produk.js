// Produk.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TermModal from './TermModal';
import Modal from 'react-modal'; // Update the import statement
import './Produk.css';

const Produk = () => {
  const [produkList, setProdukList] = useState([]);
  const [currentTimestamp, setCurrentTimestamp] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedProduk, setSelectedProduk] = useState(null);
  const [isImageModalOpen, setImageModalOpen] = useState(false);  // Rename to isModalOpen
  const [imageUrl, setImageUrl] = useState('');  // Add a state for imageUrl
  const [productName, setProductName] = useState('');  // Add a state for productName

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://medicalhub-2023-default-rtdb.europe-west1.firebasedatabase.app/MedTradeHub.json');
        const produkArray = Object.keys(response.data).map((key) => ({
          id: key,
          ...response.data[key],
        }));

        setProdukList(produkArray.reverse());
        updateCurrentTimestamp();
        setInterval(updateCurrentTimestamp, 1000);
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

  const openModal = (produk) => {
    setSelectedProduk(produk);
  };

  const closeModal = () => {
    setSelectedProduk(null);
  };

  const openImageModal = () => {
    setImageModalOpen(true);
  };

  const closeImageModal = () => {
    setImageModalOpen(false);
  };

  const filteredProdukList = produkList.filter((produk) =>
    produk.productName.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '16px', width: '100%' }}>
        <input
          type="text"
          placeholder="Search by Product Name"
          value={searchKeyword}
          onChange={handleSearchChange}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '16px', width: '100%' }}>
        <p>Tanggal dan Waktu Terkini: {currentTimestamp}</p>
      </div>

      <div className="produk-container">
        {filteredProdukList.map((produk) => (
          <div key={produk.id} className="produk-card">
            <p style={{ fontSize: '12px', marginBottom: '8px' }}>Tanggal Terbit Penjualan: {produk.timestamp}</p>
            <h3>{produk.productName}</h3>
            <p>{produk.description}</p>
            <p>Quantity: {produk.quantity}</p>
            <p>Price: {produk.price}</p>
            {produk.image && (
              <img
                src={produk.image}
                alt={produk.productName}
                style={{ width: '80%', height: '200px', objectFit: 'cover', marginBottom: '8px', cursor: 'pointer' }}
                onClick={() => {
                  openImageModal();
                  setSelectedProduk(produk);
                  setImageUrl(produk.image);  // Set imageUrl state
                  setProductName(produk.productName);  // Set productName state
                }}
              />
            )}
            <p>Seller: {produk.sellerName}</p>
            <p>Location: {produk.location}</p>
            <p>WhatsApp: {produk.whatsapp}</p>
            <button className="term-button" onClick={() => openModal(produk)}>
              Term & Condition
            </button>
          </div>
        ))}
      </div>

      <TermModal isOpen={selectedProduk !== null} closeModal={closeModal} />
      <Modal
        isOpen={isImageModalOpen}
        onRequestClose={closeImageModal}
        contentLabel="Image Modal"
        className="modal"
        overlayClassName="overlay"
      >
        <div className="card">
          <p>Image Modal Content</p>
          {/* Display the image and product name */}
          {imageUrl && (
            <img
              src={imageUrl}
              alt={productName}
              style={{ width: '100%', height: 'auto' }}
            />
          )}
          {/* ... (other content) */}
          <button
            onClick={closeImageModal}
            style={{
              backgroundColor: 'red',
              color: 'white',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            }}
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Produk;
