import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import {
  Divider,
  Box,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';
import './css/DetailsCard.css';
import { UpdateDialog } from './UpdateDialog.jsx';
import { useCookies } from 'react-cookie';
import { storage } from '../../firebase_config/firebase.js';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import axios from 'axios';
import toast from 'react-hot-toast';
import {
  VITE_BACKEND_BASE_API,
  VITE_BACKEND_BASE,
} from '../../helper/envConfig/envConfig.js';
import { CircularProgress } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import EditIcon from '@mui/icons-material/Edit';

const DetailsCard = ({ students, setStudents, student, onClose }) => {
  const totalPages = 4;
  const [selectedStudent, setSelectedStudent] = useState(student);
  const [currentPage, setCurrentPage] = useState(1);
  const [animationDirection, setAnimationDirection] = useState('');
  const [photoUploading, setPhotoUploading] = useState(false);
  const [photoFile, setPhotoFile] = useState({
    studentPhotoFile: null,
    fatherPhotoFile: null,
    motherPhotoFile: null,
  });
  const [confirmPhotoUploadDialog, setConfirmPhotoUploadDialog] = useState({
    open: false,
    type: '',
  });

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

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setPhotoFile({ ...photoFile, [name]: files[0] }); // Store the file in state
    if (name === 'studentPhotoFile') {
      setConfirmPhotoUploadDialog({ open: true, type: 'student' });
    } else if (name === 'fatherPhotoFile') {
      setConfirmPhotoUploadDialog({ open: true, type: 'father' });
    } else if (name === 'motherPhotoFile') {
      setConfirmPhotoUploadDialog({ open: true, type: 'mother' });
    }
  };

  const closeConfirmDialog = () => {
    if (confirmPhotoUploadDialog.type === 'student') {
      setPhotoFile({ ...photoFile, studentPhotoFile: null }); // Reset the file if upload is canceled
    } else if (confirmPhotoUploadDialog.type === 'father') {
      setPhotoFile({ ...photoFile, fatherPhotoFile: null }); // Reset the file if upload is canceled
    } else if (confirmPhotoUploadDialog.type === 'mother') {
      setPhotoFile({ ...photoFile, motherPhotoFile: null }); // Reset the file if upload is canceled
    }
    setConfirmPhotoUploadDialog({ open: false, type: '' });
  };

  const confirmUpdate = async () => {
    if (confirmPhotoUploadDialog.type === 'student') {
      await uploadStudentPhoto();
    } else if (confirmPhotoUploadDialog.type === 'father') {
      await uploadFatherPhoto();
    } else if (confirmPhotoUploadDialog.type === 'mother') {
      await uploadMotherPhoto();
    }
    // handlePhotoUpdate(confirmDialog.type);
    closeConfirmDialog();
  };

  const uploadImage = (file, path) => {
    return new Promise((resolve, reject) => {
      const storageRef = ref(storage, path);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Optional: handle progress here if needed
        },
        (error) => {
          console.error('Upload failed:', error);
          setErrorMessage('Upload failed, please try again.');
          toast.error('Upload failed, please try again.');
          reject(error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          } catch (error) {
            reject(error);
          }
        },
      );
    });
  };

  const uploadStudentPhoto = async () => {
    try {
      setPhotoUploading(true);

      const studentPhotoUrl = await uploadImage(
        photoFile.studentPhotoFile,
        `students/${selectedStudent.student_full_name}/student_photo`,
      );

      const response = await axios.put(
        `${VITE_BACKEND_BASE_API}/updateData/updateStudentData`,
        {
          pin_number: selectedStudent.pin_number,
          student_photo_url: studentPhotoUrl,
        },
      );

      if (response.status === 200) {
        toast.success('Student Photo Updated Successfully.');
        setSelectedStudent({
          ...selectedStudent,
          student_photo_url: studentPhotoUrl,
        });
        setConfirmPhotoUploadDialog({ open: false, type: '' }); // Close the confirmation dialog
      } else {
        toast.error('Error Updating Student Photo');
      }
    } catch (error) {
      console.log('Error photo upload:', error);
      toast.error('Error Updating Student Photo');
    } finally {
      setPhotoUploading(false);
    }
  };
  const uploadFatherPhoto = async () => {
    try {
      setPhotoUploading(true);

      const fatherPhotoUrl = await uploadImage(
        photoFile.fatherPhotoFile,
        `students/${selectedStudent.student_full_name}/father_photo`,
      );

      const response = await axios.put(
        `${VITE_BACKEND_BASE_API}/updateData/updateParentDetails`,
        {
          pin_number: selectedStudent.pin_number,
          father_photo_url: fatherPhotoUrl,
        },
      );

      if (response.status === 200) {
        toast.success('Father Photo Updated Successfully.');
        setSelectedStudent({
          ...selectedStudent,
          father_photo_url: fatherPhotoUrl,
        });
        setConfirmPhotoUploadDialog({ open: false, type: '' }); // Close the confirmation dialog
      } else {
        toast.error('Error Updating Father Photo');
      }
    } catch (error) {
      console.log('Error photo upload:', error);
      toast.error('Error Updating Father Photo');
    } finally {
      setPhotoUploading(false);
    }
  };
  const uploadMotherPhoto = async () => {
    try {
      setPhotoUploading(true);

      const motherPhotoUrl = await uploadImage(
        photoFile.motherPhotoFile,
        `students/${selectedStudent.student_full_name}/student_photo`,
      );

      const response = await axios.put(
        `${VITE_BACKEND_BASE_API}/updateData/updateParentDetails`,
        {
          pin_number: selectedStudent.pin_number,
          mother_photo_url: motherPhotoUrl,
        },
      );

      if (response.status === 200) {
        toast.success('Mother Photo Updated Successfully.');
        setSelectedStudent({
          ...selectedStudent,
          mother_photo_url: motherPhotoUrl,
        });
        setConfirmPhotoUploadDialog({ open: false, type: '' }); // Close the confirmation dialog
      } else {
        toast.error('Error Updating Mother Photo');
      }
    } catch (error) {
      console.log('Error photo upload:', error);
      toast.error('Error Updating Mother Photo');
    } finally {
      setPhotoUploading(false);
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
      className="bg-white rounded-xl shadow-lg min-w-[800px] min-h-[450px] p-6 h-[57%] w-[75%] transform transition-transform duration-300 scale-100 relative card-container"
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
          <div className="h-[180px] md:h-[250px] w-[20%] flex-shrink-0 mr-4 relative group">
            {/* Fixed 20% width for the image */}
            <label htmlFor="upload-photo">
              {selectedStudent.student_photo_url ? (
                <img
                  src={
                    `${VITE_BACKEND_BASE}${selectedStudent.student_photo_url}` ||
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

              {/* Overlay */}
              <div className="cursor-pointer absolute inset-0 bg-black bg-opacity-70 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <EditIcon className="text-white text-4xl" />
              </div>
            </label>
            {/* Upload Photo Button */}
            {isUpdateDialogEnabled && (
              <div className="mt-2 flex flex-row items-center gap-2">
                <input
                  type="file"
                  id="upload-photo"
                  name="studentPhotoFile"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
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
          <div className="h-[180px] md:h-[250px] w-[20%] flex-shrink-0 mr-4 relative group">
            {/* Fixed 20% width for the image */}
            <label htmlFor="upload-photo">
              {selectedStudent.student_photo_url ? (
                <img
                  src={
                    `${VITE_BACKEND_BASE}${selectedStudent.student_photo_url}` ||
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

              {/* Overlay */}
              <div className="cursor-pointer absolute inset-0 bg-black bg-opacity-70 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <EditIcon className="text-white text-4xl" />
              </div>
            </label>
            {/* Upload Photo Button */}
            {isUpdateDialogEnabled && (
              <div className="mt-2 flex flex-row items-center gap-2">
                <input
                  type="file"
                  id="upload-photo"
                  name="studentPhotoFile"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
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
            {/* Father's Photo Section */}
            <div className="h-[90px] md:h-[125px] w-full flex-shrink-0 mr-4 mb-1 relative group">
              <label htmlFor="upload-father-photo">
                {selectedStudent.father_photo_url ? (
                  <img
                    src={`${VITE_BACKEND_BASE}${selectedStudent.father_photo_url}`}
                    alt={selectedStudent.father_name}
                    className="h-full w-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full w-[150px] bg-blue-500 text-white text-lg font-bold rounded-lg">
                    {selectedStudent.father_name.charAt(0)}
                  </div>
                )}

                {/* Overlay */}
                <div className="cursor-pointer absolute inset-0 bg-black bg-opacity-70 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <EditIcon className="text-white text-4xl" />
                </div>
              </label>
            </div>
            {isUpdateDialogEnabled && (
              <div className="mt-2 flex flex-row items-center gap-2">
                <input
                  type="file"
                  id="upload-father-photo"
                  className="hidden"
                  accept="image/*"
                  name="fatherPhotoFile"
                  onChange={handleFileChange}
                />
              </div>
            )}

            {/* Mother's Photo Section */}
            <div className="h-[90px] md:h-[125px] w-full flex-shrink-0 mr-4 mt-4 relative group">
              <label htmlFor="upload-mother-photo">
                {selectedStudent.mother_photo_url ? (
                  <img
                    src={`${VITE_BACKEND_BASE}${selectedStudent.mother_photo_url}`}
                    alt={selectedStudent.mother_name}
                    className="h-full w-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full w-[150px] bg-blue-500 text-white text-lg font-bold rounded-lg">
                    {selectedStudent.mother_name.charAt(0)}
                  </div>
                )}

                {/* Overlay */}
                <div className="cursor-pointer absolute inset-0 bg-black bg-opacity-70 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <EditIcon className="text-white text-4xl" />
                </div>
              </label>
            </div>
            {isUpdateDialogEnabled && (
              <div className="mt-2 flex flex-row items-center gap-2">
                <input
                  type="file"
                  id="upload-mother-photo"
                  className="hidden"
                  accept="image/*"
                  name="motherPhotoFile"
                  onChange={handleFileChange}
                />
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
          <div className="h-[180px] md:h-[250px] w-[20%] flex-shrink-0 mr-4 relative group">
            {/* Fixed 20% width for the image */}
            <label htmlFor="upload-photo">
              {selectedStudent.student_photo_url ? (
                <img
                  src={
                    `${VITE_BACKEND_BASE}${selectedStudent.student_photo_url}` ||
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

              {/* Overlay */}
              <div className="cursor-pointer absolute inset-0 bg-black bg-opacity-70 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <EditIcon className="text-white text-4xl" />
              </div>
            </label>
            {/* Upload Photo Button */}
            {isUpdateDialogEnabled && (
              <div className="mt-2 flex flex-row items-center gap-2">
                <input
                  type="file"
                  id="upload-photo"
                  name="studentPhotoFile"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
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
          right: '50%',
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

      {/* Confirmation Dialog */}
      <Dialog open={confirmPhotoUploadDialog.open} onClose={closeConfirmDialog}>
        <DialogTitle>Confirm Photo Update</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to update the {confirmPhotoUploadDialog.type}{' '}
            photo?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeConfirmDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={confirmUpdate} color="primary">
            {photoUploading ? (
              <CircularProgress size={24} sx={{ color: 'primary' }} />
            ) : (
              'Confirm'
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default DetailsCard;
