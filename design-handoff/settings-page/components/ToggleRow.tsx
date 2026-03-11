interface ToggleRowProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  theme: 'light' | 'dark';
}

export function ToggleRow({ label, description, checked, onChange, theme }: ToggleRowProps) {
  const isDark = theme === 'dark';
  
  return (
    <div className="flex items-start justify-between py-3">
      <div className="flex-1">
        <div className={`font-medium ${isDark ? 'text-neutral-200' : 'text-neutral-900'}`}>
          {label}
        </div>
        {description && (
          <div className={`text-xs mt-0.5 ${isDark ? 'text-neutral-500' : 'text-neutral-500'}`}>
            {description}
          </div>
        )}
      </div>
      
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
          checked
            ? 'bg-gradient-to-r from-purple-600 to-blue-600'
            : isDark
            ? 'bg-neutral-700'
            : 'bg-neutral-300'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
}
