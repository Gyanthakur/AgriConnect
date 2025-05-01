import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import authRouter from './routes/auth.routes.js'
import userRouter from './routes/user.routes.js'
import utilsRouter from './routes/utils.routes.js'
import cropRouter from './routes/crop.routes.js'
import ChatRouter from './routes/chat.routes.js'
import equipmentRouter from './routes/equipment.routes.js'
const app = express()
app.use(express.json())
const corsOptions = {
    origin: ['http://localhost:5173',"https://agri-connect-nu.vercel.app"],
    credentials: true,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/utils", utilsRouter)
app.use("/api/crop", cropRouter)
app.use("/api/equipment", equipmentRouter)
app.use("/api/chat", ChatRouter)
app.get('/health', (req, res) => {
    res.send("healthy")
});

export default app;