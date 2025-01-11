const express = require('express');
const { getStats, getDeviation } = require('../controllers/cryptoController');
const mongoose = require('mongoose');

const router = express.Router();

router.get('/stats', getStats);
router.get('/deviation', getDeviation);
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    dbStatus: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

module.exports = router;

