import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import ClassroomCard from '../components/ClassroomCard';
import AddClassroomForm from '../components/AddClassroomForm';
import { useLoadingUpdate } from '../context/LoadingContext';
import { useGeneralMsgUpdate } from '../context/GenralMsgContext';
import { fetchMyClassrooms } from '../services/classroomService';

const MyClassrooms = () => {
  const { user } = useAuth();
  const userId = user?._id;
  const [ownedClassrooms, setOwnedClassrooms] = useState([]);
  const [enrolledClassrooms, setEnrolledClassrooms] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [ownedVisibleCount, setOwnedVisibleCount] = useState(4);
  const [enrolledVisibleCount, setEnrolledVisibleCount] = useState(4);

  const setLoading = useLoadingUpdate();
  const updateGeneralMsg = useGeneralMsgUpdate();

  useEffect(() => {
    const loadClassrooms = async () => {
      if (userId) {
        setLoading(true);
        try {
          const { ownedClassrooms: owned = [], enrolledClassrooms: enrolled = [] } = await fetchMyClassrooms(userId);
          setOwnedClassrooms(owned);
          setEnrolledClassrooms(enrolled);
        } catch (err) {
          updateGeneralMsg('An error occurred while fetching classrooms.', 'error');
        } finally {
          setLoading(false);
        }
      }
    };

    loadClassrooms();
  }, [userId]);

  const handleAddClassroom = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleShowMoreOwned = () => {
    setOwnedVisibleCount((prevCount) => prevCount + 4);
  };

  const handleShowMoreEnrolled = () => {
    setEnrolledVisibleCount((prevCount) => prevCount + 4);
  };

  // Optimization: reverse and slice once for better performance
  const visibleOwnedClassrooms = [...ownedClassrooms].reverse().slice(0, ownedVisibleCount);
  const visibleEnrolledClassrooms = [...enrolledClassrooms].reverse().slice(0, enrolledVisibleCount);

  return (
    <div className="classrooms-page">
      {showForm && <AddClassroomForm onClose={handleCloseForm} />}

      <h1>Classroom Overview</h1>

      {/* Owned Classrooms Section */}
      <section className="owned-classrooms">
        <div className="section-header">
          <h2>Owned Classrooms</h2>
          <button className="add-classroom-button" onClick={handleAddClassroom}>+ Add</button>
        </div>

        {ownedClassrooms.length > 0 ? (
          <div  className='classroom-list-container'>
            <div className="classroom-list">
              {visibleOwnedClassrooms.map((classroom, index) => (
                <ClassroomCard key={classroom._id} classroom={classroom} index={index}/>
              ))}
            </div>
          </div>
          
        ) : (
          <p>You do not own any classrooms.</p>
        )}

        {/* Show 'View More' button if there are more classrooms to display */}
        {ownedVisibleCount < ownedClassrooms.length && (
          <button className="btn-view-more btn" onClick={handleShowMoreOwned}>View More</button>
        )}
      </section>

      {/* Enrolled Classrooms Section */}
      <section className="enrolled-classrooms">
        <div className="section-header">
          <h2>Enrolled Classrooms</h2>
        </div>

        {enrolledClassrooms.length > 0 ? (
          <div  className='classroom-list-container'>
            <div className="classroom-list">
              {visibleEnrolledClassrooms.map((classroom, index) => (
                <ClassroomCard key={classroom._id} classroom={classroom} index={index + 4}/>
              ))}
            </div>
          </div>
        ) : (
          <p>You are not enrolled in any classrooms.</p>
        )}

        {/* Show 'View More' button if there are more classrooms to display */}
        {enrolledVisibleCount < enrolledClassrooms.length && (
          <button className="btn-view-more btn" onClick={handleShowMoreEnrolled}>View More</button>
        )}
      </section>
    </div>
  );
};

export default MyClassrooms;