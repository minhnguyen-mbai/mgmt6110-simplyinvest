export type ScreenState = 'investment' | 'review' | 'success';

export interface Company {
  id: string;
  name: string;
  ticker: string;
  stockPriceUsd: number;
  plainDescription: string;
  iconName: 'Apple' | 'Microsoft' | 'Cpu';
}

export interface SimulationData {
  sgdAmount: number;
  company: Company;
  sgdToUsdRate: number;
  usdAmount: number;
  estimatedShares: number;
}
