import mongoose from "mongoose"

const connectDB = async (uri) => {
    try {
        await mongoose.connect(uri);
        console.log("MongoDB connected successfully!");
    } catch (err) {
        console.error("MongoDB connection failed:", err);
        process.exit(1);
    }
};

export default connectDB;
