import React, { useState, useEffect } from 'react';
// import DetailsCard from './DetailsCard';
import ReactorDetailsCard from './RectorDetailsCard';
import './css/ModalStyle.css';

const RectorModal = ({ rectors, setRectors, rector, open, onClose }) => {
  const [showRector, setShowRector] = useState(true);
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
      <ReactorDetailsCard
        rectors={rectors}
        setRectors={setRectors}
        rector={rector}
        onClose={() => {
          onClose();
          setShowRector(true); // Reset to show rector details on close
        }}
      />
    </div>
  );
};

export default RectorModal;
