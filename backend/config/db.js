const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI || "mongodb+srv://sr10077_db_user:Software%40123@software.usyxiic.mongodb.net/academic_system?appName=software";
    await mongoose.connect(uri);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection failed! Keeping server alive for debugging:", err.message);
  }
};

module.exports = connectDB;
