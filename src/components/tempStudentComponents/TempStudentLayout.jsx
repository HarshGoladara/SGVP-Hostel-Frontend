import React, { useState } from 'react';
import TempStudentNavbar from './TempStudentNavbar';
import TempStudentBody from './TempStudentBody';

function TempStudentLayout() {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = (results) => {
    setSearchResults(results);
  };

  const handleLoading = (load) => {
    setLoading(load);
  };

  return (
    <div className="h-full flex flex-col">
      <TempStudentNavbar onSearch={handleSearch} isLoading={handleLoading} />
      <TempStudentBody
        searchResults={searchResults}
        loading={loading}
        className="flex-grow"
      />
    </div>
  );
}

export default TempStudentLayout;
