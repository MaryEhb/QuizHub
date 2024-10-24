# QuizHub

[![Node.js](https://img.shields.io/badge/Node.js-14.x-green?logo=node.js)](https://nodejs.org/) 
[![Express](https://img.shields.io/badge/Express-4.x-yellow?logo=express)](https://expressjs.com/)
[![Passport](https://img.shields.io/badge/Passport.js-Authentication-blue?logo=passport)](https://www.passportjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4.4-green?logo=mongodb)](https://www.mongodb.com/)
[![Mongoose](https://img.shields.io/badge/Mongoose-ODM-red?logo=mongoose)](https://mongoosejs.com/)
[![React](https://img.shields.io/badge/React-17.x-blue?logo=react)](https://reactjs.org/)
[![SASS](https://img.shields.io/badge/SASS-CSS%20Preprocessor-pink?logo=sass)](https://sass-lang.com/)
[![Axios](https://img.shields.io/badge/Axios-HTTP%20Client-blue?logo=axios)](https://www.npmjs.com/package/axios)
[![Postman](https://img.shields.io/badge/Postman-API%20Testing-orange?logo=postman)](https://www.postman.com/)
[![VS code](https://img.shields.io/badge/VS%20Code-Editor-blue?logo=visual-studio-code)](https://code.visualstudio.com/)

## Overview

QuizHub is a web application designed as a platform for both learners and educators to create virtual classrooms whether public or private, enroll in existing ones, and create and take tests. Users can also manage submissions and control access to classrooms.

The project is divided into two parts:
- **Frontend:** Responsible for the user interface.
- **Backend:** Manages business logic, API endpoints, authentication, and database interaction.

## Table of Contents
- [Project Overview](#overview)
- [Installation](#installation)
- [Architecture](#architecture)
- [Technologies Used](#technologies-used)
- [Demo](#demo)
- [Future Plans](#future-plans)
- [Experience and Lessons Learned](#experience-and-lessons-learned)
- [Contributing](#contributing)
- [License](#license)

## Installation

Before running the project, make sure you have the following installed:
- **Node.js**: v14.x or higher [Download here](https://nodejs.org/)
- **MongoDB**: v4.4 or higher [Download here](https://www.mongodb.com/try/download/community)

### Steps:
1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/MaryEhb/QuizHub.git
   cd QuizHub
   ```

2. **Setup the Backend first**:
   - Follow the instructions in the [Backend README](./backend/README.md) to set up the server.
   - This will guide you through installing dependencies, setting up environment variables, and starting the backend server.

3. **Then Setup the Frontend**:
   - Navigate to the [Frontend README](./frontend/README.md) and follow the setup steps.
   - After setting up the backend, you can start the frontend server.

## Architecture

QuizHub follows a client-server architecture:

- The **client** sends requests to the **web server**, which serves static assets (HTML, CSS, JS) and communicates with the **application server**.
- The **application server** handles business logic and connects to the **MongoDB database**, where user, classroom, test, and submission data is stored.

Here's a high-level view of the architecture:

![Architecture Diagram](https://drive.google.com/uc?export=view&id=1zY2QJR2dVG90T9xYwFTaXIun_XxR511f)

## Technologies Used

In terms of technologies, I used a combination of tools to bring *QuizHub* to life. Below is a breakdown of the tools and technologies used for different aspects of the project:

### Design

- **Figma**: For designing user interfaces before development began. Figma allowed me to prototype and create a visual structure, ensuring the user experience is intuitive and well-planned before moving into the development phase.

### Frontend Development

- **React** [![React](https://img.shields.io/badge/React-17.x-blue?logo=react)](https://reactjs.org/):  
  React was used for its component-based architecture, which makes the development process modular and scalable. It also enables dynamic handling of data, ensuring efficient rendering and updates across the UI. React’s state management made it easier to manage interactions between different components.
  
- **SASS** [![SASS](https://img.shields.io/badge/SASS-CSS%20Preprocessor-pink?logo=sass)](https://sass-lang.com/):  
  A CSS preprocessor that provides features like variables, nesting, and mixins to keep stylesheets organized and maintainable. SASS was used to manage styling, enabling reusable styles across different components and improving the overall maintainability of the codebase.

- **Axios** [![Axios](https://img.shields.io/badge/Axios-HTTP%20Client-blue?logo=axios)](https://www.npmjs.com/package/axios):  
  A promise-based HTTP client used to handle API requests from the frontend to the backend. Axios was chosen for its simplicity in managing asynchronous requests and responses, ensuring smooth data retrieval and form submissions.

### Backend Development

- **Node.js** [![Node.js](https://img.shields.io/badge/Node.js-14.x-green?logo=node.js)](https://nodejs.org/):  
  Node.js was used as the backend runtime environment. Its non-blocking I/O model allows for efficient handling of multiple requests, and the ability to write both frontend and backend code in JavaScript ensures consistency across the entire application stack.

- **Express.js** [![Express](https://img.shields.io/badge/Express-4.x-yellow?logo=express)](https://expressjs.com/):  
  A minimal and flexible Node.js framework, Express was used to manage routing, middleware, and HTTP request handling. This framework simplified the development of the backend API, helping build robust and secure endpoints.

- **Passport.js** [![Passport](https://img.shields.io/badge/Passport.js-Authentication-blue?logo=passport)](https://www.passportjs.org/):  
  Used to manage user authentication. Passport provided a flexible authentication middleware, enabling me to securely manage user logins, registrations, and session persistence.

### Database

- **MongoDB** [![MongoDB](https://img.shields.io/badge/MongoDB-4.4-green?logo=mongodb)](https://www.mongodb.com/):  
  A NoSQL database used to store the data for users, classrooms, tests, and submissions. MongoDB was chosen for its flexibility in handling unstructured data and scalability, making it suitable for a growing application like *QuizHub*.

- **Mongoose** [![Mongoose](https://img.shields.io/badge/Mongoose-ODM-red?logo=mongoose)](https://mongoosejs.com/):  
  An Object Data Modeling (ODM) library for MongoDB, Mongoose simplifies data modeling and enforces schema validation, making database interactions more manageable. It helped ensure data consistency and enabled the use of MongoDB in a structured, object-oriented way.

### Testing & Development Tools

- **Postman** ![Postman Logo](https://img.shields.io/badge/Postman-API%20Testing-orange?logo=postman):  
  Postman was used to test all API endpoints. This tool helped ensure that the backend API was functioning correctly by simulating client requests and checking the responses for accuracy and performance.

- **VS Code** ![VS Code Logo](https://img.shields.io/badge/VS%20Code-Editor-blue?logo=visual-studio-code):  
  Visual Studio Code was my editor of choice due to its powerful extensions, integrated Git support, and debugging tools. Its user-friendly interface and extensive plugin ecosystem helped streamline the development process.

## Demo
Click thumbnail to watch the demo below:

[![Watch the demo](https://drive.google.com/uc?export=view&id=1-Z-5HNqY_WJlRDiCrLz93KNU3hc3LVIk)](https://drive.google.com/file/d/1Qkajyi4i0oLELoSbJJFTCnTvMp3jtJiN/view?usp=drive_link)

## Future Plans

- Add advanced analytics for classroom owners.
- Implement user roles with varying permissions (admin, teacher, student).
- Improve performance and scalability.
- More Question Types: Add new formats like written responses and true/false.
- Manual Grading: Allow manual review for essay-type questions.
- Custom Question Scores: Set individual point values for each question.
- Test Scheduling: Enable start/end time functionality for tests.
- Draft Test Option: Save tests as drafts before publishing.
- Search Classrooms: Search by name, ID, or owner.
- Notifications: Alerts for new tests, results, and updates.
- Send Class Invites: Invite users via email or link.
- Copy Classroom ID: Easily share class IDs with others.
- Scoring System: Refine overall performance scoring.
- Leaderboards: Global and class-specific rankings.
- View Profiles: Access detailed user profiles.
- Followers/Following: Build a social network of users.
- Email Confirmation/Password Recovery: Secure account verification and recovery.


## Experience and Lessons Learned

Working on *QuizHub* has been a tremendous learning experience. I deepened my understanding of full-stack development, improved my planning and debugging processes, and gained more confidence in working on complex projects.

## Contributing

Contributions are welcome! Please make sure to read the [Contributing Guide](./CONTRIBUTING.md) before you start.

Here's how you can help:

    1. Fork the repository.
    2. Create a new branch for your feature: `git checkout -b feature/my-new-feature`.
    3. Make your changes and commit them: `git commit -m 'Add new feature'`.
    4. Push your changes to the branch: `git push origin feature/my-new-feature`.
    5. Submit a pull request.

## License

This project is licensed under the [MIT License](./LICENSE).  
You are free to use, modify, and distribute this software, provided you include the original copyright notice and this license in any substantial portions of the software.

For more details, refer to the [LICENSE file](./LICENSE).

