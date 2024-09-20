// UserController: Handles user-related operations such as fetching and updating
// user profiles, retrieving user information by ID, and managing user data.
import User from '../model/User.js';
import Classroom from '../model/Classroom.js';

class UserController {
  // Get the currently authenticated user's info
  static async getCurrentUser(req, res) {
    try {
      const userId = req.user.id;
      res.status(200).json({_id: userId});
    } catch (error) {
      console.error('Error fetching current user:', error);
      res.status(500).json({ message: 'Server error', error });
    }
  }

  // Get user information by a list of IDs
  static async getUserInfoByIds(req, res) {
    try {
      const { ids } = req.body; // Expecting an array of user IDs

      if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ message: 'No user IDs provided' });
      }

      const users = await User.find({ _id: { $in: ids } })
        .select('firstName lastName profilePicture');

      res.json(users);
    } catch (err) {
      console.error('Error fetching users by IDs:', err); // Log error details
      res.status(500).json({ error: err.message });
    }
  }

  // Get the currently authenticated user's profile
  static async getUserProfile(req, res) {
    try {
      const user = req.user; // Extract user from authenticated request

      // Return only the necessary fields for the profile
      const profileData = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        gender: user.gender || '',
        profileScore: user.profileScore,
        followers: user.followers.length, // Just return the count of followers
        following: user.following.length, // Just return the count of following
      };

      res.status(200).json(profileData);
    } catch (error) {
      console.error('Error fetching user profile:', error); // Log error details
      res.status(500).json({ message: 'Server error', error });
    }
  }

// Update the currently authenticated user's profile
static async updateUserProfile(req, res) {
  try {
    const user = req.user; // Extract user from authenticated request
    const updates = req.body; // Expecting update data in the request body

    // Only update allowed fields (e.g., firstName, lastName, email, gender)
    if (updates.firstName) user.firstName = updates.firstName;
    if (updates.lastName) user.lastName = updates.lastName;
    if (updates.email) user.email = updates.email;
    if (updates.gender) user.gender = ( updates.gender === 'Not Specified'? '' : updates.gender);

    // Save the updated user information
    await user.save();

    // Return the updated user profile data (or just the necessary fields)
    const updatedProfile = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      gender: user.gender,
      profileScore: user.profileScore,
      followers: user.followers.length,
      following: user.following.length,
    };

    res.status(200).json(updatedProfile);
  } catch (error) {
    console.error('Error updating user profile:', error); // Log error details
    res.status(500).json({ message: 'Server error', error });
  }
}

}

export default UserController;