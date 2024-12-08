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
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (results) => {
    setSearchResults(results);
  };

  return (
    <div className="h-full flex flex-col">
      <StudentNavbar onSearch={handleSearch} />
      <StudentBody searchResults={searchResults} className="flex-grow" />
    </div>
  );
}

export default StudentLayout;
