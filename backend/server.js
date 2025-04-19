import express from 'express'
import connectDB from './db.js'
import cors from 'cors'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'
import blogRoutes from './routes/blogRoutes.js'
dotenv.config()

const app = express();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users',userRoutes);
app.use('/api/blogs',blogRoutes);
// app.use('/api/comments',commentRoutes);


connectDB(MONGO_URI)
.then(app.listen(PORT,()=>{
    console.log(`Server is listining on port: ${PORT}`)
}))