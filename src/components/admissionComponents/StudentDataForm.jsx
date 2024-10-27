import React, { useState } from 'react';
import axios from 'axios';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase_config/firebase.js';
import toast from 'react-hot-toast';

const StudentDataForm = () => {
  const [studentData, setStudentData] = useState({
    pin_number: '',
    student_full_name: '',
    dob: '',
    nationality: '',
    religion: '',
    address: '',
    city: '',
    postal_pin_number: '',
    student_contact_number: '',
    student_email: '',
    student_qualification: '',
    student_photo_url: null, // Changed to handle file input
  });

  const [photoFile, setPhotoFile] = useState({
    studentPhotoFile: null,
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle input change for text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData({ ...studentData, [name]: value });
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

  // Validate form data before submission
  const validateForm = () => {
    const alphabetRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /\S+@\S+\.\S+/; // Regular expression for email validation

    if (!studentData.pin_number || isNaN(studentData.pin_number))
      return 'Pin Number is required and must be a number.';
    if (
      !studentData.student_full_name ||
      !alphabetRegex.test(studentData.student_full_name.trim())
    )
      return 'Student Full Name is required.';
    if (!studentData.dob || isNaN(Date.parse(studentData.dob)))
      return 'Date of Birth is required and must be a valid date.';
    if (
      !studentData.nationality ||
      !alphabetRegex.test(studentData.nationality)
    )
      return 'Nationality is required.';
    if (!studentData.religion || !alphabetRegex.test(studentData.religion))
      return 'Religion is required.';
    if (!studentData.address) return 'Address is required.';
    if (!studentData.city || !alphabetRegex.test(studentData.city))
      return 'City is required.';
    if (!studentData.postal_pin_number || isNaN(studentData.postal_pin_number))
      return 'Postal Pin Number is required and must be a number.';
    if (
      !studentData.student_contact_number ||
      studentData.student_contact_number.length !== 10 ||
      isNaN(studentData.student_contact_number)
    )
      return 'Student Contact Number is required, must be a 10-digit number.';
    if (
      !studentData.student_email ||
      !emailRegex.test(studentData.student_email)
    )
      return 'A valid Student Email is required.';
    if (!studentData.student_qualification)
      return 'Student Qualification is required.';
    if (!photoFile.studentPhotoFile) return 'Student Photo is required.';
    return null;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    // Validate the form
    const error = validateForm();
    if (error) {
      toast.error(error);
      setErrorMessage(error);
      setLoading(false);
      return;
    }

    try {
      // Upload student photo to Firebase and get the URL
      let studentPhotoUrl = '';
      if (photoFile.studentPhotoFile) {
        studentPhotoUrl = await uploadImage(
          photoFile.studentPhotoFile,
          `students/${studentData.pin_number}/student_photo`,
        );
      }

      // console.log(studentPhotoUrl);

      // Update form data with the URLs
      const updatedStudentData = {
        ...studentData,
        student_photo_url: studentPhotoUrl,
      };

      // Submit the form data along with image URLs to the server
      const response = await axios.post(
        'http://localhost:5000/api/admission/addStudentData',
        updatedStudentData,
      );
      console.log('Student data added successfully:', response.data);
      setSuccessMessage('Student data added successfully!');
      toast.success('Student data added successfully!');
    } catch (error) {
      console.error('Error submitting student data:', error);
      setErrorMessage('Error, Try again!', error.response.data);
      toast.error(`${error.response.data}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="mb-10 max-w-xl mx-auto bg-slate-300 p-8 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-700">
          Add Student Data
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Pin Number:
          </label>
          <input
            type="text"
            name="pin_number"
            value={studentData.pin_number}
            onChange={handleChange}
            className="w-full border-gray-600 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Student Full Name:
          </label>
          <input
            type="text"
            name="student_full_name"
            value={studentData.student_full_name}
            onChange={handleChange}
            className="w-full border-gray-600 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Date of Birth:
          </label>
          <input
            type="date"
            name="dob"
            value={studentData.dob}
            onChange={handleChange}
            className="w-full border-gray-600 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Nationality:
          </label>
          <input
            type="text"
            name="nationality"
            value={studentData.nationality}
            onChange={handleChange}
            className="w-full border-gray-600 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Religion:
          </label>
          <input
            type="text"
            name="religion"
            value={studentData.religion}
            onChange={handleChange}
            className="w-full border-gray-600 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Address:
          </label>
          <textarea
            name="address"
            value={studentData.address}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border-gray-600 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">City:</label>
          <input
            type="text"
            name="city"
            value={studentData.city}
            onChange={handleChange}
            className="w-full border-gray-600 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Postal Pin Number:
          </label>
          <input
            type="text"
            name="postal_pin_number"
            value={studentData.postal_pin_number}
            onChange={handleChange}
            className="w-full border-gray-600 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Student Contact Number:
          </label>
          <input
            type="text"
            name="student_contact_number"
            value={studentData.student_contact_number}
            onChange={handleChange}
            className="w-full border-gray-600 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Student Email:
          </label>
          <input
            type="email"
            name="student_email"
            value={studentData.student_email}
            onChange={handleChange}
            className="w-full border-gray-600 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Student Qualification:
          </label>
          <input
            type="text"
            name="student_qualification"
            value={studentData.student_qualification}
            onChange={handleChange}
            className="w-full border-gray-600 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Student Photo:
          </label>
          <input
            type="file"
            name="studentPhotoFile"
            onChange={handleFileChange}
            className="text-black bg-white w-full border-gray-600 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            accept="image/*"
          />
        </div>

        <button
          type="submit"
          className="w-1/3 bg-blue-600 font-bold text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
        <button
          type="button"
          className="ml-10 w-1/4 bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700"
          onClick={() =>
            setStudentData({
              // Student Data
              pin_number: '',
              student_full_name: '',
              dob: '',
              nationality: '',
              religion: '',
              address: '',
              city: '',
              postal_pin_number: '',
              student_contact_number: '',
              student_email: '',
              student_qualification: '',
              student_photo_url: '',
            })
          }
        >
          Cancel
        </button>
        {/* {successMessage && (
                    <p className="bg-green-100 text-green-800 border border-green-200 rounded-md p-4 my-4 text-center font-medium shadow-md">
                        {successMessage}
                    </p>
                )}
                {errorMessage && (
                    <p className="bg-red-100 text-red-800 border border-red-200 rounded-md p-4 my-4 text-center font-medium shadow-md">
                        {errorMessage}
                    </p>
                )} */}
      </form>
    </>
  );
};

export default StudentDataForm;
