import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import passport from 'passport'; // <--- NEW IMPORT

// Route Imports
import socialRoutes from './routes/socialRoutes.js';
import activityRoutes from './routes/activityRoutes.js';
import oauthRoutes from './routes/oauthRoutes.js';
import analyticsRoutes from "./routes/analyticsRoutes.js";
import scheduleRoutes from "./routes/scheduleRoutes.js";

// Helper Imports
import './utils/scheduler.js';
import './auth/facebook.js'; // <--- IMPORTANT: This loads your Facebook Strategy


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

// Routes
app.use('/api/social', socialRoutes);
app.use('/api/activity', activityRoutes);
app.use('/api/oauth', oauthRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/schedule", scheduleRoutes);

app.get('/', (req, res) => res.send('Backend API running...'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
