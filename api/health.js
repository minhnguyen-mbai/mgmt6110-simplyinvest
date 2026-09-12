/**
 * Serverless function: /api/health
 * Health check endpoint reporting service status, credential presence, and upstream reachability
 */
export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');

  const apiKeyRaw = process.env.ALPHAVANTAGE_API_KEY;
  const hasApiKey = Boolean(apiKeyRaw && apiKeyRaw.trim().length > 0);

  let upstreamReachable = false;
  let upstreamStatus = null;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    // Ping Alpha Vantage root with a lightweight HEAD request to verify reachability
    const response = await fetch('https://www.alphavantage.co/', {
      method: 'HEAD',
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    upstreamReachable = true;
    upstreamStatus = response.status;
  } catch (err) {
    upstreamReachable = false;
    upstreamStatus = null;
  }

  // Strictly sanitized output: NEVER expose credentials, prefix, length, or fragments
  return res.status(200).json({
    service: 'SimplyInvest',
    hasApiKey: hasApiKey,
    upstreamReachable: upstreamReachable,
    upstreamStatus: upstreamStatus,
    checkedAt: new Date().toISOString()
  });
}
