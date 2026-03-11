import { Users, UserPlus, Clock, MessageSquare } from 'lucide-react';

export function CollaboratePage() {
  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-neutral-900">Collaborate</h2>
        <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center gap-2">
          <UserPlus className="w-4 h-4" />
          Invite Collaborator
        </button>
      </div>

      {/* Active Collaborations */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-neutral-700 mb-4">Active Collaborations</h3>
        <div className="space-y-3">
          {activeCollabs.map((collab, index) => (
            <CollabCard key={index} {...collab} />
          ))}
        </div>
      </div>

      {/* Shared With You */}
      <div>
        <h3 className="text-sm font-semibold text-neutral-700 mb-4">Shared With You</h3>
        <div className="space-y-3">
          {sharedItems.map((item, index) => (
            <SharedCard key={index} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}

interface CollabCardProps {
  title: string;
  collaborators: number;
  lastActive: string;
  messages: number;
}

function CollabCard({ title, collaborators, lastActive, messages }: CollabCardProps) {
  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-5 hover:shadow-md transition-all cursor-pointer">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="font-semibold text-neutral-900 mb-2">{title}</h4>
          <div className="flex items-center gap-4 text-sm text-neutral-500">
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4" />
              {collaborators} people
            </span>
            <span className="flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4" />
              {messages} messages
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-neutral-400">
          <Clock className="w-3.5 h-3.5" />
          {lastActive}
        </div>
      </div>
    </div>
  );
}

interface SharedCardProps {
  title: string;
  sharedBy: string;
  date: string;
  blurts: number;
}

function SharedCard({ title, sharedBy, date, blurts }: SharedCardProps) {
  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-5 hover:shadow-md transition-all cursor-pointer">
      <h4 className="font-semibold text-neutral-900 mb-2">{title}</h4>
      <div className="flex items-center gap-4 text-sm text-neutral-500">
        <span>Shared by {sharedBy}</span>
        <span>•</span>
        <span>{blurts} blurts</span>
        <span>•</span>
        <span className="text-neutral-400">{date}</span>
      </div>
    </div>
  );
}

const activeCollabs = [
  {
    title: 'Group Study: Final Exam Prep',
    collaborators: 4,
    lastActive: '2h ago',
    messages: 12,
  },
  {
    title: 'Research Project Notes',
    collaborators: 3,
    lastActive: '1d ago',
    messages: 8,
  },
];

const sharedItems = [
  {
    title: 'Linear Algebra Study Guide',
    sharedBy: 'Sarah Chen',
    date: 'Feb 25, 2026',
    blurts: 24,
  },
  {
    title: 'Biology Exam Review',
    sharedBy: 'Mike Johnson',
    date: 'Feb 24, 2026',
    blurts: 18,
  },
  {
    title: 'Spanish Vocabulary Practice',
    sharedBy: 'Emma Davis',
    date: 'Feb 23, 2026',
    blurts: 15,
  },
];
