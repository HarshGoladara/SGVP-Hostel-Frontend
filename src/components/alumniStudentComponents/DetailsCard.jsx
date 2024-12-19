import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Divider, Box, IconButton } from '@mui/material';
import './css/DetailsCard.css';
import { UpdateDialog } from './UpdateDialog.jsx';
import { useCookies } from 'react-cookie';

const DetailsCard = ({ students, setStudents, student, onClose }) => {
  const totalPages = 4;
  const [selectedStudent, setSelectedStudent] = useState(student);
  const [currentPage, setCurrentPage] = useState(1);
  const [animationDirection, setAnimationDirection] = useState('');
  const [cookies] = useCookies(['token']);
  const gotoNextPage = () => {
    if (currentPage < totalPages) {
      setAnimationDirection('slide-out'); // Set to slide out
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setAnimationDirection('slide-in'); // Set to slide in
      }, 300); // Duration of the animation
    }
  };

  const gotoPreviousPage = () => {
    if (currentPage > 1) {
      setAnimationDirection('glide-out'); // Set to glide out
      setTimeout(() => {
        setCurrentPage(currentPage - 1);
        setAnimationDirection('glide-in'); // Set to glide in
      }, 300); // Duration of the animation
    }
  };

  const isUpdateDialogEnabled = cookies.token.update_data_credentials;

  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        // width: 800,
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderRadius: 3,
        p: 4,
      }}
      className="bg-white rounded-xl shadow-lg min-w-[800px] min-h-[400px] p-6 h-[57%] w-[75%] transform transition-transform duration-300 scale-100 relative"
    >
      <IconButton
        sx={{ position: 'absolute', top: 16, right: 16 }}
        onClick={onClose}
      >
        <CloseIcon />
      </IconButton>

      {/* --------------------------page-1----------------------------- */}
      <div
        className={`flex flex-col ${currentPage === 1 ? animationDirection : 'hidden'}`}
      >
        <div className="flex justify-stretch">
          <div className="text-3xl font-bold">Student Details</div>
          {isUpdateDialogEnabled && (
            <UpdateDialog
              students={students}
              setStudents={setStudents}
              selectedStudent={selectedStudent}
              setSelectedStudent={setSelectedStudent}
              currentPage={currentPage}
            />
          )}
        </div>
        <div className="flex mt-[10px]">
          <div className="h-[180px] md:h-[250px] w-[20%] flex-shrink-0 mr-4">
            {' '}
            {/* Fixed 20% width for the image */}
            {selectedStudent.student_photo_url ? (
              <img
                src={
                  selectedStudent.student_photo_url ||
                  `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVrNIrc_GMNFCWvfIVx-5-1jI0YMf-3a6yyg&s`
                }
                alt={selectedStudent.student_full_name}
                className="h-full w-full object-cover rounded-lg"
              />
            ) : (
              <div className="flex items-center justify-center h-full w-full bg-blue-500 text-white text-lg font-bold rounded-lg">
                {selectedStudent.student_full_name.charAt(0)}
              </div>
            )}
          </div>
          <div className="flex-grow ml-[10px] flex flex-col">
            <span className="text-2xl font-bold block">
              {selectedStudent.student_full_name}
            </span>
            <span className="text-gray-600 text-[15px] block mt-1">
              {selectedStudent.pin_number}
            </span>
            <div className="bg-[#e2e8f0] flex-grow w-full h-full mt-2 rounded-xl">
              <div className="my-2 mx-5 grid grid-flow-col justify-stretch">
                <div className="flex flex-col">
                  <div className="text-[12px] text-gray-600">Mobile Number</div>
                  <div>{selectedStudent.student_contact_number}</div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[12px] text-gray-600">Religion</div>
                  <div>{selectedStudent.religion}</div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[12px] text-gray-600">Caste</div>
                  <div>{selectedStudent.caste}</div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[12px] text-gray-600 ">Home Town</div>
                  <div>{selectedStudent.city}</div>
                </div>
              </div>
              <Divider />
              <div className="my-2 mx-5 grid grid-flow-col justify-stretch">
                <div className="flex flex-col">
                  <div className="text-[12px] text-gray-600">Email</div>
                  <div>{selectedStudent.student_email}</div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[12px] text-gray-600 ">
                    Date Of Birth
                  </div>
                  <div>
                    {new Date(selectedStudent.dob).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    })}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[12px] text-gray-600 ">Nationality</div>
                  <div>{selectedStudent.nationality}</div>
                </div>
              </div>
              <Divider />
              <div className="my-2 mx-5 grid grid-flow-col justify-stretch">
                <div className="flex flex-col">
                  <div className="text-[12px] text-gray-600">Address</div>
                  <div className="text-[13px]">{selectedStudent.address}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --------------------------page-2----------------------------- */}
      <div
        className={`flex flex-col ${currentPage == 2 ? animationDirection : 'hidden'}`}
      >
        <div className="flex justify-stretch">
          <div className="text-3xl font-bold">Student Education</div>
          {isUpdateDialogEnabled && (
            <UpdateDialog
              students={students}
              setStudents={setStudents}
              selectedStudent={selectedStudent}
              setSelectedStudent={setSelectedStudent}
              currentPage={currentPage}
            />
          )}
        </div>
        <div className="flex mt-[10px]">
          <div className="h-[180px] md:h-[250px] w-[20%] flex-shrink-0 mr-4">
            {' '}
            {/* Fixed 20% width for the image */}
            {selectedStudent.student_photo_url ? (
              <img
                src={selectedStudent.student_photo_url}
                alt={selectedStudent.student_full_name}
                className="h-full w-full object-cover rounded-lg"
              />
            ) : (
              <div className="flex items-center justify-center h-full w-full bg-blue-500 text-white text-lg font-bold rounded-lg">
                {selectedStudent.student_full_name.charAt(0)}
              </div>
            )}
          </div>
          <div className="flex-grow ml-[10px] flex flex-col">
            <span className="text-2xl font-bold block">
              {selectedStudent.student_full_name}
            </span>
            <span className="text-gray-600 text-[15px] block mt-1">
              {selectedStudent.pin_number}
            </span>
            <div className="bg-[#e2e8f0] flex-grow w-full h-full mt-2 rounded-xl">
              <div className="my-2 mx-5 grid grid-flow-col justify-stretch">
                <div className="flex flex-col">
                  <div className="text-[12px] text-gray-600">
                    University Name
                  </div>
                  <div className="">{selectedStudent.name_of_university}</div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[12px] text-gray-600">Collage Name</div>
                  <div>{selectedStudent.name_of_collage}</div>
                </div>
              </div>
              <Divider />
              <div className="my-2 mx-5 grid grid-flow-col justify-stretch">
                <div className="flex flex-col ">
                  <div className="text-[12px] text-gray-600">Course</div>
                  <div>{selectedStudent.course}</div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[12px] text-gray-600 ">Branch</div>
                  <div>{selectedStudent.branch}</div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[12px] text-gray-600 ">
                    Student Qualification
                  </div>
                  <div>{selectedStudent.student_qualification}</div>
                </div>
              </div>
              <Divider />
              <div className="my-2 mx-5 grid grid-flow-col justify-stretch">
                <div className="flex flex-col">
                  <div className="text-[12px] text-gray-600 ">Current Year</div>
                  <div>{selectedStudent.current_year}</div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[12px] text-gray-600 ">Current Sem</div>
                  <div>{selectedStudent.current_sem}</div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[12px] text-gray-600 ">
                    {`Total Course Duration`}
                  </div>
                  <div>{selectedStudent.course_duration_years}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --------------------------page-3----------------------------- */}
      <div
        className={`flex flex-col ${currentPage == 3 ? animationDirection : 'hidden'}`}
      >
        <div className="flex justify-stretch">
          <div className="text-3xl font-bold">Parent Details</div>
          {isUpdateDialogEnabled && (
            <UpdateDialog
              students={students}
              setStudents={setStudents}
              selectedStudent={selectedStudent}
              setSelectedStudent={setSelectedStudent}
              currentPage={currentPage}
            />
          )}
        </div>
        <div className="flex mt-[10px]">
          <div>
            <div className="h-[90px] md:h-[125px] w-full flex-shrink-0 mr-4 mb-1">
              {' '}
              {/* Fixed 30% width for the image */}
              {selectedStudent.father_photo_url ? (
                <img
                  src={selectedStudent.father_photo_url}
                  alt={selectedStudent.father_name}
                  className="h-full w-full object-cover rounded-lg"
                />
              ) : (
                <div className="flex items-center justify-center h-full w-[150px] bg-blue-500 text-white text-lg font-bold rounded-lg">
                  {selectedStudent.father_name.charAt(0)}
                </div>
              )}
            </div>
            <div className="h-[90px] md:h-[125px] w-full flex-shrink-0 mr-4">
              {' '}
              {/* Fixed 30% width for the image */}
              {selectedStudent.mother_photo_url ? (
                <img
                  src={selectedStudent.mother_photo_url}
                  alt={selectedStudent.mother_name}
                  className="h-full w-full object-cover rounded-lg"
                />
              ) : (
                <div className="flex items-center justify-center h-full w-[150px] bg-blue-500 text-white text-lg font-bold rounded-lg">
                  {selectedStudent.mother_name.charAt(0)}
                </div>
              )}
            </div>
          </div>
          <div className="flex-grow ml-[10px] flex flex-col">
            <span className="text-2xl font-bold block">
              {selectedStudent.student_full_name}
            </span>
            <span className="text-gray-600 text-[15px] block mt-1">
              {selectedStudent.pin_number}
            </span>
            <div className="bg-[#e2e8f0] flex-grow w-full h-full mt-2 rounded-xl">
              <div className="my-2 mx-5 grid grid-flow-col justify-stretch">
                <div className="flex flex-col">
                  <div className="text-[12px] text-gray-600">Father Name</div>
                  <div className="">{selectedStudent.father_name}</div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[12px] text-gray-600">
                    Father Mobile No
                  </div>
                  <div>{selectedStudent.father_contact_number}</div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[12px] text-gray-600">Father Email</div>
                  <div>{selectedStudent.father_email}</div>
                </div>
              </div>
              <Divider />
              <div className="my-1 mx-5 grid grid-flow-col justify-stretch">
                <div className="flex flex-col ">
                  <div className="text-[12px] text-gray-600">Mother name</div>
                  <div>{selectedStudent.mother_name}</div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[12px] text-gray-600 ">
                    Mother Mobile Number
                  </div>
                  <div>{selectedStudent.mother_contact_number}</div>
                </div>
              </div>
              <Divider />
              <div className="my-1 mx-5 grid grid-flow-col justify-stretch">
                <div className="flex flex-col">
                  <div className="text-[12px] text-gray-600 ">
                    Relative Name
                  </div>
                  <div>{selectedStudent.relative_name}</div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[12px] text-gray-600 ">
                    Relative Contact Number
                  </div>
                  <div>{selectedStudent.relative_contact_number}</div>
                </div>

                <div className="flex flex-col">
                  <div className="text-[12px] text-gray-600 ">Relation</div>
                  <div>{selectedStudent.relation}</div>
                </div>
              </div>
              <div className="my-1 mx-5 grid grid-flow-col justify-stretch">
                <div className="flex flex-col">
                  <div className="text-[12px] text-gray-600 ">
                    Relative Address
                  </div>
                  <div className="text-[13px]">
                    {selectedStudent.relative_address}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --------------------------page-4----------------------------- */}
      <div
        className={`flex flex-col ${currentPage == 4 ? animationDirection : 'hidden'}`}
      >
        <div className="flex justify-stretch">
          <div className="text-3xl font-bold">Reference Details</div>
          {isUpdateDialogEnabled && (
            <UpdateDialog
              students={students}
              setStudents={setStudents}
              selectedStudent={selectedStudent}
              setSelectedStudent={setSelectedStudent}
              currentPage={currentPage}
            />
          )}
        </div>
        <div className="flex mt-[10px]">
          <div className="h-[180px] md:h-[250px] w-[20%] flex-shrink-0 mr-4">
            {' '}
            {/* Fixed 30% width for the image */}
            {selectedStudent.student_photo_url ? (
              <img
                src={selectedStudent.student_photo_url}
                alt={selectedStudent.student_full_name}
                className="h-full w-full object-cover rounded-lg"
              />
            ) : (
              <div className="flex items-center justify-center h-full w-full bg-blue-500 text-white text-lg font-bold rounded-lg">
                {selectedStudent.student_full_name.charAt(0)}
              </div>
            )}
          </div>
          <div className="flex-grow ml-[10px] flex flex-col">
            <span className="text-2xl font-bold block">
              {selectedStudent.student_full_name}
            </span>
            <span className="text-gray-600 text-[15px] block mt-1">
              {selectedStudent.pin_number}
            </span>
            <div className="bg-[#e2e8f0] flex-grow w-full h-full mt-2 rounded-xl">
              <div className="my-2 mx-5 grid grid-flow-col justify-stretch">
                <div className="flex flex-col">
                  <div className="text-[12px] text-gray-600">
                    Relative Full Name
                  </div>
                  <div className="">
                    {selectedStudent.reference_relative_full_name}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[12px] text-gray-600">Relation</div>
                  <div>{selectedStudent.reference_relative_relation}</div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[12px] text-gray-600">
                    Relative Mobile Number
                  </div>
                  <div>{selectedStudent.reference_relative_mobile}</div>
                </div>
              </div>
              <Divider />
              <div className="my-2 mx-5 grid grid-flow-col justify-stretch">
                <div className="flex flex-col ">
                  <div className="text-[12px] text-gray-600">Sant Name</div>
                  <div>{selectedStudent.name_of_sant}</div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[12px] text-gray-600 ">
                    Sant Mobile Number
                  </div>
                  <div>{selectedStudent.sant_phone_number}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*........................ page logic ends her.............. */}
      <div
        className="flex flex-row justify-end my-2 mx-2"
        style={{
          position: 'absolute',
          bottom: 10,
          right: 10,
        }}
      >
        <div>{currentPage} - 4</div>
        <div className="cursor-pointer">
          <button
            disabled={currentPage == 1 ? true : false}
            className="disabled:text-gray-400"
            onClick={gotoPreviousPage}
          >
            <ChevronLeftIcon />
          </button>
        </div>
        <div className="cursor-pointer">
          <button
            disabled={currentPage == 4 ? true : false}
            className="disabled:text-gray-400"
            onClick={gotoNextPage}
          >
            <ChevronRightIcon />
          </button>
        </div>
      </div>
    </Box>
  );
};
export default DetailsCard;
