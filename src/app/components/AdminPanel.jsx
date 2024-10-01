'use client';
import React, { useState, useEffect } from 'react';

const AdminPanel = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [uploadedImages, setUploadedImages] = useState([]); // Initialize as an array
    const [uploadResponse, setUploadResponse] = useState(null);


    const handleFileChange = (e) => {
        const files = Array.from(e.target.files).map(file => ({
            file,
            description: '',
            price: 0,
        }));
        setSelectedFiles(files);
    };

    const handleMetadataChange = (index, key, value) => {
        setSelectedFiles((prevFiles) =>
            prevFiles.map((fileData, i) =>
                i === index ? { ...fileData, [key]: value } : fileData
            )
        );
    };

    const handleUpload = async () => {
        const formData = new FormData();
        selectedFiles.forEach((fileData) => {
            formData.append('files', fileData.file);
            formData.append('descriptions', fileData.description); 
            formData.append('prices', fileData.price);
        });

        try {
            const response = await fetch('http://localhost:8000/ingest/', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                setUploadedImages((prevImages) => [...prevImages, ...result.images]); // Update state with new images
                setUploadResponse(result.message);
            } else {
                setUploadResponse('Failed to upload images');
            }
        } catch (error) {
            console.error('Error uploading images:', error);
            setUploadResponse('Failed to upload images');
        }
    };

    const handleDelete = async (imageId) => {
        try {
            const response = await fetch(`http://localhost:8000/images/delete/${imageId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setUploadedImages(uploadedImages.filter(image => image.id !== imageId)); // Remove the image from the state
            } else {
                console.error('Failed to delete image');
            }
        } catch (error) {
            console.error('Error deleting image:', error);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Admin Panel</h1>

            {/* File Selection */}
            <input type="file" multiple onChange={handleFileChange} />
            {selectedFiles.map((fileData, index) => (
                <div key={index} style={{ marginTop: '10px' }}>
                    <p>{fileData.file.name}</p>
                    <input
                        type="text"
                        placeholder="Description"
                        value={fileData.description}
                        onChange={(e) => handleMetadataChange(index, 'description', e.target.value)}
                        style={{ marginRight: '10px' }}
                    />
                    <input
                        type="number"
                        placeholder="Price"
                        value={fileData.price}
                        onChange={(e) => handleMetadataChange(index, 'price', parseFloat(e.target.value) || 0)}
                    />
                </div>
            ))}

            {/* Upload Button */}
            <button onClick={handleUpload} style={{ marginTop: '20px' }}>Upload Images</button>
            {uploadResponse && <p>{uploadResponse}</p>}

            {/* Uploaded Images Section */}
            <h2>Uploaded Images</h2>
            <div>
                {uploadedImages.length > 0 ? (
                    uploadedImages.map((image) => (
                        <div key={image.id} style={{ border: '1px solid black', padding: '10px', marginTop: '10px' }}>
                            <img src={`http://localhost:8000/images/${image.file_name}`} alt={image.description} width="100" />
                            <p>{image.description}</p>
                            <p>Price: {image.price}</p>
                            <button onClick={() => handleDelete(image.id)}>Delete</button>
                        </div>
                    ))
                ) : (
                    <p>No images uploaded yet</p>
                )}
            </div>
        </div>
    );
};

export default AdminPanel;