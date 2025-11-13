import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import socialRoutes from './routes/socialRoutes.js';
import activityRoutes from './routes/activityRoutes.js';
import oauthRoutes from './routes/oauthRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/social', socialRoutes);
app.use('/api/activity', activityRoutes);
app.use('/api/oauth', oauthRoutes);

app.get('/', (req, res) => res.send('Backend API running...'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
