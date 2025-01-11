const Crypto = require('../models/crypto');
const calculateStandardDeviation = require('../utils/stdDeviation');

exports.getStats = async (req, res) => {
  const { coin } = req.query;

  if (!coin) {
    return res.status(400).json({ message: 'Coin parameter is required.' });
  }

  try {
    console.log(`Fetching stats for coin: ${coin}`);
    const latest = await Crypto.findOne({ coin }).sort({ timestamp: -1 });
    
    if (!latest) {
      console.log(`No data found for coin: ${coin}`);
      return res.status(404).json({ 
        message: 'No data found.',
        coin: coin
      });
    }

    console.log(`Found data for ${coin}:`, latest);
    res.json({
      price: latest.price,
      marketCap: latest.marketCap,
      change24h: latest.change24h,
      timestamp: latest.timestamp
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ 
      message: 'Server error',
      error: process.env.NODE_ENV !== 'production' ? error.message : undefined
    });
  }
};

exports.getDeviation = async (req, res) => {
  const { coin } = req.query;

  try {
    const records = await Crypto.find({ coin }).sort({ timestamp: -1 }).limit(100);
    const prices = records.map(record => record.price);

    if (prices.length === 0) return res.status(404).json({ message: 'No data found.' });

    const deviation = calculateStandardDeviation(prices);
    res.json({ deviation });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
