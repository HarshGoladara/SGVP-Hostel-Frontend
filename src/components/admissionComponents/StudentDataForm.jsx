// import React, { useState } from 'react';
// import axios from 'axios';
// import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
// import { storage } from '../../firebase_config/firebase.js';
// import toast from 'react-hot-toast';
// import { VITE_BACKEND_BASE_API } from '../../helper/envConfig/envConfig.js';
// import TextField from "@mui/material/TextField";

// const StudentDataForm = () => {
//   const [studentData, setStudentData] = useState({
//     pin_number: '',
//     student_full_name: '',
//     dob: '',
//     nationality: '',
//     religion: '',
//     caste: '',
//     address: '',
//     city: '',
//     postal_pin_number: '',
//     student_contact_number: '',
//     student_email: '',
//     student_qualification: '',
//     student_photo_url: null, // Changed to handle file input
//   });

//   const [photoFile, setPhotoFile] = useState({
//     studentPhotoFile: null,
//   });
//   const [loading, setLoading] = useState(false);
//   const [successMessage, setSuccessMessage] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   // Handle input change for text inputs
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setStudentData({ ...studentData, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     const { name, files } = e.target;
//     setPhotoFile({ ...photoFile, [name]: files[0] }); // Store the file in state
//   };

//   const uploadImage = (file, path) => {
//     return new Promise((resolve, reject) => {
//       const storageRef = ref(storage, path);
//       const uploadTask = uploadBytesResumable(storageRef, file);

//       uploadTask.on(
//         'state_changed',
//         (snapshot) => {
//           // Optional: handle progress here if needed
//         },
//         (error) => {
//           console.error('Upload failed:', error);
//           setErrorMessage('Upload failed, please try again.');
//           toast.error('Upload failed, please try again.');
//           reject(error);
//         },
//         async () => {
//           try {
//             const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
//             resolve(downloadURL);
//           } catch (error) {
//             reject(error);
//           }
//         },
//       );
//     });
//   };

//   // Validate form data before submission
//   const validateForm = () => {
//     const alphabetRegex = /^[A-Za-z\s]+$/;
//     const emailRegex = /\S+@\S+\.\S+/; // Regular expression for email validation

//     if (!studentData.pin_number || isNaN(studentData.pin_number))
//       return 'Pin Number is required and must be a number.';
//     if (
//       !studentData.student_full_name ||
//       !alphabetRegex.test(studentData.student_full_name.trim())
//     )
//       return 'Student Full Name is required.';
//     if (!studentData.dob || isNaN(Date.parse(studentData.dob)))
//       return 'Date of Birth is required and must be a valid date.';
//     if (
//       !studentData.nationality ||
//       !alphabetRegex.test(studentData.nationality)
//     )
//       return 'Nationality is required.';
//     if (!studentData.religion || !alphabetRegex.test(studentData.religion))
//       return 'Religion is required.';
//     if (!studentData.caste || !alphabetRegex.test(studentData.caste))
//       return 'Caste is required.';
//     if (!studentData.address) return 'Address is required.';
//     if (!studentData.city || !alphabetRegex.test(studentData.city))
//       return 'City is required.';
//     if (!studentData.postal_pin_number || isNaN(studentData.postal_pin_number))
//       return 'Postal Pin Number is required and must be a number.';
//     if (
//       !studentData.student_contact_number ||
//       studentData.student_contact_number.length !== 10 ||
//       isNaN(studentData.student_contact_number)
//     )
//       return 'Student Contact Number is required, must be a 10-digit number.';
//     if (
//       !studentData.student_email ||
//       !emailRegex.test(studentData.student_email)
//     )
//       return 'A valid Student Email is required.';
//     if (!studentData.student_qualification)
//       return 'Student Qualification is required.';
//     if (!photoFile.studentPhotoFile) return 'Student Photo is required.';
//     return null;
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setSuccessMessage('');
//     setErrorMessage('');

//     // Validate the form
//     const error = validateForm();
//     if (error) {
//       toast.error(error);
//       setErrorMessage(error);
//       setLoading(false);
//       return;
//     }

//     try {
//       // Upload student photo to Firebase and get the URL
//       let studentPhotoUrl = '';
//       if (photoFile.studentPhotoFile) {
//         studentPhotoUrl = await uploadImage(
//           photoFile.studentPhotoFile,
//           `students/${studentData.pin_number}/student_photo`,
//         );
//       }

//       // console.log(studentPhotoUrl);

//       // Update form data with the URLs
//       const updatedStudentData = {
//         ...studentData,
//         student_photo_url: studentPhotoUrl,
//       };

//       // Submit the form data along with image URLs to the server
//       const response = await axios.post(
//         `${VITE_BACKEND_BASE_API}/admission/addStudentData`,
//         updatedStudentData,
//       );
//       console.log('Student data added successfully:', response.data);
//       setSuccessMessage('Student data added successfully!');
//       toast.success('Student data added successfully!');
//     } catch (error) {
//       console.error('Error submitting student data:', error);
//       setErrorMessage('Error, Try again!', error.response.data);
//       toast.error(`${error.response.data}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <form
//         onSubmit={handleSubmit}
//         className="mb-10 max-w-xl mx-auto bg-slate-300 p-8 rounded-lg shadow-md"
//       >
//         <h2 className="text-2xl font-bold mb-6 text-gray-700">
//           Add Student Data
//         </h2>

//         <div className="mb-4">
//           <label className="block text-gray-700 font-medium mb-2">
//             Pin Number:
//           </label>
//           <input
//             type="text"
//             name="pin_number"
//             value={studentData.pin_number}
//             onChange={handleChange}
//             className="w-full border-gray-600 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 font-medium mb-2">
//             Student Full Name:
//           </label>
//           <input
//             type="text"
//             name="student_full_name"
//             value={studentData.student_full_name}
//             onChange={handleChange}
//             className="w-full border-gray-600 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 font-medium mb-2">
//             Date of Birth:
//           </label>
//           <input
//             type="date"
//             name="dob"
//             value={studentData.dob}
//             onChange={handleChange}
//             className="w-full border-gray-600 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 font-medium mb-2">
//             Nationality:
//           </label>
//           <input
//             type="text"
//             name="nationality"
//             value={studentData.nationality}
//             onChange={handleChange}
//             className="w-full border-gray-600 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 font-medium mb-2">Religion:</label>
//           <select
//             name="religion"
//             value={studentData.religion}
//             onChange={handleChange}
//             className="w-full border-gray-600 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="" disabled>
//               Select Religion
//             </option>
//             <option value="Hinduism">Hinduism</option>
//             <option value="Jainism">Jainism</option>
//             <option value="Other">Other</option>
//           </select>
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 font-medium mb-2">Caste:</label>
//           <select
//             name="caste"
//             value={studentData.caste}
//             onChange={handleChange}
//             className="w-full border-gray-600 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="" disabled>
//               Select Caste
//             </option>
//             <option value="General">General</option>
//             <option value="OBC">OBC</option>
//             <option value="SC">SC</option>
//             <option value="ST">ST</option>
//             <option value="Other">Other</option>
//           </select>
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 font-medium mb-2">
//             Address:
//           </label>
//           <textarea
//             name="address"
//             value={studentData.address}
//             onChange={handleChange}
//             className="mt-1 p-2 block w-full border-gray-600 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 font-medium mb-2">City:</label>
//           <input
//             type="text"
//             name="city"
//             value={studentData.city}
//             onChange={handleChange}
//             className="w-full border-gray-600 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 font-medium mb-2">
//             Postal Pin Number:
//           </label>
//           <input
//             type="text"
//             name="postal_pin_number"
//             value={studentData.postal_pin_number}
//             onChange={handleChange}
//             className="w-full border-gray-600 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 font-medium mb-2">
//             Student Contact Number:
//           </label>
//           <input
//             type="text"
//             name="student_contact_number"
//             value={studentData.student_contact_number}
//             onChange={handleChange}
//             className="w-full border-gray-600 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 font-medium mb-2">
//             Student Email:
//           </label>
//           <input
//             type="email"
//             name="student_email"
//             value={studentData.student_email}
//             onChange={handleChange}
//             className="w-full border-gray-600 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 font-medium mb-2">
//             Student Qualification:
//           </label>
//           <input
//             type="text"
//             name="student_qualification"
//             value={studentData.student_qualification}
//             onChange={handleChange}
//             className="w-full border-gray-600 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <div className="mb-6">
//           <label className="block text-gray-700 font-medium mb-2">
//             Student Photo:
//           </label>
//           <input
//             type="file"
//             name="studentPhotoFile"
//             onChange={handleFileChange}
//             className="text-black bg-white w-full border-gray-600 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             accept="image/*"
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-1/3 bg-blue-600 font-bold text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
//           disabled={loading}
//         >
//           {loading ? 'Submitting...' : 'Submit'}
//         </button>
//         <button
//           type="button"
//           className="ml-10 w-1/4 bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700"
//           onClick={() =>
//             setStudentData({
//               // Student Data
//               pin_number: '',
//               student_full_name: '',
//               dob: '',
//               nationality: '',
//               religion: '',
//               address: '',
//               city: '',
//               postal_pin_number: '',
//               student_contact_number: '',
//               student_email: '',
//               student_qualification: '',
//               student_photo_url: '',
//             })
//           }
//         >
//           Cancel
//         </button>
//         {/* {successMessage && (
//                     <p className="bg-green-100 text-green-800 border border-green-200 rounded-md p-4 my-4 text-center font-medium shadow-md">
//                         {successMessage}
//                     </p>
//                 )}
//                 {errorMessage && (
//                     <p className="bg-red-100 text-red-800 border border-red-200 rounded-md p-4 my-4 text-center font-medium shadow-md">
//                         {errorMessage}
//                     </p>
//                 )} */}
//       </form>
//     </>
//   );
// };

// export default StudentDataForm;
// --------------------------------------------------------------------------------------------------------

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase_config/firebase.js';
import toast from 'react-hot-toast';
import { VITE_BACKEND_BASE_API } from '../../helper/envConfig/envConfig.js';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { InputLabel, FormControl, MenuItem, Select } from '@mui/material';

const StudentDataForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const [photoFile, setPhotoFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (e) => {
    setPhotoFile(e.target.files[0]);
  };

  const uploadImage = (file, path) => {
    return new Promise((resolve, reject) => {
      const storageRef = ref(storage, path);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        null,
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

  const validateForm = (data) => {
    const alphabetRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /\S+@\S+\.\S+/;

    if (!data.pin_number || isNaN(data.pin_number))
      return 'Pin Number is required and must be a number.';
    if (
      !data.student_full_name ||
      !alphabetRegex.test(data.student_full_name.trim())
    )
      return 'Student Full Name is required.';
    if (!data.dob || isNaN(Date.parse(data.dob)))
      return 'Date of Birth is required and must be a valid date.';
    if (!data.nationality || !alphabetRegex.test(data.nationality))
      return 'Nationality is required.';
    if (!data.religion || !alphabetRegex.test(data.religion))
      return 'Religion is required.';
    if (!data.caste || !alphabetRegex.test(data.caste))
      return 'Caste is required.';
    if (!data.address) return 'Address is required.';
    if (!data.city || !alphabetRegex.test(data.city))
      return 'City is required.';
    if (!data.postal_pin_number || isNaN(data.postal_pin_number))
      return 'Postal Pin Number is required and must be a number.';
    if (
      !data.student_contact_number ||
      data.student_contact_number.length !== 10 ||
      isNaN(data.student_contact_number)
    )
      return 'Student Contact Number is required, must be a 10-digit number.';
    if (!data.student_email || !emailRegex.test(data.student_email))
      return 'A valid Student Email is required.';
    if (!data.student_qualification)
      return 'Student Qualification is required.';
    if (!photoFile) return 'Student Photo is required.';
    return null;
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    const error = validateForm(data);
    if (error) {
      toast.error(error);
      setErrorMessage(error);
      setLoading(false);
      return;
    }

    try {
      let studentPhotoUrl = '';
      if (photoFile) {
        studentPhotoUrl = await uploadImage(
          photoFile,
          `students/${data.pin_number}/student_photo`,
        );
      }

      const updatedData = { ...data, student_photo_url: studentPhotoUrl };

      const response = await axios.post(
        `${VITE_BACKEND_BASE_API}/admission/addStudentData`,
        updatedData,
      );
      console.log('Student data added successfully:', response.data);
      setSuccessMessage('Student data added successfully!');
      toast.success('Student data added successfully!');
    } catch (error) {
      console.error('Error submitting student data:', error);
      setErrorMessage('Error, Try again!');
      toast.error('Error, Try again!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mb-10 max-w-xl mx-auto bg-slate-300 p-8 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-700">
        Add Student Data
      </h2>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Pin Number"
            variant="outlined"
            fullWidth
            {...register('pin_number', { required: true })}
            error={!!errors.pin_number}
            helperText={
              errors.pin_number
                ? 'Pin Number is required and must be a number.'
                : ''
            }
            className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Student Full Name"
            variant="outlined"
            fullWidth
            {...register('student_full_name', { required: true })}
            error={!!errors.student_full_name}
            helperText={
              errors.student_full_name ? 'Student Full Name is required.' : ''
            }
            className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Date of Birth"
            type="date"
            variant="outlined"
            fullWidth
            {...register('dob', { required: true })}
            error={!!errors.dob}
            helperText={
              errors.dob
                ? 'Date of Birth is required and must be a valid date.'
                : ''
            }
            InputLabelProps={{ shrink: true }}
            className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Nationality"
            variant="outlined"
            fullWidth
            {...register('nationality', { required: true })}
            error={!!errors.nationality}
            helperText={errors.nationality ? 'Nationality is required.' : ''}
            className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
          />
        </Grid>

        <Grid item xs={12}>
          <FormControl
            fullWidth
            variant="outlined"
            className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
          >
            <InputLabel>Religion</InputLabel>
            <Select
              label="Religion"
              {...register('religion', { required: true })}
            >
              <MenuItem value="Hinduism">Hinduism</MenuItem>
              <MenuItem value="Jainism">Jainism</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl
            fullWidth
            variant="outlined"
            className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
          >
            <InputLabel>Caste</InputLabel>
            <Select label="Caste" {...register('caste', { required: true })}>
              <MenuItem value="General">General</MenuItem>
              <MenuItem value="OBC">OBC</MenuItem>
              <MenuItem value="SC">SC</MenuItem>
              <MenuItem value="ST">ST</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Address"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            {...register('address', { required: true })}
            error={!!errors.address}
            helperText={errors.address ? 'Address is required.' : ''}
            className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="City"
            variant="outlined"
            fullWidth
            {...register('city', { required: true })}
            error={!!errors.city}
            helperText={errors.city ? 'City is required.' : ''}
            className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Postal Pin Number"
            variant="outlined"
            fullWidth
            {...register('postal_pin_number', { required: true })}
            error={!!errors.postal_pin_number}
            helperText={
              errors.postal_pin_number
                ? 'Postal Pin Number is required and must be a number.'
                : ''
            }
            className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Student Contact Number"
            variant="outlined"
            fullWidth
            {...register('student_contact_number', {
              required: true,
              maxLength: 10,
            })}
            error={!!errors.student_contact_number}
            helperText={
              errors.student_contact_number
                ? 'Student Contact Number is required and must be a 10-digit number.'
                : ''
            }
            className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Student Email"
            type="email"
            variant="outlined"
            fullWidth
            {...register('student_email', { required: true })}
            error={!!errors.student_email}
            helperText={
              errors.student_email ? 'A valid Student Email is required.' : ''
            }
            className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Student Qualification"
            variant="outlined"
            fullWidth
            {...register('student_qualification', { required: true })}
            error={!!errors.student_qualification}
            helperText={
              errors.student_qualification
                ? 'Student Qualification is required.'
                : ''
            }
            className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
          />
        </Grid>

        <Grid item xs={12}>
          <InputLabel>Student Profile Photo:</InputLabel>
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default StudentDataForm;
