import { useState } from 'react';
import { ActiveSessionOff } from './screens/ActiveSessionOff';
import { ActiveSessionGentle } from './screens/ActiveSessionGentle';
import { ActiveSessionFull } from './screens/ActiveSessionFull';

type Intensity = 'off' | 'gentle' | 'full';

export default function App() {
  const [intensity, setIntensity] = useState<Intensity>('gentle');

  const renderScreen = () => {
    if (intensity === 'off') return <ActiveSessionOff />;
    if (intensity === 'gentle') return <ActiveSessionGentle />;
    if (intensity === 'full') return <ActiveSessionFull />;
  };

  return (
    <div className="min-h-screen">
      {/* Demo Controls */}
      <div className="fixed top-4 right-4 bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl p-4 z-50 border border-white/20">
        <p className="text-xs font-semibold text-white/70 mb-3">Ritual Intensity</p>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => setIntensity('off')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              intensity === 'off'
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            Off
          </button>
          <button
            onClick={() => setIntensity('gentle')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              intensity === 'gentle'
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            Gentle
          </button>
          <button
            onClick={() => setIntensity('full')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              intensity === 'full'
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            Full
          </button>
        </div>
      </div>

      {renderScreen()}
    </div>
  );
}
