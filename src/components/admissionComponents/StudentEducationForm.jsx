import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const StudentEducationForm = () => {
  const [educationData, setEducationData] = useState({
    pin_number: '',
    name_of_university: '',
    name_of_collage: '',
    course: '',
    branch: '',
    course_duration_years: '',
    current_year: '',
    current_sem: '',
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setEducationData({ ...educationData, [e.target.name]: e.target.value });
  };

  // Validation function
  const validateForm = () => {
    const alphabetRegex = /^[A-Za-z\s]+$/;

    if (!educationData.pin_number || isNaN(educationData.pin_number))
      return 'Pin number must be a number and not empty.';

    if (
      !educationData.name_of_university ||
      !alphabetRegex.test(educationData.name_of_university)
    )
      return 'University name is required.';

    if (
      !educationData.name_of_collage ||
      !alphabetRegex.test(educationData.name_of_collage)
    )
      return 'College name is required.';

    if (!educationData.course || !alphabetRegex.test(educationData.course))
      return 'Course is required.';

    if (!educationData.branch || !alphabetRegex.test(educationData.branch))
      return 'Branch is required.';

    if (
      !educationData.course_duration_years ||
      isNaN(educationData.course_duration_years)
    )
      return 'Course duration must be a number and not empty.';

    if (!educationData.current_year || isNaN(educationData.current_year))
      return 'Current year must be a number and not empty.';

    if (!educationData.current_sem || isNaN(educationData.current_sem))
      return 'Current semester must be a number and not empty.';

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
      const response = await axios.post(
        'http://localhost:5000/api/admission/addStudentEducation',
        educationData,
      );
      console.log(response.data);
      setSuccessMessage('Student Education data added successfully!');
      toast.success('Student Education data added successfully!');
    } catch (error) {
      console.error('error submitting student education data', error);
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
        className="mb-10 max-w-xl mx-auto bg-slate-300 p-8 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
          Add Student Education
        </h2>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-2">
            Pin Number:
          </label>
          <input
            type="text"
            name="pin_number"
            value={educationData.pin_number}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-600 rounded-md focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-2">
            Name of University:
          </label>
          <input
            type="text"
            name="name_of_university"
            value={educationData.name_of_university}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-600 rounded-md focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-2">
            Name of College:
          </label>
          <input
            type="text"
            name="name_of_collage"
            value={educationData.name_of_collage}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-600 rounded-md focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-2">
            Course:
          </label>
          <input
            type="text"
            name="course"
            value={educationData.course}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-600 rounded-md focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-2">
            Branch:
          </label>
          <input
            type="text"
            name="branch"
            value={educationData.branch}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-600 rounded-md focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-2">
            Course Duration (years):
          </label>
          <input
            type="text"
            name="course_duration_years"
            value={educationData.course_duration_years}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-600 rounded-md focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-2">
            Current Year:
          </label>
          <input
            type="text"
            name="current_year"
            value={educationData.current_year}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-600 rounded-md focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-2">
            Current Semester:
          </label>
          <input
            type="text"
            name="current_sem"
            value={educationData.current_sem}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-600 rounded-md focus:ring focus:ring-blue-200"
          />
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
            setEducationData({
              // Student Data
              pin_number: '',
              name_of_university: '',
              name_of_collage: '',
              course: '',
              branch: '',
              course_duration_years: '',
              current_year: '',
              current_sem: '',
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

export default StudentEducationForm;
