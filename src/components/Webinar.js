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

const Webinar = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [JudulWebinar, setJudulWebinar] = useState("");
  const [image, setImage] = useState("");
  const [urlWebinar, setUrlWebinar] = useState("");
  const [Skp, setSkp] = useState("");

  const onDrop = async (acceptedFiles) => {
    try {
      const uploadPromises = acceptedFiles.map(async (file) => {
        const timestamp = new Date().getTime();
        const storageRef = ref(
          getStorage(app),
          `WebinarImages/${timestamp}_${file.name}`
        ); // Updated path to WebinarImages

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

  const handleJudulWebinarChange = (e) => {
    setJudulWebinar(e.target.value);
  };

  const handleSkpChange = (e) => {
    setSkp(e.target.value);
  };

  const handleUrlWebinarChange = (e) => {
    setUrlWebinar(e.target.value);
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
        JudulWebinar,
        image,
        Skp,
        urlWebinar,
        timestamp: formattedTimestamp,
      });

      const dataToSend = {
        JudulWebinar,
        image,
        Skp,
        urlWebinar,
        timestamp: formattedTimestamp,
      };

      console.log("Data yang akan dikirim ke Firebase:", dataToSend);

      await axios.post(
        "https://medicalhub-2023-default-rtdb.europe-west1.firebasedatabase.app/Webinar.json", // Update the endpoint URL
        dataToSend
      );

      console.log("Data berhasil dikirim");

      // Show popup
      alert("Webinar Anda sudah di-Publish!");

      // Reset form fields
      setJudulWebinar("");
      setImage("");
      setSkp("");
      setUrlWebinar("");

      // Close the modal after submission
      closeModal();
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };

  return (
    <div className="unique-new-treatment-container">
      <h4 className="unique-new-treatment-heading">Webinar SKP Info</h4>
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
              <h3>Judul Webinar</h3>
              <input
                type="text"
                value={JudulWebinar}
                onChange={handleJudulWebinarChange}
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
              <h3>SKP</h3>
              <input
                type="text"
                value={Skp}
                onChange={handleSkpChange}
                className="unique-input-field"
              />
              <h3>URL Webinar</h3>
              <input
                type="text"
                value={urlWebinar}
                onChange={handleUrlWebinarChange}
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
          <Button className="p-button-success" onClick={openModal}>
            Publish Info Webinar
          </Button>
        )}
      </div>
    </div>
  );
};

export default Webinar;
