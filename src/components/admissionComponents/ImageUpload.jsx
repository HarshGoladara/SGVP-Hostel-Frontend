import { useState } from 'react';

const ImageUpload = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageUrl(URL.createObjectURL(file)); // Preview the selected image
    }
  };

  const handleDownload = () => {
    if (!imageFile) {
      alert('Please select an image first!');
      return;
    }

    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = imageFile.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    alert(`Download the image and move it to "public/images" manually.`);
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {imageUrl && (
        <>
          <img src={imageUrl} alt="Preview" width="200px" />
          <br />
          <button onClick={handleDownload}>
            Download & Move to Public Folder
          </button>
        </>
      )}
    </div>
  );
};

export default ImageUpload;
