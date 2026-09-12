export type ScreenState = 'investment' | 'review' | 'success';

export interface Company {
  id: string;
  name: string;
  ticker: string;
  stockPriceUsd?: number;
  latestTradingDay?: string;
  plainDescription: string;
  iconName: 'Apple' | 'Microsoft' | 'Cpu';
}

export interface FxData {
  from: string;
  to: string;
  rate: number;
  lastRefreshed: string;
  timeZone: string;
}

export interface QuoteData {
  symbol: string;
  priceUSD: number;
  latestTradingDay: string;
}

export type MarketDataStatusType =
  | 'idle'
  | 'loading'
  | 'success'
  | 'empty'
  | 'provider_error'
  | 'unreachable';

export interface MarketDataState {
  status: MarketDataStatusType;
  errorMessage?: string;
}

export interface SimulationData {
  sgdAmount: number;
  company: Company;
  sgdToUsdRate: number;
  usdAmount: number;
  estimatedShares: number;
  lastRefreshedFx?: string;
  latestTradingDayQuote?: string;
}
