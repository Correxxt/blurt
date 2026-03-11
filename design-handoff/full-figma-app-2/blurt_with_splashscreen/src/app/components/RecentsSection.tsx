import { ArrowRight, Plus } from 'lucide-react';
import { useNavigate } from 'react-router';

export function RecentsSection() {
  const navigate = useNavigate();

  const handleContinue = () => {
    const params = new URLSearchParams({
      topic: 'Introduction to Quantum Mechanics',
      duration: '92', // 01:32 remaining
    });
    navigate(`/session?${params.toString()}`);
  };

  return (
    <div className="max-w-4xl">
      <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Recents</h2>
      
      {/* Recent Session Card */}
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6 mb-8 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">
              Introduction to Quantum Mechanics
            </h3>
            <p className="text-sm text-neutral-500 mb-3">
              Wave-particle duality and the Schrödinger equation...
            </p>
            <div className="flex items-center gap-4 text-sm">
              <span className="text-neutral-700 font-medium">17 Blurts</span>
              <span className="text-purple-600 font-medium">01:32 Left</span>
            </div>
          </div>
          <button 
            onClick={handleContinue}
            className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all"
          >
            Continue
          </button>
        </div>
      </div>

      {/* Quick Actions Block */}
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-8">
        <div className="flex gap-6">
          {/* Large Plus */}
          <div className="flex items-center justify-center">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center cursor-pointer hover:shadow-md transition-all">
              <Plus className="w-10 h-10 text-purple-600" />
            </div>
          </div>

          {/* Vertical Divider */}
          <div className="w-px bg-neutral-200" />

          {/* Action Tiles Grid */}
          <div className="flex-1 grid grid-cols-4 gap-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <ActionTile key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ActionTile() {
  return (
    <button className="aspect-square rounded-xl border border-neutral-200 bg-neutral-50 hover:bg-gradient-to-br hover:from-purple-50 hover:to-blue-50 hover:border-purple-200 flex items-center justify-center transition-all group">
      <ArrowRight className="w-5 h-5 text-neutral-400 group-hover:text-purple-600 transition-colors" />
    </button>
  );
}