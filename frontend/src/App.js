import React, { useEffect, useState } from 'react';
import VideoPlayer from "./components/VideoPlayer";
import VideoUpload from "./components/VideoUpload";
import axios from 'axios';
import DeleteAllVideosButton from './components/DeleteAllVideosButton';
import Navbar from './components/Navbar';

const App = () => {
  const [videoData, setVideoData] = useState([]);

  useEffect(() => {
    // Fetch the video data from Django backend and set it in state
    axios.get('http://127.0.0.1:8000/get_video/').then((response) => {
      setVideoData(response.data);
    });
  }, []);

  return (
    <div className="bg-gradient-to-bl from-red-900 from-5% via-purple-950 via-20% to-black to-95% text-white min-h-screen">
      <Navbar />
      <div className="container mx-auto p-8">
        <VideoUpload />
        <div className="flex flex-wrap justify-start mt-8">
          {videoData.map((video) => (
            <div key={video.id} className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3 px-2">
              <VideoPlayer videoUrl={'http://127.0.0.1:8000/' + video.video_file} videoId={video.id} />
            </div>
          ))}
        </div>
        <DeleteAllVideosButton />
      </div>
    </div>
  );
};

export default App;
