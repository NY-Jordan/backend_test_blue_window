// src/app.js
import express, { Application } from 'express'; 
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'
import compression from 'compression'
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import { apiRouter } from './routes';

dotenv.config();

const app  : Application = express();


app.use(express.json());
app.use(compression())
app.use(cookieParser())
app.use(express.urlencoded({ extended : true  }));

app.use(cors({
  credentials : true
}));


app.use('/api/v1', apiRouter);


app.listen(5000, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
