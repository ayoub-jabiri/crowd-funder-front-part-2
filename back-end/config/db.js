import mongoose from "mongoose";

console.log(process.env.DB_URL);

const DB_URL = process.env.DB_URL;

export const dbConnect = async () => {
    try {
        await mongoose.connect(DB_URL);

        console.log("Database connected!");
    } catch (error) {
        console.log(error);
    }
};
