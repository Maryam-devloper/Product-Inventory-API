
require("dotenv").config();
const mongoose = require("mongoose");

async function testConnection() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000
    });

    console.log("SUCCESS: Connected to MongoDB Atlas!");
  } catch (error) {
    console.error("CONNECTION FAILED:", error.message);
  } finally {
    await mongoose.disconnect();
  }
}

testConnection();
