# QuizHub Frontend

Welcome to QuizHub, a web application for creating and managing quizzes. This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Table of Contents
- [Installation](#installation)
- [.env Configuration](#env-configuration)
- [Running the App](#running-the-app)
- [Building for Production](#building-for-production)
- [Ejecting](#ejecting)
- [File Structure](#file-structure)
- [Colors Used](#colors-used)
- [Assets and Credits](#assets-and-credits)
- [Additional Resources](#additional-resources)

## Installation

### Prerequisites

Before running the frontend, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or above)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)


To install and run the frontend locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/MaryEhb/QuizHub.git
   cd QuizHub/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## .env Configuration

Before starting the app, you need to set up a `.env` file in the root directory of the project with the following environment variables:

```bash
REACT_APP_BACKEND_API_URL=http://localhost:8081/api
REACT_APP_CLASSROOM_TITLE_LIMIT=50
REACT_APP_CLASSROOM_DESCRIPTION_LIMIT=500
```

These environment variables are essential for configuring the backend API URL and setting limits for classroom titles and descriptions.

## Running the App

To start the development server, use:

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app. The page will reload automatically when you make changes. Any lint errors will be displayed in the console.

## Building for Production

To build the app for production, use:

```bash
npm run build
```

This will bundle the app and optimize it for performance. The build files will be placed in the `build` folder. Your app is now ready for deployment!

For more information on deployment, see the [Create React App deployment documentation](https://facebook.github.io/create-react-app/docs/deployment).

## Ejecting

If you need more control over the build configuration, you can eject by running:

```bash
npm run eject
```

**Note**: This is a one-way operation. Ejecting will expose the build configuration files and dependencies, giving you full control but also requiring you to manage them manually.

## File Structure

Here’s a brief overview of the key directories and files in the project:

```
src/
├── components/         # Reusable components like classroom cards and test cards
├── pages/              # All page components (Login, Dashboard, etc.)
├── sass/               # Contains all Sass stylesheets
├── contexts/           # Context API files for managing global states (error, loading)
├── services/           # API services like authService and classroomService
├── App.js              # Main app file
├── index.js            # Entry point for React app
```

## Colors Used

Here are the colors used in the application design:

| Color Name                | Hex Value  | Icon |
|---------------------------|------------|------|
| **Gray**                   | `#848182`  | ![#848182](https://placehold.co/15x15/848182/848182.png) |
| **Black**                  | `#231F20`  | ![#231F20](https://placehold.co/15x15/231F20/231F20.png) |
| **Mint Green**             | `#8FFFA9`  | ![#8FFFA9](https://placehold.co/15x15/8FFFA9/8FFFA9.png) |
| **Tangerine**              | `#FE5D32`  | ![#FE5D32](https://placehold.co/15x15/FE5D32/FE5D32.png) |
| **Sunshine Yellow**        | `#FFF461`  | ![#FFF461](https://placehold.co/15x15/FFF461/FFF461.png) |
| **Light Sunshine Yellow**  | `#FFE499`  | ![#FFE499](https://placehold.co/15x15/FFE499/FFE499.png) |
| **Soft Beige**             | `#EFDCD7`  | ![#EFDCD7](https://placehold.co/15x15/EFDCD7/EFDCD7.png) |
| **Light Beige**            | `#F3EBE9`  | ![#F3EBE9](https://placehold.co/15x15/F3EBE9/F3EBE9.png) |
| **White**                  | `#FFF`     | ![#FFF](https://placehold.co/15x15/FFF/FFF.png) |

These colors are used to maintain a consistent and visually appealing interface throughout the application.

## Assets and Credits

- **Illustrations**: The illustrations used in this project were sourced from [Designstripe](https://designstripe.com/search/illustrations?style=cheerful) under the **Cheerful** style.  
- **Icons**: Icons are provided by [React Icons](https://react-icons.github.io/react-icons/) for use in the app.

## Additional Resources

- Learn more about Create React App in the [official documentation](https://facebook.github.io/create-react-app/docs/getting-started).
- Check out the [React documentation](https://reactjs.org/) to learn more about React.

For advanced topics, you can refer to these resources:

- [Code Splitting](https://facebook.github.io/create-react-app/docs/code-splitting)
- [Analyzing the Bundle Size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)
- [Making a Progressive Web App](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)
- [Advanced Configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)
- [Troubleshooting Build Issues](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
