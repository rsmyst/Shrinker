const ShortUniqueId = require("short-unique-id");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  if (!req.body) return res.json({ error: "URL IS REQUIRED!" });
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });

  const uid = new ShortUniqueId({ length: 8 });
  const shortID = uid.rnd();
  console.log(`Generated shortID: ${shortID}`);

  await URL.create({
    shortID: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });

  return res.json({ id: shortID });
}

module.exports = {
  handleGenerateNewShortURL,
};
