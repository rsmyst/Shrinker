
import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import UrlShortener from "./components/UrlShortener";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    const user = localStorage.getItem("currentUser");
    if (auth === "true" && user) {
      setLoggedIn(true);
      setCurrentUser(user);
    }
    setIsLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("currentUser");
    setLoggedIn(false);
    setCurrentUser(null);
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="App">
      {loggedIn && currentUser ? (
        <div>
          <div className="header">
            <h1>URL Shortener</h1>
            <div className="user-info">
              <span>Welcome, {currentUser}!</span>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
          <UrlShortener currentUser={currentUser} />
        </div>
      ) : (
        <Login setLoggedIn={setLoggedIn} setCurrentUser={setCurrentUser} />
      )}
    </div>
  );
}

export default App;
