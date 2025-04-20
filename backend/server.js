import express from 'express'
import connectDB from './db.js'
import cors from 'cors'
import dotenv from 'dotenv'
import blogRoutes from './routes/blogRoutes.js'
import authRoutes from './routes/authRoutes.js'
import commentRoutes from './routes/commentRoutes.js'
import cookieParser from "cookie-parser";
dotenv.config()

const app = express();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//FOR AUTH
app.use('/api/auth',authRoutes);
// FOR BLOG ACCESS
app.use('/api/blogs',blogRoutes);
// FOR COMMENTS
app.use('/api/comments',commentRoutes);

connectDB(MONGO_URI)
.then(app.listen(PORT,()=>{
    console.log(`Server is listining on port: ${PORT}`)
}))