import React, { useState } from 'react';
import Modal from 'react-modal';
import './Term.css';

Modal.setAppElement('#root'); // Untuk menghindari a11y error

function App() {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="container">
      <div className="button-container">
        <button className="button" onClick={openModal}>
          Syarat & Ketentuan
        </button>
      </div>

      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        className="modal"
        overlayClassName="overlay"
      >
        <div className="modal-content">
          <span className="close-button" onClick={closeModal}>
            &times;
          </span>
          <h2>Syarat dan Ketentuan Pengguna Medical Hub:</h2>
          <ol>
            <li>Penjual harus memposting produk dengan biodata yang akurat dan valid. Informasi yang tidak benar tidak diizinkan.</li>
            <li>Medical Hub dan PT.InnoView Indo Tech tidak bertanggung jawab atas kecurangan antara penjual dan pembeli. Platform ini hanya sebagai media informasi dan tidak terlibat dalam konflik perdata jual beli.</li>
            <li>Transaksi melibatkan Medical Hub harus mengikuti prosedur resmi dari PT.InnoView Indo Tech. Penjual dan pembeli diharapkan mengisi formulir transaksi secara lengkap. Untuk informasi lebih lanjut, hubungi: 0895600394345.</li>
          </ol>
          <p>Harap memilih opsi 2 atau 3 dalam bertransaksi sesuai preferensi Anda. Penting untuk mengisi biodata dengan benar sesuai dengan poin 1.</p>
          <p>Terima kasih atas perhatiannya.</p>
          <p>Syarat dan Ketentuan ini berlaku sesuai Undang-Undang di negara Indonesia.</p>
        </div>
      </Modal>
    </div>
  );
}

export default App;
