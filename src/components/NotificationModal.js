// NotificationModal.js
import React from 'react';
import Modal from 'react-modal';

const NotificationModal = ({ isOpen, onRequestClose, onAllowNotification }) => {
  const handleAllowNotification = () => {
    onAllowNotification();
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        overlay: {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(128, 128, 128, 0.5)',
        },
        content: {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: '#fff',
          border: '1px solid #ccc',
          borderRadius: '5px',
          padding: '20px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          maxWidth: '400px',
          width: '100%',
          height: '510px',
        },
      }}
    >
      <h2 style={{ textAlign: 'center', color: '#333' }}>Izinkan Notifikasi</h2>
      <p style={{ color: '#333', marginBottom: '20px' }}>
        Pada perangkat mobile, Anda akan melihat popup di bagian atas layar untuk mengatur notifikasi.
        <ol>
          <li>Klik ikon pengaturan</li>
          <li>Klik izinkan notifikasi untuk situs ini</li>
        </ol>
        Dengan mengaktifkan notifikasi, Anda akan mendapatkan informasi terbaru dari Medical Hub. Terima kasih!
      </p>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button
          onClick={handleAllowNotification}
          style={{
            backgroundColor: '#28a745',
            color: '#fff',
            fontSize: '16px',
            padding: '10px 20px',
            borderRadius: '5px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            cursor: 'pointer',
            border: 'none',
          }}
        >
          Oke!
        </button>
      </div>
    </Modal>
  );
};

export default NotificationModal;
