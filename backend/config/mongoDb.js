import mongoose from "mongoose";
const connectDb = async () =>{
    mongoose.connection.on('connected',()=>console.log('Database successfully connected'))
    await mongoose.connect(`${process.env.MONGO_DB_URI}/AgriConnect`)
}

export default connectDb;

// import mongoose from "mongoose";

// let cachedDb = null;

// const connectDb = async () => {
//     if (cachedDb) {
//         console.log('Using cached database instance');
//         return cachedDb;
//     }

//     try {
//         mongoose.connection.on('connected', () => console.log('Database successfully connected'));
//         mongoose.connection.on('error', (err) => console.error(`Database connection error: ${err}`));
//         // mongoose.connection.on('disconected', () => console.log('Database disconnected'));

//         // const options = {
//         //     useNewUrlParser: true,
//         //     useUnifiedTopology: true,
//         //     useCreateIndex: true,
//         //     useFindAndModify: false,
//         // };

//         cachedDb = await mongoose.connect(`${process.env.MONGO_DB_URI}/AgriConnect`);
//         return cachedDb;
//     } catch (error) {
//         console.error(`Initial database connection error: ${error}`);
//         setTimeout(connectDb, 5000); // Retry connection after 5 seconds
//     }
// };

// export default connectDb;