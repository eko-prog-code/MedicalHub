import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import NotificationModal from './../components/NotificationModal';
import { requestForToken, onMessageListener } from './firebase';

const Notification = () => {
  const [notification, setNotification] = useState({ title: '', body: '' });
  const [showModal, setShowModal] = useState(false);

  const notify = () => toast(<ToastDisplay />);

  function ToastDisplay() {
    return (
      <div>
        <p>
          <b>{notification?.title}</b>
        </p>
        <p>{notification?.body}</p>
      </div>
    );
  }

  const handleAllowNotification = () => {
    requestForToken();
    setShowModal(false);
  };

  useEffect(() => {
    // Automatically show the modal when the component mounts
    setShowModal(true);

    onMessageListener()
      .then((payload) => {
        setNotification({ title: payload?.notification?.title, body: payload?.notification?.body });
      })
      .catch((err) => console.log('failed: ', err));
  }, []); // Empty dependency array to run the effect only once when the component mounts

  useEffect(() => {
    if (notification?.title) {
      notify();
    }
  }, [notification]);

  return (
    <>
      <style>{`
        .custom-notification {
          background-color: #fff;
          border: 1px solid #ccc;
          padding: 10px;
          margin: 10px;
          border-radius: 5px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
      `}</style>

      <Toaster />

      <NotificationModal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        onAllowNotification={handleAllowNotification}
      />
    </>
  );
};

export default Notification;