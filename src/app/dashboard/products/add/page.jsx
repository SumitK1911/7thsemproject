'use client';
import React, { useState, useEffect } from 'react';

const page = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [uploadedImages, setUploadedImages] = useState([]);
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
                setUploadedImages((prevImages) => [...prevImages, ...result.images]);
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
                setUploadedImages(uploadedImages.filter(image => image.id !== imageId));
            } else {
                console.error('Failed to delete image');
            }
        } catch (error) {
            console.error('Error deleting image:', error);
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

            {/* File Selection */}
            <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="mb-4 p-2 border border-gray-300 rounded-lg"
            />
            {selectedFiles.map((fileData, index) => (
                <div key={index} className="mb-4 p-4 border border-gray-300 rounded-lg bg-white shadow-sm">
                    <p className="font-semibold">{fileData.file.name}</p>
                    <div className="mt-2 flex gap-4">
                        <input
                            type="text"
                            placeholder="Description"
                            value={fileData.description}
                            onChange={(e) => handleMetadataChange(index, 'description', e.target.value)}
                            className="flex-1 p-2 border border-gray-300 rounded-lg"
                        />
                        <input
                            type="number"
                            placeholder="Price"
                            value={fileData.price}
                            onChange={(e) => handleMetadataChange(index, 'price', parseFloat(e.target.value) || 0)}
                            className="w-24 p-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                </div>
            ))}

            {/* Upload Button */}
            <button
                onClick={handleUpload}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
            >
                Upload Images
            </button>
            {uploadResponse && <p className="mt-4 text-green-500">{uploadResponse}</p>}

            {/* Uploaded Images Section */}
            <h2 className="text-2xl font-semibold mt-8 mb-4">Uploaded Images</h2>
            <div>
                {uploadedImages.length > 0 ? (
                    uploadedImages.map((image) => (
                        <div
                            key={image.id}
                            className="mb-4 p-4 border border-gray-300 rounded-lg bg-white shadow-sm"
                        >
                            <img
                                src={`http://localhost:8000/images/${image.file_name}`}
                                alt={image.description}
                                className="w-32 h-32 object-cover mb-2 rounded"
                            />
                            <p className="font-semibold">{image.description}</p>
                            <p>Price: ${image.price.toFixed(2)}</p>
                            <button
                                onClick={() => handleDelete(image.id)}
                                className="mt-2 bg-red-500 text-white px-3 py-1 rounded-lg shadow hover:bg-red-600 transition"
                            >
                                Delete
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No images uploaded yet</p>
                )}
            </div>
        </div>
    );
};

export default page;
