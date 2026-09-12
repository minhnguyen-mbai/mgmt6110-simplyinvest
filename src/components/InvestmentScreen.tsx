import React from 'react';
import { Company } from '../types';
import { MOCK_COMPANIES, MOCK_EXCHANGE_RATE_SGD_TO_USD, QUICK_PRESET_AMOUNTS } from '../mockData';
import { ArrowRight, DollarSign, HelpCircle, Check, ArrowRightLeft } from 'lucide-react';

interface InvestmentScreenProps {
  sgdAmount: number;
  onAmountChange: (amount: number) => void;
  selectedCompany: Company;
  onSelectCompany: (company: Company) => void;
  onProceed: () => void;
}

export const InvestmentScreen: React.FC<InvestmentScreenProps> = ({
  sgdAmount,
  onAmountChange,
  selectedCompany,
  onSelectCompany,
  onProceed,
}) => {
  // Calculations
  const usdAmount = sgdAmount * MOCK_EXCHANGE_RATE_SGD_TO_USD;
  const estimatedShares = selectedCompany.stockPriceUsd > 0 && usdAmount > 0
    ? usdAmount / selectedCompany.stockPriceUsd
    : 0;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/[^0-9.]/g, '');
    const num = parseFloat(rawVal);
    if (isNaN(num)) {
      onAmountChange(0);
    } else {
      // Limit to sensible educational bounds (e.g. up to 1,000,000)
      onAmountChange(Math.min(num, 1000000));
    }
  };

  const isValidAmount = sgdAmount > 0;

  return (
    <div className="space-y-6">
      {/* Intro Context Banner */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs">
        <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
          How much would you like to invest?
        </h1>
        <p className="text-stone-600 mt-2 text-sm sm:text-base leading-relaxed">
          Type an amount in Singapore Dollars (SGD) to see how many shares of a company it represents.
        </p>

        {/* Input Control */}
        <div className="mt-6">
          <label htmlFor="sgd-input" className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
            Investment Amount (SGD)
          </label>
          <div className="relative rounded-xl border-2 border-stone-300 focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-100 transition-all bg-stone-50/50">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500 font-bold text-lg select-none">
              S$
            </span>
            <input
              id="sgd-input"
              type="text"
              inputMode="decimal"
              value={sgdAmount === 0 ? '' : sgdAmount}
              onChange={handleInputChange}
              placeholder="e.g. 1000"
              className="w-full pl-12 pr-16 py-3.5 text-xl sm:text-2xl font-bold text-stone-900 bg-transparent outline-hidden"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-stone-400 bg-stone-200/60 px-2 py-1 rounded">
              SGD
            </span>
          </div>

          {/* Quick Preset Buttons */}
          <div className="flex flex-wrap items-center gap-2 mt-3">
            <span className="text-xs text-stone-500 font-medium mr-1">Quick choose:</span>
            {QUICK_PRESET_AMOUNTS.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => onAmountChange(preset)}
                className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-colors ${
                  sgdAmount === preset
                    ? 'bg-emerald-700 text-white border-emerald-700'
                    : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400 hover:bg-stone-50'
                }`}
              >
                S$ {preset.toLocaleString()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Step 2: Choose a Company */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-stone-900">Choose a company</h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Select one of three major US companies to simulate owning shares.
            </p>
          </div>
          <span className="text-[11px] font-semibold text-stone-500 bg-stone-100 px-2.5 py-1 rounded-md border border-stone-200">
            Mock Market Data
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {MOCK_COMPANIES.map((company) => {
            const isSelected = company.id === selectedCompany.id;
            return (
              <button
                key={company.id}
                type="button"
                onClick={() => onSelectCompany(company)}
                className={`text-left p-4 rounded-xl border-2 transition-all relative flex flex-col justify-between ${
                  isSelected
                    ? 'border-emerald-700 bg-emerald-50/40 ring-2 ring-emerald-600/10'
                    : 'border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50/60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-stone-900 text-base">{company.name}</h3>
                      <span className="text-xs font-mono font-medium text-stone-500">{company.ticker}</span>
                    </div>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-stone-600 mt-2 line-clamp-2">
                    {company.plainDescription}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-baseline justify-between">
                  <span className="text-[11px] text-stone-500 font-medium">Stock price:</span>
                  <div className="text-right">
                    <span className="font-bold text-stone-900 text-sm">
                      ${company.stockPriceUsd.toFixed(2)}
                    </span>
                    <span className="text-[10px] text-stone-500 ml-1">USD</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Real-time Calculation & Beginner Explanation */}
      <div className="bg-stone-900 text-stone-100 rounded-2xl p-6 border border-stone-800 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-stone-800">
          <div className="flex items-center gap-2">
            <ArrowRightLeft className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-semibold tracking-wider text-stone-400 uppercase">
              Currency & Share Estimate
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-stone-400">
            <span>SGD to USD exchange rate:</span>
            <span className="font-mono font-bold text-emerald-400 bg-stone-800 px-2 py-0.5 rounded">
              1 SGD = {MOCK_EXCHANGE_RATE_SGD_TO_USD} USD
            </span>
          </div>
        </div>

        {/* Primary Result Headline */}
        <div className="py-5">
          <p className="text-xs sm:text-sm text-stone-400 font-medium">
            Based on your S$ {sgdAmount.toLocaleString()} SGD simulation:
          </p>
          <div className="mt-2 flex flex-col sm:flex-row sm:items-baseline sm:gap-3">
            <span className="text-stone-300 text-lg sm:text-xl font-medium">
              You could own approximately
            </span>
            <span className="text-3xl sm:text-4xl font-extrabold text-emerald-400 tracking-tight">
              {isValidAmount ? estimatedShares.toFixed(3) : '0.000'} shares
            </span>
          </div>
          <p className="text-xs text-stone-400 mt-1">
            of <strong className="text-stone-200">{selectedCompany.name} ({selectedCompany.ticker})</strong>
          </p>
        </div>

        {/* Educational Breakdown */}
        <div className="bg-stone-800/80 rounded-xl p-4 border border-stone-700/60 text-xs sm:text-sm text-stone-300 space-y-2">
          <div className="font-semibold text-stone-200 flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>How this is calculated in 2 simple steps:</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="bg-stone-900/60 p-2.5 rounded-lg border border-stone-700/40">
              <span className="text-[11px] text-stone-400 block mb-0.5">1. Convert to USD</span>
              <span className="font-mono text-stone-200">
                S$ {sgdAmount.toLocaleString()} × {MOCK_EXCHANGE_RATE_SGD_TO_USD} = ${usdAmount.toFixed(2)} USD
              </span>
              <p className="text-[11px] text-stone-400 mt-1">
                US stocks trade in US Dollars, so your Singapore Dollars convert first.
              </p>
            </div>
            <div className="bg-stone-900/60 p-2.5 rounded-lg border border-stone-700/40">
              <span className="text-[11px] text-stone-400 block mb-0.5">2. Divide by share price</span>
              <span className="font-mono text-stone-200">
                ${usdAmount.toFixed(2)} ÷ ${selectedCompany.stockPriceUsd.toFixed(2)} = {estimatedShares.toFixed(3)}
              </span>
              <p className="text-[11px] text-stone-400 mt-1">
                You can own fractional shares (pieces of a share), so your exact dollar amount works.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-6 pt-4 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-stone-400">
            {isValidAmount ? (
              <span>Ready to review this simulation step-by-step?</span>
            ) : (
              <span className="text-amber-400">Please enter an amount greater than 0 SGD to continue.</span>
            )}
          </div>

          <button
            id="see-investment-cta"
            type="button"
            onClick={onProceed}
            disabled={!isValidAmount}
            className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
              isValidAmount
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md hover:shadow-lg cursor-pointer'
                : 'bg-stone-800 text-stone-500 border border-stone-700 cursor-not-allowed'
            }`}
          >
            <span>See investment</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
