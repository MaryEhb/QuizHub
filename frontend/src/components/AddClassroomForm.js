import React, { useState } from 'react';
import { useGeneralMsgUpdate } from '../context/GenralMsgContext';
import { useAuth, useAuthUpdate } from '../context/AuthContext';
import { addClassroom } from '../services/classroomService';
import { IoIosArrowBack } from "react-icons/io";

// Get the character limits from environment variables
const TITLE_LIMIT = parseInt(process.env.REACT_APP_CLASSROOM_TITLE_LIMIT, 10);
const DESCRIPTION_LIMIT = parseInt(process.env.REACT_APP_CLASSROOM_DESCRIPTION_LIMIT, 10);

const AddClassroomForm = ({ onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [submitloading, setSubmitLoading] = useState(false);
  const setGeneralMsg = useGeneralMsgUpdate();
  const updateUser = useAuthUpdate();
  const { user } = useAuth();


  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitLoading(true);

    try {
      const response = await addClassroom(title, description, isPublic);
      console.log(response)

      const newClassroom = {
        id: response.data,
        title,
        description,
        isPublic,
        membersCount: 0,
        testsCount: 0,
        maxScore: 0,
      };

      const updatedUser = {
        ...user,
        ownedClassrooms: [...user.ownedClassrooms, newClassroom],
      };

      updateUser(updatedUser);
      setGeneralMsg('Classroom created successfully', 'success');
      onClose();
    
    } catch (error) {
      setGeneralMsg( error, 'error');
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="add-classroom-form">
      <div className="form-container">
        <button className="close-button" onClick={onClose}><IoIosArrowBack /></button>
        <h2>Add New Classroom</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={TITLE_LIMIT}
              required
            />
            <div className="char-count">{title.length}/{TITLE_LIMIT}</div>
          </label>
          <label>
            Description:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={DESCRIPTION_LIMIT}
            />
            <div className="char-count">{description.length}/{DESCRIPTION_LIMIT}</div>
          </label>
          <label className='public'>
            <input
              type="checkbox"
              className='public-input'
              checked={isPublic}
              onChange={() => setIsPublic(!isPublic)}
            />Public
          </label>
          <button type="submit" disabled={submitloading}>
            {submitloading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );

};

export default AddClassroomForm;