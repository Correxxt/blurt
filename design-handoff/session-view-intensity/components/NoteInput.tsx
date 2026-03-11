import { useState, KeyboardEvent } from 'react';
import { Plus } from 'lucide-react';

interface NoteInputProps {
  intensity: 'off' | 'gentle' | 'full';
  onSubmit: (text: string) => void;
  placeholder: string;
}

export function NoteInput({ intensity, onSubmit, placeholder }: NoteInputProps) {
  const [value, setValue] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && value.trim()) {
      onSubmit(value.trim());
      setValue('');
    }
  };

  return (
    <div className="py-8">
      <div className={`max-w-3xl mx-auto rounded-xl overflow-hidden transition-all ${
        intensity === 'full'
          ? 'bg-gradient-to-br from-purple-900/30 to-blue-900/30 border-2 border-purple-700/50 shadow-2xl shadow-purple-900/20'
          : intensity === 'gentle'
          ? 'bg-neutral-800 border-2 border-neutral-700 shadow-lg'
          : 'bg-neutral-800/60 border border-neutral-700/60'
      }`}>
        <div className="flex items-center gap-4 p-4">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
            intensity === 'full'
              ? 'bg-gradient-to-br from-purple-600 to-blue-600 shadow-lg'
              : intensity === 'gentle'
              ? 'bg-neutral-700'
              : 'bg-neutral-700/50'
          }`}>
            <Plus className={`w-5 h-5 ${
              intensity === 'full'
                ? 'text-white'
                : intensity === 'gentle'
                ? 'text-neutral-300'
                : 'text-neutral-400'
            }`} />
          </div>
          
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={`flex-1 bg-transparent border-none outline-none text-lg ${
              intensity === 'full'
                ? 'text-white placeholder:text-purple-400/40'
                : intensity === 'gentle'
                ? 'text-white placeholder:text-neutral-500'
                : 'text-neutral-200 placeholder:text-neutral-600'
            }`}
          />
          
          {intensity !== 'off' && value.trim() && (
            <span className="text-xs text-neutral-500 flex-shrink-0">
              Press Enter ↵
            </span>
          )}
        </div>
        
        {intensity === 'gentle' && (
          <div className="px-4 pb-3 text-xs text-neutral-500">
            Quick capture: type your thought and press Enter to add it to your canvas
          </div>
        )}
        
        {intensity === 'full' && (
          <div className="px-4 pb-3 text-xs text-purple-400/60">
            Each fact becomes part of your thinking space
          </div>
        )}
      </div>
    </div>
  );
}
