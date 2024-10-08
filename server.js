// const express = require("express");
// const https = require("https"); // Import the https module
// const app = express();
// const port = 5000;

// app.use(express.json());
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });
// app.post("/shorten", (req, res) => {
//   const { url, customName } = req.body;

//   // Construct the URL for the external API
//   const apiUrl = `https://ulvis.net/api.php?url=${encodeURIComponent(
//     url
//   )}&custom=${encodeURIComponent(customName)}&private=1`;

//   // Make the request to the external API
//   https
//     .get(apiUrl, (apiRes) => {
//       let data = "";

//       // Listen for data chunks
//       apiRes.on("data", (chunk) => {
//         data += chunk;
//       });

//       // Listen for the end of the response
//       apiRes.on("end", () => {
//         try {
//           const jsonData = JSON.parse(data); // Parse the JSON data
//           res.json(jsonData); // Send the JSON data back to the client
//         } catch (error) {
//           console.error("Error parsing JSON:", error);
//           res.status(500).json({ error: "Error parsing response data" });
//         }
//       });
//     })
//     .on("error", (error) => {
//       console.error("Error with the request:", error);
//       res
//         .status(500)
//         .json({ error: "Something went wrong with the API request" });
//     });
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });

// const express = require("express");
// const app = express();
// const port = 5000;

// app.use(express.json());

// let linkHistory = []; // Store history here for demo purposes

// app.post("/shorten", (req, res) => {
//   const { url } = req.body;
//   if (!url) return res.status(400).json({ error: "No URL provided" });

//   const shortUrl = `http://short.ly/${Math.random().toString(36).substring(7)}`;

//   // Store in history
//   linkHistory.push({ longUrl: url, shortUrl, uses: 0 });

//   res.json({ shortUrl });
// });

// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });

// V1FINAL

// const express = require("express");
// const axios = require("axios");
// const ShortUniqueId = require("short-unique-id");
// const app = express();
// const port = 5000;

// app.use(express.json());

// // Unique ID generator for custom short URLs (optional)
// const uid = new ShortUniqueId();

// let linkHistory = []; // Store URL shortening history

// // ulvis.net API URL
// const ULVIS_API_URL = "https://ulvis.net/api.php";

// app.post("/shorten", async (req, res) => {
//   const { url } = req.body;
//   if (!url) return res.status(400).json({ error: "No URL provided" });

//   try {
//     // Use ulvis.net API to shorten the URL
//     const response = await axios.get(ULVIS_API_URL, {
//       params: {
//         url: url,
//         private: 0, // Set to 1 to make private, 0 for public URLs
//       },
//     });

//     const shortUrl = response.data;

//     // Store in link history
//     linkHistory.push({ longUrl: url, shortUrl, uses: 0 });

//     // Send shortened URL as a response
//     res.json({ shortUrl });
//   } catch (error) {
//     console.error("Error shortening URL:", error);
//     res.status(500).json({ error: "Failed to shorten URL" });
//   }
// });

// // Start the Express server
// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });

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