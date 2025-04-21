import mongoose from "mongoose";
const connectDb = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            process.env.MONGO_DB_URI ?? "mongodb://localhost:27017/AgriConnect",
        );
        console.log(
            "Connected to Database",
            connectionInstance.connection.host,
            connectionInstance.connection.name
        );
    } catch (error) {
        console.error(`Error connecting to the database: ${error}`);
    }
};
export default connectDb;