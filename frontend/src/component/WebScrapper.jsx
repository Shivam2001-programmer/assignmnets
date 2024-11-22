import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function WebpageScraper() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setUrl(e.target.value);
  };

  const handleGetInsights = async () => {
    if (!url) {
      Swal.fire({
        icon: 'error',
        title: 'URL is required',
        text: 'Please enter a URL to get insights.',
      });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/v1/insights', { url });
console.log(response,"response")
      Swal.fire({
        icon: 'success',
        title: 'Insights Retrieved',
       
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error fetching insights',
        text: 'There was an issue retrieving insights for this URL. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 shadow-lg rounded-xl p-8 w-full max-w-md mx-auto">
    <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center border-b-2 border-blue-200 pb-2">
      Webpage Scraper
    </h2>
    <div className="relative mb-6">
      <input
        type="text"
        placeholder="Enter Website URL"
        value={url}
        onChange={handleInputChange}
        className="w-full p-4 text-gray-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-blue-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M15 10l4.586-4.586a2 2 0 112.828 2.828L17.828 12m-2.828-2.828l4.586-4.586M12 9v3.586l-4.586-4.586a2 2 0 10-2.828 2.828L9 13.414V15m0-6H9m2-2h2m-4 2v2m8-2v2m-4-2h-2"
        />
      </svg>
    </div>
    <button
      onClick={handleGetInsights}
      className={`w-full px-4 py-3 text-lg font-semibold text-white rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300 ${
        loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
      }`}
      disabled={loading}
    >
      {loading ? (
        <>
          <span className="loader mr-2"></span>Fetching...
        </>
      ) : (
        'Get Insights'
      )}
    </button>
  </div>
  
  );
}

export default WebpageScraper;
