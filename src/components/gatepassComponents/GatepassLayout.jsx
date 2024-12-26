import React, { useState } from 'react';
import GatepassNavbar from './GatepassNavbar';
import GatepassBody from './GatepassBody';

function GatepassLayout() {
  const [gatepasses, setGatepasses] = useState([]);
  const [selectedParentOption, setSelectedParentOption] = useState('Approved');
  const [selectedAdminOption, setSelectedAdminOption] = useState('Pending');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageNumberList, setPageNumberList] = useState([]);

  const handleSearch = (results) => {
    setSearchResults(results);
  };

  const handleLoading = (load) => {
    setLoading(load);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="sticky top-0 z-10 bg-white shadow-md">
        <GatepassNavbar
          gatepasses={gatepasses}
          setGatepasses={setGatepasses}
          selectedParentOption={selectedParentOption}
          setSelectedParentOption={setSelectedParentOption}
          selectedAdminOption={selectedAdminOption}
          setSelectedAdminOption={setSelectedAdminOption}
          totalItems={totalItems}
          setTotalItems={setTotalItems}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          setTotalPages={setTotalPages}
          pageNumberList={pageNumberList}
          setPageNumberList={setPageNumberList}
          isLoading={handleLoading}
        />
      </div>
      <div className="flex-grow overflow-y-auto">
        <GatepassBody
          gatepasses={gatepasses}
          setGatepasses={setGatepasses}
          selectedParentOption={selectedParentOption}
          setSelectedParentOption={setSelectedParentOption}
          selectedAdminOption={selectedAdminOption}
          setSelectedAdminOption={setSelectedAdminOption}
          totalItems={totalItems}
          setTotalItems={setTotalItems}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          setTotalPages={setTotalPages}
          pageNumberList={pageNumberList}
          setPageNumberList={setPageNumberList}
          loading={loading}
          isLoading={handleLoading}
          className="flex-grow"
        />
      </div>
    </div>
  );
}

export default GatepassLayout;
