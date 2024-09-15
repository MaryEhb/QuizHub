// AuthController: Handles user authentication tasks such as login,
// registration, password management, and JWT token generation.
import jwt from 'jwt-simple';
import User from '../model/User.js';
import PasswordUtils from '../utils/PasswordUtils.js';
import config from '../config/config.js';

// Retrieve JWT secret and token expiry days from environment variables/config
const jwtSecret = process.env.JWT_SECRET;
const tokenExpiryDays = config.jwt.expiryDays;

class AuthController {
  // Handler for user registration
  static async register(req, res) {
    const { email, password, firstName, lastName } = req.body;

    try {
      // Generate password hash and salt
      const { salt, hash } = PasswordUtils.genPassword(password);

      // Create new user instance
      const user = new User({
        firstName,
        lastName,
        email,
        passwordHash: hash,
        passwordSalt: salt,
      });

      // Save the user to the database
      await user.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
      // Log error and send a response with the error message
      console.error('Registration error:', err);
      res.status(500).json({ error: err.message });
    }
  }

  // Handler for user login
  static async login(req, res) {
    const { email, password } = req.body;

    try {
      // Find user by email
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

      // Compare provided password with stored hash and salt
      const isValid = PasswordUtils.comparePasswords(
        password,
        user.passwordHash,
        user.passwordSalt,
      );

      if (!isValid) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Create JWT payload and encode the token
      const payload = {
        id: user.id,
        expire: Date.now() + 1000 * 60 * 60 * 24 * tokenExpiryDays,
      };
      const token = jwt.encode(payload, jwtSecret);
      return res.json({ token });
    } catch (err) {
      // Log error and send a response with the error message
      console.error('Login error:', err);
      res.status(500).json({ error: err.message });
    }
  }

  // Handler for changing the user's password
  static async changePassword(req, res) {
    const { currentPassword, newPassword } = req.body;
    const user = req.user;

    try {

      // Check if the current password is correct
      const isCurrentPasswordValid = PasswordUtils.comparePasswords(
        currentPassword,
        user.passwordHash,
        user.passwordSalt,
      );

      if (!isCurrentPasswordValid) {
        return res.status(401).json({ message: 'Current password is incorrect' });
      }

      // Check if the new password is different from the current one
      const isNewPasswordSame = PasswordUtils.comparePasswords(
        newPassword,
        user.passwordHash,
        user.passwordSalt,
      );

      if (isNewPasswordSame) {
        return res.status(400).json({ message: 'New password cannot be the same as the current password' });
      }

      // Generate new password hash and salt
      const { salt, hash } = PasswordUtils.genPassword(newPassword);

      // Update user password
      user.passwordHash = hash;
      user.passwordSalt = salt;
      await user.save();

      res.status(200).json({ message: 'Password changed successfully' });
    } catch (err) {
      // Log error and send a response with the error message
      console.error('Change password error:', err);
      res.status(500).json({ error: err.message });
    }
  }
}

export default AuthController;