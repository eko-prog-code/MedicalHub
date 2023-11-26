// SkillShareCard.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './SkillShareCard.css';

const SkillShareCard = () => {
  const [skillShareList, setSkillShareList] = useState([]);
  const [currentTimestamp, setCurrentTimestamp] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedSkillShare, setSelectedSkillShare] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://medicalhub-2023-default-rtdb.europe-west1.firebasedatabase.app/SkillNakesShare.json');
        const skillShareArray = Object.keys(response.data).map((key) => ({
          id: key,
          ...response.data[key],
        }));

        setSkillShareList(skillShareArray.reverse());
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

  const openImageModal = (skillShare) => {
    setSelectedSkillShare(skillShare);
  };

  const closeImageModal = () => {
    setSelectedSkillShare(null);
  };

  const filteredSkillShareList = skillShareList.filter((skillShare) =>
    skillShare.NamaEvent.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '16px', width: '100%' }}>
        <input
          type="text"
          placeholder="Search by Event Name"
          value={searchKeyword}
          onChange={handleSearchChange}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '16px', width: '100%' }}>
        <p>Tanggal dan Waktu Terkini: {currentTimestamp}</p>
      </div>

      <div className="skill-share-card-container">
        {filteredSkillShareList.map((skillShare) => (
          <div key={skillShare.id} className="skill-share-card">
            <p style={{ fontSize: '12px', marginBottom: '8px' }}>Tanggal Pelaksanaan: {skillShare.tanggalPelaksanaan}</p>
            <h3>{skillShare.NamaEvent}</h3>
            <p>
              Kontak WhatsApp: {skillShare.kontakWhatsapp}
            </p>
            {skillShare.image && (
              <img
                src={skillShare.image}
                alt={skillShare.NamaEvent}
                style={{ width: '80%', height: '200px', objectFit: 'cover', marginBottom: '8px', cursor: 'pointer' }}
                onClick={() => openImageModal(skillShare)}
              />
            )}
          </div>
        ))}
      </div>

      {/* Image Modal */}
      <Modal
        isOpen={selectedSkillShare !== null}
        onRequestClose={closeImageModal}
        contentLabel="Image Modal"
      >
        {selectedSkillShare && (
          <div>
            <h2>{selectedSkillShare.NamaEvent}</h2>
            <img
              src={selectedSkillShare.image}
              alt={selectedSkillShare.NamaEvent}
              style={{ width: '100%', height: 'auto' }}
            />
            <button onClick={closeImageModal}>Close</button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default SkillShareCard;
