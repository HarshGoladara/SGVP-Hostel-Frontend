import React from 'react';
import StudentNavbar from './StudentNavbar';
import StudentBody from './StudentBody';

function StudentLayout() {
  return (
    <div className="h-full flex flex-col">
      <StudentNavbar />
      <StudentBody className="flex-grow" />
    </div>
  );
}

export default StudentLayout;
