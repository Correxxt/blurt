import { ChevronDown } from 'lucide-react';

export function QuickStartFormBold() {
  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-bold text-neutral-900 mb-6">Quick Start</h2>
      
      <form className="flex-1 flex flex-col gap-5">
        {/* Topic Input */}
        <div>
          <label className="block text-sm font-bold text-neutral-700 mb-2">
            Topic / Session Title
          </label>
          <input
            type="text"
            placeholder="Enter a topic..."
            className="w-full px-4 py-2.5 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all font-medium"
          />
        </div>

        {/* Prompt Textarea */}
        <div>
          <label className="block text-sm font-bold text-neutral-700 mb-2">
            Prompt <span className="text-neutral-400 font-normal">(optional)</span>
          </label>
          <textarea
            placeholder="Add a prompt or question..."
            rows={4}
            className="w-full px-4 py-2.5 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none font-medium"
          />
        </div>

        {/* Duration Selector */}
        <div>
          <label className="block text-sm font-bold text-neutral-700 mb-2">
            Duration
          </label>
          <div className="relative">
            <select className="w-full px-4 py-2.5 border border-neutral-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all cursor-pointer bg-white font-semibold">
              <option>5 minutes</option>
              <option>10 minutes</option>
              <option>15 minutes</option>
              <option>30 minutes</option>
              <option>45 minutes</option>
              <option>60 minutes</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* CTA Button */}
        <button
          type="submit"
          className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-bold text-base hover:shadow-xl hover:scale-105 active:scale-100 transition-all"
        >
          Let's Go!
        </button>
      </form>
    </div>
  );
}
