import { Bell, UserPlus, MessageSquare, Star, CheckCircle2 } from 'lucide-react';

export function NotificationsPage() {
  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-neutral-900">Notifications</h2>
        <button className="text-sm text-purple-600 font-medium hover:text-purple-700">
          Mark all as read
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-2">
        {notifications.map((notification, index) => (
          <NotificationItem key={index} {...notification} />
        ))}
      </div>
    </div>
  );
}

interface NotificationItemProps {
  type: 'invite' | 'comment' | 'star' | 'reminder';
  title: string;
  message: string;
  time: string;
  read?: boolean;
}

function NotificationItem({ type, title, message, time, read }: NotificationItemProps) {
  const icons = {
    invite: UserPlus,
    comment: MessageSquare,
    star: Star,
    reminder: Bell,
  };

  const colors = {
    invite: 'text-blue-600 bg-blue-50',
    comment: 'text-purple-600 bg-purple-50',
    star: 'text-yellow-600 bg-yellow-50',
    reminder: 'text-green-600 bg-green-50',
  };

  const Icon = icons[type];

  return (
    <div
      className={`bg-white rounded-xl border p-5 hover:shadow-md transition-all cursor-pointer ${
        read ? 'border-neutral-200' : 'border-purple-200 bg-purple-50/30'
      }`}
    >
      <div className="flex gap-4">
        <div className={`w-10 h-10 rounded-full ${colors[type]} flex items-center justify-center flex-shrink-0`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-1">
            <h4 className="font-semibold text-neutral-900">{title}</h4>
            {!read && <div className="w-2 h-2 rounded-full bg-purple-600 flex-shrink-0 mt-1.5" />}
          </div>
          <p className="text-sm text-neutral-600 mb-2">{message}</p>
          <span className="text-xs text-neutral-400">{time}</span>
        </div>
      </div>
    </div>
  );
}

const notifications = [
  {
    type: 'invite' as const,
    title: 'New collaboration invite',
    message: 'Sarah Chen invited you to collaborate on "Linear Algebra Study Guide"',
    time: '10 minutes ago',
    read: false,
  },
  {
    type: 'comment' as const,
    title: 'New comment',
    message: 'Mike Johnson commented on your "Quantum Mechanics" session',
    time: '2 hours ago',
    read: false,
  },
  {
    type: 'star' as const,
    title: 'Session starred',
    message: 'Emma Davis starred your "Renaissance Art History" session',
    time: '5 hours ago',
    read: true,
  },
  {
    type: 'reminder' as const,
    title: 'Study reminder',
    message: 'Your scheduled study session "Organic Chemistry Review" starts in 30 minutes',
    time: '1 day ago',
    read: true,
  },
  {
    type: 'invite' as const,
    title: 'Collaboration accepted',
    message: 'Alex Rivera accepted your invitation to "Group Study: Final Exam Prep"',
    time: '2 days ago',
    read: true,
  },
];
