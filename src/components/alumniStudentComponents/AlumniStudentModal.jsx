import React, { useState, useEffect } from 'react';
import DetailsCard from './DetailsCard';
import './css/ModalStyle.css';

const AlumniStudentModal = ({
  students,
  setStudents,
  student,
  open,
  onClose,
}) => {
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
      style={{
        backdropFilter: 'blur(5px)',
        WebkitBackdropFilter: 'blur(5px)',
      }}
    >
      {/* Background Blur */}
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose} />
      <DetailsCard
        students={students}
        setStudents={setStudents}
        student={student}
        onClose={() => {
          onClose();
          setShowStudent(true); // Reset to show student details on close
        }}
      />
    </div>
  );
};

export default AlumniStudentModal;
