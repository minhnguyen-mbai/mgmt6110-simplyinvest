import React from 'react';
import { ScreenState } from '../types';
import { Sparkles, Info } from 'lucide-react';

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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          {/* Logo & Tagline */}
          <div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-emerald-700 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                S
              </div>
              <span className="text-xl font-bold tracking-tight text-stone-900">
                SimplyInvest
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 font-medium border border-stone-200">
                MGMT6110
              </span>
            </div>
            <p className="text-xs sm:text-sm text-stone-500 mt-0.5 font-medium">
              Understand before you invest.
            </p>
          </div>

          {/* Stepper Progress */}
          <div className="flex items-center gap-2 bg-stone-50 p-1.5 rounded-xl border border-stone-200 self-start sm:self-auto">
            {steps.map((step) => {
              const isActive = currentScreen === step.id;
              const isPast = currentStepNumber > step.number;
              return (
                <div
                  key={step.id}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : isPast
                      ? 'text-stone-700 bg-stone-200/60'
                      : 'text-stone-400'
                  }`}
                >
                  <span>{step.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mock Data Banner */}
        <div className="mt-3 py-1 px-3 bg-amber-50/80 border border-amber-200/70 rounded-md flex items-center justify-between text-xs text-amber-800">
          <div className="flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-amber-700 shrink-0" />
            <span>
              <strong className="font-semibold">Educational Practice:</strong> Uses clearly labelled mock market data. No real money or transactions.
            </span>
          </div>
          <span className="hidden md:inline-block font-mono text-[11px] uppercase tracking-wider text-amber-700 bg-amber-100/70 px-1.5 py-0.5 rounded">
            Simulated
          </span>
        </div>
      </div>
    </header>
  );
};
