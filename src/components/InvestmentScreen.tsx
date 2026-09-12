import React, { useState, useEffect } from 'react';
import { Company } from '../types';
import { MOCK_COMPANIES, MOCK_EXCHANGE_RATE_SGD_TO_USD, QUICK_PRESET_AMOUNTS } from '../mockData';
import { ArrowRight, Check } from 'lucide-react';

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
  // Local string state to allow natural decimal typing (e.g. "100.", "100.5") without losing characters
  const [inputVal, setInputVal] = useState<string>(
    sgdAmount > 0 ? String(sgdAmount) : ''
  );

  useEffect(() => {
    const currentNum = parseFloat(inputVal);
    if (isNaN(currentNum) && sgdAmount > 0) {
      setInputVal(String(sgdAmount));
    } else if (!isNaN(currentNum) && currentNum !== sgdAmount) {
      setInputVal(sgdAmount > 0 ? String(sgdAmount) : '');
    }
  }, [sgdAmount]);

  const usdAmount = sgdAmount * MOCK_EXCHANGE_RATE_SGD_TO_USD;
  const estimatedShares =
    selectedCompany.stockPriceUsd > 0 && usdAmount > 0
      ? usdAmount / selectedCompany.stockPriceUsd
      : 0;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let rawVal = e.target.value.replace(/[^0-9.]/g, '');
    
    // Prevent multiple decimal points
    const parts = rawVal.split('.');
    if (parts.length > 2) {
      rawVal = `${parts[0]}.${parts.slice(1).join('')}`;
    }

    // Limit decimal precision to 2 decimal places
    if (parts.length === 2 && parts[1].length > 2) {
      rawVal = `${parts[0]}.${parts[1].slice(0, 2)}`;
    }

    setInputVal(rawVal);

    const num = parseFloat(rawVal);
    if (isNaN(num) || num <= 0) {
      onAmountChange(0);
    } else {
      onAmountChange(Math.min(num, 1000000));
    }
  };

  const isValidAmount = sgdAmount > 0;

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* 1. STRONGEST ELEMENT A: THE MAIN QUESTION */}
      <section className="bg-white rounded-2xl p-5 sm:p-7 border-2 border-stone-200/90 shadow-xs">
        <h1 className="text-xl sm:text-3xl font-extrabold text-stone-900 tracking-tight leading-snug">
          How much would you like to invest?
        </h1>
        <p className="text-stone-600 mt-1.5 text-sm leading-relaxed">
          Enter an amount in Singapore Dollars (SGD) to see how many shares you could own.
        </p>

        {/* Currency Input Box */}
        <div className="mt-4 sm:mt-5">
          <div className="relative rounded-xl border-2 border-stone-300 focus-within:border-emerald-600 focus-within:ring-3 focus-within:ring-emerald-100 transition-all bg-stone-50/70">
            <span className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 text-stone-600 font-bold text-lg sm:text-xl select-none">
              S$
            </span>
            <input
              id="sgd-input"
              type="text"
              inputMode="decimal"
              value={inputVal}
              onChange={handleInputChange}
              placeholder="1000"
              className="w-full pl-11 sm:pl-13 pr-14 sm:pr-16 py-3 sm:py-3.5 text-xl sm:text-3xl font-extrabold text-stone-900 bg-transparent outline-hidden tracking-tight"
            />
            <span className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-500 bg-stone-200/80 px-2 py-1 rounded select-none">
              SGD
            </span>
          </div>

          {/* Quick Preset Buttons - wrap naturally without horizontal scrolling */}
          <div className="mt-3">
            <span className="text-xs text-stone-500 font-medium block mb-1.5">Quick choose:</span>
            <div className="flex flex-wrap gap-2">
              {QUICK_PRESET_AMOUNTS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => {
                    setInputVal(String(preset));
                    onAmountChange(preset);
                  }}
                  className={`text-xs px-3.5 py-2 min-h-[40px] rounded-lg border font-semibold transition-colors cursor-pointer flex items-center justify-center ${
                    sgdAmount === preset
                      ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                      : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-100 hover:border-stone-400 active:bg-stone-200'
                  }`}
                >
                  S$ {preset.toLocaleString()}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. CHOOSE A COMPANY - Responsive vertical stack on mobile */}
      <section className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3.5">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-stone-900">
              Choose a company
            </h2>
            <p className="text-xs text-stone-500">
              Select a company to see what your money could buy.
            </p>
          </div>
          <span className="self-start sm:self-auto text-[10px] sm:text-[11px] font-semibold text-stone-500 bg-stone-100 px-2.5 py-1 rounded-md border border-stone-200">
            Mock Market Prices
          </span>
        </div>

        {/* Vertical stack on mobile, 3 columns on tablet/desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 sm:gap-3">
          {MOCK_COMPANIES.map((company) => {
            const isSelected = company.id === selectedCompany.id;
            return (
              <button
                key={company.id}
                type="button"
                onClick={() => onSelectCompany(company)}
                className={`text-left p-4 rounded-xl border-2 transition-all relative flex flex-col justify-between cursor-pointer min-h-[72px] sm:min-h-[110px] ${
                  isSelected
                    ? 'border-emerald-700 bg-emerald-50/50 shadow-xs ring-1 ring-emerald-600/20'
                    : 'border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50/80 active:bg-stone-100'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      {/* Primary label: Company name */}
                      <h3 className="font-bold text-stone-900 text-base leading-tight">
                        {company.name}
                      </h3>
                      {/* Secondary label: Ticker symbol clarified */}
                      <span className="text-xs text-stone-500 font-medium block mt-0.5">
                        <span className="font-mono font-semibold text-stone-700">{company.ticker}</span> · stock symbol
                      </span>
                    </div>

                    {/* Selected Indicator */}
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-emerald-700 text-white'
                          : 'border border-stone-300 bg-stone-50 text-transparent'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-stone-100">
                  <div className="flex items-baseline justify-between gap-1">
                    <span className="text-[11px] text-stone-500 font-medium">Stock price:</span>
                    <span className="font-bold text-stone-900 text-sm">
                      ${company.stockPriceUsd.toFixed(2)}{' '}
                      <span className="text-[10px] text-stone-500 font-normal">USD</span>
                    </span>
                  </div>
                  <span className="text-[10px] text-stone-400 block text-right">
                    price for 1 share (mock)
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. STRONGEST ELEMENT B: THE ESTIMATED RESULT */}
      <section className="bg-stone-900 text-stone-100 rounded-2xl p-5 sm:p-7 border border-stone-800 shadow-md">
        {/* Currency conversion context */}
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 pb-3 border-b border-stone-800">
          <div className="flex items-center gap-2">
            <span className="text-[11px] sm:text-xs font-semibold tracking-wider text-emerald-400 uppercase">
              Currency conversion
            </span>
            <span className="text-xs font-mono font-medium text-stone-300 bg-stone-800 px-2 py-0.5 rounded">
              1 SGD = {MOCK_EXCHANGE_RATE_SGD_TO_USD} USD
            </span>
          </div>
          <span className="text-xs text-stone-400">
            US shares are priced in US dollars.
          </span>
        </div>

        <div className="py-4 sm:py-5">
          <p className="text-xs sm:text-sm text-stone-300 font-medium">
            You could own approximately
          </p>
          <div className="mt-1 flex flex-col sm:flex-row sm:items-baseline sm:gap-3">
            <span className="text-3xl sm:text-5xl font-extrabold text-emerald-400 tracking-tight break-words">
              {isValidAmount ? estimatedShares.toFixed(2) : '0.00'} shares
            </span>
            <span className="text-stone-300 text-base sm:text-xl font-semibold mt-0.5 sm:mt-0">
              of {selectedCompany.name} ({selectedCompany.ticker})
            </span>
          </div>

          <p className="text-xs text-stone-400 mt-2.5 leading-relaxed break-words">
            Your S$ {sgdAmount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })} SGD converts to approximately ${usdAmount.toFixed(2)} USD. At ${selectedCompany.stockPriceUsd.toFixed(2)} USD per share, that equals approximately {isValidAmount ? estimatedShares.toFixed(2) : '0.00'} shares.
          </p>
        </div>

        {/* CTA Button: prominent & easy to tap on mobile */}
        <div className="pt-4 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-stone-400 text-center sm:text-left w-full sm:w-auto">
            {isValidAmount ? (
              <span>Review your simulation details before confirming.</span>
            ) : (
              <span className="text-amber-400 font-medium">Enter an amount above S$ 0 to continue.</span>
            )}
          </p>

          <button
            id="review-simulation-cta"
            type="button"
            onClick={onProceed}
            disabled={!isValidAmount}
            className={`w-full sm:w-auto px-7 py-3.5 sm:py-3 rounded-xl font-bold text-base sm:text-sm flex items-center justify-center gap-2 transition-all min-h-[48px] ${
              isValidAmount
                ? 'bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white shadow-md cursor-pointer'
                : 'bg-stone-800 text-stone-500 border border-stone-700 cursor-not-allowed'
            }`}
          >
            <span>Review simulation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
