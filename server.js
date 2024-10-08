const express = require("express");
const axios = require("axios");
const app = express();
const port = 5000;

app.use(express.json());

const ULVIS_API_URL = "https://ulvis.net/api.php";

app.post("/shorten", async (req, res) => {
  let { url } = req.body;
  
  if (!url) {
    return res.status(400).json({ error: "No URL provided" });
  }

  try {
    // Use ulvis.net API to shorten the URL
    const response = await axios.get(ULVIS_API_URL, {
      params: {
        url: url,
        private: 0,
      },
    });

    const shortUrl = response.data;

    // Send shortened URL as a response
    res.json({ shortUrl });
  } catch (error) {
    console.error("Error shortening URL:", error);
    res.status(500).json({ error: "Failed to shorten URL" });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});