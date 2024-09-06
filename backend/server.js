import express from 'express';
import cors from 'cors';
import passport from 'passport';
import connectToDatabase from './config/db.js';
import { initializePassport, requireAuth } from './middleware/authMiddleware.js';
import authRoutes from './routes/authRoutes.js';
import unprotectedRoutes from './routes/unprotectedRoutes.js';
import protectedRoutes from './routes/protectedRoutes.js';
import config from './config/config.js';

// Connect to MongoDB
connectToDatabase(config.db.uri);

const app = express();

// CORS configuration
const corsOptions = {
  origin: config.frontendUrl,
  methods: 'GET,POST,PUT,DELETE',
  credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
initializePassport();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/', unprotectedRoutes);
app.use('/api/', requireAuth, protectedRoutes);


// Start server
app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});