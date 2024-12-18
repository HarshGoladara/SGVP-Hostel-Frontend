import React, { useState } from 'react';
import TempStudentNavbar from './TempStudentNavbar';
import TempStudentBody from './TempStudentBody';

function TempStudentLayout() {
  const [students, setStudents] = useState([]);
  const [selectedOption, setSelectedOption] = useState('All');
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
      <TempStudentNavbar
        students={students}
        setStudents={setStudents}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        isLoading={handleLoading}
      />
      <TempStudentBody
        students={students}
        setStudents={setStudents}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        loading={loading}
        className="flex-grow"
      />
    </div>
  );
}

export default TempStudentLayout;
