import { ChevronDown } from 'lucide-react';
import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router';

export function QuickStartForm() {
  const navigate = useNavigate();
  const [topic, setTopic] = useState('');
  const [prompt, setPrompt] = useState('');
  const [duration, setDuration] = useState('300'); // in seconds

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    const params = new URLSearchParams({
      topic,
      duration,
      ...(prompt && { prompt }),
    });

    navigate(`/session?${params.toString()}`);
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-xl font-semibold text-neutral-900 mb-6">Quick Start</h2>
      
      <form className="flex-1 flex flex-col gap-5" onSubmit={handleSubmit}>
        {/* Topic Input */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Topic / Session Title
          </label>
          <input
            type="text"
            placeholder="Enter a topic..."
            value={topic}
            onChange={e => setTopic(e.target.value)}
            className="w-full px-4 py-2.5 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Prompt Textarea */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Prompt <span className="text-neutral-400 font-normal">(optional)</span>
          </label>
          <textarea
            placeholder="Add a prompt or question..."
            rows={4}
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            className="w-full px-4 py-2.5 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
          />
        </div>

        {/* Duration Selector */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Duration
          </label>
          <div className="relative">
            <select 
              value={duration}
              onChange={e => setDuration(e.target.value)}
              className="w-full px-4 py-2.5 border border-neutral-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all cursor-pointer bg-white"
            >
              <option value="300">5 minutes</option>
              <option value="600">10 minutes</option>
              <option value="900">15 minutes</option>
              <option value="1800">30 minutes</option>
              <option value="2700">45 minutes</option>
              <option value="3600">60 minutes</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* CTA Button */}
        <button
          type="submit"
          className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-xl hover:scale-105 active:scale-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          disabled={!topic.trim()}
        >
          Let's Go!
        </button>
      </form>
    </div>
  );
}