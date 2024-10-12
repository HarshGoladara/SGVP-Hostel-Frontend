import React, { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase_config/firebase'; // Import Firebase storage from the firebase.js file

const PhotoUpload = () => {
  const [file, setFile] = useState(null);  // State to store selected file
  const [pinNumber, setPinNumber] = useState(''); // State to store pin number
  const [url, setUrl] = useState('');  // State to store download URL
  const [progress, setProgress] = useState(0);  // State to track upload progress

  // Handle file input change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle pin number input change
  const handlePinChange = (e) => {
    setPinNumber(e.target.value);
  };

  // Handle file upload
  const handleUpload = () => {
    if (!file || !pinNumber) return;

    // Create a storage reference with the pin number as folder
    const storageRef = ref(storage, `students/${pinNumber}/${file.name}`);

    // Upload the file
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Track upload progress
    uploadTask.on('state_changed',
      (snapshot) => {
        const progressPercent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progressPercent);  // Update progress state
      },
      (error) => {
        console.error('Upload failed:', error);
      },
      () => {
        // Get the download URL after upload completes
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUrl(downloadURL);  // Store the download URL
          console.log('File available at:', downloadURL);
        });
      }
    );
  };

  return (
    <div>
      <h2>Upload Student Photo</h2>
      <input
        type="text"
        placeholder="Enter Student Pin Number"
        value={pinNumber}
        onChange={handlePinChange}  // Input for pin number
      />
      <input type="file" onChange={handleFileChange} />  // Input for file
      <button onClick={handleUpload}>Upload</button>
      <p>Upload Progress: {progress}%</p>
      {url && (
        <p>
          Photo URL: <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
        </p>
      )}
    </div>
  );
};

export default PhotoUpload;
