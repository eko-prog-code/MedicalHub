import React, { useState } from "react";
import axios from "axios";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
import Modal from "react-modal";
import { useDropzone } from "react-dropzone";
import "./MedTradeHub.css";
import { Button } from 'primereact/button';
import 'primereact/resources/themes/saga-green/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEqwh3TdjKpZdpBLVzzuaHLqu214ltdfE",
  authDomain: "medicalhub-2023.firebaseapp.com",
  databaseURL:
    "https://medicalhub-2023-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "medicalhub-2023",
  storageBucket: "medicalhub-2023.appspot.com",
  messagingSenderId: "510576093403",
  appId: "1:510576093403:web:2cd7c3bbf93748e4d2c4fe",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

Modal.setAppElement("#root"); // Set the root element for the modal

const MedTradeHub = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [location, setLocation] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [sellerName, setSellerName] = useState(""); // Tambahkan state untuk nama seller

  const onDrop = async (acceptedFiles) => {
    try {
      const uploadPromises = acceptedFiles.map(async (file) => {
        const timestamp = new Date().getTime();
        const storageRef = ref(
          getStorage(app),
          `TradeHubImages/${timestamp}_${file.name}`
        );

        // Mengunggah file ke Firebase Storage
        await uploadBytes(storageRef, file);

        // Dapatkan URL gambar yang diunggah
        const imageUrl = await getDownloadURL(storageRef);

        // Memperbarui state dengan URL gambar yang diunggah
        setImage(imageUrl);
      });

      await Promise.all(uploadPromises);
    } catch (error) {
      console.error("Error saat mengunggah file:", error);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: false,
  });

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleProductNameChange = (e) => {
    setProductName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleWhatsappChange = (e) => {
    setWhatsapp(e.target.value);
  };

  const handleSellerNameChange = (e) => {
    setSellerName(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const currentDate = new Date();

      // Mendapatkan tanggal dan waktu di zona waktu Indonesia
      const timestampOptions = {
        timeZone: 'Asia/Jakarta', // Zona waktu Indonesia
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      };

      const formattedTimestamp = new Intl.DateTimeFormat('id-ID', timestampOptions).format(currentDate);

      console.log("Mengirimkan data:", {
        productName,
        description,
        quantity,
        price,
        image,
        location,
        whatsapp,
        sellerName, // Tambahkan nama seller ke data yang dikirim
        timestamp: formattedTimestamp,
      });

      const dataToSend = {
        productName,
        description,
        quantity,
        price,
        image,
        location,
        whatsapp,
        sellerName, // Tambahkan nama seller ke data yang dikirim
        timestamp: formattedTimestamp,
      };

      console.log("Data yang akan dikirim ke Firebase:", dataToSend);

      await axios.post(
        "https://medicalhub-2023-default-rtdb.europe-west1.firebasedatabase.app/MedTradeHub.json",
        dataToSend
      );

      console.log("Data berhasil dikirim");

      // Show popup
      alert("Produk Anda sudah di-Publish!");

      // Reset form fields
      setProductName("");
      setDescription("");
      setQuantity("");
      setPrice("");
      setImage("");
      setLocation("");
      setWhatsapp("");
      setSellerName(""); // Reset nama seller

      // Close the modal after submission
      closeModal();
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };


  return (
    <div className="unique-new-treatment-container">
      <h4 className="unique-new-treatment-heading">E-Commerce Nakes Indonesia</h4>
      <div className="unique-form-container">
        {modalIsOpen ? (
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Example Modal"
          >
            <div className="unique-data-pengobatan">
              <button className="close-modal-button" onClick={closeModal}>
                X
              </button>
              <h3>Nama Produk</h3>
              <input
                type="text"
                value={productName}
                onChange={handleProductNameChange}
                className="unique-input-field"
              />
              <h3>Deskripsi</h3>
              <input
                type="text"
                value={description}
                onChange={handleDescriptionChange}
                className="unique-input-field"
              />
              <h3>Jumlah</h3>
              <input
                type="text"
                value={quantity}
                onChange={handleQuantityChange}
                className="unique-input-field"
              />
              <h3>Harga</h3>
              <input
                type="text"
                value={price}
                onChange={handlePriceChange}
                className="unique-input-field"
              />
              <div {...getRootProps()} className="unique-dropzone">
                <input {...getInputProps()} />
                <p>
                  Drag 'n' drop sebuah gambar di sini, atau klik untuk memilih
                  gambar
                </p>
              </div>
              {image && (
                <div>
                  <h3>Preview Gambar</h3>
                  <img
                    src={image}
                    alt="Uploaded"
                    className="unique-uploaded-image"
                  />
                </div>
              )}
              <h3>Nama Seller</h3>
              <input
                type="text"
                value={sellerName}
                onChange={handleSellerNameChange}
                className="unique-input-field"
              />
              <h3>Lokasi</h3>
              <input
                type="text"
                value={location}
                onChange={handleLocationChange}
                className="unique-input-field"
              />
              <h3>WhatsApp</h3>
              <input
                type="text"
                value={whatsapp}
                onChange={handleWhatsappChange}
                className="unique-input-field"
              />
              <div className="unique-data-pengobatan">
                {/* ... other form input fields and content */}
                <button onClick={handleSubmit} className="unique-submit-button rounded-button">
                  Submit
                </button>
              </div>
            </div>
          </Modal>
        ) : (
          <Button style={{ backgroundColor: '#4c5fd7', color: '#ffffff' }} onClick={openModal}>
            Jual Produk
          </Button>
        )}
      </div>
    </div>
  );
};

export default MedTradeHub;