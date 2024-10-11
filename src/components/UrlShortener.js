import React, { useState, useEffect } from "react";

/**
 * UrlShortener component for shortening URLs and managing URL history.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {Object} props.currentUser - The current user object.
 * @returns {JSX.Element} The rendered component.
 *
 * @example
 * <UrlShortener currentUser={currentUser} />
 *
 * @description
 * This component allows users to shorten URLs and keeps track of their URL history.
 * It uses localStorage to store and retrieve the user's URL history and updates the
 * usage counts for each shortened URL periodically.
 *
 * @function
 * @name UrlShortener
 *
 * @property {string} longUrl - The original long URL to be shortened.
 * @property {string} shortUrl - The shortened URL.
 * @property {Array} history - The history of shortened URLs.
 * @property {boolean} isLoading - Indicates if the URL shortening process is in progress.
 * @property {boolean} historyLoading - Indicates if the URL history is being loaded.
 *
 * @method
 * @name loadUserHistory
 * @description Loads the user's URL history from localStorage.
 *
 * @method
 * @name updateUserHistory
 * @description Updates the user's URL history in localStorage.
 *
 * @method
 * @name getUsageCount
 * @description Fetches the usage count for a given shortened URL.
 *
 * @method
 * @name updateAllUsageCounts
 * @description Updates the usage counts for all URLs in the history.
 *
 * @method
 * @name sanitizeUrl
 * @description Sanitizes and validates a given URL.
 *
 * @method
 * @name handleShorten
 * @description Handles the URL shortening process.
 */

const UrlShortener = ({ currentUser }) => {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      loadUserHistory();
    }
  }, [currentUser]);

  const loadUserHistory = () => {
    setHistoryLoading(true);
    try {
      const userData = JSON.parse(localStorage.getItem(`user_${currentUser}`));
      if (userData && userData.urlHistory) {
        setHistory(userData.urlHistory);
        // Update usage counts when loading history
        updateAllUsageCounts(userData.urlHistory);
      } else {
        setHistory([]);
      }
    } catch (error) {
      console.error("Error loading user history:", error);
      setHistory([]);
    } finally {
      setHistoryLoading(false);
    }
  };

  const updateUserHistory = (newHistory) => {
    try {
      const userData =
        JSON.parse(localStorage.getItem(`user_${currentUser}`)) || {};
      userData.urlHistory = newHistory;
      localStorage.setItem(`user_${currentUser}`, JSON.stringify(userData));
    } catch (error) {
      console.error("Error updating user history:", error);
    }
  };

  const getUsageCount = async (shortUrl) => {
    try {
      // Extract the ID from the short URL
      const urlId = shortUrl.split("/").pop();
      const response = await fetch(`https://ulvis.net/api.php?stat=${urlId}`);
      const data = await response.json();
      return data.clicks || 0;
    } catch (error) {
      console.error("Error fetching usage count:", error);
      return null;
    }
  };

  const updateAllUsageCounts = async (currentHistory = history) => {
    const updatedHistory = await Promise.all(
      currentHistory.map(async (item) => {
        const uses = await getUsageCount(item.shortUrl);
        return uses !== null ? { ...item, uses } : item;
      })
    );

    setHistory(updatedHistory);
    updateUserHistory(updatedHistory);
  };

  const sanitizeUrl = (url) => {
    let sanitizedUrl = url.trim();
    if (!sanitizedUrl.match(/^https?:\/\//i)) {
      sanitizedUrl = `https://${sanitizedUrl}`;
    }
    try {
      new URL(sanitizedUrl);
      return sanitizedUrl;
    } catch (error) {
      throw new Error("Invalid URL");
    }
  };

  const handleShorten = async () => {
    setIsLoading(true);
    try {
      const sanitizedUrl = sanitizeUrl(longUrl);

      const response = await fetch("/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: sanitizedUrl }),
      });

      if (!response.ok) {
        throw new Error("Failed to shorten URL");
      }

      const result = await response.json();
      setShortUrl(result.shortUrl);

      const newHistoryItem = {
        longUrl: sanitizedUrl,
        shortUrl: result.shortUrl,
        uses: 0,
        timestamp: new Date().toISOString(),
      };

      const newHistory = [newHistoryItem, ...history];
      setHistory(newHistory);
      updateUserHistory(newHistory);
      setLongUrl("");

      // Get initial usage count
      const initialUses = await getUsageCount(result.shortUrl);
      if (initialUses !== null) {
        newHistoryItem.uses = initialUses;
        const updatedHistory = [newHistoryItem, ...history];
        setHistory(updatedHistory);
        updateUserHistory(updatedHistory);
      }
    } catch (error) {
      alert(error.message || "Error shortening URL");
    } finally {
      setIsLoading(false);
    }
  };

  // Set up interval for updating usage counts
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (history.length > 0) {
        updateAllUsageCounts();
      }
    }, 60000); // Update every minute

    return () => clearInterval(intervalId);
  }, [history]);

  return (
    <div className="url-shortener-container">
      <div>
        <input
          type="text"
          className="url-input-section"
          placeholder="Enter a URL (e.g., example.com)"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
        />
        <button onClick={handleShorten} disabled={isLoading}>
          {isLoading ? "Shortening..." : "Shorten URL"}
        </button>
      </div>

      {shortUrl && (
        <div className="result-section">
          <h3>Your shortened URL:</h3>
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
        </div>
      )}

      <div className="history-section">
        <h3>Your URL History</h3>
        {historyLoading ? (
          <p>Loading history...</p>
        ) : history.length === 0 ? (
          <p>No URLs shortened yet</p>
        ) : (
          <ul>
            {history.map((item, index) => (
              <li key={index}>
                <div className="history-item">
                  <div className="url-info">
                    <a
                      href={item.shortUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.shortUrl}
                    </a>
                    <span className="long-url">{item.longUrl}</span>
                  </div>
                  <div className="stats">
                    <span>{new Date(item.timestamp).toLocaleString()}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UrlShortener;
