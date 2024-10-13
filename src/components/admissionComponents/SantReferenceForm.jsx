import React, { useState } from 'react';
import axios from 'axios';

const SantReferenceForm = () => {
    const [santReference, setSantReference] = useState({
        pin_number: '',
        name_of_sant: '',
        sant_phone_number: '',
    });

    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setSantReference({ ...santReference, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMessage('');
        setErrorMessage('');
        try {
            const response = await axios.post('http://localhost:5000/api/admission/addSantReference', santReference);
            console.log(response.data);
            setSuccessMessage('Sant Reference data added successfully!');
        } catch (error) {
            console.error("error submitting sant reference data:", error);
            setErrorMessage('Error, Try again!');
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="mb-10 max-w-xl mx-auto bg-slate-300 p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-700">Add Sant Reference</h2>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Pin Number:</label>
                    <input
                        type="number"
                        name="pin_number"
                        value={santReference.pin_number}
                        onChange={handleChange}
                        required
                        className="w-full border-gray-600 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Name of Sant:</label>
                    <input
                        type="text"
                        name="name_of_sant"
                        value={santReference.name_of_sant}
                        onChange={handleChange}
                        required
                        className="w-full border-gray-600 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Sant Phone Number:</label>
                    <input
                        type="number"
                        name="sant_phone_number"
                        value={santReference.sant_phone_number}
                        onChange={handleChange}
                        required
                        className="w-full border-gray-600 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    onClick={() => setSantReference({
                        // Student Data
                        pin_number: '',
                        name_of_sant: '',
                        sant_phone_number: '',
                    })}>
                    Cancel
                </button>
                {successMessage && (
                    <p className="bg-green-100 text-green-800 border border-green-200 rounded-md p-4 my-4 text-center font-medium shadow-md">
                        {successMessage}
                    </p>
                )}
                {errorMessage && (
                    <p className="bg-red-100 text-red-800 border border-red-200 rounded-md p-4 my-4 text-center font-medium shadow-md">
                        {errorMessage}
                    </p>
                )}
            </form>
        </>
    );
};

export default SantReferenceForm;