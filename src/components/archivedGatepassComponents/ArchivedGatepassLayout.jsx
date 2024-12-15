import React, { useState } from 'react';
import ArchivedGatepassNavbar from './ArchivedGatepassNavbar';
import ArchivedGatepassBody from './ArchivedGatepassBody';

function ArchivedGatepassLayout() {
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
      <ArchivedGatepassNavbar
        onSearch={handleSearch}
        isLoading={handleLoading}
      />
      <ArchivedGatepassBody
        searchResults={searchResults}
        loading={loading}
        className="flex-grow"
      />
    </div>
  );
}

export default ArchivedGatepassLayout;
