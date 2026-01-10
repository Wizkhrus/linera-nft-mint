'use client';

import { useState, useEffect } from 'react';
import { Flame, TrendingUp } from 'lucide-react';

interface Prediction {
  id: string;
  title: string;
  yesOdds: number;
  noOdds: number;
  volume: number;
  timeLeft: string;
  category: string;
}

const mockPredictions: Prediction[] = [
  { id: '1', title: 'Will Linera reach 10M TVL by Q2 2026?', yesOdds: 1.85, noOdds: 2.1, volume: 12500, timeLeft: '45 days', category: 'Crypto' },
  { id: '2', title: 'Will Microchain adoption > 100K users?', yesOdds: 1.65, noOdds: 2.5, volume: 8300, timeLeft: '30 days', category: 'Tech' },
  { id: '3', title: 'Bitcoin > $150K by EOY 2026?', yesOdds: 2.2, noOdds: 1.7, volume: 25000, timeLeft: '60 days', category: 'Markets' },
  { id: '4', title: 'Will 50+ NFT collections launch on Linera?', yesOdds: 1.45, noOdds: 2.8, volume: 5600, timeLeft: '90 days', category: 'NFT' }
];

export default function PredictionMarket({ isConnected }: { isConnected: boolean }) {
  const [selectedPrediction, setSelectedPrediction] = useState<Prediction | null>(null);
  const [betAmount, setBetAmount] = useState('');
  const [betSide, setBetSide] = useState<'yes' | 'no'>('yes');
  const [potentialWinnings, setPotentialWinnings] = useState(0);

  useEffect(() => {
    if (betAmount && selectedPrediction) {
      const odds = betSide === 'yes' ? selectedPrediction.yesOdds : selectedPrediction.noOdds;
      setPotentialWinnings(parseFloat(betAmount) * odds);
    }
  }, [betAmount, betSide, selectedPrediction]);

  return (
    <div className="w-full space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Prediction Market</h2>
          <p className="text-slate-400">Real-time probability markets on Linera</p>
        </div>
        <Flame className="w-8 h-8 text-orange-400" />
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 flex-wrap">
        {['All', 'Crypto', 'Tech', 'Markets', 'NFT'].map((cat) => (
          <button key={cat} className="px-4 py-2 rounded-lg border border-slate-700 text-slate-300 hover:border-cyan-500 hover:text-cyan-400 transition-all">
            {cat}
          </button>
        ))}
      </div>

      {/* Live Odds Updates */}
      <div className="bg-slate-900/50 rounded-lg p-4 border border-cyan-500/20">
        <p className="text-sm text-cyan-400 mb-4 font-semibold">🔄 Live Odds Updates</p>
        <div className="grid grid-cols-2 gap-4">
          {mockPredictions.slice(0, 2).map((pred) => (
            <div key={pred.id} className="flex justify-between">
              <span className="text-sm text-slate-300">{pred.title.substring(0, 30)}...</span>
              <div className="flex gap-4">
                <span className="text-green-400 font-mono text-sm">Yes: {pred.yesOdds.toFixed(2)}</span>
                <span className="text-red-400 font-mono text-sm">No: {pred.noOdds.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Predictions Grid */}
      <div className="space-y-4">
        {mockPredictions.map((pred) => (
          <div
            key={pred.id}
            onClick={() => setSelectedPrediction(pred)}
            className="p-6 bg-gradient-to-r from-slate-800/50 to-slate-900/50 rounded-lg border border-slate-700/50 hover:border-cyan-500/50 transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-all">{pred.title}</h3>
                <div className="flex items-center gap-2 text-sm">
                  <span className="px-2 py-1 bg-slate-900 rounded text-slate-300">{pred.category}</span>
                  <span className="text-slate-400">📊 {pred.volume.toLocaleString()} USDC Volume</span>
                </div>
              </div>
              <span className="text-orange-400 font-semibold">{pred.timeLeft}</span>
            </div>
            
            {/* Odds Bar */}
            <div className="mb-4">
              <div className="flex gap-4 mb-2">
                <div className="flex-1">
                  <div className="h-2 bg-gradient-to-r from-green-500 to-transparent rounded-full"></div>
                  <p className="text-sm text-green-400 font-mono mt-1">YES: {pred.yesOdds.toFixed(2)}</p>
                </div>
                <div className="flex-1">
                  <div className="h-2 bg-gradient-to-r from-red-500 to-transparent rounded-full"></div>
                  <p className="text-sm text-red-400 font-mono mt-1">NO: {pred.noOdds.toFixed(2)}</p>
                </div>
              </div>
            </div>

            <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-2 rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all font-medium">
              Place Prediction
            </button>
          </div>
        ))}
      </div>

      {/* Betting Modal */}
      {selectedPrediction && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setSelectedPrediction(null)}>
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 max-w-md w-full mx-4 border border-slate-700">
            <h3 className="text-2xl font-bold text-white mb-4">{selectedPrediction.title}</h3>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button
                onClick={() => setBetSide('yes')}
                className={`py-3 rounded-lg font-bold transition-all ${
                  betSide === 'yes'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                    : 'bg-slate-900/50 border border-slate-700 text-slate-300 hover:border-green-500'
                }`}
              >
                YES ({selectedPrediction.yesOdds.toFixed(2)})
              </button>
              <button
                onClick={() => setBetSide('no')}
                className={`py-3 rounded-lg font-bold transition-all ${
                  betSide === 'no'
                    ? 'bg-gradient-to-r from-red-500 to-red-600 text-white'
                    : 'bg-slate-900/50 border border-slate-700 text-slate-300 hover:border-red-500'
                }`}
              >
                NO ({selectedPrediction.noOdds.toFixed(2)})
              </button>
            </div>

            <input
              type="number"
              placeholder="Bet amount (USDC)"
              value={betAmount}
              onChange={(e) => setBetAmount(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-white mb-4 placeholder-slate-500"
            />

            {potentialWinnings > 0 && (
              <div className="bg-slate-900/50 rounded-lg p-4 mb-4 border border-cyan-500/20">
                <p className="text-sm text-slate-400 mb-1">Potential Winnings</p>
                <p className="text-2xl font-bold text-cyan-400">{potentialWinnings.toFixed(2)} USDC</p>
              </div>
            )}

            <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all font-bold" disabled={!isConnected}>
              {isConnected ? 'Place Prediction' : 'Connect Wallet First'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
