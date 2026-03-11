import { ReactNode } from 'react';
import { Info, Monitor, Moon, Settings, Sparkles, Sun, Volume2, WandSparkles } from 'lucide-react';
import packageJson from '../../../package.json';
import { usePreferences } from '../preferences';
import { getEncouragementLine } from '../rituals';
import { useAppState } from '../state';

export const SettingsPage = () => {
  const { preferences, resolvedAppearance, updatePreference } = usePreferences();
  const { storageMode } = useAppState();
  const isDark = resolvedAppearance === 'dark';
  const encouragementLine = getEncouragementLine(
    'settings',
    `${preferences.appearance}-${preferences.celebrationIntensity}-${preferences.focusAmbienceEnabled}`,
    preferences.encouragementMode,
    'Shape Blurt to match how you focus best.'
  );

  return (
    <div className="mx-auto max-w-5xl">
      <header className="mb-10 flex items-start justify-between gap-6">
        <div>
          <div className="mb-3 flex items-center gap-3">
            <div
              className={`flex h-11 w-11 items-center justify-center rounded-2xl border ${
                isDark
                  ? 'border-purple-800/60 bg-gradient-to-br from-purple-900/40 to-blue-900/30'
                  : 'border-purple-100 bg-gradient-to-br from-purple-50 to-blue-50'
              }`}
            >
              <Settings className={`h-5 w-5 ${isDark ? 'text-purple-300' : 'text-purple-600'}`} />
            </div>
            <div>
              <h1 className={`text-3xl font-semibold ${isDark ? 'text-neutral-50' : 'text-neutral-900'}`}>Settings</h1>
              <p className={`text-sm ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>Customize your Blurt ritual.</p>
            </div>
          </div>

          <div
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm ${
              isDark
                ? 'border-purple-900/70 bg-neutral-900/70 text-neutral-300'
                : 'border-purple-100 bg-white/80 text-neutral-600'
            }`}
          >
            <WandSparkles className={`h-4 w-4 ${isDark ? 'text-purple-300' : 'text-purple-600'}`} />
            <span>{encouragementLine}</span>
          </div>
        </div>
      </header>

      <div className="space-y-6">
        <section className={cardClass(isDark)}>
          <SectionHeading
            title="Appearance"
            description="Choose how Blurt looks on your device."
            isDark={isDark}
          />
          <div className="grid gap-4 md:grid-cols-3">
            <ThemeCard
              label="System"
              icon={Monitor}
              selected={preferences.appearance === 'system'}
              isDark={isDark}
              previewClass={isDark ? 'bg-gradient-to-br from-neutral-700 to-neutral-900' : 'bg-gradient-to-br from-neutral-100 to-neutral-300'}
              onClick={() => updatePreference('appearance', 'system')}
            />
            <ThemeCard
              label="Light"
              icon={Sun}
              selected={preferences.appearance === 'light'}
              isDark={isDark}
              previewClass="border border-neutral-200 bg-white"
              onClick={() => updatePreference('appearance', 'light')}
            />
            <ThemeCard
              label="Dark"
              icon={Moon}
              selected={preferences.appearance === 'dark'}
              isDark={isDark}
              previewClass="bg-neutral-900"
              onClick={() => updatePreference('appearance', 'dark')}
            />
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <section className={cardClass(isDark)}>
            <SectionHeading title="Sound" description="Control audio feedback." isDark={isDark} />
            <div className="space-y-2">
              <ToggleRow
                isDark={isDark}
                label="Session sounds"
                description="Note entry sounds during a session."
                checked={preferences.soundEnabled}
                onChange={(checked) => updatePreference('soundEnabled', checked)}
              />
              <ToggleRow
                isDark={isDark}
                label="Startup chime"
                description="Play the launch sound when Blurt opens."
                checked={preferences.startupChimeEnabled}
                onChange={(checked) => updatePreference('startupChimeEnabled', checked)}
              />
            </div>
          </section>

          <section className={cardClass(isDark)}>
            <SectionHeading
              title="Accessibility"
              description="Adjust for comfort and clarity."
              isDark={isDark}
            />
            <div className="mb-5">
              <label className={`mb-2 block text-sm font-medium ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>Motion</label>
              <SegmentedControl
                isDark={isDark}
                value={preferences.reducedMotionOverride}
                options={[
                  { label: 'System', value: 'system' },
                  { label: 'Reduce', value: 'reduce' },
                  { label: 'Full', value: 'full' },
                ]}
                onChange={(value) => updatePreference('reducedMotionOverride', value)}
              />
            </div>
            <div className="space-y-2">
              <ToggleRow
                isDark={isDark}
                label="High contrast"
                description="Increase separation between text, surfaces, and borders."
                checked={preferences.highContrast}
                onChange={(checked) => updatePreference('highContrast', checked)}
              />
              <ToggleRow
                isDark={isDark}
                label="Large text"
                description="Enlarge common interface text and controls."
                checked={preferences.largeText}
                onChange={(checked) => updatePreference('largeText', checked)}
              />
            </div>
          </section>
        </div>

        <section
          className={`rounded-3xl border-2 p-7 shadow-sm ${
            isDark
              ? 'border-purple-800/60 bg-gradient-to-br from-purple-950/45 to-blue-950/30'
              : 'border-purple-200 bg-gradient-to-br from-purple-50/80 to-blue-50/90'
          }`}
        >
          <SectionHeading
            title="Rituals"
            description="Small moments that make study time feel more alive."
            isDark={isDark}
            icon={<Sparkles className={`h-5 w-5 ${isDark ? 'text-purple-300' : 'text-purple-600'}`} />}
          />
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
            <div className="space-y-5">
              <div>
                <label className={`mb-2 block text-sm font-medium ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                  Celebration intensity
                </label>
                <SegmentedControl
                  isDark={isDark}
                  value={preferences.celebrationIntensity}
                  options={[
                    { label: 'Off', value: 'off' },
                    { label: 'Gentle', value: 'gentle' },
                    { label: 'Full', value: 'full' },
                  ]}
                  onChange={(value) => updatePreference('celebrationIntensity', value)}
                />
              </div>
              <div className="space-y-2">
                <ToggleRow
                  isDark={isDark}
                  label="Encouragement mode"
                  description="Occasional supportive copy in ambient UI surfaces."
                  checked={preferences.encouragementMode}
                  onChange={(checked) => updatePreference('encouragementMode', checked)}
                />
                <ToggleRow
                  isDark={isDark}
                  label="Focus ambience"
                  description="Deepen the background atmosphere without changing session behavior."
                  checked={preferences.focusAmbienceEnabled}
                  onChange={(checked) => updatePreference('focusAmbienceEnabled', checked)}
                />
              </div>
            </div>

            <div
              className={`rounded-2xl border p-5 ${
                isDark
                  ? 'border-white/10 bg-black/20 text-neutral-300'
                  : 'border-white/60 bg-white/75 text-neutral-700'
              }`}
            >
              <div className="mb-3 flex items-center gap-2">
                <Volume2 className={`h-4 w-4 ${isDark ? 'text-purple-300' : 'text-purple-600'}`} />
                <div className={`text-sm font-semibold ${isDark ? 'text-neutral-100' : 'text-neutral-900'}`}>Current mood</div>
              </div>
              <p className="text-sm leading-6">
                {preferences.focusAmbienceEnabled
                  ? 'The room leans atmospheric. Background gradients deepen and Blurt feels a touch more ceremonial.'
                  : 'The room stays clean and quiet. Blurt keeps the atmosphere understated.'}
              </p>
              <p className={`mt-4 text-xs ${isDark ? 'text-neutral-500' : 'text-neutral-500'}`}>
                Rituals stay cosmetic in v1. They do not affect timing, scoring, or note behavior.
              </p>
            </div>
          </div>
        </section>

        <section className={cardClass(isDark)}>
          <div className="mb-4 flex items-center gap-2">
            <Info className={`h-4 w-4 ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`} />
            <h2 className={`text-sm font-semibold uppercase tracking-[0.14em] ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
              App Info
            </h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <InfoStat label="Version" value={packageJson.version} isDark={isDark} />
            <InfoStat label="Storage mode" value={storageMode} isDark={isDark} />
          </div>
        </section>
      </div>
    </div>
  );
};

const cardClass = (isDark: boolean) =>
  `rounded-3xl border p-7 shadow-sm ${isDark ? 'border-neutral-800 bg-neutral-900/65' : 'border-neutral-200 bg-white/90'}`;

const SectionHeading = ({
  title,
  description,
  isDark,
  icon,
}: {
  title: string;
  description: string;
  isDark: boolean;
  icon?: ReactNode;
}) => (
  <div className="mb-6">
    <div className="mb-1 flex items-center gap-2">
      {icon}
      <h2 className={`text-xl font-semibold ${isDark ? 'text-neutral-50' : 'text-neutral-900'}`}>{title}</h2>
    </div>
    <p className={`text-sm ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>{description}</p>
  </div>
);

const ThemeCard = ({
  label,
  icon: Icon,
  selected,
  isDark,
  previewClass,
  onClick,
}: {
  label: string;
  icon: typeof Monitor;
  selected: boolean;
  isDark: boolean;
  previewClass: string;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`rounded-2xl border-2 p-4 text-left transition-all ${
      selected
        ? isDark
          ? 'border-purple-500 bg-gradient-to-br from-purple-950/45 to-blue-950/35 shadow-lg'
          : 'border-purple-400 bg-gradient-to-br from-purple-50 to-blue-50 shadow-md'
        : isDark
          ? 'border-neutral-800 bg-neutral-950/50 hover:border-neutral-700'
          : 'border-neutral-200 bg-white hover:border-neutral-300'
    }`}
  >
    <div className={`mb-3 flex aspect-video items-center justify-center rounded-xl ${previewClass}`}>
      <Icon className={`h-6 w-6 ${label === 'Dark' ? 'text-neutral-400' : 'text-neutral-500'}`} />
    </div>
    <div className={`text-sm font-medium ${selected ? (isDark ? 'text-purple-300' : 'text-purple-700') : isDark ? 'text-neutral-200' : 'text-neutral-700'}`}>
      {label}
    </div>
  </button>
);

const SegmentedControl = <T extends string>({
  options,
  value,
  onChange,
  isDark,
}: {
  options: { label: string; value: T }[];
  value: T;
  onChange: (value: T) => void;
  isDark: boolean;
}) => (
  <div className={`inline-flex rounded-xl p-1 ${isDark ? 'bg-neutral-950/70' : 'bg-neutral-100'}`}>
    {options.map((option) => (
      <button
        key={option.value}
        type="button"
        onClick={() => onChange(option.value)}
        className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
          value === option.value
            ? isDark
              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
              : 'bg-white text-neutral-900 shadow-sm'
            : isDark
              ? 'text-neutral-400 hover:text-neutral-200'
              : 'text-neutral-600 hover:text-neutral-900'
        }`}
      >
        {option.label}
      </button>
    ))}
  </div>
);

const ToggleRow = ({
  label,
  description,
  checked,
  onChange,
  isDark,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  isDark: boolean;
}) => (
  <div className="flex items-start justify-between gap-4 py-2">
    <div className="flex-1">
      <div className={`font-medium ${isDark ? 'text-neutral-100' : 'text-neutral-900'}`}>{label}</div>
      <div className={`mt-0.5 text-sm ${isDark ? 'text-neutral-500' : 'text-neutral-500'}`}>{description}</div>
    </div>
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors ${
        checked
          ? 'bg-gradient-to-r from-purple-600 to-blue-600'
          : isDark
            ? 'bg-neutral-700'
            : 'bg-neutral-300'
      }`}
    >
      <span
        className={`absolute left-1 inline-block h-5 w-5 rounded-full bg-white transition-transform ${
          checked ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  </div>
);

const InfoStat = ({ label, value, isDark }: { label: string; value: string; isDark: boolean }) => (
  <div className={`rounded-2xl border px-4 py-4 ${isDark ? 'border-neutral-800 bg-neutral-950/70' : 'border-neutral-200 bg-neutral-50/80'}`}>
    <div className={`mb-1 text-xs uppercase tracking-[0.14em] ${isDark ? 'text-neutral-500' : 'text-neutral-500'}`}>{label}</div>
    <div className={`text-sm font-semibold ${isDark ? 'text-neutral-100' : 'text-neutral-900'}`}>{value}</div>
  </div>
);
