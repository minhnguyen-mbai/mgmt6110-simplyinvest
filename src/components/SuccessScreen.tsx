import React from 'react';
import { Company } from '../types';
import { CheckCircle2, RotateCcw, ShieldAlert } from 'lucide-react';

interface SuccessScreenProps {
  sgdAmount: number;
  selectedCompany: Company;
  sgdToUsdRate: number;
  usdAmount: number;
  estimatedShares: number;
  stockPriceUsd: number;
  onReset: () => void;
}

export const SuccessScreen: React.FC<SuccessScreenProps> = ({
  sgdAmount,
  selectedCompany,
  sgdToUsdRate,
  usdAmount,
  estimatedShares,
  stockPriceUsd,
  onReset,
}) => {
  const formatSharesDisplay = (shares: number) => {
    if (shares <= 0) return '0.00';
    return shares < 10 ? shares.toFixed(3) : shares.toFixed(2);
  };

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* 1. Mandatory Safeguard Banner */}
      <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 sm:p-5 text-amber-950 shadow-xs flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <h2 className="text-sm sm:text-base font-bold text-amber-950 tracking-tight leading-snug">
            No real money was invested.
          </h2>
          <p className="text-xs sm:text-sm text-amber-800 mt-0.5 leading-relaxed">
            This is an educational simulation. No real funds were used and no real transactions were made.
          </p>
        </div>
      </div>

      {/* 2. Simulation Result Card */}
      <div className="bg-white rounded-2xl p-5 sm:p-8 border border-stone-200 shadow-xs text-center">
        <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full mx-auto flex items-center justify-center mb-3">
          <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
        </div>

        <h1 className="text-xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
          Simulation complete
        </h1>
        <p className="text-stone-600 mt-1 text-xs sm:text-sm">
          Here is what your simulated money represents.
        </p>

        {/* Central Result Box */}
        <div className="mt-5 sm:mt-6 p-5 sm:p-6 rounded-2xl bg-stone-900 text-stone-100 max-w-lg mx-auto shadow-md">
          <span className="text-[11px] sm:text-xs font-semibold text-stone-400 uppercase tracking-wider block">
            Simulated Result
          </span>
          <p className="text-xs sm:text-sm text-stone-300 font-medium mt-1">
            You could own approximately
          </p>
          <div className="mt-1 text-4xl sm:text-5xl font-extrabold text-emerald-400 tracking-tight break-words">
            {formatSharesDisplay(estimatedShares)} shares
          </div>
          <div className="mt-1.5">
            <span className="text-stone-200 text-base sm:text-lg font-semibold block leading-tight">
              of {selectedCompany.name}
            </span>
            <span className="text-xs text-stone-400">
              <span className="font-mono text-stone-300">{selectedCompany.ticker}</span> · stock symbol
            </span>
          </div>

          {/* Breakdown items */}
          <div className="mt-5 pt-4 border-t border-stone-800 grid grid-cols-1 sm:grid-cols-2 gap-3 text-left text-xs">
            <div className="bg-stone-800/50 p-2.5 rounded-lg">
              <span className="text-stone-400 block text-[11px]">Simulated Amount</span>
              <span className="font-bold text-stone-100 text-sm break-words">
                S$ {sgdAmount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })} SGD
              </span>
              <span className="text-stone-400 block text-[11px] mt-0.5">≈ ${usdAmount.toFixed(2)} USD</span>
            </div>
            <div className="bg-stone-800/50 p-2.5 rounded-lg">
              <span className="text-stone-400 block text-[11px]">Latest Available Price</span>
              <span className="font-bold text-stone-100 text-sm">
                ${stockPriceUsd.toFixed(2)} USD
              </span>
              <span className="text-stone-400 block text-[11px] mt-0.5">1 SGD = {sgdToUsdRate.toFixed(4)} USD</span>
            </div>
          </div>
        </div>

        {/* CTA: Start another simulation */}
        <div className="mt-6 sm:mt-8 pt-2 sm:pt-4">
          <button
            id="start-another-simulation-cta"
            type="button"
            onClick={onReset}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 active:bg-emerald-800 text-white font-bold text-base sm:text-sm shadow-md transition-all inline-flex items-center justify-center gap-2 cursor-pointer min-h-[48px]"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Start another simulation</span>
          </button>
        </div>
      </div>
    </div>
  );
};
