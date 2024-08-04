import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connect.js"
import userRouter from "./routes/userRouter.js";
import foodRouter from "./routes/foodRouter.js"
import orderRouter from "./routes/orderRouter.js"
import cors from "cors"

const app= express();

app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cors());
dotenv.config();

connectDB()

app.get('/', (req, res)=>{
    res.send('Hello World!');
})

app.use('/api', userRouter)
app.use('/api', foodRouter)
app.use('/api', orderRouter)

const port = process.env.PORT

app.listen(port, ()=>{
    console.log('app listening on port');
})