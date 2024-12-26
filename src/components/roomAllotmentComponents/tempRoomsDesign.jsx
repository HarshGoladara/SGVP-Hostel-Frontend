import React, { useState, useEffect } from 'react';
import CustomCircularLoader from '../commonCustomComponents/CustomCircularLoader.jsx';
import { VITE_BACKEND_BASE_API } from '../../helper/envConfig/envConfig.js';
import axios from 'axios';

const RoomAllotmentBody = ({
  roomAllotment,
  setRoomAllotment,
  selectedOption,
  setSelectedOption,
}) => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // Fetch rooms when the component mounts or selectedOption changes

  // Group beds by room number
  const groupBedsByRoom = (data, roomAllotments) => {
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
    setLoading(true);
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
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, [selectedOption]);

  return (
    <div className="p-4">
      {loading ? (
        <div className="flex flex-row justify-center">
          <CustomCircularLoader size={50} logoSrc="/images/logo.jpg" />
        </div>
      ) : (
        rooms.map((room) => (
          <div key={room.room_number} className="mb-8">
            {/* Room Number */}
            <h1 className="text-lg font-semibold mb-4 text-left ml-4">
              Room No:- {room.room_number}
            </h1>

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
                  onClick={() => console.log(`Clicked Bed: ${bed.bed_number}`)}
                >
                  <span className="text-lg font-bold">
                    Bed {bed.bed_number}
                  </span>
                  <div className="text-sm mt-2">
                    Name: {bed.student_full_name || '--'}
                  </div>
                  <div className="text-sm mt-2">
                    PIN: {bed.pin_number || '--'}
                  </div>
                  <div className="text-sm mt-2">
                    {bed.isOccupied ? 'Occupied' : 'Available'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default RoomAllotmentBody;
