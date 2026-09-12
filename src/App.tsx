/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ScreenState, Company, FxData, QuoteData, MarketDataStatusType } from './types';
import { COMPANIES } from './mockData';
import { Header } from './components/Header';
import { InvestmentScreen } from './components/InvestmentScreen';
import { ReviewScreen } from './components/ReviewScreen';
import { SuccessScreen } from './components/SuccessScreen';
import { fetchFxData, fetchQuoteData } from './services/marketData';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenState>('investment');
  const [sgdAmount, setSgdAmount] = useState<number>(1000);
  const [selectedCompany, setSelectedCompany] = useState<Company>(COMPANIES[0]);

  // Market data states
  const [fxData, setFxData] = useState<FxData | null>(null);
  const [quotesMap, setQuotesMap] = useState<Record<string, QuoteData | undefined>>({});
  const [marketStatus, setMarketStatus] = useState<MarketDataStatusType>('loading');

  // Track cached data in refs so loadMarketData does not recreate on state updates
  const quotesMapRef = useRef(quotesMap);
  quotesMapRef.current = quotesMap;
  const fxDataRef = useRef(fxData);
  fxDataRef.current = fxData;

  // Load FX and Quote data for the currently selected company only
  const loadMarketData = useCallback(async (symbolToLoad: string, force = false) => {
    const symbolKey = symbolToLoad.toUpperCase();

    // If both FX and Quote are already in cache and not forcing refresh, reuse them
    if (!force && fxDataRef.current && quotesMapRef.current[symbolKey]) {
      setMarketStatus('success');
      return;
    }

    setMarketStatus('loading');

    // 1. Fetch FX Data
    const fxResult = await fetchFxData(force);
    if (fxResult.errorType) {
      setMarketStatus(fxResult.errorType);
      return;
    }
    if (fxResult.data) {
      setFxData(fxResult.data);
    }

    // 2. Fetch Quote Data for the selected symbol only
    const quoteResult = await fetchQuoteData(symbolToLoad, force);
    if (quoteResult.errorType) {
      setMarketStatus(quoteResult.errorType);
      return;
    }
    if (quoteResult.data) {
      setQuotesMap((prev) => ({
        ...prev,
        [symbolKey]: quoteResult.data!,
      }));
      setMarketStatus('success');
    }
  }, []);

  // Single source of truth: Trigger loadMarketData on initial mount and when selectedCompany changes
  useEffect(() => {
    loadMarketData(selectedCompany.ticker);
  }, [loadMarketData, selectedCompany.ticker]);

  // Handle switching companies: update selection state only (useEffect will trigger data fetch if needed)
  const handleSelectCompany = (company: Company) => {
    setSelectedCompany(company);
  };

  const handleRetry = () => {
    loadMarketData(selectedCompany.ticker, true);
  };

  // Current values
  const activeQuote = quotesMap[selectedCompany.ticker.toUpperCase()];
  const currentStockPrice = activeQuote?.priceUSD ?? selectedCompany.stockPriceUsd ?? 0;
  const currentFxRate = fxData?.rate ?? 0;

  // Investment calculations
  // USD value = SGD investment amount × SGD-to-USD exchange rate
  const usdAmount = sgdAmount > 0 && currentFxRate > 0 ? sgdAmount * currentFxRate : 0;
  // Estimated shares = USD value ÷ latest available stock price
  const estimatedShares =
    currentStockPrice > 0 && usdAmount > 0 ? usdAmount / currentStockPrice : 0;

  const handleProceedToReview = () => {
    if (sgdAmount > 0 && currentStockPrice > 0 && currentFxRate > 0) {
      setCurrentScreen('review');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleConfirmSimulation = () => {
    setCurrentScreen('success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToInvestment = () => {
    setCurrentScreen('investment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetSimulation = () => {
    setCurrentScreen('investment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-stone-100/70 text-stone-900 flex flex-col overflow-x-hidden">
      {/* Header with logo, tagline, and 3-step indicator */}
      <Header currentScreen={currentScreen} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-3.5 sm:px-6 py-4 sm:py-8">
        <AnimatePresence mode="wait">
          {currentScreen === 'investment' && (
            <motion.div
              key="investment"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <InvestmentScreen
                sgdAmount={sgdAmount}
                onAmountChange={setSgdAmount}
                selectedCompany={selectedCompany}
                onSelectCompany={handleSelectCompany}
                onProceed={handleProceedToReview}
                fxData={fxData}
                quoteData={activeQuote ?? null}
                quotesMap={quotesMap}
                status={marketStatus}
                onRetry={handleRetry}
              />
            </motion.div>
          )}

          {currentScreen === 'review' && (
            <motion.div
              key="review"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <ReviewScreen
                sgdAmount={sgdAmount}
                selectedCompany={selectedCompany}
                sgdToUsdRate={currentFxRate}
                usdAmount={usdAmount}
                estimatedShares={estimatedShares}
                stockPriceUsd={currentStockPrice}
                lastRefreshedFx={fxData?.lastRefreshed}
                latestTradingDayQuote={activeQuote?.latestTradingDay}
                onConfirm={handleConfirmSimulation}
                onBack={handleBackToInvestment}
              />
            </motion.div>
          )}

          {currentScreen === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <SuccessScreen
                sgdAmount={sgdAmount}
                selectedCompany={selectedCompany}
                sgdToUsdRate={currentFxRate}
                usdAmount={usdAmount}
                estimatedShares={estimatedShares}
                stockPriceUsd={currentStockPrice}
                onReset={handleResetSimulation}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-stone-200 bg-white py-4 mt-auto">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-stone-500 text-center sm:text-left">
          <div>
            <span className="font-semibold text-stone-700">SimplyInvest</span> — Understand before you invest.
          </div>
          <div>
            Educational simulation for MGMT6110 · No real money is invested.
          </div>
        </div>
      </footer>
    </div>
  );
}
