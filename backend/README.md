# QuizHub Backend

## Overview
The backend of **QuizHub** is built with Node.js, Express, and MongoDB, using Mongoose for database interactions. It provides RESTful API endpoints for handling user authentication, classrooms, tests, and submissions. The backend follows a modular structure, with controllers, models, and routes organized for clarity and scalability.

## Table of Contents
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Contributing](#contributing)
- [License](#license)

---

## Installation

To set up the backend locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/MaryEhb/QuizHub.git
   cd QuizHub/backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**  
   Create a `.env` file in the `backend` directory. Refer to the [Environment Variables](#environment-variables) section for the required variables and their configuration.

4. **Run the server:**
   ```bash
   npm start
   ```
   The server will run on the port specified by the `PORT` variable in the `.env` file (default is `3000` if not set).

5. **Access the server** at `http://localhost:<PORT>`, where `<PORT>` is the value defined in the `.env` file.

---

## Project Structure

```bash
backend/
│
├── config/           # Configuration files
│   └── db.js         # Database connection setup
│   └── config.js     # Deals with .env variables
│
├── controllers/      # API request logic
│   ├── authController.js
│   └── classroomController.js
│   └── SubmissionController.js
│   └── testController.js
│   └── userController.js
│
├── middleware/       # Request lifecycle tasks
│   └── authMiddleware.js
│
├── model/           # Mongoose schemas
│   ├── User.js
│   └── Classroom.js
│   └── Test.js
│   └── Submission.js
│
├── routes/           # API route definitions
│   ├── authRoutes.js
│   └── protectedRoutes.js
│   └── unprotectedRoutes.js
│
├── utils/            # Utility functions
│   └── passwordUtils.js  # Password hashing and validation
│
├── .env              # Environment variables (not included in repo)
├── server.js         # Entry point of the backend server
└── package.json      # Node.js project dependencies and scripts
```

### Folder Descriptions

- **config/**: Holds the database connection setup. The `db.js` file contains the configuration to connect to MongoDB using Mongoose.
  
- **controllers/**: Contains the logic for handling API requests and sending appropriate responses. Each file handles a specific feature (e.g., `authController.js` for authentication).

- **middleware/**: Middleware handles tasks like authentication and error handling before requests reach the controllers. 
  - `auth.js` checks for valid JWT tokens to protect routes.
  - `errorHandler.js` provides centralized error handling.

- **models/**: Contains the Mongoose models which define the data structure for MongoDB collections like `User` and `Classroom`.

- **routes/**: Defines the API endpoints and links them to their respective controller functions. Each file handles related routes (e.g., `authRoutes.js` handles login/signup).

- **utils/**: Shared utility functions across the backend. `passwordUtils.js` handles password hashing and validation.

---

## Environment Variables

The following environment variables must be configured in a `.env` file at the root of the backend directory. Some are required, while others are optional, depending on whether you're using a local MongoDB setup or a remote one.

### Essential Environment Variables

```bash
# Use 'true' if you want to connect to a local MongoDB instance (default: true).
# Set this to 'false' if you are connecting to a remote MongoDB instance.
USE_LOCAL_DB=true

# Server Configuration
PORT=8081                        # The port on which the backend server will run (default: 8081).
JWT_SECRET=secret                 # Secret key for signing JSON Web Tokens (JWT) for authentication (required).
VALID_DAYS=7                      # Number of days after which the JWT token will expire (default: 7 days).

# Frontend URL for CORS (required for proper CORS handling).
FRONTEND_URL=http://localhost:3000
```

### Local MongoDB Configuration (Required if `USE_LOCAL_DB=true`)

If you are connecting to a local MongoDB instance, you will need the following environment variables:

```bash
LOCAL_DB_NAME=alxFinalProjectDB    # The name of the local MongoDB database (required if using local DB).
LOCAL_DB_PORT=27017                # The port for the local MongoDB instance (default: 27017).
LOCAL_DB_HOST=localhost            # The hostname for the local MongoDB instance (default: localhost).
```

### Remote MongoDB Configuration (Required if `USE_LOCAL_DB=false`)

If you are connecting to a remote MongoDB instance, set `USE_LOCAL_DB=false` and configure the following:

```bash
# MongoDB Connection Details for Remote (leave empty if using local DB).
MONGO_HOST=your_remote_host        # The hostname or IP address of the remote MongoDB server (required if using remote DB).
MONGO_PORT=your_remote_port        # The port of the remote MongoDB server (default: 27017).
MONGO_USER=your_mongo_user         # Username for authenticating with the remote MongoDB server (required if authentication is enabled).
MONGO_PASSWORD=your_mongo_password # Password for authenticating with the remote MongoDB server (required if authentication is enabled).
MONGO_DB_NAME=your_remote_db_name  # The name of the remote MongoDB database (required if using remote DB).
```

### Optional Environment Variables

```bash
# Database connection timeout settings (optional).
DB_CONNECT_TIMEOUT=30000           # The connection timeout in milliseconds (default: 30,000).

# Logging and Debugging (optional).
LOG_LEVEL=info                     # Logging level (e.g., 'info', 'debug', 'warn'). Default is 'info'.
DEBUG_MODE=false                   # Enable or disable debug mode (default: false).
```

---

### Example `.env` for Local MongoDB:

```bash
USE_LOCAL_DB=true
LOCAL_DB_NAME=alxFinalProjectDB
LOCAL_DB_PORT=27017
LOCAL_DB_HOST=localhost

JWT_SECRET=secret
VALID_DAYS=7
PORT=8081
FRONTEND_URL=http://localhost:3000
```

### Example `.env` for Remote MongoDB:

```bash
USE_LOCAL_DB=false
MONGO_HOST=remote.mongodb.com
MONGO_PORT=27017
MONGO_USER=myMongoUser
MONGO_PASSWORD=mySecurePassword
MONGO_DB_NAME=quizhubRemoteDB

JWT_SECRET=secret
VALID_DAYS=7
PORT=8081
FRONTEND_URL=http://localhost:3000
```

---

## API Endpoints

The following are the available API endpoints for the QuizHub backend, grouped by functionality.

### Authentication (`/api/auth`)
- **POST** `/register`: Register a new user.
- **POST** `/login`: Log in a user and return a JWT.

### User Management (`/api/users`)
- **GET** `/users/me`: Get the currently authenticated user's information.
- **POST** `/users/usersByIds`: Retrieve user names and profile pictures by a list of user IDs.
- **GET** `/users/profile`: Get the current user's profile details.
- **PUT** `/users/profile`: Update the current user's profile.
- **POST** `/users/change-password`: Change the password of the currently authenticated user.

### Classrooms (`/api/classrooms`)
- **POST** `/classrooms`: Create a new classroom.
- **GET** `/classrooms`: Retrieve all classrooms.
- **GET** `/classrooms/:id`: Get details of a specific classroom by its ID.
- **PUT** `/classrooms/:id`: Update a specific classroom by its ID.
- **DELETE** `/classrooms/:id`: Delete a specific classroom by its ID.
- **POST** `/classrooms/:id/remove`: Remove a user from a classroom.

#### Enrollment in Classrooms
- **POST** `/classrooms/:id/enroll`: Enroll a user in a specific classroom.
- **POST** `/classrooms/:id/unenroll`: Request unenrollment from a specific classroom.
- **PUT** `/classrooms/:classroomId/enroll/:userId/accept`: Accept a user's enrollment request in a classroom.
- **PUT** `/classrooms/:classroomId/enroll/:userId/reject`: Reject a user's enrollment request in a classroom.

#### Recent Classrooms
- **POST** `/users/recent-classrooms/:id`: Update the recent classrooms viewed by the user.
- **GET** `/users/recent-classrooms`: Get the recent classrooms viewed by the user.

#### Classrooms for a User
- **GET** `/users/:userId/classrooms`: Get all classrooms that a specific user is associated with.

### Tests (`/api/tests`)
- **POST** `/classrooms/:classroomId/tests`: Create a new test for a classroom.
- **GET** `/classrooms/:classroomId/tests`: Retrieve all tests for a specific classroom.
- **GET** `/classrooms/:classroomId/tests/:testId`: Get details of a specific test by its ID.
- **PUT** `/classrooms/:classroomId/tests/:testId`: Update a specific test by its ID.
- **DELETE** `/classrooms/:classroomId/tests/:testId`: Delete a specific test by its ID.

### Submissions (`/api/tests/:testId/submissions`)
- **POST** `/tests/:testId/submit`: Submit a test by its test ID.
- **DELETE** `/tests/:testId/submissions/:submissionId`: Delete a specific submission by its submission ID (only accessible to the test owner).

### Unprotected Routes (`/`)
- **GET** `/`: Return a welcome message for unprotected routes.

---

## Database Schema

The database schema for QuizHub consists of four main models: User, Classroom, Test, and Submission. These models define the relationships between users, the classrooms they create and join, the tests created within those classrooms, and the submissions they make for those tests.

### Visual Representation
Here’s a visual overview of the database schema showing the relationships between different entities:

![Database Schema](https://drive.google.com/uc?export=view&id=1Sa4F4xXWqDPROiwvhCcB7lACT4iMcV5r)

---

## Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository.
2. Create a new branch for your feature: `git checkout -b feature/my-new-feature`.
3. Make your changes and commit them: `git commit -m 'Add new feature'`.
4. Push your changes to the branch: `git push origin feature/my-new-feature`.
5. Submit a pull request.

---

## License

This project is licensed under the MIT License.
