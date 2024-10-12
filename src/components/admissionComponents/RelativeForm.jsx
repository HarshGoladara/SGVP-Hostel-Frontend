import React, { useState } from 'react';
import axios from 'axios';

const RelativeForm = () => {
    const [relativeData, setRelativeData] = useState({
        pin_number: '',
        relative_name: '',
        relation: '',
        relative_contact_number: '',
        relative_address: '',
    });

    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setRelativeData({ ...relativeData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMessage('');
        setErrorMessage('');
        try {
            const response = await axios.post('http://localhost:5000/api/admission/addRelativeDetails', relativeData);
            console.log(response.data);
            setSuccessMessage('Relative data added successfully!');
        } catch (error) {
            console.error("error submitting relative data:", error);
            setErrorMessage('Error, Try again!');
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="mb-10 max-w-xl mx-auto bg-slate-300 p-8 rounded-lg shadow-lg space-y-6"
            >
                <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
                    Add Relative Details
                </h2>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Pin Number:
                    </label>
                    <input
                        type="number"
                        name="pin_number"
                        value={relativeData.pin_number}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full border border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Relative Name:
                    </label>
                    <input
                        type="text"
                        name="relative_name"
                        value={relativeData.relative_name}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full border border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Relation:
                    </label>
                    <input
                        type="text"
                        name="relation"
                        value={relativeData.relation}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full border border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Relative Contact Number:
                    </label>
                    <input
                        type="number"
                        name="relative_contact_number"
                        value={relativeData.relative_contact_number}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full border border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700">
                        Relative Address:
                    </label>
                    <textarea
                        name="relative_address"
                        value={relativeData.relative_address}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full border border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
                    onClick={() => setRelativeData({
                        // Relative Details
                        pin_number: '',
                        relative_name: '',
                        relation: '',
                        relative_contact_number: '',
                        relative_address: '',
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

export default RelativeForm;
