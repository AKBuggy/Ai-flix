import React, { useState } from 'react';
import axios from 'axios';
import { FaThumbsUp, FaThumbsDown, FaDownload } from 'react-icons/fa';

const VideoPlayer = ({ videoUrl, videoId }) => {
  const [upvotes, setUpvotes] = useState(0);
  const [downvotes, setDownvotes] = useState(0);
  const [userVote, setUserVote] = useState(null); // 'upvote', 'downvote', or null (no vote)

  const handleVote = (voteType) => {
    if (userVote === voteType) {
      // If the user clicks the same vote button again, reset the vote
      axios.post(`http://127.0.0.1:8000/reset_vote/${videoId}/`)
        .then(() => {
          setUserVote(null);
          if (voteType === 'upvote') {
            setUpvotes(upvotes - 1);
          } else if (voteType === 'downvote') {
            setDownvotes(downvotes - 1);
          }
        })
        .catch((error) => {
          console.error('Error while resetting vote:', error);
        });
    } else {
      // Vote for the video
      axios.post(`http://127.0.0.1:8000/${voteType}/${videoId}/`)
        .then(() => {
          setUserVote(voteType);
          if (voteType === 'upvote') {
            setUpvotes(upvotes + 1);
            if (userVote === 'downvote') {
              setDownvotes(downvotes - 1);
            }
          } else if (voteType === 'downvote') {
            setDownvotes(downvotes + 1);
            if (userVote === 'upvote') {
              setUpvotes(upvotes - 1);
            }
          }
        })
        .catch((error) => {
          console.error('Error while voting:', error);
        });
    }
  };

  const handleDownload = () => {
    // Send a GET request to initiate the video download
    axios.get(`http://127.0.0.1:8000/download/${videoId}/`, { responseType: 'blob' })
      .then((response) => {
        // Create a temporary download link and click it to trigger the download
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `video_${videoId}.mp4`);
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        console.error('Error while downloading video:', error);
      });
  };

  return (
    <div className="flex justify-center mb-20">
      <div className="w-96">
        <video
          controls
          className="w-full h-auto rounded-lg shadow-lg"
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="flex justify-center mt-4 space-x-4">
          <button
            onClick={() => handleVote('upvote')}
            className={`${
              userVote === 'upvote' ? 'text-green-500' : 'text-gray-500'
            } hover:text-green-500 transition-colors duration-300`}
          >
            <FaThumbsUp className="text-xl" />
          </button>
          <span className="text-gray-500">{upvotes}</span>
          <button
            onClick={() => handleVote('downvote')}
            className={`${
              userVote === 'downvote' ? 'text-red-500' : 'text-gray-500'
            } hover:text-red-500 transition-colors duration-300`}
          >
            <FaThumbsDown className="text-xl" />
          </button>
          <span className="text-gray-500">{downvotes}</span>
          <button
            onClick={handleDownload}
            className="text-gray-500 hover:text-amber-300 transition-colors duration-300"
          >
            <FaDownload className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
