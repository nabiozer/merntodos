import express  from 'express';
import path from 'path';
import dotenv from 'dotenv';
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// routes 
import todoRoutes from './routes/todoRoutes.js'
import userRoutes from './routes/userRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

dotenv.config();

connectDB();
const app = express();

app.use(express.json());
app.get('/', (req,res) => {
    res.send('Api is running')
});


app.use('/api/todos', todoRoutes);
app.use('/api/users', userRoutes);
app.use('/api/uploads',uploadRoutes)

const __dirname = path.resolve()
app.use('/uploads',express.static(path.join(__dirname,'uploads')))
app.use(notFound)
app.use(errorHandler)


const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`));