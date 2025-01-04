import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Divider, Box, IconButton } from '@mui/material';
import './css/DetailsCard.css';
import { UpdateDialog } from './UpdateDialog.jsx';
import { useCookies } from 'react-cookie';
import { storage } from '../../firebase_config/firebase.js';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import axios from 'axios';
import toast from 'react-hot-toast';
import { VITE_BACKEND_BASE_API } from '../../helper/envConfig/envConfig.js';
import { CircularProgress } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const DetailsCard = ({
  rolesCredentials,
  setRolesCredentials,
  rolesCredential,
  onClose,
}) => {
  const totalPages = 4;
  const [selectedRolesCredential, setSelectedRolesCredential] =
    useState(rolesCredential);
  const [currentPage, setCurrentPage] = useState(1);
  const [animationDirection, setAnimationDirection] = useState('');
  const [studentLoading, setStudentLoading] = useState(false);
  const [fatherLoading, setFatherLoading] = useState(false);
  const [motherLoading, setMotherLoading] = useState(false);
  const [photoFile, setPhotoFile] = useState({
    studentPhotoFile: null,
    fatherPhotoFile: null,
    motherPhotoFile: null,
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
      setStudentLoading(true);
      const studentPhotoUrl = await uploadImage(
        photoFile.studentPhotoFile,
        `rolesCredentials/${selectedRolesCredential.student_full_name}/student_photo`,
      );

      const response = await axios.put(
        `${VITE_BACKEND_BASE_API}/updateData/updateStudentData`,
        {
          pin_number: selectedRolesCredential.pin_number,
          student_photo_url: studentPhotoUrl,
        },
      );

      if (response.status === 200) {
        toast.success('Student Photo Updated Successfully.');
        setSelectedRolesCredential({
          ...selectedRolesCredential,
          student_photo_url: studentPhotoUrl,
        });
      } else {
        toast.error('Error Updating Student Photo');
      }
    } catch (error) {
      console.log('Error photo upload:', error);
      toast.error('Error Updating Student Photo');
    } finally {
      setStudentLoading(false);
    }
  };
  const uploadFatherPhoto = async () => {
    try {
      setFatherLoading(true);
      const fatherPhotoUrl = await uploadImage(
        photoFile.fatherPhotoFile,
        `rolesCredentials/${selectedRolesCredential.student_full_name}/father_photo`,
      );

      const response = await axios.put(
        `${VITE_BACKEND_BASE_API}/updateData/updateParentDetails`,
        {
          pin_number: selectedRolesCredential.pin_number,
          father_photo_url: fatherPhotoUrl,
        },
      );

      if (response.status === 200) {
        toast.success('Father Photo Updated Successfully.');
        setSelectedRolesCredential({
          ...selectedRolesCredential,
          father_photo_url: fatherPhotoUrl,
        });
      } else {
        toast.error('Error Updating Father Photo');
      }
    } catch (error) {
      console.log('Error photo upload:', error);
      toast.error('Error Updating Father Photo');
    } finally {
      setFatherLoading(false);
    }
  };
  const uploadMotherPhoto = async () => {
    try {
      setMotherLoading(true);
      const motherPhotoUrl = await uploadImage(
        photoFile.motherPhotoFile,
        `rolesCredentials/${selectedRolesCredential.student_full_name}/student_photo`,
      );

      const response = await axios.put(
        `${VITE_BACKEND_BASE_API}/updateData/updateParentDetails`,
        {
          pin_number: selectedRolesCredential.pin_number,
          mother_photo_url: motherPhotoUrl,
        },
      );

      if (response.status === 200) {
        toast.success('Mother Photo Updated Successfully.');
        setSelectedRolesCredential({
          ...selectedRolesCredential,
          mother_photo_url: motherPhotoUrl,
        });
      } else {
        toast.error('Error Updating Mother Photo');
      }
    } catch (error) {
      console.log('Error photo upload:', error);
      toast.error('Error Updating Mother Photo');
    } finally {
      setMotherLoading(false);
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
      className="bg-white rounded-xl shadow-lg min-w-[800px] min-h-[450px] p-6 h-[57%] w-[75%] transform transition-transform duration-300 scale-100 relative"
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
              rolesCredentials={rolesCredentials}
              setRolesCredentials={setRolesCredentials}
              selectedRolesCredential={selectedRolesCredential}
              setSelectedRolesCredential={setSelectedRolesCredential}
              currentPage={currentPage}
            />
          )}
        </div>
        <div className="flex mt-[10px]">
          <div className="h-[180px] md:h-[250px] w-[20%] flex-shrink-0 mr-4">
            {' '}
            {/* Fixed 20% width for the image */}
            {selectedRolesCredential.student_photo_url ? (
              <img
                src={
                  selectedRolesCredential.student_photo_url ||
                  `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVrNIrc_GMNFCWvfIVx-5-1jI0YMf-3a6yyg&s`
                }
                alt={selectedRolesCredential.student_full_name}
                className="h-full w-full object-cover rounded-lg"
              />
            ) : (
              <div className="flex items-center justify-center h-full w-full bg-blue-500 text-white text-lg font-bold rounded-lg">
                {selectedRolesCredential.student_full_name.charAt(0)}
              </div>
            )}
            {/* Upload Photo Button */}
            {isUpdateDialogEnabled && (
              <div className="mt-2 flex flex-row items-center gap-2">
                <label
                  htmlFor="upload-photo"
                  className="cursor-pointer bg-blue-500 text-white text-sm px-4 py-1 rounded-lg hover:bg-blue-600"
                >
                  <CloudUploadIcon className="mr-2" />
                  Photo
                </label>
                <input
                  type="file"
                  id="upload-photo"
                  name="studentPhotoFile"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <button
                  onClick={uploadStudentPhoto}
                  className={`bg-green-500 text-black text-sm px-4 py-1 rounded-lg hover:bg-green-600 ${
                    photoFile.studentPhotoFile
                      ? ''
                      : 'opacity-50 cursor-not-allowed'
                  }`}
                  disabled={!photoFile.studentPhotoFile}
                >
                  {studentLoading ? <CircularProgress size={16} /> : 'Save'}
                </button>
              </div>
            )}
          </div>
          <div className="flex-grow ml-[10px] flex flex-col">
            <span className="text-2xl font-bold block">
              {selectedRolesCredential.student_full_name}
            </span>
            <span className="text-gray-600 text-[15px] block mt-1">
              {selectedRolesCredential.pin_number}
            </span>
            <div className="bg-[#e2e8f0] flex-grow w-full h-full mt-2 rounded-xl">
              <div className="my-2 mx-5 grid grid-flow-col justify-stretch">
                <div className="flex flex-col">
                  <div className="text-[12px] text-gray-600">Mobile Number</div>
                  <div>{selectedRolesCredential.student_contact_number}</div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[12px] text-gray-600">Religion</div>
                  <div>{selectedRolesCredential.religion}</div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[12px] text-gray-600">Caste</div>
                  <div>{selectedRolesCredential.caste}</div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[12px] text-gray-600 ">Home Town</div>
                  <div>{selectedRolesCredential.city}</div>
                </div>
              </div>
              <Divider />
              <div className="my-2 mx-5 grid grid-flow-col justify-stretch">
                <div className="flex flex-col">
                  <div className="text-[12px] text-gray-600">Email</div>
                  <div>{selectedRolesCredential.student_email}</div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[12px] text-gray-600 ">
                    Date Of Birth
                  </div>
                  <div>
                    {new Date(selectedRolesCredential.dob).toLocaleDateString(
                      'en-GB',
                      {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                      },
                    )}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[12px] text-gray-600 ">Nationality</div>
                  <div>{selectedRolesCredential.nationality}</div>
                </div>
              </div>
              <Divider />
              <div className="my-2 mx-5 grid grid-flow-col justify-stretch">
                <div className="flex flex-col">
                  <div className="text-[12px] text-gray-600">Address</div>
                  <div className="text-[13px]">
                    {selectedRolesCredential.address}
                  </div>
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
              rolesCredentials={rolesCredentials}
              setRolesCredentials={setRolesCredentials}
              selectedRolesCredential={selectedRolesCredential}
              setSelectedRolesCredential={setSelectedRolesCredential}
              currentPage={currentPage}
            />
          )}
        </div>
        <div className="flex mt-[10px]">
          <div className="h-[180px] md:h-[250px] w-[20%] flex-shrink-0 mr-4">
            {' '}
            {/* Fixed 20% width for the image */}
            {selectedRolesCredential.student_photo_url ? (
              <img
                src={selectedRolesCredential.student_photo_url}
                alt={selectedRolesCredential.student_full_name}
                className="h-full w-full object-cover rounded-lg"
              />
            ) : (
              <div className="flex items-center justify-center h-full w-full bg-blue-500 text-white text-lg font-bold rounded-lg">
                {selectedRolesCredential.student_full_name.charAt(0)}
              </div>
            )}
          </div>
          <div className="flex-grow ml-[10px] flex flex-col">
            <span className="text-2xl font-bold block">
              {selectedRolesCredential.student_full_name}
            </span>
            <span className="text-gray-600 text-[15px] block mt-1">
              {selectedRolesCredential.pin_number}
            </span>
            <div className="bg-[#e2e8f0] flex-grow w-full h-full mt-2 rounded-xl">
              <div className="my-2 mx-5 grid grid-flow-col justify-stretch">
                <div className="flex flex-col">
                  <div className="text-[12px] text-gray-600">
                    University Name
                  </div>
                  <div className="">
                    {selectedRolesCredential.name_of_university}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[12px] text-gray-600">Collage Name</div>
                  <div>{selectedRolesCredential.name_of_collage}</div>
                </div>
              </div>
              <Divider />
              <div className="my-2 mx-5 grid grid-flow-col justify-stretch">
                <div className="flex flex-col ">
                  <div className="text-[12px] text-gray-600">Course</div>
                  <div>{selectedRolesCredential.course}</div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[12px] text-gray-600 ">Branch</div>
                  <div>{selectedRolesCredential.branch}</div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[12px] text-gray-600 ">
                    Student Qualification
                  </div>
                  <div>{selectedRolesCredential.student_qualification}</div>
                </div>
              </div>
              <Divider />
              <div className="my-2 mx-5 grid grid-flow-col justify-stretch">
                <div className="flex flex-col">
                  <div className="text-[12px] text-gray-600 ">Current Year</div>
                  <div>{selectedRolesCredential.current_year}</div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[12px] text-gray-600 ">Current Sem</div>
                  <div>{selectedRolesCredential.current_sem}</div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[12px] text-gray-600 ">
                    {`Total Course Duration`}
                  </div>
                  <div>{selectedRolesCredential.course_duration_years}</div>
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
              rolesCredentials={rolesCredentials}
              setRolesCredentials={setRolesCredentials}
              selectedRolesCredential={selectedRolesCredential}
              setSelectedRolesCredential={setSelectedRolesCredential}
              currentPage={currentPage}
            />
          )}
        </div>
        <div className="flex mt-[10px]">
          <div>
            {/* Father's Photo Section */}
            <div className="h-[90px] md:h-[125px] w-full flex-shrink-0 mr-4 mb-1">
              {selectedRolesCredential.father_photo_url ? (
                <img
                  src={selectedRolesCredential.father_photo_url}
                  alt={selectedRolesCredential.father_name}
                  className="h-full w-full object-cover rounded-lg"
                />
              ) : (
                <div className="flex items-center justify-center h-full w-[150px] bg-blue-500 text-white text-lg font-bold rounded-lg">
                  {selectedRolesCredential.father_name.charAt(0)}
                </div>
              )}
            </div>
            {isUpdateDialogEnabled && (
              <div className="mt-2 flex flex-row items-center gap-2">
                <label
                  htmlFor="upload-father-photo"
                  className="cursor-pointer bg-blue-500 text-white text-sm px-4 py-1 rounded-lg hover:bg-blue-600"
                >
                  <CloudUploadIcon className="mr-2" />
                  Photo
                </label>
                <input
                  type="file"
                  id="upload-father-photo"
                  className="hidden"
                  accept="image/*"
                  name="fatherPhotoFile"
                  onChange={handleFileChange}
                />
                <button
                  onClick={uploadFatherPhoto}
                  className={`bg-green-500 text-black text-sm px-4 py-1 rounded-lg hover:bg-green-600 ${
                    photoFile.fatherPhotoFile
                      ? ''
                      : 'opacity-50 cursor-not-allowed'
                  }`}
                  disabled={!photoFile.fatherPhotoFile}
                >
                  {fatherLoading ? <CircularProgress size={16} /> : 'Save'}
                </button>
              </div>
            )}

            {/* Mother's Photo Section */}
            <div className="h-[90px] md:h-[125px] w-full flex-shrink-0 mr-4 mt-4">
              {selectedRolesCredential.mother_photo_url ? (
                <img
                  src={selectedRolesCredential.mother_photo_url}
                  alt={selectedRolesCredential.mother_name}
                  className="h-full w-full object-cover rounded-lg"
                />
              ) : (
                <div className="flex items-center justify-center h-full w-[150px] bg-blue-500 text-white text-lg font-bold rounded-lg">
                  {selectedRolesCredential.mother_name.charAt(0)}
                </div>
              )}
            </div>
            {isUpdateDialogEnabled && (
              <div className="mt-2 flex flex-row items-center gap-2">
                <label
                  htmlFor="upload-mother-photo"
                  className="cursor-pointer bg-blue-500 text-white text-sm px-4 py-1 rounded-lg hover:bg-blue-600"
                >
                  <CloudUploadIcon className="mr-2" />
                  Photo
                </label>
                <input
                  type="file"
                  id="upload-mother-photo"
                  className="hidden"
                  accept="image/*"
                  name="motherPhotoFile"
                  onChange={handleFileChange}
                />
                <button
                  onClick={uploadMotherPhoto}
                  className={`bg-green-500 text-black text-sm px-4 py-1 rounded-lg hover:bg-green-600 ${
                    photoFile.motherPhotoFile
                      ? ''
                      : 'opacity-50 cursor-not-allowed'
                  }`}
                  disabled={!photoFile.motherPhotoFile}
                >
                  {motherLoading ? <CircularProgress size={16} /> : 'Save'}
                </button>
              </div>
            )}
          </div>

          <div className="flex-grow ml-[10px] flex flex-col">
            <span className="text-2xl font-bold block">
              {selectedRolesCredential.student_full_name}
            </span>
            <span className="text-gray-600 text-[15px] block mt-1">
              {selectedRolesCredential.pin_number}
            </span>
            <div className="bg-[#e2e8f0] flex-grow w-full h-full mt-2 rounded-xl">
              <div className="my-2 mx-5 grid grid-flow-col justify-stretch">
                <div className="flex flex-col">
                  <div className="text-[12px] text-gray-600">Father Name</div>
                  <div className="">{selectedRolesCredential.father_name}</div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[12px] text-gray-600">
                    Father Mobile No
                  </div>
                  <div>{selectedRolesCredential.father_contact_number}</div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[12px] text-gray-600">Father Email</div>
                  <div>{selectedRolesCredential.father_email}</div>
                </div>
              </div>
              <Divider />
              <div className="my-1 mx-5 grid grid-flow-col justify-stretch">
                <div className="flex flex-col ">
                  <div className="text-[12px] text-gray-600">Mother name</div>
                  <div>{selectedRolesCredential.mother_name}</div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[12px] text-gray-600 ">
                    Mother Mobile Number
                  </div>
                  <div>{selectedRolesCredential.mother_contact_number}</div>
                </div>
              </div>
              <Divider />
              <div className="my-1 mx-5 grid grid-flow-col justify-stretch">
                <div className="flex flex-col">
                  <div className="text-[12px] text-gray-600 ">
                    Relative Name
                  </div>
                  <div>{selectedRolesCredential.relative_name}</div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[12px] text-gray-600 ">
                    Relative Contact Number
                  </div>
                  <div>{selectedRolesCredential.relative_contact_number}</div>
                </div>

                <div className="flex flex-col">
                  <div className="text-[12px] text-gray-600 ">Relation</div>
                  <div>{selectedRolesCredential.relation}</div>
                </div>
              </div>
              <div className="my-1 mx-5 grid grid-flow-col justify-stretch">
                <div className="flex flex-col">
                  <div className="text-[12px] text-gray-600 ">
                    Relative Address
                  </div>
                  <div className="text-[13px]">
                    {selectedRolesCredential.relative_address}
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
              rolesCredentials={rolesCredentials}
              setRolesCredentials={setRolesCredentials}
              selectedRolesCredential={selectedRolesCredential}
              setSelectedRolesCredential={setSelectedRolesCredential}
              currentPage={currentPage}
            />
          )}
        </div>
        <div className="flex mt-[10px]">
          <div className="h-[180px] md:h-[250px] w-[20%] flex-shrink-0 mr-4">
            {' '}
            {/* Fixed 30% width for the image */}
            {selectedRolesCredential.student_photo_url ? (
              <img
                src={selectedRolesCredential.student_photo_url}
                alt={selectedRolesCredential.student_full_name}
                className="h-full w-full object-cover rounded-lg"
              />
            ) : (
              <div className="flex items-center justify-center h-full w-full bg-blue-500 text-white text-lg font-bold rounded-lg">
                {selectedRolesCredential.student_full_name.charAt(0)}
              </div>
            )}
          </div>
          <div className="flex-grow ml-[10px] flex flex-col">
            <span className="text-2xl font-bold block">
              {selectedRolesCredential.student_full_name}
            </span>
            <span className="text-gray-600 text-[15px] block mt-1">
              {selectedRolesCredential.pin_number}
            </span>
            <div className="bg-[#e2e8f0] flex-grow w-full h-full mt-2 rounded-xl">
              <div className="my-2 mx-5 grid grid-flow-col justify-stretch">
                <div className="flex flex-col">
                  <div className="text-[12px] text-gray-600">
                    Relative Full Name
                  </div>
                  <div className="">
                    {selectedRolesCredential.reference_relative_full_name}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[12px] text-gray-600">Relation</div>
                  <div>
                    {selectedRolesCredential.reference_relative_relation}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[12px] text-gray-600">
                    Relative Mobile Number
                  </div>
                  <div>{selectedRolesCredential.reference_relative_mobile}</div>
                </div>
              </div>
              <Divider />
              <div className="my-2 mx-5 grid grid-flow-col justify-stretch">
                <div className="flex flex-col ">
                  <div className="text-[12px] text-gray-600">Sant Name</div>
                  <div>{selectedRolesCredential.name_of_sant}</div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[12px] text-gray-600 ">
                    Sant Mobile Number
                  </div>
                  <div>{selectedRolesCredential.sant_phone_number}</div>
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
    </Box>
  );
};
export default DetailsCard;
