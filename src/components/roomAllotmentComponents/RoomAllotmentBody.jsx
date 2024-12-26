import React, { useState, useEffect } from 'react';
import CustomCircularLoader from '../commonCustomComponents/CustomCircularLoader.jsx';
import { VITE_BACKEND_BASE_API } from '../../helper/envConfig/envConfig.js';
import axios from 'axios';
import RoomAllotmentModal from './RoomAllotmentModal.jsx';
import { CheckCircle, Error } from '@mui/icons-material'; // Import MUI icons
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import AddRoomDialog from './AddRoomDialog.jsx';
import AddNewBedDialog from './AddNewBedDialog.jsx';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Grid2,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';
import toast from 'react-hot-toast';

const RoomAllotmentBody = ({
  roomAllotment,
  setRoomAllotment,
  selectedOption,
  setSelectedOption,
  loading,
  isLoading,
}) => {
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState(null);
  const [selectBed, setSelectedBed] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [addRoomDialogOpen, setAddRoomDialogOpen] = useState(false);
  const [addBedDialogOpen, setAddBedDialogOpen] = useState(false);
  const [selectedRoomNumber, setSelectedRoomNumber] = useState(null);

  const handleShowDetails = (bed) => {
    setSelectedBed(bed);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleRemoveRoom = async (room) => {
    try {
      isLoading(true);
      const response = await axios.delete(
        `${VITE_BACKEND_BASE_API}/roomAllotment/deleteRoom`,
        {
          params: { room_number: room.room_number },
        },
      );
      if (response.status === 200) {
        toast.success(`Room ${room.room_number} Removed`);
        fetchRooms();
      } else {
        toast.error('Error!');
      }
    } catch (error) {
      console.log('error removing room', error);
    } finally {
      isLoading(false);
    }
  };

  const isRemoveRoomEnabled = (room) => {
    let occupiedBedCount = 0;
    room.beds.map((bed) => {
      if (bed.pin_number) {
        occupiedBedCount++;
      }
    });
    return occupiedBedCount === 0;
  };

  // Group beds by room number
  const groupBedsByRoom = (data) => {
    // Group beds by room_number
    const roomsMap = data.reduce((acc, item, index) => {
      const {
        room_number,
        bed_number,
        category,
        pin_number,
        student_full_name,
      } = item;
      if (!acc[room_number]) {
        acc[room_number] = [];
      }

      // Assign `isOccupied` alternately for example purposes
      acc[room_number].push({
        room_number,
        bed_number,
        category,
        pin_number,
        student_full_name,
        isOccupied: pin_number !== null, // Alternates true/false
      });

      return acc;
    }, {});

    // Convert grouped data to the desired format
    return Object.entries(roomsMap).map(([room_number, beds]) => ({
      room_number: Number(room_number),
      beds,
    }));
  };

  const fetchRooms = async () => {
    isLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `${VITE_BACKEND_BASE_API}/roomAllotment/getRooms`,
        {
          params: { category: selectedOption },
        },
      );
      const groupedData = groupBedsByRoom(response.data.data);
      setRooms(groupedData);
      // console.log(groupedData);
    } catch (err) {
      console.error('Error fetching rooms:', err);
      setError('Failed to fetch rooms.');
    } finally {
      isLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, [selectedOption]);

  return (
    <div className="p-4">
      {/* Add New Room Button after the last room */}
      <div className="flex justify-center mt-4 mb-4">
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setAddRoomDialogOpen(true)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            textTransform: 'none',
            fontWeight: 'bold',
            borderColor: 'primary.main',
            color: 'primary.main',
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: 'primary.main',
              color: 'white',
              borderColor: 'primary.main',
            },
          }}
        >
          <AddCircleIcon className="mr-2" />
          Add New Room
        </Button>
      </div>

      {loading ? (
        <div className="flex flex-row justify-center">
          <CustomCircularLoader size={50} logoSrc="/images/logo.jpg" />
        </div>
      ) : (
        rooms.map((room) => (
          <div key={room.room_number} className="mb-8">
            {/* Room Number */}
            <div className="flex flex-row justify-between">
              <h1 className="text-lg font-semibold mb-4 text-left ml-4">
                Room No:- {room.room_number}
              </h1>
              <Button
                variant="outlined"
                color="error"
                disabled={!isRemoveRoomEnabled(room)}
                onClick={() => {
                  handleRemoveRoom(room);
                }}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  textTransform: 'none',
                  fontWeight: 'bold',
                  borderColor: 'error.main',
                  color: 'error.main',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'error.main',
                    color: 'white',
                    borderColor: 'error.main',
                  },
                }}
              >
                <DeleteIcon className="mr-2" />
                Remove Room {room.room_number}
              </Button>
            </div>

            {/* Bed Cards */}
            <div className="grid grid-cols-4 gap-4">
              {room.beds.map((bed) => (
                <div
                  key={bed.bed_number}
                  className={`p-4 border rounded-lg text-center shadow-md cursor-pointer ${
                    bed.isOccupied
                      ? 'bg-red-100 text-red-500'
                      : 'bg-green-100 text-green-500'
                  }`}
                  onClick={() => {
                    handleShowDetails(bed);
                  }}
                >
                  <div className="text-right">
                    {bed.isOccupied ? (
                      <Error className="text-red-500" />
                    ) : (
                      <CheckCircle className="text-green-500" />
                    )}
                  </div>

                  <span className="text-lg font-bold">
                    Bed {bed.bed_number}
                  </span>
                  <div className="text-sm mt-2 text-black">
                    Name: {bed.student_full_name || '______'}
                  </div>
                  <div className="text-sm mt-2 text-black">
                    PIN: {bed.pin_number || '______'}
                  </div>
                  <div className="text-md mt-2 font-bold">
                    {bed.isOccupied ? 'Occupied' : 'Available'}
                  </div>
                </div>
              ))}
              {/* Add New Bed Card */}
              <div
                className="mt-auto mb-auto p-4 border rounded-lg text-center shadow-md cursor-pointer bg-blue-100 text-blue-500 hover:bg-blue-200"
                onClick={() => {
                  // console.log(`Adding a new bed to Room ${room.room_number}`);
                  // Add functionality here, e.g., open a modal for bed addition.
                  setSelectedRoomNumber(room.room_number);
                  setAddBedDialogOpen(true);
                }}
              >
                <AddCircleIcon className="mr-2" />
                <span className="text-lg mt-2 block font-semibold">
                  Add New Bed
                </span>
              </div>
            </div>
          </div>
        ))
      )}

      <RoomAllotmentModal
        roomAllotment={roomAllotment}
        setRoomAllotment={setRoomAllotment}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        loading={loading}
        isLoading={isLoading}
        bed={selectBed}
        open={modalOpen}
        onClose={handleCloseModal}
        fetchRooms={fetchRooms}
      />

      <AddRoomDialog
        roomAllotment={roomAllotment}
        setRoomAllotment={setRoomAllotment}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        open={addRoomDialogOpen}
        onClose={() => setAddRoomDialogOpen(false)}
        fetchRooms={fetchRooms}
      />

      <AddNewBedDialog
        roomAllotment={roomAllotment}
        setRoomAllotment={setRoomAllotment}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        roomNumber={selectedRoomNumber}
        open={addBedDialogOpen}
        onClose={() => setAddBedDialogOpen(false)}
        fetchRooms={fetchRooms}
      />
    </div>
  );
};

export default RoomAllotmentBody;
