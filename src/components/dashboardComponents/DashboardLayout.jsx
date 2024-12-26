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
    <div className="min-h-screen flex flex-col">
      <div className="sticky top-0 z-10 bg-white shadow-md">
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
      </div>
      <div className="flex-grow overflow-y-auto">
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
    </div>
  );
}

export default DashboardLayout;
