import React, { useState } from 'react';
import TempStudentNavbar from './TempStudentNavbar';
import TempStudentBody from './TempStudentBody';

function TempStudentLayout() {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (results) => {
    setSearchResults(results);
  };

  return (
    <div className="h-full flex flex-col">
      <TempStudentNavbar onSearch={handleSearch} />
      <TempStudentBody searchResults={searchResults} className="flex-grow" />
    </div>
  );
}

export default TempStudentLayout;
