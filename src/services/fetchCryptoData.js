const axios = require('axios');

const fetchCryptoData = async () => {
  const coins = ['bitcoin', 'matic-network', 'ethereum'];
  const url = `https://api.coingecko.com/api/v3/simple/price`;
  
  try {
    await new Promise(resolve => setTimeout(resolve, 2000));

    const response = await axios.get(url, {
      params: {
        ids: coins.join(','),
        vs_currencies: 'usd',
        include_market_cap: true,
        include_24hr_change: true,
      },
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'CryptoTracker/1.0'
      }
    });

    return coins.map(coin => ({
      coin,
      price: response.data[coin].usd,
      marketCap: response.data[coin].usd_market_cap,
      change24h: response.data[coin].usd_24h_change,
      timestamp: new Date()
    }));
  } catch (error) {
    if (error.response?.status === 429) {
      console.log('Rate limit reached, waiting 60 seconds...');
      await new Promise(resolve => setTimeout(resolve, 61000));
      return fetchCryptoData();
    }
    throw error;
  }
};

module.exports = fetchCryptoData;
