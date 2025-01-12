import * as React from 'react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { useState, useEffect } from 'react';

export default function BirthdayModal({
  birthdayModalOpen,
  setBirthdayModalOpen,
  birthdayStudents,
}) {
  const [isVisible, setIsVisible] = useState(birthdayModalOpen);

  useEffect(() => {
    if (birthdayModalOpen) {
      setIsVisible(true);
    } else {
      // Delay hiding the modal until the animation is finished
      const timeoutId = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timeoutId);
    }
  }, [birthdayModalOpen]);

  if (!isVisible) return null;
  return (
    <React.Fragment>
      <div
        className={`fixed inset-0 flex items-center justify-center z-50 ${birthdayModalOpen ? 'card-enter' : 'card-exit'}`}
        style={{
          backdropFilter: 'blur(5px)',
          WebkitBackdropFilter: 'blur(5px)',
        }}
      >
        {/* Background Blur */}
        <div className="fixed inset-0 bg-black opacity-50" />
        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
          open={birthdayModalOpen}
          onClose={() => setBirthdayModalOpen(false)}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Sheet
            variant="outlined"
            sx={{ maxWidth: 500, borderRadius: 'md', p: 3, boxShadow: 'lg' }}
          >
            <ModalClose variant="plain" />
            <Typography
              component="h2"
              id="modal-title"
              level="h4"
              textColor="inherit"
              sx={{
                fontWeight: 'lg',
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                paddingRight: 4,
              }}
            >
              🎉 Birthday Celebration 🎂
            </Typography>
            <div
              style={{
                maxHeight: '50vh', // Restrict the scrollable area height
                overflowY: 'auto', // Enable vertical scrolling
              }}
            >
              {birthdayStudents.length > 0 ? (
                <div className="birthday-list">
                  {birthdayStudents.map((student) => (
                    <div
                      key={student.pin_number}
                      className="flex items-center p-3 mb-2 bg-blue-100 rounded-lg shadow"
                      style={{ gap: '16px' }}
                    >
                      <div>
                        <Typography
                          level="body1"
                          textColor="inherit"
                          sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}
                        >
                          {student.student_full_name}
                        </Typography>
                        <Typography level="body2" textColor="text.secondary">
                          PIN: {student.pin_number}
                        </Typography>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <Typography textColor="text.tertiary">
                  No birthdays found today. 🎂
                </Typography>
              )}
            </div>
          </Sheet>
        </Modal>
      </div>
    </React.Fragment>
  );
}
