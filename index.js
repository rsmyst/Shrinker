// const express = require("express");
// const app = express();
// const urlRoute = require("./routes/url");
// const { connectToMD } = require("./connect");
// const URL = require("./models/url");

// app.use("/url", urlRoute);

// app.get("/:shortID", async (req, res) => {
//   const shortID = req.params.shortID;
//   console.log(`Received request for shortID: ${shortID}`);

//   const entry = await URL.findOneAndUpdate(
//     { shortID },
//     { $push: { visitHistory: { timestamp: Date.now() } } },
//     { new: true }
//   );
//   if (!entry) {
//     console.log(`No entry found for shortID: ${shortID}`);
//     return res.status(404).json({ error: "Short URL not found" });
//   }

//   let redirectURL = entry.redirectURL;
//   if (!/^https?:\/\//i.test(redirectURL)) {
//     redirectURL = "http://" + redirectURL;
//   }

//   console.log(`Redirecting to: ${redirectURL}`);
//   res.redirect(redirectURL);
// });

// const PORT = 8001;
// connectToMD("mongodb://localhost:27017/short-url").then(() => {
//   console.log("MongoDB connected");
// });

// app.listen(PORT, () => {
//   console.log(`Server started at PORT ${PORT}`);
// });
const express = require("express");
const app = express();
const urlRoute = require("./routes/url");
const { connectToMD } = require("./connect");
const URL = require("./models/url");

app.use(express.json());
app.use("/url", urlRoute);

app.get("/:shortID", async (req, res) => {
  const shortID = req.params.shortID;
  console.log(`Received request for shortID: ${shortID}`);

  const entry = await URL.findOneAndUpdate(
    { shortID },
    { $push: { visitHistory: { timestamp: Date.now() } } },
    { new: true }
  );
  if (!entry) {
    console.log(`No entry found for shortID: ${shortID}`);
    return res.status(404).json({ error: "Short URL not found" });
  }

  let redirectURL = entry.redirectURL;
  if (!/^https?:\/\//i.test(redirectURL)) {
    redirectURL = "http://" + redirectURL;
  }

  console.log(`Redirecting to: ${redirectURL}`);
  res.redirect(redirectURL);
});

const PORT = 8001;
connectToMD("mongodb://localhost:27017/short-url").then(() => {
  console.log("MongoDB connected");
});

app.listen(PORT, () => {
  console.log(`Server started at PORT ${PORT}`);
});
