// App.js
import React, { useState } from 'react';
import { storage, db, ref, uploadBytes, getDownloadURL, collection, addDoc } from '../../firebase/firebase';
import './picture.css';

export const Picture=()=> {
  const [showAdditional, setShowAdditional] = useState(false);
  const [primaryImageUrl, setPrimaryImageUrl] = useState('');
  const [additionalImages, setAdditionalImages] = useState({});

  const uploadToFirebase = async (file, folder) => {
    const storageRef = ref(storage, `${folder}/${file.name}`);
    await uploadBytes(storageRef, file); // Upload to Firebase Storage
    return await getDownloadURL(storageRef); // Get the download URL
  };

  const handlePrimaryImageUpload = async (e) => {
    e.preventDefault();
    const fileInput = document.getElementById('file-upload-1');
    const file = fileInput.files[0];

    try {
      const url = await uploadToFirebase(file, 'primary-images');
      setPrimaryImageUrl(url);

      // Save the image URL to Firestore
      await addDoc(collection(db, 'images'), { primaryImageUrl: url });
      alert('Primary Image Uploaded Successfully!');
      setShowAdditional(true); // Show additional image inputs
    } catch (error) {
      console.error('Error uploading primary image:', error);
    }
  };

  const handleAdditionalImagesUpload = async (e) => {
    e.preventDefault();
    const fileInputs = ['file-upload-2', 'file-upload-3', 'file-upload-4'];
    const uploadedUrls = {};

    try {
      for (const id of fileInputs) {
        const fileInput = document.getElementById(id);
        const file = fileInput.files[0];
        const url = await uploadToFirebase(file, 'additional-images');
        uploadedUrls[id] = url;
      }

      setAdditionalImages(uploadedUrls);

      // Save the additional image URLs to Firestore
      await addDoc(collection(db, 'images'), { additionalImages: uploadedUrls });
      alert('Additional Images Uploaded Successfully!');
    } catch (error) {
      console.error('Error uploading additional images:', error);
    }
  };

  // Preview image when selected
  const previewImage = (fileInputId, imagePreviewId) => {
    const fileInput = document.getElementById(fileInputId);
    const imagePreview = document.getElementById(imagePreviewId);
    const errorMessage = document.getElementById('error-message');

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      imagePreview.style.backgroundImage = `url(${e.target.result})`;
      errorMessage.style.display = 'none'; // Hide error message on valid input
    };

    if (file) reader.readAsDataURL(file);
    else imagePreview.style.backgroundImage = 'url(default-placeholder.png)'; // Reset to default
  };

  // Validate primary image before submission
  const validatePrimaryImage = (e) => {
    e.preventDefault();
    const fileInput = document.getElementById('file-upload-1');
    const filePath = fileInput.value;
    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
    const errorMessage = document.getElementById('error-message');

    if (!allowedExtensions.exec(filePath)) {
      errorMessage.style.display = 'block'; // Show error message
    } else {
      errorMessage.style.display = 'none'; 
      setShowAdditional(true); // Show additional image inputs
    }
  };

  const validateAdditionalImages = (e) => {
    e.preventDefault();
    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
    const errorMessage = document.getElementById('error-message-additional');

    const isValid = ['file-upload-2', 'file-upload-3', 'file-upload-4'].every(
      (id) => allowedExtensions.exec(document.getElementById(id).value)
    );

    if (!isValid) {
      errorMessage.style.display = 'block';
    } else {
      alert('All images uploaded successfully!');
    }
  };

  return (
    <div className="form-container">
      <h1>Upload Your Images</h1>
      <div className="profile-image-container">
        <div id="image-preview-1" className="profile-image" />
      </div>

      <form onSubmit={handlePrimaryImageUpload}>
        <label htmlFor="file-upload-1">Choose Profile Image</label>
        <input
          type="file"
          id="file-upload-1"
          name="primary-image"
          accept="image/*"
          required
          onChange={() => previewImage('file-upload-1', 'image-preview-1')}
        />
        <small>Accepted formats: JPG, JPEG, PNG, GIF</small>
        <div id="error-message">Please upload a valid image file.</div>
        <button type="submit">Upload Profile Image</button>
      </form>

      {showAdditional && (
        <form onSubmit={handleAdditionalImagesUpload}>
          <div className="profile-image-container">
            <div id="image-preview-2" className="profile-image" />
            <div id="image-preview-3" className="profile-image" />
            <div id="image-preview-4" className="profile-image" />
          </div>

          <label htmlFor="file-upload-2">Choose Additional Image 1</label>
          <input
            type="file"
            id="file-upload-2"
            name="additional-image-1"
            accept="image/*"
            required
            onChange={() => previewImage('file-upload-2', 'image-preview-2')}
          />

          <label htmlFor="file-upload-3">Choose Additional Image 2</label>
          <input
            type="file"
            id="file-upload-3"
            name="additional-image-2"
            accept="image/*"
            required
            onChange={() => previewImage('file-upload-3', 'image-preview-3')}
          />

          <label htmlFor="file-upload-4">Choose Additional Image 3</label>
          <input
            type="file"
            id="file-upload-4"
            name="additional-image-3"
            accept="image/*"
            required
            onChange={() => previewImage('file-upload-4', 'image-preview-4')}
          />

          <div id="error-message-additional">
            Please upload valid image files for all additional images.
          </div>
          <button type="submit">Upload Additional Images</button>
        </form>
      )}
    </div>
  );
}

