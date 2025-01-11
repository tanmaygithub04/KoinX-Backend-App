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
startFetchCryptoJob();


// Only start the server if not being deployed to Vercel
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Server error',
    error: process.env.NODE_ENV !== 'production' ? err.message : undefined
  });
});

// Export the Express app for Vercel
module.exports = app;
