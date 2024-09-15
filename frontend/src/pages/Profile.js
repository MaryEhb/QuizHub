import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUserDetails, updateUserDetails, changePassword } from '../services/userService';
import { useLoadingUpdate } from '../context/LoadingContext';
import { useGeneralMsgUpdate } from '../context/GenralMsgContext';
import ValidationUtil from '../utils/ValidationUtil';

const Profile = () => {
  const { user } = useAuth();
  const [userDetails, setUserDetails] = useState(null);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  const [isEditing, setIsEditing] = useState(false);
  const [showChangePasswordPrompt, setShowChangePasswordPrompt] = useState(false);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const [passwordErrors, setPasswordErrors] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const setLoading = useLoadingUpdate();
  const updateGeneralMsg = useGeneralMsgUpdate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true);
      try {
        const response = await getUserDetails(user._id); // Fetch user details
        setUserDetails(response);
        setFirstName(response.firstName);
        setLastName(response.lastName);
        setEmail(response.email);
        setGender(response.gender || ''); // Ensure gender handles empty value
        setFollowersCount(response.followers.length);
        setFollowingCount(response.following.length);
      } catch (err) {
        updateGeneralMsg('An error occurred while fetching user details.', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFields = {};

    // Only include fields that have changed
    if (firstName !== userDetails.firstName) {
      updatedFields.firstName = firstName;
    }
    if (lastName !== userDetails.lastName) {
      updatedFields.lastName = lastName;
    }
    if (email !== userDetails.email) {
      updatedFields.email = email;
    }
    if (gender !== userDetails.gender) {
      updatedFields.gender = gender;
    }

    // If no data has changed, return early
    if (Object.keys(updatedFields).length === 0) {
      updateGeneralMsg('No changes detected.', 'info');
      setIsEditing(false);
      return;
    }

    try {
      setLoading(true);
      const updatedUser = await updateUserDetails(updatedFields); // Send only changed fields
      setUserDetails(updatedUser); // Update user details state
      updateGeneralMsg('Profile updated successfully.', 'success');
      setIsEditing(false);
    } catch (err) {
      updateGeneralMsg('Failed to update profile. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const validatePasswords = () => {
    let valid = true;
    const errors = { currentPassword: '', newPassword: '', confirmNewPassword: '' };

    // Check if new password is the same as the current password
    if (newPassword === currentPassword) {
        errors.newPassword = 'New password cannot be the same as the current password.';
        valid = false;
    }

    // Check if new passwords match
    if (newPassword !== confirmNewPassword) {
        errors.confirmNewPassword = 'New passwords do not match.';
        valid = false;
    }

    // Validate new password with ValidationUtil
    if (valid) {
        const newPasswordValidate = ValidationUtil.validatePassword(newPassword);
        if (newPasswordValidate) {
            errors.newPassword = newPasswordValidate;
            valid = false;
        }
    }
    setPasswordErrors(errors);
    return valid;
};


  const handleChangePassword = async () => {
    if (!validatePasswords()) {
      return;
    }

    setLoading(true);
    try {
      await changePassword({ currentPassword, newPassword });
      updateGeneralMsg('Password changed successfully.', 'success');
      setShowChangePasswordPrompt(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
      setPasswordErrors({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
    } catch (err) {
      if (typeof err === 'string') {
        updateGeneralMsg(err, 'error');
      } else {
        updateGeneralMsg('Failed to change password. Please try again.', 'error');
      }      
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setFirstName(userDetails.firstName);
    setLastName(userDetails.lastName);
    setEmail(userDetails.email);
    setGender(userDetails.gender);
  };

  if (!userDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div className="profile-page">
      <h1>Profile</h1>
      <p><strong>Profile Score:</strong> {userDetails.profileScore}</p>
      <p><strong>Followers:</strong> {followersCount}</p>
      <p><strong>Following:</strong> {followingCount}</p>

      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Gender</label>
            <select
              name="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="Not Specified">Not Specified</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="form-actions">
            <button className='btn btn-success' type="submit">Save</button>
            <button className='btn btn-error' type="button" onClick={handleCancelEdit}>Cancel</button>
          </div>
        </form>
      ) : (
        <div className="profile-details">
          <p><strong>First Name:</strong> {userDetails.firstName}</p>
          <p><strong>Last Name:</strong> {userDetails.lastName}</p>
          <p><strong>Email:</strong> {userDetails.email}</p>
          <p><strong>Gender:</strong> {userDetails.gender || 'Not Specified'}</p>
          <button className='btn' onClick={handleEditClick}>Edit Profile</button>
          <button className='btn btn-warning' onClick={() => setShowChangePasswordPrompt(true)}>Change Password</button>
        </div>
      )}

      {/* Change Password Prompt */}
      {showChangePasswordPrompt && (
        <div className="prompt-container">
          <div className="prompt-background" onClick={() => setShowChangePasswordPrompt(false)}></div>
          <div className="prompt">
            <h2>Change Password</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleChangePassword(); }}>
              <div className="form-group">
                <label>Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
                {passwordErrors.currentPassword && <span className="error-msg">{passwordErrors.currentPassword}</span>}
              </div>
              <div className="form-group">
                <label>New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                {passwordErrors.newPassword && <span className="error-msg">{passwordErrors.newPassword}</span>}
              </div>
              <div className="form-group">
                <label>Confirm New Password</label>
                <input
                  type="password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  required
                />
                {passwordErrors.confirmNewPassword && <span className="error-msg">{passwordErrors.confirmNewPassword}</span>}
              </div>
              <div className="form-actions">
                <button className='btn btn-success' type="submit">Change Password</button>
                <button className='btn btn-error' type="button" onClick={() => setShowChangePasswordPrompt(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;