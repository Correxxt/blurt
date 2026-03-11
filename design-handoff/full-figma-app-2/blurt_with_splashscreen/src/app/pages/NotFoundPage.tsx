import { Home, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';

export function NotFoundPage() {
  return (
    <div className="max-w-2xl mx-auto flex flex-col items-center justify-center text-center py-20">
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center mb-6">
        <span className="text-4xl">🤔</span>
      </div>
      <h1 className="text-4xl font-bold text-neutral-900 mb-3">Page Not Found</h1>
      <p className="text-neutral-600 mb-8 max-w-md">
        Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
      </p>
      <div className="flex gap-3">
        <Link
          to="/"
          className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all flex items-center gap-2"
        >
          <Home className="w-4 h-4" />
          Go Home
        </Link>
        <button
          onClick={() => window.history.back()}
          className="px-5 py-2.5 bg-white border border-neutral-200 text-neutral-700 rounded-lg font-medium hover:border-purple-200 transition-all flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Go Back
        </button>
      </div>
    </div>
  );
}
