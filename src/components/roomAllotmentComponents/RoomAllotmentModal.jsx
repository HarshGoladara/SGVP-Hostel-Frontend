import React, { useState, useEffect } from 'react';
import DetailsCard from './DetailsCard';
import './css/ModalStyle.css';

const RoomAllotmentModal = ({
  roomAllotment,
  setRoomAllotment,
  selectedOption,
  setSelectedOption,
  loading,
  isLoading,
  bed,
  open,
  onClose,
  fetchRooms,
}) => {
  const [showBed, setShowBed] = useState(true);
  const [isVisible, setIsVisible] = useState(open);

  useEffect(() => {
    if (open) {
      setIsVisible(true);
    } else {
      // Delay hiding the modal until the animation is finished
      const timeoutId = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timeoutId);
    }
  }, [open]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${open ? 'card-enter' : 'card-exit'}`}
      style={{
        backdropFilter: 'blur(5px)',
        WebkitBackdropFilter: 'blur(5px)',
      }}
    >
      {/* Background Blur */}
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose} />
      <DetailsCard
        roomAllotment={roomAllotment}
        setRoomAllotment={setRoomAllotment}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        loading={loading}
        isLoading={isLoading}
        bed={bed}
        fetchRooms={fetchRooms}
        onClose={() => {
          onClose();
          setShowBed(true); // Reset to show student details on close
        }}
      />
    </div>
  );
};

export default RoomAllotmentModal;
