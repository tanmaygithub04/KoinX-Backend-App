const cron = require('node-cron');
const Crypto = require('../models/crypto');
const fetchCryptoData = require('../services/fetchCryptoData');

const startFetchCryptoJob = () => {
  cron.schedule('0 */2 * * *', async () => {
    console.log('Fetching crypto data...');
    try {
      const cryptoData = await fetchCryptoData();
      await Crypto.insertMany(cryptoData);
      console.log('Crypto data updated successfully.');
    } catch (error) {
      console.error('Error updating crypto data:', error.message);
    }
  });
};

module.exports = startFetchCryptoJob;
