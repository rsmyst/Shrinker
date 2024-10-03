const mongoose = require("mongoose");

async function connectToMD(url) {
  return mongoose.connect(url);
}

module.exports = { connectToMD };
