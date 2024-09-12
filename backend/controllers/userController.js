// UserController: Handles user-related operations such as fetching and updating
// user profiles, retrieving user information by ID, and managing user data.
import User from '../model/User.js';
import Classroom from '../model/Classroom.js';

class UserController {
  // Get the currently authenticated user's info
  static async getCurrentUser(req, res) {
    try {
      const user = req.user; // Extract user ID from authenticated request

      // Fetch owned classrooms if any
      const ownedClassrooms = user.ownedClassrooms && user.ownedClassrooms.length > 0
        ? await Classroom.find({ _id: { $in: user.ownedClassrooms } })
            .select('title description isPublic members tests maxScore')
            .populate('members', 'firstName lastName') // Populate members' names
            .populate('tests', 'title')
        : [];

      // Fetch enrolled classrooms if any
      const enrolledClassrooms = user.enrolledClassrooms && user.enrolledClassrooms.length > 0
        ? await Classroom.find({ _id: { $in: user.enrolledClassrooms } })
            .select('title description isPublic members tests maxScore')
            .populate('members', 'firstName lastName') // Populate members' names
            .populate('tests', 'title')
        : [];

      // Fetch recent classrooms
      const recentClassrooms = user.recentClassrooms && user.recentClassrooms.length > 0
        ? await Classroom.find({ _id: { $in: user.recentClassrooms } })
            .select('title description isPublic members tests maxScore')
            .populate('members', 'firstName lastName')
            .populate('tests', 'title')
        : [];


      // Prepare the response with user and classroom details
      const response = {
        ...user.toObject(),
        ownedClassrooms: ownedClassrooms.map(classroom => ({
          id: classroom._id,
          title: classroom.title,
          description: classroom.description,
          isPublic: classroom.isPublic,
          membersCount: classroom.members.length,
          testsCount: classroom.tests.length,
          maxScore: classroom.maxScore,
        })),
        enrolledClassrooms: enrolledClassrooms.map(classroom => ({
          id: classroom._id,
          title: classroom.title,
          description: classroom.description,
          isPublic: classroom.isPublic,
          membersCount: classroom.members.length,
          testsCount: classroom.tests.length,
          maxScore: classroom.maxScore,
        })),
      };

      // Only add recentClassrooms to the response if it exists
      if (user.recentClassrooms) {
        response.recentClassrooms = recentClassrooms.map(classroom => ({
          id: classroom._id,
          title: classroom.title,
          description: classroom.description,
          isPublic: classroom.isPublic,
          membersCount: classroom.members.length,
          testsCount: classroom.tests.length,
          maxScore: classroom.maxScore,
        }));
      }

      res.status(200).json(response);
    } catch (error) {
      console.error('Error fetching current user:', error); // Log error details
      res.status(500).json({ message: 'Server error', error });
    }
  }

  // Get a user by their ID
  static async getUserById(req, res) {
    try {
      const userId = req.params.id;

      // Fetch user information
      const user = await User.findById(userId)
        .select('firstName lastName email profileScore profilePicture ownedClassrooms enrolledClassrooms');

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Fetch owned classrooms
      const ownedClassrooms = await Classroom.find({ _id: { $in: user.ownedClassrooms } })
        .select('title description isPublic members tests maxScore')
        .populate('members', 'firstName lastName')
        .populate('tests', 'title');

      // Fetch enrolled classrooms
      const enrolledClassrooms = await Classroom.find({ _id: { $in: user.enrolledClassrooms } })
        .select('title description isPublic members tests maxScore')
        .populate('members', 'firstName lastName')
        .populate('tests', 'title');

      // Prepare response with user and classroom details
      const response = {
        ...user.toObject(),
        ownedClassrooms: ownedClassrooms.map(classroom => ({
          id: classroom._id,
          title: classroom.title,
          description: classroom.description,
          isPublic: classroom.isPublic,
          membersCount: classroom.members.length,
          testsCount: classroom.tests.length,
          maxScore: classroom.maxScore,
        })),
        enrolledClassrooms: enrolledClassrooms.map(classroom => ({
          id: classroom._id,
          title: classroom.title,
          description: classroom.description,
          isPublic: classroom.isPublic,
          membersCount: classroom.members.length,
          testsCount: classroom.tests.length,
          maxScore: classroom.maxScore,
        })),
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('Error fetching user by ID:', error); // Log error details
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
        .select('firstName lastName profilePicture')
        .exec();

      res.json(users);
    } catch (err) {
      console.error('Error fetching users by IDs:', err); // Log error details
      res.status(500).json({ error: err.message });
    }
  }

  // Get the currently authenticated user's profile
  static async getUserProfile(req, res) {
    try {
      const userId = req.user; // Extract user ID from authenticated request
      const user = await User.findById(userId);

      res.status(200).json(user);
    } catch (error) {
      console.error('Error fetching user profile:', error); // Log error details
      res.status(500).json({ message: 'Server error', error });
    }
  }

  // Update the currently authenticated user's profile
  static async updateUserProfile(req, res) {
    try {
      const userId = req.user.id; // Extract user ID from authenticated request
      const updates = req.body; // Expecting update data in the request body

      const user = await User.findByIdAndUpdate(userId, updates, {
        new: true,
        runValidators: true
      });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json(user);
    } catch (error) {
      console.error('Error updating user profile:', error); // Log error details
      res.status(500).json({ message: 'Server error', error });
    }
  }

  static async updateRecentClassrooms(req, res) {
    try {
      const user = req.user; // Extract user ID from authenticated request
      const { id: classroomId } = req.params; // Expecting classroom ID in the request body

      if (!classroomId) {
        return res.status(400).json({ message: 'Classroom ID is required' });
      }

      // Remove the classroom if it already exists in recentClassrooms
      user.recentClassrooms = user.recentClassrooms.filter(id => id.toString() !== classroomId.toString());

      // Add the new classroom to the beginning of the array
      user.recentClassrooms.unshift(classroomId);

      // Limit the array length to a maximum of 5 recent classrooms
      if (user.recentClassrooms.length > 4) {
        user.recentClassrooms.pop();
      }

      // Save the user with updated recentClassrooms
      await user.save();

      res.status(200).json(user.recentClassrooms);
    } catch (error) {
      console.error('Error updating recent classrooms:', error); // Log error details
      res.status(500).json({ message: 'Server error', error });
    }
  }

  // Get the currently authenticated user's recent classrooms
  static async getRecentClassrooms(req, res) {
    try {
      const user = req.user; // Extract user ID from authenticated request

      // Fetch recent classrooms if any
      const recentClassrooms = user.recentClassrooms && user.recentClassrooms.length > 0
        ? await Classroom.find({ _id: { $in: user.recentClassrooms } })
            .select('title description isPublic members tests maxScore')
            .populate('members', 'firstName lastName')
            .populate('tests', 'title')
        : [];

      // Prepare response with recent classrooms details
      const response = recentClassrooms.map(classroom => ({
        id: classroom._id,
        title: classroom.title,
        description: classroom.description,
        isPublic: classroom.isPublic,
        membersCount: classroom.members.length,
        testsCount: classroom.tests.length,
        maxScore: classroom.maxScore,
      }));

      res.status(200).json(response);
    } catch (error) {
      console.error('Error fetching recent classrooms:', error); // Log error details
      res.status(500).json({ message: 'Server error', error });
    }
  }
}

export default UserController;