import React, { useState } from 'react';
import ArchivedGatepassNavbar from './ArchivedGatepassNavbar';
import ArchivedGatepassBody from './ArchivedGatepassBody';

function ArchivedGatepassLayout() {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (results) => {
    setSearchResults(results);
  };

  return (
    <div className="h-full flex flex-col">
      <ArchivedGatepassNavbar onSearch={handleSearch} />
      <ArchivedGatepassBody
        searchResults={searchResults}
        className="flex-grow"
      />
    </div>
  );
}

export default ArchivedGatepassLayout;
