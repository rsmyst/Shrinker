// const express = require("express");
// const { handleGenerateNewShortURL } = require("../controllers/url");

// const router = express.Router();

// router.post("/", handleGenerateNewShortURL);

// module.exports = router;
const express = require("express");
const { handleGenerateNewShortURL } = require("../controllers/url");
const URL = require("../models/url");

const router = express.Router();

router.post("/", handleGenerateNewShortURL);

router.get("/history", async (req, res) => {
  const urls = await URL.find({});
  let html = `
    <html>
      <head>
        <style>
          .card {
            border: 1px solid #ccc;
            border-radius: 8px;
            padding: 16px;
            margin: 16px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
          .card h2 {
            margin: 0 0 8px;
          }
          .card p {
            margin: 4px 0;
          }
        </style>
      </head>
      <body>
        <h1>URL History</h1>
        <div class="cards">
  `;

  urls.forEach((url) => {
    html += `
      <div class="card">
        <h2>${url.shortID}</h2>
        <p>Redirect URL: ${url.redirectURL}</p>
        <p>Clicks: ${url.visitHistory.length}</p>
      </div>
    `;
  });

  html += `
        </div>
      </body>
    </html>
  `;

  res.send(html);
});
// router.get("/", (req, res) => {
//   res.send(`
//       <html>
//         <head>
//           <style>
//             body {
//               font-family: Arial, sans-serif;
//               display: flex;
//               justify-content: center;
//               align-items: center;
//               height: 100vh;
//               background-color: #f0f0f0;
//             }
//             .container {
//               text-align: center;
//               background: white;
//               padding: 20px;
//               border-radius: 8px;
//               box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//             }
//             input[type="text"] {
//               width: 80%;
//               padding: 10px;
//               margin: 10px 0;
//               border: 1px solid #ccc;
//               border-radius: 4px;
//             }
//             button {
//               padding: 10px 20px;
//               background-color: #007BFF;
//               color: white;
//               border: none;
//               border-radius: 4px;
//               cursor: pointer;
//             }
//             button:hover {
//               background-color: #0056b3;
//             }
//             .result {
//               margin-top: 20px;
//             }
//           </style>
//         </head>
//         <body>
//           <div class="container">
//             <h1>Welcome to URL Shortener</h1>
//             <input type="text" id="urlInput" placeholder="Enter your URL here" />
//             <button onclick="generateShortURL()">Generate Short URL</button>
//             <div class="result" id="result"></div>
//           </div>
//           <script>
//             async function generateShortURL() {
//               const url = document.getElementById('urlInput').value;
//               try {
//                 const response = await fetch('/url', {
//                   method: 'POST',
//                   headers: {
//                     'Content-Type': 'application/json'
//                   },
//                   body: JSON.stringify({ "url": url })
//                 });
//                 if (!response.ok) {
//                   throw new Error('Network response was not ok');
//                 }
//                 const data = await response.json();
//                 if (data.id) {
//                   document.getElementById('result').innerHTML = \`<p>Short URL: <a href="/\${data.id}">\${window.location.origin}/\${data.id}</a></p>\`;
//                 } else {
//                   document.getElementById('result').innerHTML = '<p>Error generating short URL</p>';
//                 }
//               } catch (error) {
//                 console.error('There was a problem with the fetch operation:', error);
//                 document.getElementById('result').innerHTML = '<p>Error generating short URL</p>';
//               }
//             }
//           </script>
//         </body>
//       </html>
//     `);
// });
module.exports = router;
