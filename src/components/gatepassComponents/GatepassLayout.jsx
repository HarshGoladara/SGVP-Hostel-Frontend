import React, { useState } from 'react';
import GatepassNavbar from './GatepassNavbar';
import GatepassBody from './GatepassBody';

function GatepassLayout() {
  const [gatepasses, setGatepasses] = useState([]);
  const [selectedParentOption, setSelectedParentOption] = useState('Approved');
  const [selectedAdminOption, setSelectedAdminOption] = useState('Pending');
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
      <GatepassNavbar
        gatepasses={gatepasses}
        setGatepasses={setGatepasses}
        selectedParentOption={selectedParentOption}
        setSelectedParentOption={setSelectedParentOption}
        selectedAdminOption={selectedAdminOption}
        setSelectedAdminOption={setSelectedAdminOption}
        isLoading={handleLoading}
      />
      <GatepassBody
        gatepasses={gatepasses}
        setGatepasses={setGatepasses}
        selectedParentOption={selectedParentOption}
        setSelectedParentOption={setSelectedParentOption}
        selectedAdminOption={selectedAdminOption}
        setSelectedAdminOption={setSelectedAdminOption}
        loading={loading}
        className="flex-grow"
      />
    </div>
  );
}

export default GatepassLayout;
