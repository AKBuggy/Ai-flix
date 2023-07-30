import React from 'react';
import axios from 'axios';

const DeleteAllVideosButton = () => {
  const handleDeleteAllVideos = () => {
    axios.delete('http://127.0.0.1:8000/delete_all_videos/')
      .then((response) => {
        // Trigger page reload after successful upload
        window.location.reload();
        console.log(response.data.message);
      })
      .catch((error) => {
        console.error('Error deleting all videos:', error);
      });
  };

  return (
    <div className="mt-6">
      <button
        onClick={handleDeleteAllVideos}
        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded shadow"
      >
        Delete All Videos
      </button>
    </div>
  );
};

export default DeleteAllVideosButton;
