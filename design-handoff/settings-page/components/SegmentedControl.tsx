interface SegmentedControlProps<T extends string> {
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  theme: 'light' | 'dark';
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  theme,
}: SegmentedControlProps<T>) {
  const isDark = theme === 'dark';
  
  return (
    <div className={`inline-flex rounded-lg p-1 ${
      isDark ? 'bg-neutral-800' : 'bg-neutral-100'
    }`}>
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
            value === option.value
              ? isDark
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                : 'bg-white text-neutral-900 shadow-md'
              : isDark
              ? 'text-neutral-400 hover:text-neutral-300'
              : 'text-neutral-600 hover:text-neutral-900'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
