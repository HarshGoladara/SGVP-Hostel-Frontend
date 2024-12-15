import React, { useState } from 'react';
import GatepassNavbar from './GatepassNavbar';
import GatepassBody from './GatepassBody';

function GatepassLayout() {
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
      <GatepassNavbar onSearch={handleSearch} isLoading={handleLoading} />
      <GatepassBody
        searchResults={searchResults}
        loading={loading}
        className="flex-grow"
      />
    </div>
  );
}

export default GatepassLayout;
