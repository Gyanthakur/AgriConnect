import app from "./app.js"
import connectCloudinary from "./config/cloudinary.js"
import connectDb from "./config/mongoDb.js"
(async function () {
    const port = process.env.PORT || 4000
    try {
        await Promise.all([
            connectDb(),
            connectCloudinary()
        ])
        app.listen(port, () => {
            console.log("Server started on Port : ", port);
        })
    } catch (error) {
        console.error("Error starting server:", error.message);
    }
}())