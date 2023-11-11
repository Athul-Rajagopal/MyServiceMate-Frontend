import React, { useState } from 'react';

function PhoneNumberModal({ isOpen, onClose, onSave }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleSave = () => {
    if (validatePhoneNumber(phoneNumber)) {
      onSave(phoneNumber);
      onClose();
    } else {
      setIsValid(false);
    }
  };

  const validatePhoneNumber = (number) => {
    // Simple validation: Check if the phone number consists of 10 digits
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(number);
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
            onChange={(e) => {
              setPhoneNumber(e.target.value);
              setIsValid(true); // Reset validation when the input changes
            }}
            className={`border ${isValid ? '' : 'border-red-500'}`}
          />
          {!isValid && <p className="text-red-500 text-sm">Please enter a valid phone number (10 digits).</p>}
        </div>
        <button className='ml-2 bg-blue-300 border-round' onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}

export default PhoneNumberModal;
