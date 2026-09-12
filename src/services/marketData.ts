import { FxData, QuoteData } from '../types';

export type MarketErrorType = 'empty' | 'provider_error' | 'unreachable';

export interface MarketDataResult<T> {
  data: T | null;
  errorType: MarketErrorType | null;
  errorMessage: string | null;
}

// Client-side cache to avoid refetching on SGD amount changes or toggling between already-fetched companies
const clientQuoteCache = new Map<string, { data: QuoteData; timestamp: number }>();
let clientFxCache: { data: FxData; timestamp: number } | null = null;
const CLIENT_CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

export async function fetchFxData(forceRefresh = false): Promise<MarketDataResult<FxData>> {
  const now = Date.now();
  if (!forceRefresh && clientFxCache && now - clientFxCache.timestamp < CLIENT_CACHE_TTL_MS) {
    return { data: clientFxCache.data, errorType: null, errorMessage: null };
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch('/api/fx', { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) {
      const errJson = await response.json().catch(() => null);
      if (errJson?.code === 'EMPTY_DATA') {
        return {
          data: null,
          errorType: 'empty',
          errorMessage: 'We could not find market data for this currency pair.',
        };
      }
      if (errJson?.code === 'PROVIDER_UNREACHABLE' || response.status === 504) {
        return {
          data: null,
          errorType: 'unreachable',
          errorMessage: 'We cannot reach the market data service right now. Please try again later.',
        };
      }
      return {
        data: null,
        errorType: 'provider_error',
        errorMessage: 'The market data provider could not complete this request.',
      };
    }

    const data: FxData = await response.json();
    if (!data || typeof data.rate !== 'number' || isNaN(data.rate) || data.rate <= 0) {
      return {
        data: null,
        errorType: 'provider_error',
        errorMessage: 'The market data provider could not complete this request.',
      };
    }

    clientFxCache = { data, timestamp: now };
    return { data, errorType: null, errorMessage: null };
  } catch {
    return {
      data: null,
      errorType: 'unreachable',
      errorMessage: 'We cannot reach the market data service right now. Please try again later.',
    };
  }
}

export async function fetchQuoteData(
  symbol: string,
  forceRefresh = false
): Promise<MarketDataResult<QuoteData>> {
  const upper = symbol.toUpperCase();
  const now = Date.now();
  const cached = clientQuoteCache.get(upper);

  if (!forceRefresh && cached && now - cached.timestamp < CLIENT_CACHE_TTL_MS) {
    return { data: cached.data, errorType: null, errorMessage: null };
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(`/api/quote?symbol=${encodeURIComponent(upper)}`, {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      const errJson = await response.json().catch(() => null);
      if (errJson?.code === 'EMPTY_DATA' || response.status === 404) {
        return {
          data: null,
          errorType: 'empty',
          errorMessage: 'We could not find market data for this company.',
        };
      }
      if (errJson?.code === 'PROVIDER_UNREACHABLE' || response.status === 504) {
        return {
          data: null,
          errorType: 'unreachable',
          errorMessage: 'We cannot reach the market data service right now. Please try again later.',
        };
      }
      return {
        data: null,
        errorType: 'provider_error',
        errorMessage: 'The market data provider could not complete this request.',
      };
    }

    const data: QuoteData = await response.json();
    if (!data || typeof data.priceUSD !== 'number' || isNaN(data.priceUSD) || data.priceUSD <= 0) {
      return {
        data: null,
        errorType: 'provider_error',
        errorMessage: 'The market data provider could not complete this request.',
      };
    }

    clientQuoteCache.set(upper, { data, timestamp: now });
    return { data, errorType: null, errorMessage: null };
  } catch {
    return {
      data: null,
      errorType: 'unreachable',
      errorMessage: 'We cannot reach the market data service right now. Please try again later.',
    };
  }
}
