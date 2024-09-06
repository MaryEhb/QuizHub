// Passport JWT authentication setup
// Provides middleware functions for initializing Passport and requiring authentication in routes
import passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import User from '../model/User.js';
import config from '../config/config.js';

// Retrieve the JWT secret from configuration
const jwtSecret = config.jwt.secret;

if (!jwtSecret) {
  throw new Error('JWT secret not defined in environment variables');
}

// Configure JWT extraction from the Authorization header
const jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

// Define the JWT strategy for passport
const strategy = new Strategy(
  {
    secretOrKey: jwtSecret, // Secret key to validate JWT
    jwtFromRequest, // Function to extract JWT from request
  },
  async (payload, done) => {
    try {
      // Find user by ID from the JWT payload
      const user = await User.findById(payload.id);

      if (!user) {
        // If user is not found, authentication fails
        console.error('Authentication error: User not found');
        return done(null, false, { message: 'User not found' });
      }

      // Optionally check token expiry manually
      if (payload.exp && Date.now() > payload.exp) {
        console.error('Authentication error: Token expired');
        return done(null, false, { message: 'Token expired' });
      }

      // Successfully found the user
      return done(null, user);
    } catch (err) {
      // Handle errors during user lookup
      console.error('Error during authentication:', err);
      return done(err, null);
    }
  },
);

// Use the defined strategy with passport
passport.use(strategy);

// Initialize passport middleware
export const initializePassport = () => passport.initialize();

// Middleware to require authentication for certain routes
export const requireAuth = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      // Handle authentication errors
      console.error('Error during authentication:', err);
      return res.status(500).json({ message: 'An error occurred during authentication' });
    }
    if (!user) {
      // If no user is authenticated, return 401 Unauthorized
      console.error('Authentication error: User not authenticated');
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Attach the authenticated user to the request object
    req.user = user;

    next();
  })(req, res, next);
};