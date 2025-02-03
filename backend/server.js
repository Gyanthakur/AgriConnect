import express from 'express'
import cors from 'cors'
import  'dotenv/config'
import connectDb from './config/mongoDb.js'
import farmerRouter from './routes/farmerRoute.js'
import connectCloudinary from './config/cloudinary.js'
import merchantRouter from './routes/merchantRoute.js'


const app = express()

const port = process.env.PORT || 4000

connectDb()
connectCloudinary()
app.use(express.json())
app.use(cors())

// app.use('/api/admin',adminRouter);
// app.use('/api/doctor',doctorRouter)
app.use('/api/farmer',farmerRouter)
app.use('/api/merchant',merchantRouter)

app.get('/',(req,res)=>{
    res.send("Agri connect Api working fine!")

})

app.listen(port,()=>{
    console.log("Server started on Port : ",port);
    
})