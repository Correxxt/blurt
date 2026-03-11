import { ArrowRight, Plus, FileText } from 'lucide-react';

export function RecentsEmptyState() {
  return (
    <div className="max-w-4xl">
      <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Recents</h2>
      
      {/* Empty State Card */}
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-12 mb-8 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center mb-4">
          <FileText className="w-8 h-8 text-purple-400" />
        </div>
        <h3 className="text-lg font-semibold text-neutral-900 mb-2">
          No recent sessions
        </h3>
        <p className="text-sm text-neutral-500 mb-4 max-w-xs">
          Start a new blurt session to begin capturing your thoughts and ideas
        </p>
        <button className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all">
          Create Session
        </button>
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
