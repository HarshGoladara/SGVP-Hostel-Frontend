import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import toast from 'react-hot-toast';
import axios from 'axios';
import { VITE_BACKEND_BASE_API } from '../../helper/envConfig/envConfig';
import { CircularProgress } from '@mui/material';

const AddRoomDialog = ({
  roomAllotment,
  setRoomAllotment,
  selectedOption,
  setSelectedOption,
  open,
  onClose,
  fetchRooms,
}) => {
  const [roomNumber, setRoomNumber] = useState('');
  const [bedNumber, setBedNumber] = useState('');
  const [errors, setErrors] = useState({ roomNumber: '', bedNumber: '' });
  const [loading, setLoading] = useState(false);

  const validateInputs = () => {
    const newErrors = {
      roomNumber: '',
      bedNumber: '',
    };

    if (!roomNumber.trim()) {
      newErrors.roomNumber = 'Room number is required.';
    } else if (isNaN(roomNumber)) {
      newErrors.roomNumber = 'Room number must be a number.';
    }

    if (!bedNumber.trim()) {
      newErrors.bedNumber = 'Bed Number is required.';
    } else if (isNaN(bedNumber)) {
      newErrors.bedNumber = 'Bed Number must be a number.';
    }

    setErrors(newErrors);

    // Return true if no errors
    return !newErrors.roomNumber && !newErrors.bedNumber;
  };

  const handleSubmit = async () => {
    if (validateInputs()) {
      // onSubmit({ roomNumber, bedNumber });
      try {
        setLoading(true);
        const addRoomBody = {
          room_number: roomNumber,
          bed_number: bedNumber,
          category: selectedOption,
        };
        const response = await axios.post(
          `${VITE_BACKEND_BASE_API}/roomAllotment/addRoom`,
          addRoomBody,
        );
        if (response.status === 201) {
          toast.success(`Room ${roomNumber} Added in ${selectedOption}`);
          fetchRooms();
        } else {
          toast.error('Error Try Again');
        }
      } catch (error) {
        console.log('error adding room:', error);
        toast.error('Error Try Again');
      } finally {
        setRoomNumber('');
        setBedNumber('');
        setErrors({ roomNumber: '', bedNumber: '' });
        setLoading(false);
        onClose();
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Room</DialogTitle>
      <DialogContent>
        <div className="flex flex-col gap-4 mt-2">
          <TextField
            label="Room Number"
            // type="number"
            variant="outlined"
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
            error={!!errors.roomNumber}
            helperText={errors.roomNumber}
            fullWidth
          />
          <TextField
            label="Bed Number"
            // type="number"
            variant="outlined"
            value={bedNumber}
            onChange={(e) => setBedNumber(e.target.value)}
            error={!!errors.bedNumber}
            helperText={errors.bedNumber}
            fullWidth
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          {loading ? <CircularProgress size={24} color="white" /> : 'Submit'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddRoomDialog;
