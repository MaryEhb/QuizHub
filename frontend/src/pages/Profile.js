import React, { useState } from 'react';
import { useAuth, useAuthUpdate } from '../context/AuthContext';
import { updateUserDetails } from '../services/userService';
import { useLoadingUpdate } from '../context/LoadingContext';
import { useGeneralMsgUpdate } from '../context/GenralMsgContext';
import soonImage from '../assets/coming-soon.svg';

const Profile = () => {

  return (
    <div className='profile'>
      <div className='coming-soon'>
        <h2>This page is under construction!</h2>
        <div className='coming-soon-img' style={{ backgroundImage: `url(${soonImage})` }}></div>
        <p>Our team is currently developing this feature. Stay tuned!</p>
      </div>
    </div>
  )

  const { user } = useAuth();
  const updateAuthUser = useAuthUpdate();
  const setLoading = useLoadingUpdate();
  const updateGeneralMsg = useGeneralMsgUpdate();

  const initialFormData = {
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    profileScore: user?.profileScore || 0,
  };

  const [formData, setFormData] = useState(initialFormData);

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const hasDataChanged = () => {
    return (
      formData.firstName !== initialFormData.firstName ||
      formData.lastName !== initialFormData.lastName ||
      formData.email !== initialFormData.email
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!hasDataChanged()) {
      updateGeneralMsg('No changes detected.', 'info');
      setIsEditing(false);
      return;
    }
    try {
      setLoading(true);
      const updatedUser = await updateUserDetails(formData);
      updateAuthUser(updatedUser);
      updateGeneralMsg('Profile updated successfully.', 'success');
      setIsEditing(false);
    } catch (err) {
      updateGeneralMsg('Failed to update profile. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setFormData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      profileScore: user?.profileScore || 0,
    });
  };

  return (
    <div className="profile-page">
      <h1>Profile</h1>
      <p><strong>Profile Score:</strong> {user?.profileScore}</p>

      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-actions">
            <button className='btn btn-success' type="submit">Save</button>
            <button className='btn btn-error' type="button" onClick={handleCancelEdit}>Cancel</button>
          </div>
        </form>
      ) : (
        <div className="profile-details">
          <p><strong>First Name:</strong> {user?.firstName}</p>
          <p><strong>Last Name:</strong> {user?.lastName}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <button className='btn' onClick={handleEditClick}>Edit Profile</button>
        </div>
      )}
    </div>
  );
};

export default Profile;