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
}

export default AuthController;