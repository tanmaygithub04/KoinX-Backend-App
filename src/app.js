require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const routes = require('./routes/cryptoRoutes');
const startFetchCryptoJob = require('./jobs/fetchCryptoJob');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', routes);

connectDB();
startFetchCryptoJob();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
