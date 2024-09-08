import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import ClassroomCard from '../components/ClassroomCard';
import AddClassroomForm from '../components/AddClassroomForm';
import ClassroomView from '../components/ClassroomView';
import { fetchClassroomDetails } from '../services/classroomService';
import { useLoadingUpdate } from '../context/LoadingContext';
import { useGeneralMsgUpdate } from '../context/GenralMsgContext';

const Classrooms = () => {
  const { user } = useAuth();
  const { ownedClassrooms, enrolledClassrooms } = user;

  const [showForm, setShowForm] = useState(false);
  const [ownedVisibleCount, setOwnedVisibleCount] = useState(4);
  const [enrolledVisibleCount, setEnrolledVisibleCount] = useState(4);
  const [selectedClassroomId, setSelectedClassroomId] = useState(null);
  const [classroomDetails, setClassroomDetails] = useState(null);

  const toggleLoading = useLoadingUpdate();
  const updateGeneralMsg = useGeneralMsgUpdate();

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

  const handleClassroomClick = async (classroomId) => {
    setSelectedClassroomId(classroomId);

    toggleLoading(true);
    try {
      const details = await fetchClassroomDetails(classroomId);
      setClassroomDetails(details);
    } catch (err) {
      updateGeneralMsg('Failed to fetch classroom details', 'error');
      handleCloseClassroomView();
    } finally {
      toggleLoading(false);
    }
  };

  const handleCloseClassroomView = () => {
    setSelectedClassroomId(null);
    setClassroomDetails(null);
  };

  return (
    <div className="classrooms-page">
      {showForm && <AddClassroomForm onClose={handleCloseForm} />}

      {classroomDetails && (
        <ClassroomView
          classroomId={selectedClassroomId}
          onClose={handleCloseClassroomView}
          details={classroomDetails}
        />
      )}

      {!classroomDetails && (
        <>
          <h1>Classroom Overview</h1>

          {/* Owned Classrooms Section */}
          <section className="owned-classrooms">
            <div className="section-header">
              <h2>Owned Classrooms</h2>
              <button className="add-classroom-button" onClick={handleAddClassroom}>+ Add</button>
            </div>

            {ownedClassrooms.length > 0 ? (
              <div className="classroom-list">
                {ownedClassrooms
                  .slice(0)
                  .reverse()
                  .slice(0, ownedVisibleCount)
                  .map((classroom) => (
                    <ClassroomCard key={classroom.id} classroom={classroom} onClick={handleClassroomClick} />
                  ))}
              </div>
            ) : (
              <p>You do not own any classrooms.</p>
            )}

            {/* Show 'View More' button if there are more classrooms to display */}
            {ownedVisibleCount < ownedClassrooms.length && (
              <button className="view-more-button" onClick={handleShowMoreOwned}>View More</button>
            )}
          </section>

          {/* Enrolled Classrooms Section */}
          <section className="enrolled-classrooms">
            <h2>Enrolled Classrooms</h2>

            {enrolledClassrooms.length > 0 ? (
              <div className="classroom-list">
                {enrolledClassrooms
                  .slice(0)
                  .reverse()
                  .slice(0, enrolledVisibleCount)
                  .map((classroom) => (
                    <ClassroomCard key={classroom.id} classroom={classroom} onClick={handleClassroomClick} />
                  ))}
              </div>
            ) : (
              <p>You are not enrolled in any classrooms.</p>
            )}

            {/* Show 'View More' button if there are more classrooms to display */}
            {enrolledVisibleCount < enrolledClassrooms.length && (
              <button className="view-more-button" onClick={handleShowMoreEnrolled}>View More</button>
            )}
          </section>       
        </>
      )}
      
    </div>
  );
};

export default Classrooms;