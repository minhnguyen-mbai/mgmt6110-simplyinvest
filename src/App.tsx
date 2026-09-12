/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ScreenState, Company } from './types';
import { MOCK_COMPANIES, MOCK_EXCHANGE_RATE_SGD_TO_USD } from './mockData';
import { Header } from './components/Header';
import { InvestmentScreen } from './components/InvestmentScreen';
import { ReviewScreen } from './components/ReviewScreen';
import { SuccessScreen } from './components/SuccessScreen';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenState>('investment');
  const [sgdAmount, setSgdAmount] = useState<number>(1000);
  const [selectedCompany, setSelectedCompany] = useState<Company>(MOCK_COMPANIES[0]);

  // Conversions
  const usdAmount = sgdAmount * MOCK_EXCHANGE_RATE_SGD_TO_USD;
  const estimatedShares =
    selectedCompany.stockPriceUsd > 0 && usdAmount > 0
      ? usdAmount / selectedCompany.stockPriceUsd
      : 0;

  const handleProceedToReview = () => {
    if (sgdAmount > 0) {
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
    // Keep or reset values cleanly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-stone-100/70 text-stone-900 flex flex-col">
      {/* Header with logo, tagline, MGMT6110 badge, and 3-step indicator */}
      <Header currentScreen={currentScreen} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
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
                onSelectCompany={setSelectedCompany}
                onProceed={handleProceedToReview}
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
                sgdToUsdRate={MOCK_EXCHANGE_RATE_SGD_TO_USD}
                usdAmount={usdAmount}
                estimatedShares={estimatedShares}
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
                sgdToUsdRate={MOCK_EXCHANGE_RATE_SGD_TO_USD}
                usdAmount={usdAmount}
                estimatedShares={estimatedShares}
                onReset={handleResetSimulation}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-stone-200 bg-white py-4 mt-auto">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-stone-500">
          <div>
            <span className="font-semibold text-stone-700">SimplyInvest</span> — Understand before you invest.
          </div>
          <div>
            Educational simulation for MGMT6110 · Strictly mock data
          </div>
        </div>
      </footer>
    </div>
  );
}
