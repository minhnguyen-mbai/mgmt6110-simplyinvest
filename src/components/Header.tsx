import React from 'react';
import { ScreenState } from '../types';
import { Info } from 'lucide-react';

interface HeaderProps {
  currentScreen: ScreenState;
}

export const Header: React.FC<HeaderProps> = ({ currentScreen }) => {
  const steps: { id: ScreenState; label: string; number: number }[] = [
    { id: 'investment', label: '1. Investment', number: 1 },
    { id: 'review', label: '2. Review', number: 2 },
    { id: 'success', label: '3. Success', number: 3 },
  ];

  const currentStepNumber =
    currentScreen === 'investment' ? 1 : currentScreen === 'review' ? 2 : 3;

  return (
    <header className="border-b border-stone-200 bg-white sticky top-0 z-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5">
          {/* Logo & Tagline */}
          <div className="flex items-center justify-between sm:block">
            <div>
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-lg bg-emerald-700 flex items-center justify-center text-white font-bold text-sm shadow-xs shrink-0">
                  S
                </div>
                <span className="text-lg font-bold tracking-tight text-stone-900">
                  SimplyInvest
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200">
                  Simulation
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-0.5 font-medium">
                Understand before you invest.
              </p>
            </div>
          </div>

          {/* Stepper Progress - 3 equal tabs on mobile */}
          <div className="grid grid-cols-3 sm:flex items-center gap-1.5 bg-stone-100/80 p-1 rounded-lg border border-stone-200 w-full sm:w-auto">
            {steps.map((step) => {
              const isActive = currentScreen === step.id;
              const isPast = currentStepNumber > step.number;
              return (
                <div
                  key={step.id}
                  className={`flex items-center justify-center px-2 py-1.5 rounded-md text-xs font-semibold text-center transition-colors truncate ${
                    isActive
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : isPast
                      ? 'text-stone-700 bg-stone-200'
                      : 'text-stone-400'
                  }`}
                >
                  <span className="truncate">{step.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Global educational notice */}
        <div className="mt-2.5 py-1.5 px-2.5 bg-amber-50 border border-amber-200/80 rounded-md flex items-start sm:items-center justify-between gap-2 text-xs text-amber-900">
          <div className="flex items-start sm:items-center gap-1.5 leading-snug">
            <Info className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5 sm:mt-0" />
            <span>
              <strong>Educational practice:</strong> Uses mock market data. No real money or trades.
            </span>
          </div>
          <span className="hidden sm:inline-block text-[11px] font-mono text-amber-700 font-medium shrink-0">
            MGMT6110
          </span>
        </div>
      </div>
    </header>
  );
};
