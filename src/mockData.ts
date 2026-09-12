import { Company } from './types';

export const COMPANIES: Company[] = [
  {
    id: 'apple',
    name: 'Apple',
    ticker: 'AAPL',
    plainDescription: 'Makes iPhones, iPads, Mac computers, and digital services.',
    iconName: 'Apple',
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    ticker: 'MSFT',
    plainDescription: 'Develops Windows, Office apps, cloud services, and Xbox.',
    iconName: 'Microsoft',
  },
  {
    id: 'nvidia',
    name: 'NVIDIA',
    ticker: 'NVDA',
    plainDescription: 'Designs graphics chips and specialized hardware for computers and AI.',
    iconName: 'Cpu',
  },
];

export const MOCK_COMPANIES = COMPANIES;
export const QUICK_PRESET_AMOUNTS = [100, 500, 1000, 2500, 5000];
