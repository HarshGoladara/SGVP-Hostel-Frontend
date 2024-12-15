import React, { useState } from 'react';
import AlumniStudentNavbar from './AlumniStudentNavbar';
import AlumniStudentBody from './AlumniStudentBody';

function AlumniStudentLayout() {
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
      <AlumniStudentNavbar onSearch={handleSearch} isLoading={handleLoading} />
      <AlumniStudentBody
        searchResults={searchResults}
        loading={loading}
        className="flex-grow"
      />
    </div>
  );
}

export default AlumniStudentLayout;
