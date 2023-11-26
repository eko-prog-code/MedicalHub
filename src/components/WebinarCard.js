import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal'; // Import the Modal component
import './WebinarCard.css';

const WebinarCard = () => {
  const [webinarList, setWebinarList] = useState([]);
  const [currentTimestamp, setCurrentTimestamp] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedWebinar, setSelectedWebinar] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://medicalhub-2023-default-rtdb.europe-west1.firebasedatabase.app/Webinar.json');
        const webinarArray = Object.keys(response.data).map((key) => ({
          id: key,
          ...response.data[key],
        }));

        setWebinarList(webinarArray.reverse());
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

  const openWebinarUrl = (url) => {
    window.open(url, '_blank');
  };

  const openImageModal = (webinar) => {
    setSelectedWebinar(webinar);
  };

  const closeImageModal = () => {
    setSelectedWebinar(null);
  };

  const filteredWebinarList = webinarList.filter((webinar) =>
    webinar.JudulWebinar.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '16px', width: '100%' }}>
        <input
          type="text"
          placeholder="Search by Webinar Title"
          value={searchKeyword}
          onChange={handleSearchChange}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '16px', width: '100%' }}>
        <p>Tanggal dan Waktu Terkini: {currentTimestamp}</p>
      </div>

      <div className="webinar-card-container">
        {filteredWebinarList.map((webinar) => (
          <div key={webinar.id} className="webinar-card">
            <p style={{ fontSize: '12px', marginBottom: '8px' }}>Tanggal Terbit Webinar: {webinar.timestamp}</p>
            <h3>{webinar.JudulWebinar}</h3>
            <p>SKP: {webinar.Skp}</p>
            <p>
              URL Webinar: 
              <button
                style={{ marginLeft: '5px', color: 'blue', cursor: 'pointer' }}
                onClick={() => openWebinarUrl(webinar.urlWebinar)}
              >
                Open Link
              </button>
            </p>
            {webinar.image && (
              <img
                src={webinar.image}
                alt={webinar.JudulWebinar}
                style={{ width: '80%', height: '200px', objectFit: 'cover', marginBottom: '8px', cursor: 'pointer' }}
                onClick={() => openImageModal(webinar)}
              />
            )}
          </div>
        ))}
      </div>

      {/* Image Modal */}
      <Modal
        isOpen={selectedWebinar !== null}
        onRequestClose={closeImageModal}
        contentLabel="Image Modal"
      >
        {selectedWebinar && (
          <div>
            <h2>{selectedWebinar.JudulWebinar}</h2>
            <img
              src={selectedWebinar.image}
              alt={selectedWebinar.JudulWebinar}
              style={{ width: '100%', height: 'auto' }}
            />
            <button onClick={closeImageModal}>Close</button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default WebinarCard;
