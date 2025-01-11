require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const routes = require('./routes/cryptoRoutes');
const startFetchCryptoJob = require('./jobs/fetchCryptoJob');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', routes);

// Always connect to database
connectDB();

// Only run cron job in development
if (process.env.NODE_ENV !== 'production') {
  startFetchCryptoJob();
}

// Always start the server (needed for Render)
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Server error',
    error: process.env.NODE_ENV !== 'production' ? err.message : undefined
  });
});

// Export the Express app for Vercel
module.exports = app;
