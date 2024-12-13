import React, { useState } from 'react';
import AlumniStudentNavbar from './AlumniStudentNavbar';
import AlumniStudentBody from './AlumniStudentBody';

function AlumniStudentLayout() {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (results) => {
    setSearchResults(results);
  };

  return (
    <div className="h-full flex flex-col">
      <AlumniStudentNavbar onSearch={handleSearch} />
      <AlumniStudentBody searchResults={searchResults} className="flex-grow" />
    </div>
  );
}

export default AlumniStudentLayout;
