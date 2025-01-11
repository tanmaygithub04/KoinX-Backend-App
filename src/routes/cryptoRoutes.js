const express = require('express');
const { getStats, getDeviation } = require('../controllers/cryptoController');
const mongoose = require('mongoose');

const router = express.Router();

router.get('/stats', getStats);
router.get('/deviation', getDeviation);
router.get('/debug', async (req, res) => {
    try {
      const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
      res.json({
        dbStatus,
        env: process.env.NODE_ENV,
        hasMongoUri: !!process.env.MONGODB_URI
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router;

