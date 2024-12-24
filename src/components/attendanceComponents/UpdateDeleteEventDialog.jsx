import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
  Tabs,
  Tab,
  IconButton,
} from '@mui/material';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { VITE_BACKEND_BASE_API } from '../../helper/envConfig/envConfig';
import toast from 'react-hot-toast';
import { useCookies } from 'react-cookie';
import { v4 as uuid } from 'uuid';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const UpdateDeleteEventDialog = ({
  events,
  setEvents,
  updateDeleteEvent,
  setUpdateDeleteEvent,
  isOpenUpdateDeleteDialog,
  setIsOpenUpdateDeleteDialog,
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();

  const [loading, setLoading] = useState(false); // Loading state
  const [tabValue, setTabValue] = useState(0); // Track active tab
  // const [cookies, setCookie] = useCookies(['token']);

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const onSubmit = async () => {
    try {
      setLoading(true); // Set loading to true while waiting for the API response
      let response;

      if (tabValue === 0) {
        response = await axios.put(
          `${VITE_BACKEND_BASE_API}/dashboard/updateEvent`,
          {
            event_id: updateDeleteEvent.event_id,
            description: updateDeleteEvent.title,
          },
        );
        if (response.status === 200) {
          const filteredEvents = events.filter(
            (evt) => evt.event_id !== updateDeleteEvent.event_id,
          );
          filteredEvents.push(updateDeleteEvent);
          setEvents(filteredEvents);
          setIsOpenUpdateDeleteDialog(false);
          toast.success('Event Updated Successfully');
        } else {
          toast.error('Error In Updating Event.');
        }
      } else {
        // console.log(updateDeleteEvent.event_id);
        response = await axios.delete(
          `${VITE_BACKEND_BASE_API}/dashboard/deleteEvent`,
          {
            params: {
              event_id: updateDeleteEvent.event_id,
            },
          },
        );
        if (response.status === 204) {
          const filteredEvents = events.filter(
            (evt) => evt.event_id !== updateDeleteEvent.event_id,
          );
          setEvents(filteredEvents);
          setIsOpenUpdateDeleteDialog(false);
          toast.success('Event Deleted Successfully');
        } else {
          toast.error('Error In Deleting Event.');
        }
      }
    } catch (error) {
      console.error('Error during login', error);
      toast.error('Error In Update/Delete Event.');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateDeleteEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  return (
    <Dialog
      open={isOpenUpdateDeleteDialog}
      onClose={() => setIsOpenUpdateDeleteDialog(false)}
    >
      <DialogContent>
        <IconButton
          sx={{ position: 'absolute', top: 16, right: 16 }}
          onClick={() => setIsOpenUpdateDeleteDialog(false)}
        >
          <CloseIcon />
        </IconButton>
        <Box
          sx={{
            width: '100%',
            maxWidth: '400px',
            padding: 4,
            borderRadius: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
          }}
        >
          {/* Tabs */}
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            sx={{ marginBottom: 2 }}
          >
            <Tab label="Update" />
            <Tab label="Delete" />
          </Tabs>

          {/* Form */}
          <Paper
            elevation={0}
            sx={{
              padding: 2,
              borderRadius: 1,
              background: 'none',
            }}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Email/Password Login */}
              {tabValue === 0 && (
                <>
                  {/* Email */}
                  <TextField
                    label="Event Title"
                    variant="outlined"
                    name="title"
                    fullWidth
                    value={updateDeleteEvent.title}
                    onChange={handleInputChange}
                    sx={{ marginBottom: 2 }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{
                      padding: '12px 0',
                      fontWeight: 'bold',
                    }}
                    disabled={loading}
                  >
                    {loading ? (
                      <CircularProgress size={24} sx={{ color: 'blue' }} />
                    ) : (
                      'Update Event Title'
                    )}
                  </Button>
                </>
              )}

              {/* Mobile Number Login */}
              {tabValue === 1 && (
                <>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{
                      padding: '12px 0',
                      fontWeight: 'bold',
                    }}
                    disabled={loading}
                  >
                    {loading ? (
                      <CircularProgress size={24} sx={{ color: 'blue' }} />
                    ) : (
                      'Delete Event'
                    )}
                  </Button>
                </>
              )}
            </form>
          </Paper>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateDeleteEventDialog;
