import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StudentDataCard from './StudentDataCard';
import UpdatedCard from './UpdatedCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faChevronDown,
  faChevronUp,
} from '@fortawesome/free-solid-svg-icons'; // Import FontAwesome icons

const AllStudentDetails = () => {
  const [studentData, setStudentData] = useState([]);
  const [error, setError] = useState('');
  const [pinNumber, setPinNumber] = useState(''); // State for pin input
  const [visibleCards, setVisibleCards] = useState({}); // State to keep track of visible cards

  // State for each section's visibility
  const [isStudentVisible, setIsStudentVisible] = useState(false);
  const [isEducationVisible, setIsEducationVisible] = useState(false);
  const [isParentVisible, setIsParentVisible] = useState(false);
  const [isApprovalPersonVisible, setIsApprovalPersonVisible] = useState(false);
  const [isRelativeVisible, setIsRelativeVisible] = useState(false);
  const [isReferenceRelativeVisible, setIsReferenceRelativeVisible] =
    useState(false);
  const [isSantReferenceVisible, setIsSantReferenceVisible] = useState(false);
  const [isRoomDataVisible, setIsRoomDataVisible] = useState(false);

  const fetchStudentData = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/student/studentDetails',
      ); // Replace with your API endpoint
      setStudentData(response.data);
    } catch (err) {
      setError('Error fetching student data');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStudentData();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return 'Null';
    const date = new Date(dateString);
    return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
  };

  const renderField = (label, value) => (
    <div className="grid grid-cols-2 gap-4">
      <span className="font-semibold">{label}:</span>
      <span>{value ? value : 'Null'}</span>
    </div>
  );

  const handlePinInput = (e) => {
    setPinNumber(e.target.value);
  };

  const searchByPinNumber = async () => {
    if (!pinNumber) {
      // setError('Please enter a pin number');
      fetchStudentData();
      return;
    }

    try {
      const response = await axios.get(
        'http://localhost:5000/api/student/studentDetailsByPinNumber',
        {
          params: {
            pin_number: pinNumber,
          },
        },
      );
      setStudentData(response.data);
      setError('');
    } catch (err) {
      setError('Error fetching student data by pin');
      console.error(err);
    }
  };

  const toggleVisibility = (index) => {
    setVisibleCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  if (studentData.length === 0) {
    return <div>No data Found</div>;
  }

  return (
    <div className="text-black">
      <div className="p-4">
        <input
          type="text"
          id="pinNumber"
          value={pinNumber}
          onChange={handlePinInput}
          className="rounded-lg border p-2 ml-2 text-gray-600 border-gray-500"
          placeholder="Enter Pin Number"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              searchByPinNumber(); // Call the fetchGatepasses function when Enter is pressed
            }
          }}
        />
        <button
          onClick={searchByPinNumber}
          className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-xl"
        >
          <FontAwesomeIcon icon={faSearch} size="lg" />
        </button>
      </div>

      {/* <div className={`w-full text-black grid grid-cols-1 ${studentData.length > 1 ? 'lg:grid-cols-2' : 'lg-grid-cols-1'} gap-6 p-4`}>
                {studentData.map((student, index) => (
                    <UpdatedCard student={student} index={index} />
                    // <StudentDataCard student={student} index={index} />
                ))}
            </div> */}
      <div className="w-full text-black p-4">
        {studentData.map((student, index) => (
          <div
            key={index}
            className="rounded-lg border border-gray-700 mb-4 bg-blue-200"
          >
            {/* List Tile Section */}
            <div className="flex justify-between items-center p-2">
              <div className="flex items-start">
                <img
                  src={
                    student.student_photo_url ||
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVrNIrc_GMNFCWvfIVx-5-1jI0YMf-3a6yyg&s'
                  }
                  alt={`${student.student_full_name}'s photo`}
                  className="w-12 h-12 object-cover rounded-full"
                />
                <div className="ml-4 flex flex-col items-start">
                  <h3 className="font-semibold text-lg break-words whitespace-normal">
                    {student.student_full_name || 'Unknown'}
                  </h3>
                  <p className="text-sm text-gray-600 break-words whitespace-normal">
                    PIN: {student.pin_number || 'Null'}
                  </p>
                </div>
              </div>

              {/* Toggle Button */}
              <button
                onClick={() => toggleVisibility(index)}
                className="ml-auto bg-yellow-500 text-black px-3 py-1 rounded"
              >
                {visibleCards[index] ? (
                  <>
                    Hide <FontAwesomeIcon icon={faChevronUp} />
                  </>
                ) : (
                  <>
                    Show <FontAwesomeIcon icon={faChevronDown} />
                  </>
                )}
              </button>
            </div>

            {/* Conditionally render the detailed card */}
            {/* {visibleCards[index] && (
                            <div className="mt-4">
                                <UpdatedCard student={student} index={index} />
                            </div>
                        )} */}
            <div
              className={`transition-all duration-300 ${visibleCards[index] ? 'max-h-screen overflow-auto' : 'max-h-0 overflow-hidden'}`}
            >
              {/* <UpdatedCard student={student} index={index} /> */}
              <StudentDataCard student={student} index={index} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllStudentDetails;
