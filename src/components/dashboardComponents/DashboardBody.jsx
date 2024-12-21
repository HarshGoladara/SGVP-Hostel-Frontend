import React, { act, useEffect, useState } from 'react';
import axios from 'axios';
import { IconButton } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { VITE_BACKEND_BASE_API } from '../../helper/envConfig/envConfig.js';
import ActionDropdown from './ActionDropdown.jsx';
import toast from 'react-hot-toast';
import { CircularProgress } from '@mui/material';
import CustomCircularLoader from '../commonCustomComponents/CustomCircularLoader.jsx';
import HairballSpinner from '../commonCustomComponents/HairballSpinner.jsx';
import DashoboardModal from './DashboardModal.jsx';
import { Grid2, Card, CardContent, Typography, Button } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import EventNoteIcon from '@mui/icons-material/EventNote';
import GroupIcon from '@mui/icons-material/Group';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import PersonIcon from '@mui/icons-material/Person';
import { Divider } from '@mui/material';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Box } from '@mui/material';
import AddEventDialog from './AddEventDialog.jsx';
import UpdateDeleteEventDialog from './UpdateDeleteEventDialog.jsx';

const DashboardBody = ({}) => {
  const [noOfStudents, setNoOfStudents] = useState(null);
  const [noOfIncomingStudents, setNoOfIncomingStudents] = useState(null);
  const [noOfOutgoingStudents, setNoOfOutgoingStudents] = useState(null);
  const [noOfPendingAdmissions, setNoOfPendingAdmissions] = useState(null);
  const [noOfActiveGatepasses, setNoOfActiveGatepasses] = useState(null);
  const [noOfPendingEntries, setNoOfPendingEntries] = useState(null);
  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
  });
  const [isOpenUpdateDeleteDialog, setIsOpenUpdateDeleteDialog] =
    useState(false);
  const [updateDeleteEvent, setUpdateDeleteEvent] = useState({
    event_id: 0,
    date: '',
    title: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  useEffect(() => {
    const loadData = async () => {
      // load number of students
      try {
        const response = await axios.get(
          `${VITE_BACKEND_BASE_API}/dashboard/getTotalStudents`,
        );
        // console.log(response);
        if (response.status === 200) {
          setNoOfStudents(response.data.totalStudents);
        } else {
          toast.error('Error Loading no of students.');
        }
      } catch (error) {
        console.error(error);
        toast.error('Error Loading no of students.');
      }

      // load number of pending admission
      try {
        const response = await axios.get(
          `${VITE_BACKEND_BASE_API}/dashboard/getPendingAdmission`,
        );
        // console.log(response);
        if (response.status === 200) {
          setNoOfPendingAdmissions(
            response.data.total_pending_admission_request,
          );
        } else {
          toast.error('Error Loading no of pending admission.');
        }
      } catch (error) {
        console.error(error);
        toast.error('Error Loading no of pending admission.');
      }

      // load number of active gatepasses
      try {
        const response = await axios.get(
          `${VITE_BACKEND_BASE_API}/dashboard/getActiveGatepasses`,
        );
        // console.log(response);
        if (response.status === 200) {
          setNoOfActiveGatepasses(response.data.total_active_gatepasses);
        } else {
          toast.error('Error Loading no of active gatepasses');
        }
      } catch (error) {
        console.error(error);
        toast.error('Error Loading no of active gatepasses');
      }

      // load number of incoming students
      try {
        const response = await axios.get(
          `${VITE_BACKEND_BASE_API}/dashboard/getIncomingStudents`,
        );
        // console.log(response);
        if (response.status === 200) {
          setNoOfIncomingStudents(response.data.total_incoming_students);
        } else {
          toast.error('Error Loading no of Incoming students.');
        }
      } catch (error) {
        console.error(error);
        toast.error('Error Loading no of Incoming students.');
      }

      // load number of outgoing students
      try {
        const response = await axios.get(
          `${VITE_BACKEND_BASE_API}/dashboard/getOutgoingStudents`,
        );
        // console.log(response);
        if (response.status === 200) {
          setNoOfOutgoingStudents(response.data.total_outgoing_students);
        } else {
          toast.error('Error Loading no of Outgoing students.');
        }
      } catch (error) {
        console.error(error);
        toast.error('Error Loading no of Outgoing students.');
      }

      // load number of pending entries
      try {
        const response = await axios.get(
          `${VITE_BACKEND_BASE_API}/dashboard/getPendingEntries`,
        );
        // console.log(response);
        if (response.status === 200) {
          setNoOfPendingEntries(response.data.total_pending_entries);
        } else {
          toast.error('Error Loading no of pending entries');
        }
      } catch (error) {
        console.error(error);
        toast.error('Error Loading no of pending entries');
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    const loadEvents = async () => {
      // load events
      try {
        const response = await axios.get(
          `${VITE_BACKEND_BASE_API}/dashboard/getEventsList`,
        );
        // console.log(response);
        if (response.status === 200) {
          const events_list = response.data.events_list;
          const convertedEvents = events_list.map((event) => ({
            event_id: event.event_id,
            date: new Date(event.date)
              .toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              })
              .split('/')
              .reverse()
              .join('-'),
            title: event.title,
          }));
          setEvents(convertedEvents);
        } else {
          toast.error('Error Loading events');
        }
      } catch (error) {
        console.error(error);
        toast.error('Error Loading events');
      }
    };
    loadEvents();
  }, []);

  // Handle event click for deletion
  const handleEventClick = (clickInfo) => {
    // console.log(clickInfo.event._def.extendedProps.event_id);
    const eventId = clickInfo.event._def.extendedProps.event_id;

    const event = events.find((evt) => evt.event_id === eventId);

    setUpdateDeleteEvent(event);
    setIsOpenUpdateDeleteDialog(true);
  };

  return (
    <div className="bg-[#e2e8f0] flex-grow w-full h-full mt-2 rounded-xl">
      <div className="my-2 mx-5 grid grid-flow-col justify-stretch">
        <div className="flex flex-col">
          <Card sx={{ width: 250, height: 200 }}>
            <CardContent
              sx={{
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}
            >
              <GroupIcon fontSize="large" />
              <Typography variant="h6">Total Students</Typography>
              <Typography variant="h4" sx={{ marginTop: 1 }}>
                <Box
                  sx={{
                    marginTop: 1,
                    paddingX: 4,
                    paddingY: 1,
                    borderRadius: '25px',
                    backgroundColor: `${noOfStudents !== null ? '#2196f3' : ''}`, // Blue background
                    color: '#fff', // White text
                    display: 'inline-block',
                    textAlign: 'center',
                    fontSize: '1.5rem', // Adjust font size
                    minWidth: '50px', // Ensure oval shape
                  }}
                >
                  {noOfStudents !== null ? (
                    noOfStudents
                  ) : (
                    <CustomCircularLoader
                      size={50}
                      logoSrc="/images/logo.jpg"
                    />
                  )}
                </Box>
              </Typography>
            </CardContent>
          </Card>
        </div>
        <div className="flex flex-col">
          <Card sx={{ width: 250, height: 200 }}>
            <CardContent
              sx={{
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}
            >
              <PersonIcon fontSize="large" />
              <Typography variant="h6">Pending Admission Requests</Typography>
              <Typography variant="h4" sx={{ marginTop: 1 }}>
                <Box
                  sx={{
                    marginTop: 1,
                    paddingX: 4,
                    paddingY: 1,
                    borderRadius: '25px',
                    backgroundColor: `${noOfPendingAdmissions !== null ? '#2196f3' : ''}`, // Blue background
                    color: '#fff', // White text
                    display: 'inline-block',
                    textAlign: 'center',
                    fontSize: '1.5rem', // Adjust font size
                    minWidth: '50px', // Ensure oval shape
                  }}
                >
                  {noOfPendingAdmissions !== null ? (
                    noOfPendingAdmissions
                  ) : (
                    <CustomCircularLoader
                      size={50}
                      logoSrc="/images/logo.jpg"
                    />
                  )}
                </Box>
              </Typography>
            </CardContent>
          </Card>
        </div>
        <div className="flex flex-col">
          <Card sx={{ width: 250, height: 200 }}>
            <CardContent
              sx={{
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}
            >
              <ConfirmationNumberIcon fontSize="large" />
              <Typography variant="h6">Active Gatepasses</Typography>
              <Typography variant="h4" sx={{ marginTop: 1 }}>
                <Box
                  sx={{
                    marginTop: 1,
                    paddingX: 4,
                    paddingY: 1,
                    borderRadius: '25px',
                    backgroundColor: `${noOfActiveGatepasses !== null ? '#2196f3' : ''}`, // Blue background
                    color: '#fff', // White text
                    display: 'inline-block',
                    textAlign: 'center',
                    fontSize: '1.5rem', // Adjust font size
                    minWidth: '50px', // Ensure oval shape
                  }}
                >
                  {noOfActiveGatepasses !== null ? (
                    noOfActiveGatepasses
                  ) : (
                    <CustomCircularLoader
                      size={50}
                      logoSrc="/images/logo.jpg"
                    />
                  )}
                </Box>
              </Typography>
            </CardContent>
          </Card>
        </div>
        <div className="flex flex-col">
          <Card sx={{ width: 250, height: 200 }}>
            <CardContent
              sx={{
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}
            >
              <DirectionsWalkIcon fontSize="large" />
              <Typography variant="h6">No of Incoming Students</Typography>
              <Typography variant="h4" sx={{ marginTop: 1 }}>
                <Box
                  sx={{
                    marginTop: 1,
                    paddingX: 4,
                    paddingY: 1,
                    borderRadius: '25px',
                    backgroundColor: `${noOfIncomingStudents !== null ? '#2196f3' : ''}`, // Blue background
                    color: '#fff', // White text
                    display: 'inline-block',
                    textAlign: 'center',
                    fontSize: '1.5rem', // Adjust font size
                    minWidth: '50px', // Ensure oval shape
                  }}
                >
                  {noOfIncomingStudents !== null ? (
                    noOfIncomingStudents
                  ) : (
                    <CustomCircularLoader
                      size={50}
                      logoSrc="/images/logo.jpg"
                    />
                  )}
                </Box>
              </Typography>
            </CardContent>
          </Card>
        </div>
      </div>
      <Divider />
      <div className="my-2 mx-5 grid grid-flow-col justify-stretch">
        <div className="flex flex-col">
          <Card sx={{ width: 250, height: 200 }}>
            <CardContent
              sx={{
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}
            >
              <DirectionsWalkIcon fontSize="large" />
              <Typography variant="h6">No of OutGoing Students</Typography>
              <Typography variant="h4" sx={{ marginTop: 1 }}>
                <Box
                  sx={{
                    marginTop: 1,
                    paddingX: 4,
                    paddingY: 1,
                    borderRadius: '25px',
                    backgroundColor: `${noOfOutgoingStudents !== null ? '#2196f3' : ''}`, // Blue background
                    color: '#fff', // White text
                    display: 'inline-block',
                    textAlign: 'center',
                    fontSize: '1.5rem', // Adjust font size
                    minWidth: '50px', // Ensure oval shape
                  }}
                >
                  {noOfOutgoingStudents !== null ? (
                    noOfOutgoingStudents
                  ) : (
                    <CustomCircularLoader
                      size={50}
                      logoSrc="/images/logo.jpg"
                    />
                  )}
                </Box>
              </Typography>
            </CardContent>
          </Card>
        </div>
        <div className="flex flex-col">
          <Card sx={{ width: 250, height: 200 }}>
            <CardContent
              sx={{
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}
            >
              <ConfirmationNumberIcon fontSize="large" />
              <Typography variant="h6">Pending Entries</Typography>
              <Typography variant="h4" sx={{ marginTop: 1 }}>
                <Box
                  sx={{
                    marginTop: 1,
                    paddingX: 4,
                    paddingY: 1,
                    borderRadius: '25px',
                    backgroundColor: `${noOfPendingEntries !== null ? '#2196f3' : ''}`, // Blue background
                    color: '#fff', // White text
                    display: 'inline-block',
                    textAlign: 'center',
                    fontSize: '1.5rem', // Adjust font size
                    minWidth: '50px', // Ensure oval shape
                  }}
                >
                  {noOfPendingEntries !== null ? (
                    noOfPendingEntries
                  ) : (
                    <CustomCircularLoader
                      size={50}
                      logoSrc="/images/logo.jpg"
                    />
                  )}
                </Box>
              </Typography>
            </CardContent>
          </Card>
        </div>
      </div>
      <Divider />

      <div>
        <div style={{ padding: '20px' }}>
          <AddEventDialog
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            newEvent={newEvent}
            handleInputChange={handleInputChange}
            setEvents={setEvents}
          />
        </div>
        <div style={{ padding: '20px' }}>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin]}
            initialView="dayGridMonth"
            events={events}
            headerToolbar={{
              start: 'prev,next today',
              center: 'title',
              end: 'dayGridMonth,timeGridWeek',
            }}
            eventClick={handleEventClick}
            height="auto"
            contentHeight="auto"
            eventColor="#2196f3" // Highlight color for events
          />
        </div>
      </div>
      <div>
        <UpdateDeleteEventDialog
          events={events}
          setEvents={setEvents}
          updateDeleteEvent={updateDeleteEvent}
          setUpdateDeleteEvent={setUpdateDeleteEvent}
          isOpenUpdateDeleteDialog={isOpenUpdateDeleteDialog}
          setIsOpenUpdateDeleteDialog={setIsOpenUpdateDeleteDialog}
        />
      </div>
    </div>
  );
};

export default DashboardBody;
