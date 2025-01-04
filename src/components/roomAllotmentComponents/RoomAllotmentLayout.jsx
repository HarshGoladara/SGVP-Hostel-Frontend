import React, { useState } from 'react';
import RoomAllotmentNavbar from './RoomAllotmentNavbar';
import RoomAllotmentBody from './RoomAllotmentBody';
import RoomAllotment from './tempRoomsDesign';

function RoomAllotmentLayout() {
  const [roomAllotment, setRoomAllotment] = useState([]);
  const [selectedOption, setSelectedOption] = useState('Wing3');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = (results) => {
    setSearchResults(results);
  };

  const handleLoading = (load) => {
    setLoading(load);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="sticky top-0 z-10 bg-white shadow-md">
        <RoomAllotmentNavbar
          roomAllotment={roomAllotment}
          setRoomAllotment={setRoomAllotment}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          isLoading={handleLoading}
        />
      </div>
      <div className="flex-grow overflow-y-auto">
        <RoomAllotmentBody
          roomAllotment={roomAllotment}
          setRoomAllotment={setRoomAllotment}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          loading={loading}
          isLoading={handleLoading}
          className="flex-grow"
        />
      </div>
      {/* <div className="flex-grow overflow-y-auto">
        <RoomAllotment
          roomAllotment={roomAllotment}
          setRoomAllotment={setRoomAllotment}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          loading={loading}
          isLoading={handleLoading}
          className="flex-grow"
        />
      </div> */}
    </div>
  );
}

export default RoomAllotmentLayout;
