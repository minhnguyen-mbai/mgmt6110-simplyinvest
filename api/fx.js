// Cache in memory for 5 minutes (300,000 ms) to respect Alpha Vantage API rate limits
let cachedFx = null;
let cacheTimestamp = 0;
const CACHE_TTL_MS = 5 * 60 * 1000;

/**
 * Serverless function: /api/fx
 * Fetches real SGD to USD exchange rate from Alpha Vantage
 */
export default async function handler(req, res) {
  // Set cache headers so browser and intermediate proxies cache responses
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=300, stale-while-revalidate=60');

  // Guard: Verify ALPHAVANTAGE_API_KEY is configured
  const apiKey = process.env.ALPHAVANTAGE_API_KEY ? process.env.ALPHAVANTAGE_API_KEY.trim() : '';
  if (!apiKey) {
    return res.status(503).json({
      error: 'ALPHAVANTAGE_API_KEY is not configured on the server.',
      missing: 'ALPHAVANTAGE_API_KEY',
      code: 'MISSING_API_KEY'
    });
  }

  // Return from in-memory cache if still fresh
  const now = Date.now();
  if (cachedFx && now - cacheTimestamp < CACHE_TTL_MS) {
    return res.status(200).json(cachedFx);
  }

  const url = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=SGD&to_currency=USD&apikey=${encodeURIComponent(apiKey)}`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) {
      return res.status(502).json({
        error: 'The market data provider could not complete this request.',
        code: 'PROVIDER_ERROR',
        upstreamStatus: response.status
      });
    }

    const data = await response.json();

    // Check for provider notices or rate limit messages
    if (data['Note'] || data['Information']) {
      return res.status(502).json({
        error: 'The market data provider could not complete this request.',
        code: 'PROVIDER_RATE_LIMIT'
      });
    }

    if (data['Error Message']) {
      return res.status(502).json({
        error: 'The market data provider could not complete this request.',
        code: 'PROVIDER_ERROR'
      });
    }

    const rawRateObj = data['Realtime Currency Exchange Rate'];
    if (!rawRateObj || typeof rawRateObj !== 'object') {
      return res.status(502).json({
        error: 'We could not find market data for this currency pair.',
        code: 'EMPTY_DATA'
      });
    }

    const rawRate = rawRateObj['5. Exchange Rate'];
    const rateNumber = parseFloat(rawRate);

    if (isNaN(rateNumber) || rateNumber <= 0) {
      return res.status(502).json({
        error: 'The market data provider returned invalid data.',
        code: 'INVALID_DATA'
      });
    }

    const normalizedData = {
      from: 'SGD',
      to: 'USD',
      rate: rateNumber,
      lastRefreshed: rawRateObj['6. Last Refreshed'] || null,
      timeZone: rawRateObj['7. Time Zone'] || null
    };

    // Update in-memory cache
    cachedFx = normalizedData;
    cacheTimestamp = now;

    return res.status(200).json(normalizedData);
  } catch (error) {
    return res.status(504).json({
      error: 'We cannot reach the market data service right now. Please try again later.',
      code: 'PROVIDER_UNREACHABLE'
    });
  }
}
