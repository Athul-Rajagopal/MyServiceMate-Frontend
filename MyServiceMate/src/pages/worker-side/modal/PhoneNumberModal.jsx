import React, { useState } from 'react';

function PhoneNumberModal({ isOpen, onClose, onSave }) {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSave = () => {
    onSave(phoneNumber);
  };

  return (
    <div className={`modal ${isOpen ? 'visible' : 'hidden'} bg-blue-200 w-80 h-20`}>
      <div className="modal-content ml-5">
        <h2>Enter Phone Number</h2>
        <div className=''>
        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          
        />
        </div>
        <button className='ml-2 bg-blue-300 border-round' onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}

export default PhoneNumberModal;
