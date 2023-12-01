// NakesSkillShare.js

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
import dayjs from 'dayjs';

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

const NakesSkillShare = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [NamaEvent, setNamaEvent] = useState("");
  const [image, setImage] = useState("");
  const [tanggalPelaksanaan, setTanggalPelaksanaan] = useState("");
  const [kontakWhatsapp, setKontakWhatsapp] = useState("");

  const onDrop = async (acceptedFiles) => {
    try {
      const uploadPromises = acceptedFiles.map(async (file) => {
        const timestamp = new Date().getTime();
        const storageRef = ref(
          getStorage(app),
          `NakesSkillShareImages/${timestamp}_${file.name}`
        );

        await uploadBytes(storageRef, file);

        const imageUrl = await getDownloadURL(storageRef);

        setImage(imageUrl);
      });

      await Promise.all(uploadPromises);
    } catch (error) {
      console.error("Error saat mengunggah file:", error);
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleNamaEventChange = (e) => {
    setNamaEvent(e.target.value);
  };

  const handleTanggalPelaksanaanChange = (date) => {
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    setTanggalPelaksanaan(formattedDate);
  };

  const handleKontakWhatsappChange = (e) => {
    setKontakWhatsapp(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const currentDate = new Date();
      const timestampOptions = {
        timeZone: 'Asia/Jakarta',
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      };
      const formattedTimestamp = new Intl.DateTimeFormat('id-ID', timestampOptions).format(currentDate);

      const dataToSend = {
        NamaEvent,
        image,
        tanggalPelaksanaan,
        kontakWhatsapp,
        timestamp: formattedTimestamp,
      };

      await axios.post(
        "https://medicalhub-2023-default-rtdb.europe-west1.firebasedatabase.app/SkillNakesShare.json",
        dataToSend
      );

      console.log("Data berhasil dikirim");

      alert("Event Anda sudah di-Publish!");

      setNamaEvent("");
      setImage("");
      setTanggalPelaksanaan("");
      setKontakWhatsapp("");

      closeModal();
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: false,
  });

  return (
    <div className="unique-new-treatment-container">
      <h4 className="unique-new-treatment-heading">Nakes Skill Share Info</h4>
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
              <h3>Nama Event</h3>
              <input
                type="text"
                value={NamaEvent}
                onChange={handleNamaEventChange}
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
              <h3>Tanggal Pelaksanaan</h3>
              <input
                type="date"
                value={tanggalPelaksanaan}
                onChange={(e) => handleTanggalPelaksanaanChange(e.target.value)}
                className="unique-input-field"
              />
              <h3>Kontak WhatsApp Pendaftaran</h3>
              <input
                type="text"
                value={kontakWhatsapp}
                onChange={handleKontakWhatsappChange}
                className="unique-input-field"
              />
              <div className="unique-data-pengobatan">
                <button onClick={handleSubmit} className="unique-submit-button rounded-button">
                  Submit
                </button>
              </div>
            </div>
          </Modal>
        ) : (
          <Button style={{ backgroundColor: '#3498db', color: '#ffffff' }} onClick={openModal}>
            Publish Info Nakes Skill Share
          </Button>
        )}
      </div>
    </div>
  );
};

export default NakesSkillShare;
