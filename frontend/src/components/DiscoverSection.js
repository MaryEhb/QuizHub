import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchClassrooms } from '../services/classroomService';
import ClassroomCard from './ClassroomCard';

const DiscoverSection = ({ initialPage }) => {
  const [classrooms, setClassrooms] = useState([]);
  const [totalClassrooms, setTotalClassrooms] = useState(0);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageLoading, setPageLoading] = useState(false);
  const classroomsPerPage = 4; // Number of classrooms per page
  const navigate = useNavigate();

  useEffect(() => {
    const loadClassrooms = async () => {
      setPageLoading(true);
      try {
        const { classrooms: fetchedClassrooms, totalClassrooms: total } = await fetchClassrooms(classroomsPerPage, (currentPage - 1) * classroomsPerPage);
        setClassrooms(fetchedClassrooms);
        setTotalClassrooms(total);
      } catch (error) {
        console.error('Error fetching classrooms:', error);
      } finally {
        setPageLoading(false);
      }
    };

    loadClassrooms();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= Math.ceil(totalClassrooms / classroomsPerPage)) {
      setCurrentPage(newPage);
      navigate(`/dashboard/${newPage}`); // Update the URL with the new page number
    }
  };

  return (
    <div className="discover-section">
      <h2>Discover Classrooms</h2>
      {pageLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {classrooms.length === 0 ? (
            <p>No classrooms available.</p>
          ) : (
            <>
              <div className="pagination-controls">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span>Page {currentPage} of {Math.ceil(totalClassrooms / classroomsPerPage)}</span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === Math.ceil(totalClassrooms / classroomsPerPage)}
                >
                  Next
                </button>
              </div>
              <div className="classroom-list">
                {classrooms.map((classroom) => (
                  <ClassroomCard
                    key={classroom._id}
                    classroom={classroom}
                  />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default DiscoverSection;