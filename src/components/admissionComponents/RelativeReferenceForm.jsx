import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const RelativeReferenceForm = () => {
  const [relativeReference, setRelativeReference] = useState({
    pin_number: '',
    full_name: '',
    relation: '',
    mobile_number: '',
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setRelativeReference({
      ...relativeReference,
      [e.target.name]: e.target.value,
    });
  };

  // Validate form data
  const validateForm = () => {
    const alphabetRegex = /^[A-Za-z\s]+$/;

    if (!relativeReference.pin_number || isNaN(relativeReference.pin_number))
      return 'Pin number is required and should be a number.';

    if (
      !relativeReference.full_name.trim() ||
      !alphabetRegex.test(relativeReference.full_name.trim())
    )
      return 'Full name is required.';

    if (
      !relativeReference.relation.trim() ||
      !alphabetRegex.test(relativeReference.relation.trim())
    )
      return 'Relation is required.';

    if (
      !relativeReference.mobile_number ||
      isNaN(relativeReference.mobile_number) ||
      relativeReference.mobile_number.length !== 10
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
      const response = await axios.post(
        'http://localhost:5000/api/admission/addRelativeReference',
        relativeReference,
      );
      console.log(response.data);
      setSuccessMessage('Relative Reference data added successfully!');
      toast.success('Relative Reference data added successfully!');
    } catch (error) {
      console.error('error submitting relative reference data:', error);
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
        className="mb-10 max-w-xl mx-auto bg-slate-300 p-6 rounded-lg shadow-md space-y-6"
      >
        <h2 className="text-2xl font-semibold text-gray-700">
          Add Relative Reference
        </h2>

        <div className="flex flex-col">
          <label className="mb-1 text-gray-600 font-medium">Pin Number:</label>
          <input
            type="text"
            name="pin_number"
            value={relativeReference.pin_number}
            onChange={handleChange}
            required
            className="px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-gray-600 font-medium">Full Name:</label>
          <input
            type="text"
            name="full_name"
            value={relativeReference.full_name}
            onChange={handleChange}
            required
            className="px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-gray-600 font-medium">Relation:</label>
          <input
            type="text"
            name="relation"
            value={relativeReference.relation}
            onChange={handleChange}
            required
            className="px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-gray-600 font-medium">
            Mobile Number:
          </label>
          <input
            type="text"
            name="mobile_number"
            value={relativeReference.mobile_number}
            onChange={handleChange}
            required
            className="px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
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
            setRelativeReference({
              // Student Data
              pin_number: '',
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

export default RelativeReferenceForm;
