import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import connectDB from './config/db.js';
import serviceRoutes from './routes/serviceRoutes.js';
import errorHandler from './middlewares/errorMiddleware.js';
import { apiLimiter } from './middlewares/rateLimiter.js';
import authRoutes from './routes/authRoutes.js';
import colors from 'colors';
dotenv.config();
connectDB();

const app = express();

app.use(helmet());
app.use(morgan('common'));
app.use(express.json());

app.use('/api/', apiLimiter);
//authRoutes
app.use('/api/auth', authRoutes);
//Service Route
app.use('/api/services', serviceRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`.bgYellow.white));
