import React, { useState } from 'react';
import DashboardNavbar from './DashboardNavbar';
import DashboardBody from './DashboardBody';

function DashboardLayout() {
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
      <DashboardNavbar
        gatepasses={gatepasses}
        setGatepasses={setGatepasses}
        selectedParentOption={selectedParentOption}
        setSelectedParentOption={setSelectedParentOption}
        selectedAdminOption={selectedAdminOption}
        setSelectedAdminOption={setSelectedAdminOption}
        isLoading={handleLoading}
        loading={loading}
      />
      <DashboardBody
        gatepasses={gatepasses}
        setGatepasses={setGatepasses}
        selectedParentOption={selectedParentOption}
        setSelectedParentOption={setSelectedParentOption}
        selectedAdminOption={selectedAdminOption}
        setSelectedAdminOption={setSelectedAdminOption}
        isLoading={handleLoading}
        loading={loading}
        className="flex-grow"
      />
    </div>
  );
}

export default DashboardLayout;
