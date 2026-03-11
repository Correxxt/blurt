import { FolderOpen, Clock, Star } from 'lucide-react';

export function LibraryPage() {
  return (
    <div className="max-w-4xl">
      <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Your Library</h2>
      
      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6">
        <FilterTab label="All Sessions" active />
        <FilterTab label="Starred" icon={Star} />
        <FilterTab label="Recent" icon={Clock} />
      </div>

      {/* Library Grid */}
      <div className="grid grid-cols-2 gap-4">
        {libraryItems.map((item, index) => (
          <LibraryCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
}

interface FilterTabProps {
  label: string;
  icon?: React.ElementType;
  active?: boolean;
}

function FilterTab({ label, icon: Icon, active }: FilterTabProps) {
  return (
    <button
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
        active
          ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
          : 'bg-white border border-neutral-200 text-neutral-700 hover:border-purple-200'
      }`}
    >
      {Icon && <Icon className="w-4 h-4 inline-block mr-1.5" />}
      {label}
    </button>
  );
}

interface LibraryCardProps {
  title: string;
  folder: string;
  blurts: number;
  date: string;
  starred?: boolean;
}

function LibraryCard({ title, folder, blurts, date, starred }: LibraryCardProps) {
  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-5 hover:shadow-md transition-all cursor-pointer group">
      <div className="flex items-start justify-between mb-3">
        <FolderOpen className="w-5 h-5 text-purple-600" />
        {starred && <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />}
      </div>
      <h3 className="font-semibold text-neutral-900 mb-2 group-hover:text-purple-700 transition-colors">
        {title}
      </h3>
      <div className="flex items-center gap-4 text-xs text-neutral-500">
        <span>{folder}</span>
        <span>•</span>
        <span>{blurts} blurts</span>
      </div>
      <div className="text-xs text-neutral-400 mt-2">{date}</div>
    </div>
  );
}

const libraryItems = [
  {
    title: 'Introduction to Quantum Mechanics',
    folder: 'Physics',
    blurts: 17,
    date: 'Feb 24, 2026',
    starred: true,
  },
  {
    title: 'Renaissance Art History',
    folder: 'Art',
    blurts: 23,
    date: 'Feb 23, 2026',
  },
  {
    title: 'Machine Learning Basics',
    folder: 'Computer Science',
    blurts: 31,
    date: 'Feb 22, 2026',
    starred: true,
  },
  {
    title: 'Shakespeare Analysis',
    folder: 'Literature',
    blurts: 12,
    date: 'Feb 20, 2026',
  },
  {
    title: 'Organic Chemistry Review',
    folder: 'Chemistry',
    blurts: 28,
    date: 'Feb 19, 2026',
  },
  {
    title: 'World War II Timeline',
    folder: 'History',
    blurts: 19,
    date: 'Feb 18, 2026',
  },
];
