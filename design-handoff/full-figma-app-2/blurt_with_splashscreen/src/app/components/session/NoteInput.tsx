import { useState, KeyboardEvent } from 'react';
import { Plus } from 'lucide-react';

interface NoteInputProps {
  onAddNote: (text: string) => void;
  disabled: boolean;
}

export function NoteInput({ onAddNote, disabled }: NoteInputProps) {
  const [value, setValue] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && value.trim()) {
      onAddNote(value);
      setValue('');
    }
  };

  return (
    <div className="mb-6">
      <div className="relative max-w-3xl mx-auto">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <Plus className={`w-5 h-5 ${disabled ? 'text-neutral-300' : 'text-purple-500'}`} />
        </div>
        <input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={disabled ? 'Session completed' : 'Type a fact and press Enter'}
          className={`w-full pl-12 pr-6 py-4 rounded-xl border-2 text-lg transition-all ${
            disabled
              ? 'bg-neutral-100 border-neutral-200 text-neutral-400 cursor-not-allowed'
              : 'bg-white border-neutral-200 focus:border-purple-400 focus:outline-none focus:ring-4 focus:ring-purple-100 hover:border-purple-300'
          }`}
        />
        {!disabled && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-neutral-400 font-medium">
            Press Enter
          </div>
        )}
      </div>
    </div>
  );
}
