// Cache in memory per symbol for 5 minutes (300,000 ms)
const quoteCache = new Map();
const CACHE_TTL_MS = 5 * 60 * 1000;

const ALLOWED_SYMBOLS = ['AAPL', 'MSFT', 'NVDA'];

/**
 * Serverless function: /api/quote
 * Fetches real stock quote from Alpha Vantage for AAPL, MSFT, or NVDA
 */
export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=300, stale-while-revalidate=60');

  // 1. Validate Symbol query parameter
  const rawSymbol = req.query?.symbol;
  if (!rawSymbol || typeof rawSymbol !== 'string') {
    return res.status(400).json({
      error: 'Missing symbol parameter. Supported symbols: AAPL, MSFT, NVDA',
      code: 'INVALID_SYMBOL'
    });
  }

  const symbol = rawSymbol.trim().toUpperCase();
  if (!ALLOWED_SYMBOLS.includes(symbol)) {
    return res.status(400).json({
      error: `Unsupported symbol "${rawSymbol}". Supported symbols are: ${ALLOWED_SYMBOLS.join(', ')}`,
      code: 'INVALID_SYMBOL'
    });
  }

  // 2. Guard: Verify ALPHAVANTAGE_API_KEY is configured
  const apiKey = process.env.ALPHAVANTAGE_API_KEY ? process.env.ALPHAVANTAGE_API_KEY.trim() : '';
  if (!apiKey) {
    return res.status(503).json({
      error: 'ALPHAVANTAGE_API_KEY is not configured on the server.',
      missing: 'ALPHAVANTAGE_API_KEY',
      code: 'MISSING_API_KEY'
    });
  }

  // 3. Return from in-memory cache if still fresh
  const now = Date.now();
  const cached = quoteCache.get(symbol);
  if (cached && now - cached.timestamp < CACHE_TTL_MS) {
    return res.status(200).json(cached.data);
  }

  const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${encodeURIComponent(symbol)}&apikey=${encodeURIComponent(apiKey)}`;

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

    const rawQuote = data['Global Quote'];
    if (!rawQuote || typeof rawQuote !== 'object' || Object.keys(rawQuote).length === 0) {
      return res.status(502).json({
        error: 'We could not find market data for this company.',
        code: 'EMPTY_DATA'
      });
    }

    const rawPrice = rawQuote['05. price'];
    const priceUSD = parseFloat(rawPrice);

    if (isNaN(priceUSD) || priceUSD <= 0) {
      return res.status(502).json({
        error: 'The market data provider returned invalid data.',
        code: 'INVALID_DATA'
      });
    }

    const normalizedData = {
      symbol: rawQuote['01. symbol'] || symbol,
      priceUSD: priceUSD,
      latestTradingDay: rawQuote['07. latest trading day'] || null
    };

    // Update in-memory cache
    quoteCache.set(symbol, {
      data: normalizedData,
      timestamp: now
    });

    return res.status(200).json(normalizedData);
  } catch (error) {
    return res.status(504).json({
      error: 'We cannot reach the market data service right now. Please try again later.',
      code: 'PROVIDER_UNREACHABLE'
    });
  }
}
