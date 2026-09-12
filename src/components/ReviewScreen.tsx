import React from 'react';
import { Company } from '../types';
import { ArrowLeft, CheckCircle2, AlertCircle, Building2, HelpCircle } from 'lucide-react';

interface ReviewScreenProps {
  sgdAmount: number;
  selectedCompany: Company;
  sgdToUsdRate: number;
  usdAmount: number;
  estimatedShares: number;
  onConfirm: () => void;
  onBack: () => void;
}

export const ReviewScreen: React.FC<ReviewScreenProps> = ({
  sgdAmount,
  selectedCompany,
  sgdToUsdRate,
  usdAmount,
  estimatedShares,
  onConfirm,
  onBack,
}) => {
  return (
    <div className="space-y-6">
      {/* Header / Intro */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-stone-800 transition-colors mb-4 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Change amount or company</span>
        </button>

        <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
          Review your simulation
        </h1>
        <p className="text-stone-600 mt-2 text-sm sm:text-base">
          Double-check all the details below. This review helps you understand each number used in your calculation before you finish.
        </p>
      </div>

      {/* Main Review Card */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-stone-100 bg-stone-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs uppercase tracking-wider font-semibold text-stone-500">
              Simulation Summary
            </span>
            <h2 className="text-lg font-bold text-stone-900 mt-0.5">
              What you are simulating
            </h2>
          </div>
          <span className="self-start sm:self-auto text-xs font-semibold text-amber-800 bg-amber-100/70 border border-amber-200 px-2.5 py-1 rounded-full">
            Educational Mock Data
          </span>
        </div>

        {/* Key Values Grid */}
        <div className="p-6 divide-y divide-stone-100">
          {/* Row 1: SGD Amount */}
          <div className="py-4 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <div>
              <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                1. Your SGD Amount
              </span>
              <p className="text-xs text-stone-500 mt-0.5">
                The money you entered in Singapore Dollars.
              </p>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-xl sm:text-2xl font-bold text-stone-900">
                S$ {sgdAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <span className="text-xs text-stone-500 block">SGD</span>
            </div>
          </div>

          {/* Row 2: Selected Company */}
          <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <div>
              <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                2. Selected Company
              </span>
              <p className="text-xs text-stone-500 mt-0.5">
                {selectedCompany.plainDescription}
              </p>
            </div>
            <div className="text-left sm:text-right">
              <div className="text-base sm:text-lg font-bold text-stone-900">
                {selectedCompany.name}
              </div>
              <span className="text-xs font-mono font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                {selectedCompany.ticker}
              </span>
            </div>
          </div>

          {/* Row 3: Exchange Rate */}
          <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <div>
              <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                3. SGD to USD Exchange Rate
              </span>
              <p className="text-xs text-stone-500 mt-0.5">
                Converts S$ {sgdAmount.toLocaleString()} SGD into approximately ${usdAmount.toFixed(2)} USD.
              </p>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-base sm:text-lg font-bold text-stone-900 font-mono">
                1 SGD = {sgdToUsdRate.toFixed(2)} USD
              </span>
              <span className="text-xs text-stone-500 block">
                ≈ ${usdAmount.toFixed(2)} USD
              </span>
            </div>
          </div>

          {/* Row 4: Stock Price in USD */}
          <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <div>
              <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                4. Stock Price in USD
              </span>
              <p className="text-xs text-stone-500 mt-0.5">
                The latest mock price of one single share of {selectedCompany.name}.
              </p>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-base sm:text-lg font-bold text-stone-900 font-mono">
                ${selectedCompany.stockPriceUsd.toFixed(2)} USD
              </span>
              <span className="text-xs text-stone-500 block">per share</span>
            </div>
          </div>

          {/* Row 5: Estimated Shares */}
          <div className="py-4 last:pb-0 bg-emerald-50/60 -mx-6 px-6 rounded-b-xl border-t border-emerald-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                Estimated Shares You Could Own
              </span>
              <p className="text-xs text-emerald-900 mt-0.5">
                Calculated by dividing ${usdAmount.toFixed(2)} USD by ${selectedCompany.stockPriceUsd.toFixed(2)} USD.
              </p>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-800">
                {estimatedShares.toFixed(3)}
              </span>
              <span className="text-xs font-semibold text-emerald-700 block">
                shares of {selectedCompany.ticker}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Transparent Arithmetic Callout */}
      <div className="bg-stone-100 rounded-xl p-5 border border-stone-200">
        <div className="flex items-start gap-2.5">
          <HelpCircle className="w-4 h-4 text-stone-600 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-stone-700 space-y-1">
            <span className="font-semibold text-stone-900 block">
              What does this mean for a beginner?
            </span>
            <p>
              In this simulation, your money doesn't simply turn into full shares. You own <strong>{estimatedShares.toFixed(3)} shares</strong>. Fractional shares allow anyone to invest any dollar amount without needing enough cash to buy a whole expensive share.
            </p>
          </div>
        </div>
      </div>

      {/* Confirmation & Navigation Buttons */}
      <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 pt-2">
        <button
          type="button"
          onClick={onBack}
          className="w-full sm:w-auto px-5 py-3 rounded-xl border border-stone-300 text-stone-700 font-semibold text-sm hover:bg-stone-100 transition-colors cursor-pointer"
        >
          ← Change inputs
        </button>

        <button
          id="confirm-simulation-cta"
          type="button"
          onClick={onConfirm}
          className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Confirm simulation</span>
        </button>
      </div>
    </div>
  );
};
