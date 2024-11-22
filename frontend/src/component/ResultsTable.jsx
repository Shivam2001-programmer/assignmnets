import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

function ResultsTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from the GET API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/get-insight');
        setData(response.data.sections);
      } catch (error) {
        console.error('Error fetching insights:', error);
        Swal.fire('Error', 'Failed to fetch data. Please try again later.', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle delete operation
  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this item? This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:5000/api/v1/${id}`);
          setData((prevData) => prevData.filter((item) => item.id !== id));
          Swal.fire('Deleted!', 'The item has been deleted.', 'success');
        } catch (error) {
          console.error('Error deleting insight:', error);
          Swal.fire('Error', 'Failed to delete the item. Please try again.', 'error');
        }
      }
    });
  };

  // Handle toggle favorite operation
  const handleToggleFavorite = async (id) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/v1/${id}/favorite`);
      setData((prevData) =>
        prevData.map((item) =>
          item.id === id ? { ...item, isFavorite: response.data.insight.isFavorite } : item
        )
      );
      Swal.fire(
        'Success!',
        `The item has been ${response.data.insight.isFavorite ? 'marked as favorite' : 'unfavorited'}.`,
        'success'
      );
    } catch (error) {
      console.error('Error toggling favorite status:', error);
      Swal.fire('Error', 'Failed to update the favorite status. Please try again.', 'error');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
      <h2 className="text-lg font-semibold mb-4">Results</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Web Link</th>
            <th className="border border-gray-300 p-2">Domain Name</th>
            <th className="border border-gray-300 p-2">Word Count</th>
            <th className="border border-gray-300 p-2">Favorite</th>
            <th className="border border-gray-300 p-2">Media Links</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="text-center">
              
              <td className="border border-gray-300 p-2">{item.domainName}</td>
              <td className="border border-gray-300 p-2">
                <a
                  href={item.webLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {item.webLink}
                </a>
              </td>
              <td className="border border-gray-300 p-2">{item.wordCount}</td>
              <td className="border border-gray-300 p-2">{item.isFavorite ? 'Yes' : 'No'}</td>
              <td className="border border-gray-300 p-2">
                {item.mediaLinks.map((media) => (
                  <div key={media._id}>
                    <a
                      href={media.url}
                      className="text-blue-500 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {media.type}
                    </a>
                  </div>
                ))}
              </td>
              <td className="border border-gray-300 p-2">
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                >
                  Remove
                </button>
                <button
                  onClick={() => handleToggleFavorite(item.id)}
                  className={`${
                    item.isFavorite ? 'bg-yellow-500' : 'bg-green-500'
                  } text-white px-2 py-1 rounded-md ml-2 hover:bg-opacity-80`}
                >
                  {item.isFavorite ? 'Unfavorite' : 'Favorite'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ResultsTable;
