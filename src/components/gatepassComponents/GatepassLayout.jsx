import React, { useState } from 'react';
import GatepassNavbar from './GatepassNavbar';
import GatepassBody from './GatepassBody';

function GatepassLayout() {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (results) => {
    setSearchResults(results);
  };

  return (
    <div className="h-full flex flex-col">
      <GatepassNavbar onSearch={handleSearch} />
      <GatepassBody searchResults={searchResults} className="flex-grow" />
    </div>
  );
}

export default GatepassLayout;
