const cron = require('node-cron');
const Crypto = require('../models/crypto');
const fetchCryptoData = require('../services/fetchCryptoData');

const fetchAndSaveData = async () => {
  console.log('Fetching crypto data...');
  try {
    const cryptoData = await fetchCryptoData();
    await Crypto.insertMany(cryptoData);
    console.log('Crypto data updated successfully.');
  } catch (error) {
    console.error('Error updating crypto data:', error.message);
  }
};

const startFetchCryptoJob = () => {
  console.log('Starting fetch crypto job...');
  
  // Run immediately
  fetchAndSaveData();
  
  // Then schedule for every 2 hours
  cron.schedule('0 */2 * * *', fetchAndSaveData);
};

module.exports = startFetchCryptoJob;
