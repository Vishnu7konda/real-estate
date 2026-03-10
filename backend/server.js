import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import propertyRoutes from './routes/propertyRoutes.js';
import leadRoutes from './routes/leadRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { ensureStorageBucket } from './supabaseClient.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Real Estate API is running' });
});

app.use('/api/properties', propertyRoutes);
app.use('/api/leads', leadRoutes);


// Start server
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await ensureStorageBucket('properties');
});
