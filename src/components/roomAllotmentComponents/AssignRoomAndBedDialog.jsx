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

const AssignRoomAndBedDialog = ({
  roomAllotment,
  setRoomAllotment,
  selectedOption,
  setSelectedOption,
  fetchRooms,
  bed,
  open,
  setSelectedBed,
  onClose,
}) => {
  const [pinNumber, setPinNumber] = useState('');
  const [errors, setErrors] = useState({ pinNumber: '' });
  const [loading, setLoading] = useState(false);

  const validateInputs = () => {
    const newErrors = {
      pinNumber: '',
    };

    if (!pinNumber.trim()) {
      newErrors.pinNumber = 'Pin Number is required.';
    } else if (isNaN(pinNumber)) {
      newErrors.pinNumber = 'Pin Number must be a number.';
    }

    setErrors(newErrors);

    // Return true if no errors
    return !newErrors.pinNumber;
  };

  const handleSubmit = async () => {
    if (validateInputs()) {
      // onSubmit({ roomNumber, pinNumber });
      try {
        setLoading(true);
        const assignRoomAndBedBody = {
          pin_number: pinNumber,
          room_number: bed.room_number,
          bed_number: bed.bed_number,
          category: selectedOption,
        };
        const response = await axios.post(
          `${VITE_BACKEND_BASE_API}/roomAllotment/assignRoom`,
          assignRoomAndBedBody,
        );
        if (response.status === 201) {
          toast.success(`Bed ${bed.bed_number} Allotted to PIN ${pinNumber} `);
          const student = await axios.get(
            `${VITE_BACKEND_BASE_API}/student/getStudentDetails`,
            {
              params: { pin_number: pinNumber },
            },
          );
          // console.log(student);
          setSelectedBed({
            ...bed,
            pin_number: pinNumber,
            student_full_name: student.data.data[0].student_full_name,
          });
          fetchRooms();
        } else {
          toast.error('Error Try Again');
        }
      } catch (error) {
        console.log('error Assigning bed:', error);
        toast.error('Error Try Again');
      } finally {
        setPinNumber('');
        setErrors({ pinNumber: '' });
        setLoading(false);
        onClose();
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Bed Allotment</DialogTitle>
      <DialogContent>
        <div className="flex flex-col gap-4 mt-2">
          <TextField
            label="Pin Number"
            // type="number"
            variant="outlined"
            value={pinNumber}
            onChange={(e) => setPinNumber(e.target.value)}
            error={!!errors.pinNumber}
            helperText={errors.pinNumber}
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

export default AssignRoomAndBedDialog;
