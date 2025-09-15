import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.dbUrl)
        console.log("Connecting to MongoDB...");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1); // Exit process with failure
    }
};

export default connectDB;

// call this in index.js

// Uncomment the following lines to use the connection in your main server file
// import connectDB from './config/db.js';
// connectDB();