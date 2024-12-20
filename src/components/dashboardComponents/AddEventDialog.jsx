import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from '@mui/material';
import axios from 'axios';
import { VITE_BACKEND_BASE_API } from '../../helper/envConfig/envConfig';
import toast from 'react-hot-toast';
import { CircularProgress } from '@mui/material';
import { useState } from 'react';

const AddEventDialog = ({
  modalOpen,
  setModalOpen,
  newEvent,
  handleInputChange,
  setEvents,
}) => {
  const [loading, setLoading] = useState(false); // Loading state

  const handleSubmit = async () => {
    setLoading(true);
    // Assuming you want to post the event to the server
    try {
      const response = await axios.post(
        `${VITE_BACKEND_BASE_API}/dashboard/addEvent`,
        {
          event_date: newEvent.date,
          description: newEvent.title,
        },
      );
      if (response.status === 201) {
        toast.success('Event added successfully!');
        setEvents((prevEvents) => [
          ...prevEvents,
          {
            event_id: response.data.event_id,
            date: new Date(newEvent.date)
              .toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              })
              .split('/')
              .reverse()
              .join('-'),
            title: newEvent.title,
          },
        ]);
        setModalOpen(false); // Close modal after successful submission
      } else {
        toast.error('Error adding event');
      }
    } catch (error) {
      console.log(error);
      toast.error('Error adding event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Button to open the modal */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => setModalOpen(true)}
      >
        Add Event
      </Button>

      {/* Modal for adding event */}
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
        <DialogTitle>Add New Event</DialogTitle>
        <DialogContent>
          <TextField
            label="Event Title"
            name="title"
            value={newEvent.title}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Event Date"
            type="date"
            name="date"
            value={newEvent.date}
            onChange={handleInputChange}
            slotProps={{
              inputLabel: { shrink: true },
            }}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {loading ? (
              <CircularProgress size={24} sx={{ color: 'primary' }} />
            ) : (
              'Add Event'
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default AddEventDialog;
