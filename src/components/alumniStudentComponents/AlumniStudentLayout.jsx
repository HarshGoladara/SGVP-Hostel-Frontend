import React, { useState } from 'react';
import AlumniStudentNavbar from './AlumniStudentNavbar';
import AlumniStudentBody from './AlumniStudentBody';

function AlumniStudentLayout() {
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
      <AlumniStudentNavbar
        students={students}
        setStudents={setStudents}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        isLoading={handleLoading}
      />
      <AlumniStudentBody
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

export default AlumniStudentLayout;
