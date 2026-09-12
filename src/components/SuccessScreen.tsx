import React from 'react';
import { Company } from '../types';
import { CheckCircle2, RotateCcw, ShieldAlert, Sparkles, BookOpen } from 'lucide-react';

interface SuccessScreenProps {
  sgdAmount: number;
  selectedCompany: Company;
  sgdToUsdRate: number;
  usdAmount: number;
  estimatedShares: number;
  onReset: () => void;
}

export const SuccessScreen: React.FC<SuccessScreenProps> = ({
  sgdAmount,
  selectedCompany,
  sgdToUsdRate,
  usdAmount,
  estimatedShares,
  onReset,
}) => {
  return (
    <div className="space-y-6">
      {/* Prominent Educational Safety Banner - Mandatory Guardrail */}
      <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-5 text-amber-900 shadow-xs flex items-start gap-3.5">
        <ShieldAlert className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h2 className="text-base sm:text-lg font-bold text-amber-900 tracking-tight">
            No real money was invested.
          </h2>
          <p className="text-xs sm:text-sm text-amber-800 leading-relaxed">
            This is an educational simulation for MGMT6110 using mock market data. No financial account was connected, no real orders were sent to any market, and no real money was debited.
          </p>
        </div>
      </div>

      {/* Main Simulation Result Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-xs text-center">
        <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full mx-auto flex items-center justify-center mb-4 ring-8 ring-emerald-50">
          <CheckCircle2 className="w-7 h-7 stroke-[2.5]" />
        </div>

        <span className="text-xs uppercase font-bold tracking-wider text-stone-500">
          Simulation Outcome
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 mt-1 tracking-tight">
          You simulated investing in {selectedCompany.name}
        </h1>
        <p className="text-stone-600 mt-2 text-sm max-w-lg mx-auto">
          Here is what your simulated money represents based on the mock market numbers.
        </p>

        {/* Large Highlight Box */}
        <div className="mt-6 p-6 rounded-2xl bg-stone-900 text-stone-100 max-w-xl mx-auto shadow-md">
          <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block">
            Estimated Ownership
          </span>
          <div className="mt-2 text-4xl sm:text-5xl font-black text-emerald-400 tracking-tight">
            {estimatedShares.toFixed(3)} shares
          </div>
          <span className="text-stone-300 text-sm font-medium mt-1 block">
            of {selectedCompany.name} ({selectedCompany.ticker})
          </span>

          <div className="mt-6 pt-4 border-t border-stone-800 grid grid-cols-2 gap-4 text-left">
            <div>
              <span className="text-[11px] text-stone-400 block uppercase">Simulated Budget</span>
              <span className="text-base font-bold text-stone-100">
                S$ {sgdAmount.toLocaleString()} SGD
              </span>
              <span className="text-xs text-stone-400 block">≈ ${usdAmount.toFixed(2)} USD</span>
            </div>
            <div>
              <span className="text-[11px] text-stone-400 block uppercase">Mock Share Price</span>
              <span className="text-base font-bold text-stone-100">
                ${selectedCompany.stockPriceUsd.toFixed(2)} USD
              </span>
              <span className="text-xs text-stone-400 block">at 1 SGD = {sgdToUsdRate.toFixed(2)} USD</span>
            </div>
          </div>
        </div>

        {/* Learning Takeaways for Beginners */}
        <div className="mt-8 text-left bg-stone-50 rounded-xl p-5 border border-stone-200 max-w-xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-4 h-4 text-emerald-700" />
            <h3 className="font-bold text-stone-900 text-sm">
              Key things you learned from this simulation:
            </h3>
          </div>
          <ul className="space-y-2.5 text-xs sm:text-sm text-stone-600">
            <li className="flex items-start gap-2">
              <span className="text-emerald-700 font-bold">•</span>
              <span>
                <strong>Currency exchange comes first:</strong> When investing in companies outside Singapore, your SGD converts to USD at the prevailing rate.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-700 font-bold">•</span>
              <span>
                <strong>Share price determines quantity:</strong> Higher share prices mean you receive fewer shares for the exact same budget, but your total invested amount remains the same.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-700 font-bold">•</span>
              <span>
                <strong>Fractional shares make investing accessible:</strong> You don't need hundreds of dollars to buy full shares; you can own fractions.
              </span>
            </li>
          </ul>
        </div>

        {/* Action: Start another simulation */}
        <div className="mt-8 pt-6 border-t border-stone-200">
          <button
            id="start-another-simulation-cta"
            type="button"
            onClick={onReset}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Start another simulation</span>
          </button>
        </div>
      </div>
    </div>
  );
};
