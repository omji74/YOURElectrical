import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import { UserRouter } from './routes/user.js';

dotenv.config()


const app = express();
app.use(express.json());
app.use(cors(
    {
        origin:['http://localhost:5173'],
        credentials:true
    }

))

app.use(cookieParser());


mongoose.connect('mongodb://localhost:27017/YOURElectrical', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
const db = mongoose.connection;


db.on("error", (error) => {
    console.error("error occur ", error);

});
db.once("open", () => {
    console.log("DB Connection successful");

})


app.use('/auth', UserRouter);

app.listen(process.env.PORT, () => {
    console.log("Server is running");

})