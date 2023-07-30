import React from 'react';
import logo from '../assets/Aiflix_Logo.png'; // Assuming your image is named "ai-flix.png"

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-br from-red-900 from-5% via-purple-950 via-30% to-black to-90% text-white py-4 px-8 md:px-16">
      <div className="container mx-auto flex items-center justify-between" style={{ height: "100%", maxHeight: "36px" }}>
        <div className="flex items-center -mr-40 cursor-pointer">
          <img src={logo} alt="AI FLIX Logo" className="w-36 h-36 md:w-48 md:h-36" />
          {/* <h1 className="text-xl font-bold cursor-pointer">AI FLIX</h1> */}
        </div>
        <div className="md:flex items-center space-x-4 hidden" style={{ flex: "1", justifyContent: "center" }}>
          {/* Added inline styles with flex properties */}
          <a href="#" className="hover:text-yellow-500">Home</a>
          <a href="#" className="hover:text-yellow-500">Videos</a>
          <a href="#" className="hover:text-yellow-500">Categories</a>
          <a href="#" className="hover:text-yellow-500">About</a>
        </div>
        {/* <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">
          <h1>To The Future</h1>
        </button> */}
        <button className="md:hidden">
          <i className="fas fa-bars"></i>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
