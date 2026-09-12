import React, { useState, useEffect } from 'react';
import { Company, FxData, QuoteData, MarketDataStatusType } from '../types';
import { COMPANIES, QUICK_PRESET_AMOUNTS } from '../mockData';
import { ArrowRight, Check, RefreshCw, AlertCircle, Loader2 } from 'lucide-react';

interface InvestmentScreenProps {
  sgdAmount: number;
  onAmountChange: (amount: number) => void;
  selectedCompany: Company;
  onSelectCompany: (company: Company) => void;
  onProceed: () => void;
  fxData: FxData | null;
  quoteData: QuoteData | null;
  quotesMap: Record<string, QuoteData | undefined>;
  status: MarketDataStatusType;
  onRetry: () => void;
}

export const InvestmentScreen: React.FC<InvestmentScreenProps> = ({
  sgdAmount,
  onAmountChange,
  selectedCompany,
  onSelectCompany,
  onProceed,
  fxData,
  quoteData,
  quotesMap,
  status,
  onRetry,
}) => {
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

  // Rate & Stock Price from external API
  const fxRate = fxData?.rate ?? 0;
  const activeStockPrice = quoteData?.priceUSD ?? selectedCompany.stockPriceUsd ?? 0;

  // Real calculations
  const usdAmount = sgdAmount > 0 && fxRate > 0 ? sgdAmount * fxRate : 0;
  const estimatedShares =
    activeStockPrice > 0 && usdAmount > 0 ? usdAmount / activeStockPrice : 0;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let rawVal = e.target.value.replace(/[^0-9.]/g, '');

    const parts = rawVal.split('.');
    if (parts.length > 2) {
      rawVal = `${parts[0]}.${parts.slice(1).join('')}`;
    }

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
  const hasMarketData = fxRate > 0 && activeStockPrice > 0;
  const canProceed = isValidAmount && hasMarketData && status !== 'loading';

  // Format share count display cleanly (2 or 3 decimals if fractional)
  const formatSharesDisplay = (shares: number) => {
    if (shares <= 0) return '0.00';
    return shares < 10 ? shares.toFixed(3) : shares.toFixed(2);
  };

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Dynamic Status / Error Banner (when not idle / normal) */}
      {status === 'loading' && (
        <div
          id="market-status-loading"
          className="bg-blue-50 border border-blue-200/90 rounded-xl p-3 sm:p-4 flex items-center justify-between gap-3 text-xs sm:text-sm text-blue-900 shadow-xs"
        >
          <div className="flex items-center gap-2.5">
            <Loader2 className="w-4 h-4 text-blue-600 animate-spin shrink-0" />
            <span className="font-medium">Getting the latest available market data...</span>
          </div>
          <span className="text-[11px] text-blue-700 bg-blue-100/80 px-2 py-0.5 rounded font-mono shrink-0">
            Alpha Vantage
          </span>
        </div>
      )}

      {status === 'empty' && (
        <div
          id="market-status-empty"
          className="bg-amber-50 border border-amber-300 rounded-xl p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm text-amber-950 shadow-xs"
        >
          <div className="flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5 sm:mt-0" />
            <div>
              <p className="font-bold">We could not find market data for this company.</p>
              <p className="text-amber-800 text-xs mt-0.5">
                The market data service did not return an available price for this asset.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onRetry}
            className="self-start sm:self-auto px-3 py-1.5 bg-amber-200 hover:bg-amber-300 active:bg-amber-400 text-amber-950 font-semibold rounded-lg text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Try again</span>
          </button>
        </div>
      )}

      {status === 'provider_error' && (
        <div
          id="market-status-provider-error"
          className="bg-rose-50 border border-rose-300 rounded-xl p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm text-rose-950 shadow-xs"
        >
          <div className="flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-700 shrink-0 mt-0.5 sm:mt-0" />
            <div>
              <p className="font-bold">The market data provider could not complete this request.</p>
              <p className="text-rose-800 text-xs mt-0.5">
                This may occur if the market provider rate limit was reached or the service is busy.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onRetry}
            className="self-start sm:self-auto px-3 py-1.5 bg-rose-200 hover:bg-rose-300 active:bg-rose-400 text-rose-950 font-semibold rounded-lg text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Try again</span>
          </button>
        </div>
      )}

      {status === 'unreachable' && (
        <div
          id="market-status-unreachable"
          className="bg-stone-100 border border-stone-300 rounded-xl p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm text-stone-900 shadow-xs"
        >
          <div className="flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-stone-600 shrink-0 mt-0.5 sm:mt-0" />
            <div>
              <p className="font-bold">We cannot reach the market data service right now. Please try again later.</p>
              <p className="text-stone-600 text-xs mt-0.5">
                Please check your network connection or try refreshing the request.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onRetry}
            className="self-start sm:self-auto px-3 py-1.5 bg-stone-200 hover:bg-stone-300 active:bg-stone-400 text-stone-900 font-semibold rounded-lg text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Try again</span>
          </button>
        </div>
      )}

      {/* 1. THE MAIN QUESTION */}
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

          {/* Quick Preset Buttons - Calculated locally without re-fetching */}
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

      {/* 2. CHOOSE A COMPANY */}
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
          <span className="self-start sm:self-auto text-[10px] sm:text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
            Latest available prices
          </span>
        </div>

        {/* Responsive grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 sm:gap-3">
          {COMPANIES.map((company) => {
            const isSelected = company.id === selectedCompany.id;
            const companyQuote = quotesMap[company.ticker.toUpperCase()];
            const price = isSelected
              ? activeStockPrice
              : (companyQuote?.priceUSD ?? company.stockPriceUsd ?? 0);

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
                      <h3 className="font-bold text-stone-900 text-base leading-tight">
                        {company.name}
                      </h3>
                      <span className="text-xs text-stone-500 font-medium block mt-0.5">
                        <span className="font-mono font-semibold text-stone-700">{company.ticker}</span> · stock symbol
                      </span>
                    </div>

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
                      {price > 0 ? `$${price.toFixed(2)}` : '...'}{' '}
                      <span className="text-[10px] text-stone-500 font-normal">USD</span>
                    </span>
                  </div>
                  <span className="text-[10px] text-stone-400 block text-right">
                    Latest available price for 1 share
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. ESTIMATED RESULT */}
      <section className="bg-stone-900 text-stone-100 rounded-2xl p-5 sm:p-7 border border-stone-800 shadow-md">
        {/* Currency conversion context */}
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 pb-3 border-b border-stone-800">
          <div className="flex items-center gap-2">
            <span className="text-[11px] sm:text-xs font-semibold tracking-wider text-emerald-400 uppercase">
              Currency conversion
            </span>
            <span className="text-xs font-mono font-medium text-stone-300 bg-stone-800 px-2 py-0.5 rounded">
              {fxRate > 0 ? `1 SGD = ${fxRate.toFixed(4)} USD` : 'Checking rate...'}
            </span>
          </div>
          <span className="text-xs text-stone-400">
            {fxData?.lastRefreshed ? `Last updated: ${fxData.lastRefreshed}` : 'US shares are priced in US dollars.'}
          </span>
        </div>

        <div className="py-4 sm:py-5">
          <p className="text-xs sm:text-sm text-stone-300 font-medium">
            You could own approximately
          </p>
          <div className="mt-1 flex flex-col sm:flex-row sm:items-baseline sm:gap-3">
            <span className="text-3xl sm:text-5xl font-extrabold text-emerald-400 tracking-tight break-words">
              {hasMarketData && isValidAmount ? formatSharesDisplay(estimatedShares) : '0.00'} shares
            </span>
            <span className="text-stone-300 text-base sm:text-xl font-semibold mt-0.5 sm:mt-0">
              of {selectedCompany.name} ({selectedCompany.ticker})
            </span>
          </div>

          <p className="text-xs text-stone-400 mt-2.5 leading-relaxed break-words">
            {hasMarketData && isValidAmount ? (
              <>
                Your S$ {sgdAmount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })} SGD converts to approximately ${usdAmount.toFixed(2)} USD (rate: {fxRate}). At ${activeStockPrice.toFixed(2)} USD per share (latest available price{quoteData?.latestTradingDay ? ` on ${quoteData.latestTradingDay}` : ''}), that equals approximately {formatSharesDisplay(estimatedShares)} shares.
              </>
            ) : status === 'loading' ? (
              'Retrieving latest market data to calculate your simulated shares...'
            ) : (
              'Enter an amount in SGD and select a company to calculate your simulated shares.'
            )}
          </p>
        </div>

        {/* CTA Button */}
        <div className="pt-4 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-stone-400 text-center sm:text-left w-full sm:w-auto">
            {canProceed ? (
              <span>Review your simulation details before confirming.</span>
            ) : !isValidAmount ? (
              <span className="text-amber-400 font-medium">Enter an amount above S$ 0 to continue.</span>
            ) : (
              <span className="text-stone-400">Waiting for market data to calculate shares.</span>
            )}
          </p>

          <button
            id="review-simulation-cta"
            type="button"
            onClick={onProceed}
            disabled={!canProceed}
            className={`w-full sm:w-auto px-7 py-3.5 sm:py-3 rounded-xl font-bold text-base sm:text-sm flex items-center justify-center gap-2 transition-all min-h-[48px] ${
              canProceed
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
