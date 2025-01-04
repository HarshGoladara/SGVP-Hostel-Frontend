import React, { useState } from 'react';
import axios from 'axios';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase_config/firebase'; // Adjust the import according to your file structure
import toast from 'react-hot-toast';
import { VITE_BACKEND_BASE_API } from '../../helper/envConfig/envConfig.js';

const AdmissionForm = () => {
  const [formData, setFormData] = useState({
    // Student Data
    pin_number: '',
    // student_full_name: '',
    student_surname: '',
    student_name: '',
    student_father_name: '',
    dob: '',
    nationality: '',
    religion: '',
    caste: '',
    address: '',
    city: '',
    postal_pin_number: '',
    student_contact_number: '',
    student_email: '',
    student_qualification: '',
    student_photo_url: '',

    // Student Education
    name_of_university: '',
    name_of_collage: '',
    course: '',
    branch: '',
    course_duration_years: '',
    current_year: '',
    current_sem: '',

    // Parent Details
    father_name: '',
    father_contact_number: '',
    father_email: '',
    father_photo_url: '',
    mother_name: '',
    mother_contact_number: '',
    mother_photo_url: '',
    approval_person_name: '',
    approval_person_contact: '',
    approval_person_relation: '',
    approval_person_email: '',

    // Relative Details
    relative_name: '',
    relation: '',
    relative_contact_number: '',
    relative_address: '',

    // Sant Reference
    name_of_sant: '',
    sant_phone_number: '',

    // Relative Reference
    reference_relative_full_name: '',
    reference_relative_relation: '',
    reference_relative_mobile: '',
  });

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

  const validateForm = () => {
    const alphabetRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /\S+@\S+\.\S+/; // Regular expression for email validation

    if (!formData.pin_number || isNaN(formData.pin_number))
      return 'Pin Number is required and must be a number.';
    // if (
    //   !formData.student_full_name.trim() ||
    //   !alphabetRegex.test(formData.student_full_name.trim())
    // )
    //   return 'Student Full Name is required.';
    if (
      !formData.student_surname.trim() ||
      !alphabetRegex.test(formData.student_surname.trim())
    )
      return 'Student Surname is required.';
    if (
      !formData.student_name.trim() ||
      !alphabetRegex.test(formData.student_name.trim())
    )
      return 'Student Name is required.';
    if (
      !formData.student_father_name.trim() ||
      !alphabetRegex.test(formData.student_father_name.trim())
    )
      return 'Student Father Name is required.';
    if (!formData.dob || isNaN(Date.parse(formData.dob)))
      return 'Date of Birth is required and must be a valid date.';
    if (
      !formData.nationality ||
      !alphabetRegex.test(formData.nationality.trim())
    )
      return 'Nationality is required.';
    if (!formData.religion || !alphabetRegex.test(formData.religion.trim()))
      return 'Religion is required.';
    if (!formData.caste || !alphabetRegex.test(formData.caste.trim()))
      return 'Caste is required.';
    if (!formData.address) return 'Address is required.';
    if (!formData.city || !alphabetRegex.test(formData.city.trim()))
      return 'City is required.';
    if (!formData.postal_pin_number || isNaN(formData.postal_pin_number))
      return 'Postal Pin Number is required and must be a number.';
    if (
      !formData.student_contact_number ||
      formData.student_contact_number.length !== 10 ||
      isNaN(formData.student_contact_number)
    )
      return 'Student Contact Number is required, must be a 10-digit number.';
    if (!formData.student_email || !emailRegex.test(formData.student_email))
      return 'A valid Student Email is required.';
    if (!formData.student_qualification)
      return 'Student Qualification is required.';
    if (!photoFile.studentPhotoFile) return 'Student Photo is required.';

    if (
      !formData.name_of_university.trim() ||
      !alphabetRegex.test(formData.name_of_university.trim())
    )
      return 'University name is required.';
    if (
      !formData.name_of_collage.trim() ||
      !alphabetRegex.test(formData.name_of_collage.trim())
    )
      return 'College name is required.';
    if (!formData.course.trim() || !alphabetRegex.test(formData.course.trim()))
      return 'Course is required.';
    if (!formData.branch.trim() || !alphabetRegex.test(formData.branch.trim()))
      return 'Branch is required.';
    if (
      !formData.course_duration_years ||
      isNaN(formData.course_duration_years)
    )
      return 'Course duration must be a number and not empty.';
    if (!formData.current_year || isNaN(formData.current_year))
      return 'Current year must be a number and not empty.';
    if (!formData.current_sem || isNaN(formData.current_sem))
      return 'Current semester must be a number and not empty.';

    if (
      !formData.father_name.trim() ||
      !alphabetRegex.test(formData.father_name.trim())
    )
      return 'Father name is required.';
    if (
      !formData.father_contact_number ||
      isNaN(formData.father_contact_number) ||
      formData.father_contact_number.length !== 10
    )
      return 'Father contact number is required and should be a valid number of 10 digits.';
    if (!formData.father_email || !emailRegex.test(formData.father_email))
      return 'A valid father email is required.';
    if (!photoFile.fatherPhotoFile) return 'Father photo is required.';
    if (
      !formData.mother_name.trim() ||
      !alphabetRegex.test(formData.mother_name.trim())
    )
      return 'Mother name is required.';
    if (
      !formData.mother_contact_number ||
      isNaN(formData.mother_contact_number) ||
      formData.mother_contact_number.length !== 10
    )
      return 'Mother contact number is required and should be a valid number of 10 digits.';
    if (!photoFile.motherPhotoFile) return 'Mother photo is required.';
    if (
      !formData.approval_person_name.trim() ||
      !alphabetRegex.test(formData.approval_person_name.trim())
    )
      return 'Approval person name is required.';
    if (
      !formData.approval_person_contact ||
      isNaN(formData.approval_person_contact) ||
      formData.approval_person_contact.length !== 10
    )
      return 'Approval person contact number is required and should be a valid number of 10 digits.';
    if (
      !formData.approval_person_relation.trim() ||
      !alphabetRegex.test(formData.approval_person_relation.trim())
    )
      return 'Approval person relation is required.';
    if (
      !formData.approval_person_email ||
      !emailRegex.test(formData.approval_person_email)
    )
      return 'A valid approval person email is required.';

    if (
      !formData.relative_name.trim() ||
      !alphabetRegex.test(formData.relative_name.trim())
    )
      return 'Relative name is required.';
    if (
      !formData.relation.trim() ||
      !alphabetRegex.test(formData.relation.trim())
    )
      return 'Relation is required.';
    if (
      !formData.relative_contact_number ||
      isNaN(formData.relative_contact_number) ||
      formData.relative_contact_number.length !== 10
    )
      return 'Relative contact number is required and should be a valid 10-digit number.';
    if (!formData.relative_address.trim())
      return 'Relative address is required.';

    if (
      !formData.name_of_sant.trim() ||
      !alphabetRegex.test(formData.name_of_sant.trim())
    )
      return 'Name of Sant is required.';
    if (
      !formData.sant_phone_number ||
      isNaN(formData.sant_phone_number) ||
      formData.sant_phone_number.length !== 10
    )
      return 'Sant phone number is required and should be a valid 10-digit number.';

    if (
      !formData.reference_relative_full_name.trim() ||
      !alphabetRegex.test(formData.reference_relative_full_name.trim())
    )
      return 'Full name is required.';
    if (
      !formData.reference_relative_relation.trim() ||
      !alphabetRegex.test(formData.reference_relative_relation.trim())
    )
      return 'Relation is required.';
    if (
      !formData.reference_relative_mobile ||
      isNaN(formData.reference_relative_mobile) ||
      formData.reference_relative_mobile.length !== 10
    )
      return 'Mobile number is required and should be a valid 10-digit number.';

    return null;
  };

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
          `students/${formData.pin_number}/student_photo`,
        );
      }

      // Upload father photo to Firebase and get the URL
      let fatherPhotoUrl = '';
      if (photoFile.fatherPhotoFile) {
        fatherPhotoUrl = await uploadImage(
          photoFile.fatherPhotoFile,
          `students/${formData.pin_number}/father_photo`,
        );
      }

      // Upload mother photo to Firebase and get the URL
      let motherPhotoUrl = '';
      if (photoFile.motherPhotoFile) {
        motherPhotoUrl = await uploadImage(
          photoFile.motherPhotoFile,
          `students/${formData.pin_number}/mother_photo`,
        );
      }

      // console.log(studentPhotoUrl, fatherPhotoUrl, motherPhotoUrl);

      // Update form data with the URLs
      const updatedFormData = {
        ...formData,
        student_photo_url: studentPhotoUrl,
        father_photo_url: fatherPhotoUrl,
        mother_photo_url: motherPhotoUrl,
      };

      // Submit the form data along with image URLs to the server
      const response = await axios.post(
        `${VITE_BACKEND_BASE_API}/admission/addStudent`,
        updatedFormData,
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
        className="max-w-4xl mx-auto p-8 bg-slate-400 shadow-lg rounded-lg mt-8"
      >
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Admission Form
        </h1>

        {/* Student Data Section */}
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mb-10">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Student Data
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-700">Pin Number</label>
              <input
                type="text"
                name="pin_number"
                value={formData.pin_number}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-600 rounded-md"
              />
            </div>

            {/* <div>
              <label className="block text-sm text-gray-700">
                Student Full Name
              </label>
              <input
                type="text"
                name="student_full_name"
                value={formData.student_full_name}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-600 rounded-md"
              />
            </div> */}
            <div>
              <label className="block text-sm text-gray-700">
                Student Surname
              </label>
              <input
                type="text"
                name="student_surname"
                value={formData.student_surname}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-600 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700">
                Student Name
              </label>
              <input
                type="text"
                name="student_name"
                value={formData.student_name}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-600 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700">
                Student Father Name
              </label>
              <input
                type="text"
                name="student_father_name"
                value={formData.student_father_name}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-600 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700">
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-600 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700">Nationality</label>
              <input
                type="text"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-600 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700">Religion</label>
              <select
                name="religion"
                value={formData.religion}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-600 rounded-md"
              >
                <option value="" disabled>
                  Select Religion
                </option>
                <option value="Hinduism">Hinduism</option>
                <option value="Jainism">Jainism</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-700">Caste</label>
              <select
                name="caste"
                value={formData.caste}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-600 rounded-md"
              >
                <option value="" disabled>
                  Select Caste
                </option>
                <option value="General">General</option>
                <option value="OBC">OBC</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="md:col-span-2 lg:col-span-3">
              <label className="block text-sm text-gray-700">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-600 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-600 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700">
                Postal Pin Number
              </label>
              <input
                type="text"
                name="postal_pin_number"
                value={formData.postal_pin_number}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-600 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700">
                Student Contact Number
              </label>
              <input
                type="text"
                name="student_contact_number"
                value={formData.student_contact_number}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-600 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700">
                Student Email
              </label>
              <input
                type="email"
                name="student_email"
                value={formData.student_email}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-600 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700">
                Student Qualification
              </label>
              <input
                type="text"
                name="student_qualification"
                value={formData.student_qualification}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-600 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700">
                Upload Student Photo
              </label>
              <input
                type="file"
                name="studentPhotoFile"
                onChange={handleFileChange}
                className="text-black mt-1 block w-full p-2 border border-gray-600 rounded-md"
                accept="image/*"
              />
            </div>
          </div>
        </div>

        {/* Student Education Section */}
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mb-10">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Add Student Education
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
            {/* Name of University */}
            <div>
              <label className="block text-gray-600 mb-1">
                Name of University:
              </label>
              <input
                type="text"
                name="name_of_university"
                value={formData.name_of_university}
                onChange={handleChange}
                className="w-full p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Name of College */}
            <div>
              <label className="block text-gray-600 mb-1">
                Name of College:
              </label>
              <input
                type="text"
                name="name_of_collage"
                value={formData.name_of_collage}
                onChange={handleChange}
                className="w-full p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Course */}
            <div>
              <label className="block text-gray-600 mb-1">Course:</label>
              <input
                type="text"
                name="course"
                value={formData.course}
                onChange={handleChange}
                className="w-full p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Branch */}
            <div>
              <label className="block text-gray-600 mb-1">Branch:</label>
              <input
                type="text"
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                className="w-full p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Course Duration */}
            <div>
              <label className="block text-gray-600 mb-1">
                Course Duration (Years):
              </label>
              <input
                type="text"
                name="course_duration_years"
                value={formData.course_duration_years}
                onChange={handleChange}
                className="w-full p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Current Year */}
            <div>
              <label className="block text-gray-600 mb-1">Current Year:</label>
              <input
                type="text"
                name="current_year"
                value={formData.current_year}
                onChange={handleChange}
                className="w-full p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Current Semester */}
            <div>
              <label className="block text-gray-600 mb-1">
                Current Semester:
              </label>
              <input
                type="text"
                name="current_sem"
                value={formData.current_sem}
                onChange={handleChange}
                className="w-full p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Parent Details Section */}
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mb-10">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Add Parent Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
            {/* Father Name */}
            <div>
              <label className="block text-gray-600 mb-1">Father Name:</label>
              <input
                type="text"
                name="father_name"
                value={formData.father_name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Father Contact Number */}
            <div>
              <label className="block text-gray-600 mb-1">
                Father Contact Number:
              </label>
              <input
                type="text"
                name="father_contact_number"
                value={formData.father_contact_number}
                onChange={handleChange}
                className="w-full p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Father Email */}
            <div>
              <label className="block text-gray-600 mb-1">Father Email:</label>
              <input
                type="email"
                name="father_email"
                value={formData.father_email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Father Photo URL */}
            <div>
              <label className="block text-gray-600 mb-1">
                Upload Father Photo:
              </label>
              <input
                type="file"
                name="fatherPhotoFile"
                onChange={handleFileChange}
                className="text-black mt-1 block w-full p-2 border border-gray-600 rounded-md"
              />
            </div>

            {/* Mother Name */}
            <div>
              <label className="block text-gray-600 mb-1">Mother Name:</label>
              <input
                type="text"
                name="mother_name"
                value={formData.mother_name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Mother Contact Number */}
            <div>
              <label className="block text-gray-600 mb-1">
                Mother Contact Number:
              </label>
              <input
                type="text"
                name="mother_contact_number"
                value={formData.mother_contact_number}
                onChange={handleChange}
                className="w-full p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Mother Photo URL */}
            <div>
              <label className="block text-gray-600 mb-1">
                Upload Mother Photo:
              </label>
              <input
                type="file"
                name="motherPhotoFile"
                onChange={handleFileChange}
                className="text-black mt-1 block w-full p-2 border border-gray-600 rounded-md"
              />
            </div>
          </div>

          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Add Approval Person Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
            {/* Approval Person Name */}
            <div>
              <label className="block text-gray-600 mb-1">
                Approval Person Name:
              </label>
              <input
                type="text"
                name="approval_person_name"
                value={formData.approval_person_name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Approval Person Contact */}
            <div>
              <label className="block text-gray-600 mb-1">
                Approval Person Contact:
              </label>
              <input
                type="text"
                name="approval_person_contact"
                value={formData.approval_person_contact}
                onChange={handleChange}
                className="w-full p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Approval Person Relation */}
            <div>
              <label className="block text-gray-600 mb-1">
                Approval Person Relation:
              </label>
              <input
                type="text"
                name="approval_person_relation"
                value={formData.approval_person_relation}
                onChange={handleChange}
                className="w-full p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Approval Person Email */}
            <div>
              <label className="block text-gray-600 mb-1">
                Approval Person Email:
              </label>
              <input
                type="email"
                name="approval_person_email"
                value={formData.approval_person_email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Relative Details Section */}
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mb-10">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Add Relative Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
            {/* Relative's Full Name */}
            <div>
              <label className="block text-gray-600 mb-1">
                Relative's Full Name:
              </label>
              <input
                type="text"
                name="relative_name"
                value={formData.relative_name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Relation */}
            <div>
              <label className="block text-gray-600 mb-1">Relation:</label>
              <input
                type="text"
                name="relation"
                value={formData.relation}
                onChange={handleChange}
                className="w-full p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Relative Contact Number */}
            <div>
              <label className="block text-gray-600 mb-1">
                Relative Contact Number:
              </label>
              <input
                type="text"
                name="relative_contact_number"
                value={formData.relative_contact_number}
                onChange={handleChange}
                className="w-full p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Relative Address */}
            <div className="md:col-span-2 lg:col-span-3">
              <label className="block text-gray-600 mb-1">
                Relative Address:
              </label>
              <textarea
                name="relative_address"
                value={formData.relative_address}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-600 rounded-md"
              />
            </div>
          </div>
        </div>

        {/* Sant Reference Section */}
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mb-10">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Add Sant Reference
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            {/* Name of Sant */}
            <div>
              <label className="block text-gray-600 mb-1">Name of Sant:</label>
              <input
                type="text"
                name="name_of_sant"
                value={formData.name_of_sant}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Sant Phone Number */}
            <div>
              <label className="block text-gray-600 mb-1">
                Sant Phone Number:
              </label>
              <input
                type="text"
                name="sant_phone_number"
                value={formData.sant_phone_number}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Relative Reference Section */}
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mb-10">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Add Relative Reference
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            {/* Relative's Full Name */}
            <div>
              <label className="block text-gray-600 mb-1">
                Relative's Full Name:
              </label>
              <input
                type="text"
                name="reference_relative_full_name"
                value={formData.reference_relative_full_name}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Relation */}
            <div>
              <label className="block text-gray-600 mb-1">Relation:</label>
              <input
                type="text"
                name="reference_relative_relation"
                value={formData.reference_relative_relation}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-gray-600 mb-1">Mobile Number:</label>
              <input
                type="text"
                name="reference_relative_mobile"
                value={formData.reference_relative_mobile}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-1/4 bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
        <button
          type="button"
          className="ml-10 w-1/4 bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700"
          onClick={() =>
            setFormData({
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

              // Student Education
              name_of_university: '',
              name_of_collage: '',
              course: '',
              branch: '',
              course_duration_years: '',
              current_year: '',
              current_sem: '',

              // Parent Details
              father_name: '',
              father_contact_number: '',
              father_email: '',
              father_photo_url: '',
              mother_name: '',
              mother_contact_number: '',
              mother_photo_url: '',
              approval_person_name: '',
              approval_person_contact: '',
              approval_person_relation: '',
              approval_person_email: '',

              // Relative Details
              relative_name: '',
              relation: '',
              relative_contact_number: '',
              relative_address: '',

              // Sant Reference
              name_of_sant: '',
              sant_phone_number: '',

              // Relative Reference
              reference_relative_full_name: '',
              reference_relative_relation: '',
              reference_relative_mobile: '',
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

export default AdmissionForm;
