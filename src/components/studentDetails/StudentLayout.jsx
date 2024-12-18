// import React from 'react';
// import StudentNavbar from './StudentNavbar';
// import StudentBody from './StudentBody';

// function StudentLayout() {
//   return (
//     <div className="h-full flex flex-col">
//       <StudentNavbar />
//       <StudentBody className="flex-grow" />
//     </div>
//   );
// }

// export default StudentLayout;

import React, { useState } from 'react';
import StudentNavbar from './StudentNavbar';
import StudentBody from './StudentBody';

function StudentLayout() {
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
      <StudentNavbar
        students={students}
        setStudents={setStudents}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        isLoading={handleLoading}
      />
      <StudentBody
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

export default StudentLayout;
