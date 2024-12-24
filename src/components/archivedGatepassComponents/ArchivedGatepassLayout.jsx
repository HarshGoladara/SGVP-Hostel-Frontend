import React, { useState } from 'react';
import ArchivedGatepassNavbar from './ArchivedGatepassNavbar';
import ArchivedGatepassBody from './ArchivedGatepassBody';

function ArchivedGatepassLayout() {
  const [gatepasses, setGatepasses] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageNumberList, setPageNumberList] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleSearch = (results) => {
    setSearchResults(results);
  };

  const handleLoading = (load) => {
    setLoading(load);
  };

  return (
    <div className="h-full flex flex-col">
      <ArchivedGatepassNavbar
        gatepasses={gatepasses}
        setGatepasses={setGatepasses}
        totalItems={totalItems}
        setTotalItems={setTotalItems}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        setTotalPages={setTotalPages}
        pageNumberList={pageNumberList}
        setPageNumberList={setPageNumberList}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        isLoading={handleLoading}
      />
      <ArchivedGatepassBody
        gatepasses={gatepasses}
        setGatepasses={setGatepasses}
        totalItems={totalItems}
        setTotalItems={setTotalItems}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        setTotalPages={setTotalPages}
        pageNumberList={pageNumberList}
        setPageNumberList={setPageNumberList}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        loading={loading}
        isLoading={handleLoading}
        className="flex-grow"
      />
    </div>
  );
}

export default ArchivedGatepassLayout;
