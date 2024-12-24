import React, { useState } from 'react';
import RoomAllotmentNavbar from './RoomAllotmentNavbar';
import RoomAllotmentBody from './RoomAllotmentBody';

function RoomAllotmentLayout() {
  const [students, setStudents] = useState([]);
  const [selectedOption, setSelectedOption] = useState('All');
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
    <div className="h-full flex flex-col">
      <RoomAllotmentNavbar
        students={students}
        setStudents={setStudents}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
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
      <RoomAllotmentBody
        students={students}
        setStudents={setStudents}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
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
  );
}

export default RoomAllotmentLayout;
