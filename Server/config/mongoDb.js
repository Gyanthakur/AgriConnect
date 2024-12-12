import mongoose from "mongoose";
const connectDb = async () =>{
    mongoose.connection.on('connected',()=>console.log('Database successfully connected'))
    await mongoose.connect(`${process.env.MONGO_Db_URI}/AgriConnect`)
}

export default connectDb;