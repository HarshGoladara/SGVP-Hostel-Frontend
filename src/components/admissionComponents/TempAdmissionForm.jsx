import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase_config/firebase.js';
import toast from 'react-hot-toast';
import { VITE_BACKEND_BASE_API } from '../../helper/envConfig/envConfig.js';
import { TextField, Button, Grid, Box } from '@mui/material';
import {
  InputLabel,
  FormControl,
  MenuItem,
  Select,
  CircularProgress,
} from '@mui/material';

const TempAdmissionForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const [photoFile, setPhotoFile] = useState({
    studentPhotoFile: null,
    fatherPhotoFile: null,
    motherPhotoFile: null,
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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

  const validateForm = (data) => {
    const alphabetRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /\S+@\S+\.\S+/;

    // if (!data.pin_number || isNaN(data.pin_number))
    //     return 'Pin Number is required and must be a number.';
    // if (
    //     !data.student_full_name ||
    //     !alphabetRegex.test(data.student_full_name.trim())
    // )
    //     return 'Student Full Name is required.';
    if (
      !data.student_surname.trim() ||
      !alphabetRegex.test(data.student_surname.trim())
    )
      return 'Student Surname is required.';
    if (
      !data.student_name.trim() ||
      !alphabetRegex.test(data.student_name.trim())
    )
      return 'Student Name is required.';
    if (
      !data.student_father_name.trim() ||
      !alphabetRegex.test(data.student_father_name.trim())
    )
      return 'Student Father Name is required.';
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
    if (!data.student_contact_number || isNaN(data.student_contact_number))
      return 'Student Contact Number is required, must be a 10-digit number.';
    if (!data.student_email || !emailRegex.test(data.student_email))
      return 'A valid Student Email is required.';
    if (!data.student_qualification)
      return 'Student Qualification is required.';
    if (!data.student_profile_photo) return 'Student Photo is required.';

    if (
      !data.name_of_university.trim() ||
      !alphabetRegex.test(data.name_of_university.trim())
    )
      return 'University name is required.';
    if (
      !data.name_of_collage.trim() ||
      !alphabetRegex.test(data.name_of_collage.trim())
    )
      return 'College name is required.';
    if (!data.course.trim() || !alphabetRegex.test(data.course.trim()))
      return 'Course is required.';
    if (!data.branch.trim() || !alphabetRegex.test(data.branch.trim()))
      return 'Branch is required.';
    if (!data.course_duration_years || isNaN(data.course_duration_years))
      return 'Course duration must be a number and not empty.';
    if (!data.current_year || isNaN(data.current_year))
      return 'Current year must be a number and not empty.';
    if (!data.current_sem || isNaN(data.current_sem))
      return 'Current semester must be a number and not empty.';

    if (
      !data.father_name.trim() ||
      !alphabetRegex.test(data.father_name.trim())
    )
      return 'Father name is required.';
    if (!data.father_contact_number || isNaN(data.father_contact_number))
      return 'Father contact number is required and should be a valid number of 10 digits.';
    if (!data.father_email || !emailRegex.test(data.father_email))
      return 'A valid father email is required.';
    if (!data.father_profile_photo) return 'Father photo is required.';
    if (
      !data.mother_name.trim() ||
      !alphabetRegex.test(data.mother_name.trim())
    )
      return 'Mother name is required.';
    if (!data.mother_contact_number || isNaN(data.mother_contact_number))
      return 'Mother contact number is required and should be a valid number of 10 digits.';
    if (!data.mother_profile_photo) return 'Mother photo is required.';
    if (
      !data.approval_person_name.trim() ||
      !alphabetRegex.test(data.approval_person_name.trim())
    )
      return 'Approval person name is required.';
    if (!data.approval_person_contact || isNaN(data.approval_person_contact))
      return 'Approval person contact number is required and should be a valid number of 10 digits.';
    if (
      !data.approval_person_relation.trim() ||
      !alphabetRegex.test(data.approval_person_relation.trim())
    )
      return 'Approval person relation is required.';
    if (
      !data.approval_person_email ||
      !emailRegex.test(data.approval_person_email)
    )
      return 'A valid approval person email is required.';

    if (
      !data.relative_name.trim() ||
      !alphabetRegex.test(data.relative_name.trim())
    )
      return 'Relative name is required.';
    if (
      !data.relative_relation.trim() ||
      !alphabetRegex.test(data.relative_relation.trim())
    )
      return 'Relative Relation is required.';
    if (!data.relative_contact_number || isNaN(data.relative_contact_number))
      return 'Relative contact number is required and should be a valid 10-digit number.';
    if (!data.relative_address.trim()) return 'Relative address is required.';

    if (
      !data.name_of_sant.trim() ||
      !alphabetRegex.test(data.name_of_sant.trim())
    )
      return 'Name of Sant is required.';
    if (!data.sant_phone_number || isNaN(data.sant_phone_number))
      return 'Sant phone number is required and should be a valid 10-digit number.';

    if (
      !data.reference_relative_full_name.trim() ||
      !alphabetRegex.test(data.reference_relative_full_name.trim())
    )
      return 'Full name is required.';
    if (
      !data.reference_relative_relation.trim() ||
      !alphabetRegex.test(data.reference_relative_relation.trim())
    )
      return 'Relation is required.';
    if (
      !data.reference_relative_mobile ||
      isNaN(data.reference_relative_mobile)
    )
      return 'Mobile number is required and should be a valid 10-digit number.';

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
      const student_full_name =
        data.student_surname +
        ' ' +
        data.student_name +
        ' ' +
        data.student_father_name;
      // Upload student photo to Firebase and get the URL
      let studentPhotoUrl = '';
      if (data.student_profile_photo) {
        studentPhotoUrl = await uploadImage(
          data.student_profile_photo[0],
          `students/${student_full_name}/student_photo`,
        );
      }

      // Upload father photo to Firebase and get the URL
      let fatherPhotoUrl = '';
      if (data.father_profile_photo) {
        fatherPhotoUrl = await uploadImage(
          data.father_profile_photo[0],
          `students/${student_full_name}/father_photo`,
        );
      }

      // Upload mother photo to Firebase and get the URL
      let motherPhotoUrl = '';
      if (data.mother_profile_photo) {
        motherPhotoUrl = await uploadImage(
          data.mother_profile_photo[0],
          `students/${student_full_name}/mother_photo`,
        );
      }

      // console.log(studentPhotoUrl, fatherPhotoUrl, motherPhotoUrl);

      // console.log(student_full_name);

      // Update form data with the URLs
      const updatedData = {
        ...data,
        student_photo_url: studentPhotoUrl,
        father_photo_url: fatherPhotoUrl,
        mother_photo_url: motherPhotoUrl,
        student_full_name: student_full_name,
      };

      console.log('updated__data:', updatedData);

      const response = await axios.post(
        `${VITE_BACKEND_BASE_API}/admission/tempAddStudentDetails`,
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
      className="max-w-4xl mx-auto p-8 bg-slate-400 shadow-lg rounded-lg mt-8"
    >
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Admission Form
      </h1>

      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mb-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Student Data
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* <div>
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
                    </div> */}

          <div>
            <TextField
              label="Student Surname"
              variant="outlined"
              fullWidth
              {...register('student_surname', { required: true })}
              error={!!errors.student_surname}
              helperText={
                errors.student_surname ? 'Student Surame is required.' : ''
              }
              className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
            />
          </div>
          <div>
            <TextField
              label="Student Name"
              variant="outlined"
              fullWidth
              {...register('student_name', { required: true })}
              error={!!errors.student_name}
              helperText={
                errors.student_name ? 'Student Name is required.' : ''
              }
              className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
            />
          </div>
          <div>
            <TextField
              label="Student Father Name"
              variant="outlined"
              fullWidth
              {...register('student_father_name', { required: true })}
              error={!!errors.student_father_name}
              helperText={
                errors.student_father_name
                  ? 'Student Father Name is required.'
                  : ''
              }
              className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
            />
          </div>

          <div>
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
          </div>

          <div>
            <TextField
              label="Nationality"
              variant="outlined"
              fullWidth
              {...register('nationality', { required: true })}
              error={!!errors.nationality}
              helperText={errors.nationality ? 'Nationality is required.' : ''}
              className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
            />
          </div>

          <div>
            <FormControl
              fullWidth
              variant="outlined"
              className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
            >
              <InputLabel>Select Religion</InputLabel>
              <Select
                label="Select Religion"
                {...register('religion', { required: true })}
              >
                <MenuItem value="Hinduism">Hinduism</MenuItem>
                <MenuItem value="Jainism">Jainism</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div>
            <FormControl
              fullWidth
              variant="outlined"
              className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
            >
              <InputLabel>Select Caste</InputLabel>
              <Select
                label="Select Caste"
                {...register('caste', { required: true })}
              >
                <MenuItem value="General">General</MenuItem>
                <MenuItem value="OBC">OBC</MenuItem>
                <MenuItem value="SC">SC</MenuItem>
                <MenuItem value="ST">ST</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="md:col-span-2 lg:col-span-3">
            <TextField
              label="Address"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              aria-colspan={200}
              {...register('address', { required: true })}
              error={!!errors.address}
              helperText={errors.address ? 'Address is required.' : ''}
              className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
            />
          </div>

          <div sm={6}>
            <TextField
              label="City"
              variant="outlined"
              fullWidth
              {...register('city', { required: true })}
              error={!!errors.city}
              helperText={errors.city ? 'City is required.' : ''}
              className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
            />
          </div>

          <div sm={6}>
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
          </div>

          <div sm={6}>
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
          </div>

          <div sm={6}>
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
          </div>

          <div>
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
          </div>

          <div>
            <TextField
              label="Student Profile Photo"
              type="file"
              variant="outlined"
              name="studentPhotoFile"
              onChange={handleFileChange}
              fullWidth
              {...register('student_profile_photo', { required: true })}
              error={!!errors.dob}
              helperText={
                errors.dob ? 'Must upload a student profile photo' : ''
              }
              InputLabelProps={{ shrink: true }}
              className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
            />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mb-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Student Education
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <TextField
              label="Name of University"
              variant="outlined"
              fullWidth
              margin="normal"
              {...register('name_of_university', {
                required: 'University name is required',
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message:
                    'University name must contain only letters and spaces',
                },
              })}
              error={!!errors.name_of_university}
              helperText={
                errors.name_of_university
                  ? errors.name_of_university.message
                  : ''
              }
              className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
            />
          </div>

          <div>
            <TextField
              label="Name of College"
              variant="outlined"
              fullWidth
              margin="normal"
              {...register('name_of_collage', {
                required: 'College name is required',
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: 'College name must contain only letters and spaces',
                },
              })}
              error={!!errors.name_of_collage}
              helperText={
                errors.name_of_collage ? errors.name_of_collage.message : ''
              }
              className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
            />
          </div>

          <div>
            <TextField
              label="Course"
              variant="outlined"
              fullWidth
              margin="normal"
              {...register('course', {
                required: 'Course is required',
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: 'Course name must contain only letters and spaces',
                },
              })}
              error={!!errors.course}
              helperText={errors.course ? errors.course.message : ''}
              className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
            />
          </div>

          <div>
            <TextField
              label="Branch"
              variant="outlined"
              fullWidth
              margin="normal"
              {...register('branch', {
                required: 'Branch is required',
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: 'Branch name must contain only letters and spaces',
                },
              })}
              error={!!errors.branch}
              helperText={errors.branch ? errors.branch.message : ''}
              className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
            />
          </div>

          <div>
            <TextField
              label="Course Duration (years)"
              variant="outlined"
              fullWidth
              margin="normal"
              {...register('course_duration_years', {
                required: 'Course duration is required',
                valueAsNumber: true,
              })}
              error={!!errors.course_duration_years}
              helperText={
                errors.course_duration_years
                  ? errors.course_duration_years.message
                  : ''
              }
              className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
            />
          </div>

          <div>
            <TextField
              label="Current Year"
              variant="outlined"
              fullWidth
              margin="normal"
              {...register('current_year', {
                required: 'Current year is required',
                valueAsNumber: true,
              })}
              error={!!errors.current_year}
              helperText={
                errors.current_year ? errors.current_year.message : ''
              }
              className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
            />
          </div>

          <div>
            <TextField
              label="Current Semester"
              variant="outlined"
              fullWidth
              margin="normal"
              {...register('current_sem', {
                required: 'Current semester is required',
                valueAsNumber: true,
              })}
              error={!!errors.current_sem}
              helperText={errors.current_sem ? errors.current_sem.message : ''}
              className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
            />
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mb-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Parent Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <TextField
              label="Father Name"
              variant="outlined"
              fullWidth
              {...register('father_name', {
                required: 'Father name is required.',
              })}
              error={!!errors.father_name}
              helperText={errors.father_name?.message}
              className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
            />
          </div>
          <div>
            <TextField
              label="Father Contact Number"
              variant="outlined"
              fullWidth
              {...register('father_contact_number', {
                required: 'Father contact number is required.',
              })}
              error={!!errors.father_contact_number}
              helperText={errors.father_contact_number?.message}
              className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
            />
          </div>
          <div>
            <TextField
              label="Father Email"
              variant="outlined"
              fullWidth
              {...register('father_email', {
                required: 'Father email is required.',
              })}
              error={!!errors.father_email}
              helperText={errors.father_email?.message}
              className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
            />
          </div>
          <div>
            <TextField
              label="Father Profile Photo"
              type="file"
              variant="outlined"
              name="fatherPhotoFile"
              onChange={handleFileChange}
              fullWidth
              {...register('father_profile_photo', { required: true })}
              error={!!errors.dob}
              helperText={
                errors.dob ? 'Must upload a father profile photo' : ''
              }
              InputLabelProps={{ shrink: true }}
              className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
            />
          </div>
          <div>
            <TextField
              label="Mother Name"
              variant="outlined"
              fullWidth
              {...register('mother_name', {
                required: 'Mother name is required.',
              })}
              error={!!errors.mother_name}
              helperText={errors.mother_name?.message}
              className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
            />
          </div>
          <div>
            <TextField
              label="Mother Contact Number"
              variant="outlined"
              fullWidth
              {...register('mother_contact_number', {
                required: 'Mother contact number is required.',
              })}
              error={!!errors.mother_contact_number}
              helperText={errors.mother_contact_number?.message}
              className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
            />
          </div>
          <div>
            <TextField
              label="Mother Profile Photo"
              type="file"
              variant="outlined"
              name="motherPhotoFile"
              onChange={handleFileChange}
              fullWidth
              {...register('mother_profile_photo', { required: true })}
              error={!!errors.dob}
              helperText={
                errors.dob ? 'Must upload a mother profile photo' : ''
              }
              InputLabelProps={{ shrink: true }}
              className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
            />
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-4 text-gray-700 mt-4">
          Approval Person Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <TextField
              label="Approval Person Name"
              variant="outlined"
              fullWidth
              {...register('approval_person_name', {
                required: 'Approval person name is required.',
              })}
              error={!!errors.approval_person_name}
              helperText={errors.approval_person_name?.message}
              className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
            />
          </div>
          <div>
            <TextField
              label="Approval Person Contact"
              variant="outlined"
              fullWidth
              {...register('approval_person_contact', {
                required: 'Approval person contact is required.',
              })}
              error={!!errors.approval_person_contact}
              helperText={errors.approval_person_contact?.message}
              className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
            />
          </div>
          <div>
            <TextField
              label="Approval Person Relation"
              variant="outlined"
              fullWidth
              {...register('approval_person_relation', {
                required: 'Approval person relation is required.',
              })}
              error={!!errors.approval_person_relation}
              helperText={errors.approval_person_relation?.message}
              className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
            />
          </div>
          <div>
            <TextField
              label="Approval Person Email"
              variant="outlined"
              fullWidth
              {...register('approval_person_email', {
                required: 'Approval person email is required.',
              })}
              error={!!errors.approval_person_email}
              helperText={errors.approval_person_email?.message}
              className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
            />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mb-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Relative Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <TextField
              label="Relative Name"
              fullWidth
              variant="outlined"
              {...register('relative_name', {
                required: 'Relative name is required',
                pattern: /^[A-Za-z\s]+$/,
              })}
              error={!!errors.relative_name}
              helperText={errors.relative_name?.message}
              className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
            />
          </div>
          <div>
            <TextField
              label="Relative Relation"
              fullWidth
              variant="outlined"
              {...register('relative_relation', {
                required: 'Relation is required',
                pattern: /^[A-Za-z\s]+$/,
              })}
              error={!!errors.relative_relation}
              helperText={errors.relative_relation?.message}
              className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
            />
          </div>
          <div>
            <TextField
              label="Relative Contact Number"
              fullWidth
              variant="outlined"
              type="text"
              {...register('relative_contact_number', {
                required: 'Contact number is required',
                pattern: /^[0-9]{10}$/,
              })}
              error={!!errors.relative_contact_number}
              helperText={errors.relative_contact_number?.message}
              className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
            />
          </div>
          <div className="md:col-span-2 lg:col-span-3">
            <TextField
              label="Relative Address"
              fullWidth
              variant="outlined"
              multiline
              rows={4}
              {...register('relative_address', {
                required: 'Address is required',
              })}
              error={!!errors.relative_address}
              helperText={errors.relative_address?.message}
              className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
            />
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mb-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Sant Reference Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <TextField
              label="Name of Sant"
              fullWidth
              variant="outlined"
              {...register('name_of_sant', {
                required: 'Name of Sant is required',
                pattern: /^[A-Za-z\s]+$/,
              })}
              error={!!errors.name_of_sant}
              helperText={errors.name_of_sant?.message}
              className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
            />
          </div>
          <div>
            <TextField
              label="Sant Phone Number"
              fullWidth
              variant="outlined"
              type="text"
              {...register('sant_phone_number', {
                required: 'Sant phone number is required',
                pattern: /^[0-9]{10}$/,
              })}
              error={!!errors.sant_phone_number}
              helperText={errors.sant_phone_number?.message}
              className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
            />
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mb-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Relative Reference Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <TextField
              label="Full Name"
              fullWidth
              variant="outlined"
              {...register('reference_relative_full_name', {
                required: 'Full name is required',
                pattern: /^[A-Za-z\s]+$/,
              })}
              error={!!errors.reference_relative_full_name}
              helperText={errors.reference_relative_full_name?.message}
              className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
            />
          </div>
          <div>
            <TextField
              label="Relation"
              fullWidth
              variant="outlined"
              {...register('reference_relative_relation', {
                required: 'Relation is required',
                pattern: /^[A-Za-z\s]+$/,
              })}
              error={!!errors.reference_relative_relation}
              helperText={errors.reference_relative_relation?.message}
              className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
            />
          </div>
          <div>
            <TextField
              label="Mobile Number"
              fullWidth
              variant="outlined"
              type="text"
              {...register('reference_relative_mobile', {
                required: 'Mobile number is required',
                pattern: /^[0-9]{10}$/,
              })}
              error={!!errors.reference_relative_mobile}
              helperText={errors.reference_relative_mobile?.message}
              className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            className="w-full"
          >
            {loading ? <CircularProgress size={24} /> : 'Submit'}
          </Button>
          {/* <Button
                        type="button"
                        variant="outlined"
                        color="secondary"
                        onClick={handleReset}
                        sx={{ width: 150 }}
                    >
                        Cancel
                    </Button> */}
        </Box>
      </div>
    </form>
  );
};

export default TempAdmissionForm;
