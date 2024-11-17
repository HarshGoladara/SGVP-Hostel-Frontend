import React, { useState, useEffect } from 'react';
import DetailsCard from './DetailsCard';
import './css/ModalStyle.css';

const StudentModal = ({ student, open, onClose }) => {
  const [showStudent, setShowStudent] = useState(true);
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
    >
      {/* Background Blur */}
      <div
        className="fixed inset-0 bg-black opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />
      <DetailsCard
        student={student}
        onClose={() => {
          onClose();
          setShowStudent(true); // Reset to show student details on close
        }}
      />
    </div>
  );
};

export default StudentModal;
