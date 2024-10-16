# Shrinker - URL Shortener

Shrinker is a simple web application that allows users to shorten URLs after logging in or signing up. Each user can create and manage their own list of shortened URLs. The app uses local storage to manage user sessions and store shortened URLs.
![image](https://github.com/user-attachments/assets/55cce108-fdd2-4098-a279-8290f74b6859)

https://github.com/user-attachments/assets/a4392831-c5ea-4d32-b4d6-ab7664ba1931

Video of the Working Project

## Features
- User authentication (Sign up and Login)
- URL shortening
- URL history management for each user
- Logout functionality

## Prerequisites
- Node.js (version 14.x or later)
- npm (version 6.x or later)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/rsmyst/Shrinker.git
   cd Shrinker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

1. Start the development server:
   ```bash
   npm start
   node server.js
   ```
   Ensure that you are starting the server in a different terminal window.
2. Open the application in your browser at:
   ```
   http://localhost:3000
   ```

## Usage

1. **Sign Up:**
   - Enter a unique username and password to create an account.
   - Your URL history will be tied to this account.

2. **Login:**
   - Use your credentials to log in and access your saved URLs.
   - Upon successful login, the application will display the URL shortener interface.

3. **URL Shortening:**
   - Input a valid URL to shorten it.
   - The shortened URL will be displayed and stored in your account's history.

4. **Logout:**
   - Click on the 'Logout' button to end your session and return to the login page.

## Project Structure

- `App.js`: Main component that handles routing between the login page and the URL shortener.
- `Login.js`: Handles user authentication (sign up and login).
- `UrlShortener.js`: Contains the core functionality for shortening URLs and managing user-specific URL history.
- `setupProxy.js`: A secondary way to resolve the tedious CORS issue 

## Technologies Used
- **React**: Frontend framework
- **Local Storage**: Used to store user information and authentication status
- **JavaScript**: Core language used for logic and interactivity
