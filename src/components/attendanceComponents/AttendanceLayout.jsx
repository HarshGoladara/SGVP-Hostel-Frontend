import React, { useState } from 'react';
import AttendanceNavbar from './AttendanceNavbar';
import AttendanceBody from './AttendanceBody';

function AttendanceLayout() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryOption, setSelectedCategoryOption] = useState('All');
  const [selectedStatusOption, setSelectedStatusOption] = useState('Present');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleSearch = (results) => {
    setSearchResults(results);
  };

  const handleLoading = (load) => {
    setLoading(load);
  };

  return (
    <div className="h-full flex flex-col">
      <AttendanceNavbar
        selectedCategoryOption={selectedCategoryOption}
        setSelectedCategoryOption={setSelectedCategoryOption}
        selectedStatusOption={selectedStatusOption}
        setSelectedStatusOption={setSelectedStatusOption}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        isLoading={handleLoading}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        loading={loading}
      />
      <AttendanceBody
        selectedCategoryOption={selectedCategoryOption}
        setSelectedCategoryOption={setSelectedCategoryOption}
        selectedStatusOption={selectedStatusOption}
        setSelectedStatusOption={setSelectedStatusOption}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isLoading={handleLoading}
        loading={loading}
        className="flex-grow"
      />
    </div>
  );
}

export default AttendanceLayout;
