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
        },
      }}
    >
      <h2 style={{ textAlign: 'center', color: '#333' }}>Allow Notifications</h2>
      <p style={{ color: '#555' }}>
        This website would like to send you notifications. Do you want to allow?
      </p>
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <button
          onClick={handleAllowNotification}
          style={{
            backgroundColor: '#28a745', // Green color for Allow button
            color: '#fff', // White text color
            fontSize: '16px', // Larger font size
            padding: '10px 20px', // Padding for the button
            borderRadius: '5px', // Rounded corners
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', // Box shadow
            cursor: 'pointer', // Change cursor on hover
            border: 'none', // Remove default border
          }}
        >
          Allow
        </button>
        <button
          onClick={onRequestClose}
          style={{
            backgroundColor: '#dc3545', // Red color for Deny button
            color: '#fff', // White text color
            fontSize: '16px', // Larger font size
            padding: '10px 20px', // Padding for the button
            borderRadius: '5px', // Rounded corners
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', // Box shadow
            cursor: 'pointer', // Change cursor on hover
            border: 'none', // Remove default border
          }}
        >
          Deny
        </button>
      </div>
    </Modal>
  );
};

export default NotificationModal;
