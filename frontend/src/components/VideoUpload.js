import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const VideoUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('video_file', selectedFile);

    const csrfToken = Cookies.get('csrftoken'); // Get the CSRF token from the cookie

    axios
      .post('http://127.0.0.1:8000/upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-CSRFToken': csrfToken, // Include the CSRF token in the request header
        },
      })
      .then((response) => {
        console.log('Video uploaded successfully!', response.data);
        // Trigger page reload after successful upload
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error uploading video:', error);
      });
  };

  return (
    <div className="bg-gradient-to-r from-red-900 from-5% via-purple-950 via-30% to-black to-90% py-3 px-2 rounded-lg shadow-lg">
      <div className="flex items-center justify-center">
        <div className="w-8 h-8 rounded-full bg-white mr-2">
          <svg
            className="w-4 h-4 text-purple-600 mx-auto my-1.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        <div className="text-white text-sm font-semibold mr-2">Upload Your Video</div>
        <input
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          className="hidden"
          id="file-input"
        />
        <label
          htmlFor="file-input"
          className="px-4 py-1 bg-purple-700 rounded-lg cursor-pointer hover:bg-purple-800 transition duration-200 text-white text-xs mr-2"
        >
          Choose File
        </label>
        <button
          onClick={handleUpload}
          className="px-4 py-1 bg-indigo-800 text-white rounded-lg hover:bg-indigo-900 transition duration-200 text-xs"
        >
          Upload Video
        </button>
      </div>
    </div>
  );
};

export default VideoUpload;
