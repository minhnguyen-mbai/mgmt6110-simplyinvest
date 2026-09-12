import React from 'react';
import { Company } from '../types';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

interface ReviewScreenProps {
  sgdAmount: number;
  selectedCompany: Company;
  sgdToUsdRate: number;
  usdAmount: number;
  estimatedShares: number;
  stockPriceUsd: number;
  lastRefreshedFx?: string;
  latestTradingDayQuote?: string;
  onConfirm: () => void;
  onBack: () => void;
}

export const ReviewScreen: React.FC<ReviewScreenProps> = ({
  sgdAmount,
  selectedCompany,
  sgdToUsdRate,
  usdAmount,
  estimatedShares,
  stockPriceUsd,
  lastRefreshedFx,
  latestTradingDayQuote,
  onConfirm,
  onBack,
}) => {
  const formatSharesDisplay = (shares: number) => {
    if (shares <= 0) return '0.00';
    return shares < 10 ? shares.toFixed(3) : shares.toFixed(2);
  };

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Header */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200 shadow-xs">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 active:text-stone-900 transition-colors mb-3 cursor-pointer min-h-[36px] py-1"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Change amount or company</span>
        </button>

        <h1 className="text-xl sm:text-3xl font-extrabold text-stone-900 tracking-tight leading-snug">
          Review your simulation
        </h1>
        <p className="text-stone-600 mt-1 text-sm leading-relaxed">
          Check each number before confirming. A share is a unit of ownership in a company.
        </p>
      </div>

      {/* Breakdown Card - Clear Vertical Layout */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="px-5 sm:px-6 py-3.5 border-b border-stone-100 bg-stone-50/70 flex items-center justify-between gap-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-stone-500">
            Simulation Details
          </h2>
          <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded shrink-0">
            Latest Available Market Data
          </span>
        </div>

        <div className="p-5 sm:p-6 divide-y divide-stone-100">
          {/* 1. SGD Amount */}
          <div className="py-3.5 first:pt-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
            <div>
              <span className="text-xs sm:text-sm font-semibold text-stone-800 block">
                1. Amount to invest
              </span>
              <span className="text-[11px] sm:text-xs text-stone-500">
                Entered in Singapore Dollars
              </span>
            </div>
            <div className="text-left sm:text-right mt-1 sm:mt-0">
              <span className="text-lg sm:text-xl font-bold text-stone-900 break-words">
                S$ {sgdAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <span className="text-xs text-stone-500 ml-1 sm:block sm:ml-0">SGD</span>
            </div>
          </div>

          {/* 2. Selected Company */}
          <div className="py-3.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
            <div>
              <span className="text-xs sm:text-sm font-semibold text-stone-800 block">
                2. Selected company
              </span>
              <span className="text-[11px] sm:text-xs text-stone-500">
                The business you chose
              </span>
            </div>
            <div className="text-left sm:text-right mt-1 sm:mt-0">
              <span className="text-base sm:text-lg font-bold text-stone-900 block">
                {selectedCompany.name}
              </span>
              <span className="text-xs text-stone-500 font-medium">
                <span className="font-mono font-semibold text-stone-700">{selectedCompany.ticker}</span> · stock symbol
              </span>
            </div>
          </div>

          {/* 3. Currency Conversion */}
          <div className="py-3.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
            <div>
              <span className="text-xs sm:text-sm font-semibold text-stone-800 block">
                3. Currency conversion
              </span>
              <span className="text-[11px] sm:text-xs text-stone-500">
                US shares are priced in US dollars. {lastRefreshedFx ? `(Updated: ${lastRefreshedFx})` : ''}
              </span>
            </div>
            <div className="text-left sm:text-right mt-1 sm:mt-0">
              <span className="text-sm sm:text-base font-bold text-stone-900 font-mono block">
                1 SGD = {sgdToUsdRate.toFixed(4)} USD
              </span>
              <span className="text-xs text-stone-500">
                Converts to ≈ ${usdAmount.toFixed(2)} USD
              </span>
            </div>
          </div>

          {/* 4. Stock Price in USD */}
          <div className="py-3.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
            <div>
              <span className="text-xs sm:text-sm font-semibold text-stone-800 block">
                4. Stock price in USD
              </span>
              <span className="text-[11px] sm:text-xs text-stone-500">
                Latest available price for 1 share {latestTradingDayQuote ? `(${latestTradingDayQuote})` : ''}
              </span>
            </div>
            <div className="text-left sm:text-right mt-1 sm:mt-0">
              <span className="text-base sm:text-lg font-bold text-stone-900 font-mono block">
                ${stockPriceUsd.toFixed(2)} USD
              </span>
              <span className="text-xs text-stone-400">Latest available price</span>
            </div>
          </div>

          {/* 5. Estimated Shares (Prominent Result Highlight) */}
          <div className="py-4 last:pb-0 bg-emerald-50/80 -mx-5 sm:-mx-6 px-5 sm:px-6 border-t border-emerald-200/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider block">
                5. Estimated shares you could own
              </span>
              <span className="text-xs text-emerald-800">
                Calculated by dividing ${usdAmount.toFixed(2)} USD by ${stockPriceUsd.toFixed(2)} USD
              </span>
            </div>
            <div className="text-left sm:text-right mt-1 sm:mt-0">
              <span className="text-3xl sm:text-4xl font-extrabold text-emerald-800 break-words block tracking-tight">
                {formatSharesDisplay(estimatedShares)}
              </span>
              <span className="text-xs font-bold text-emerald-700 block">
                shares of {selectedCompany.name}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 pt-2 sm:flex-row-reverse sm:items-center sm:justify-between">
        <button
          id="confirm-simulation-cta"
          type="button"
          onClick={onConfirm}
          className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 active:bg-emerald-800 text-white font-bold text-base sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[48px]"
        >
          <CheckCircle2 className="w-5 h-5" />
          <span>Confirm simulation</span>
        </button>

        <button
          type="button"
          onClick={onBack}
          className="w-full sm:w-auto px-5 py-3.5 rounded-xl border border-stone-300 text-stone-700 font-semibold text-sm hover:bg-stone-100 active:bg-stone-200 transition-colors cursor-pointer min-h-[48px] text-center"
        >
          ← Change inputs
        </button>
      </div>
    </div>
  );
};
