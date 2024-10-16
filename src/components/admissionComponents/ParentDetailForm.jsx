import React, { useState } from 'react';
import axios from 'axios';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase_config/firebase'; // Adjust the import according to your file structure


const ParentDetailForm = () => {
    const [parentData, setParentData] = useState({
        pin_number: '',
        father_name: '',
        father_contact_number: '',
        father_email: '',
        father_photo_url: '', // Change to hold file
        mother_name: '',
        mother_contact_number: '',
        mother_photo_url: '', // Change to hold file
        approval_person_name: '',
        approval_person_contact: '',
        approval_person_relation: '',
        approval_person_email: '',
    });

    const [photoFile, setPhotoFile] = useState({
        fatherPhotoFile: null,
        motherPhotoFile: null,
    });

    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    // Handle input change for text inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setParentData({ ...parentData, [name]: value });
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
                    reject(error);
                },
                async () => {
                    try {
                        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                        resolve(downloadURL);
                    } catch (error) {
                        reject(error);
                    }
                }
            );
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMessage('');
        setErrorMessage('');
        try {
            // Upload father photo to Firebase and get the URL
            let fatherPhotoUrl = '';
            if (photoFile.fatherPhotoFile) {
                fatherPhotoUrl = await uploadImage(photoFile.fatherPhotoFile, `students/${parentData.pin_number}/father_photo`);
            }

            // Upload mother photo to Firebase and get the URL
            let motherPhotoUrl = '';
            if (photoFile.motherPhotoFile) {
                motherPhotoUrl = await uploadImage(photoFile.motherPhotoFile, `students/${parentData.pin_number}/mother_photo`);
            }

            // console.log(fatherPhotoUrl, motherPhotoUrl);

            // Update form data with the URLs
            const updatedParentData = {
                ...parentData,
                father_photo_url: fatherPhotoUrl,
                mother_photo_url: motherPhotoUrl,
            };

            // Submit the form data along with image URLs to the server
            const response = await axios.post('http://localhost:5000/api/admission/addParentsdetails', updatedParentData);
            console.log('Parent data added successfully:', response.data);
            setSuccessMessage('Parent data added successfully!');
        } catch (error) {
            console.error('Error submitting Parent data:', error);
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
                className="mb-10 max-w-2xl mx-auto bg-slate-300 p-8 rounded-lg shadow-lg space-y-6"
            >
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Add Parent Details</h2>

                {/* Pin Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col">
                        <label className="mb-1 text-gray-600 font-medium">Pin Number:</label>
                        <input
                            type="number"
                            name="pin_number"
                            value={parentData.pin_number}
                            onChange={handleChange}
                            className="px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Father Section */}
                    <div className="flex flex-col">
                        <label className="mb-1 text-gray-600 font-medium">Father Name:</label>
                        <input
                            type="text"
                            name="father_name"
                            value={parentData.father_name}
                            onChange={handleChange}
                            className="px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 text-gray-600 font-medium">Father Contact Number:</label>
                        <input
                            type="number"
                            name="father_contact_number"
                            value={parentData.father_contact_number}
                            onChange={handleChange}
                            className="px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 text-gray-600 font-medium">Father Email:</label>
                        <input
                            type="email"
                            name="father_email"
                            value={parentData.father_email}
                            onChange={handleChange}
                            className="px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Father Photo URL */}
                    <div className="flex flex-col">
                        <label className="mb-1 text-gray-600 font-medium">Father Photo:</label>
                        <input
                            type="file"
                            name="fatherPhotoFile"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="text-black px-4 py-2 bg-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Mother Section */}
                    <div className="flex flex-col">
                        <label className="mb-1 text-gray-600 font-medium">Mother Name:</label>
                        <input
                            type="text"
                            name="mother_name"
                            value={parentData.mother_name}
                            onChange={handleChange}
                            className="px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 text-gray-600 font-medium">Mother Contact Number:</label>
                        <input
                            type="number"
                            name="mother_contact_number"
                            value={parentData.mother_contact_number}
                            onChange={handleChange}
                            className="px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Mother Photo URL */}
                    <div className="flex flex-col">
                        <label className="mb-1 text-gray-600 font-medium">Mother Photo:</label>
                        <input
                            type="file"
                            name="motherPhotoFile"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="text-black px-4 py-2 bg-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                </div>

                {/* Approval Person Section */}
                <h3 className="text-xl font-semibold text-gray-700 mt-6">Approval Person Details</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col">
                        <label className="mb-1 text-gray-600 font-medium">Approval Person Name:</label>
                        <input
                            type="text"
                            name="approval_person_name"
                            value={parentData.approval_person_name}
                            onChange={handleChange}
                            className="px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 text-gray-600 font-medium">Approval Person Contact:</label>
                        <input
                            type="number"
                            name="approval_person_contact"
                            value={parentData.approval_person_contact}
                            onChange={handleChange}
                            className="px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 text-gray-600 font-medium">Approval Person Relation:</label>
                        <input
                            type="text"
                            name="approval_person_relation"
                            value={parentData.approval_person_relation}
                            onChange={handleChange}
                            className="px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 text-gray-600 font-medium">Approval Person Email:</label>
                        <input
                            type="email"
                            name="approval_person_email"
                            value={parentData.approval_person_email}
                            onChange={handleChange}
                            className="px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
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
                    onClick={() => setParentData({
                        // Parent Details
                        pin_number:'',
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

export default ParentDetailForm;
