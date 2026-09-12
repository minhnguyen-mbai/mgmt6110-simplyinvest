import { Company } from './types';

/**
 * Educational Mock Market Data
 * Specifically designated for MGMT6110 educational simulation.
 */
export const MOCK_EXCHANGE_RATE_SGD_TO_USD = 0.75; // 1 SGD = 0.75 USD

export const MOCK_COMPANIES: Company[] = [
  {
    id: 'apple',
    name: 'Apple',
    ticker: 'AAPL',
    stockPriceUsd: 228.50,
    plainDescription: 'Makes iPhones, iPads, Mac computers, and digital services.',
    iconName: 'Apple',
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    ticker: 'MSFT',
    stockPriceUsd: 445.00,
    plainDescription: 'Develops Windows, Office apps, cloud services, and Xbox.',
    iconName: 'Microsoft',
  },
  {
    id: 'nvidia',
    name: 'NVIDIA',
    ticker: 'NVDA',
    stockPriceUsd: 126.00,
    plainDescription: 'Designs graphics chips and specialized hardware for computers and AI.',
    iconName: 'Cpu',
  },
];

export const QUICK_PRESET_AMOUNTS = [100, 500, 1000, 2500, 5000];
