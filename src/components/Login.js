import React, { useState } from "react";

const Login = ({ setLoggedIn, setCurrentUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const handleLogin = () => {
    const storedUser = localStorage.getItem(`user_${username}`);

    if (storedUser) {
      const userData = JSON.parse(storedUser);
      if (userData.password === password) {
        localStorage.setItem("auth", "true");
        localStorage.setItem("currentUser", username);
        setCurrentUser(username);
        setLoggedIn(true);
      } else {
        alert("Invalid password");
      }
    } else {
      alert("User does not exist. Please sign up.");
    }
  };

  const handleSignUp = () => {
    const storedUser = localStorage.getItem(`user_${username}`);

    if (storedUser) {
      alert("User already exists. Please log in.");
    } else {
      const userData = {
        password,
        urlHistory: [],
      };
      localStorage.setItem(`user_${username}`, JSON.stringify(userData));
      localStorage.setItem("auth", "true");
      localStorage.setItem("currentUser", username);
      setCurrentUser(username);
      setLoggedIn(true);
    }
  };

  return (
    <div className="login-container">
      <h2 className="loginBar">{isSignUp ? "Sign Up" : "Login"}</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="username-input"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="password-input"
      />
      <button
        className="logbtn"
        onClick={isSignUp ? handleSignUp : handleLogin}
      >
        {isSignUp ? "Sign Up" : "Login"}
      </button>
      <p>
        {isSignUp ? "Already have an account?" : "Don't have an account?"}
        <span onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? " Login here" : " Sign up here"}
        </span>
      </p>
    </div>
  );
};

export default Login;
