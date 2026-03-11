import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

export type AppearancePreference = 'system' | 'light' | 'dark';
export type MotionPreference = 'system' | 'reduce' | 'full';
export type CelebrationIntensity = 'off' | 'gentle' | 'full';

export type AppPreferences = {
  appearance: AppearancePreference;
  soundEnabled: boolean;
  startupChimeEnabled: boolean;
  celebrationIntensity: CelebrationIntensity;
  reducedMotionOverride: MotionPreference;
  highContrast: boolean;
  largeText: boolean;
  encouragementMode: boolean;
  focusAmbienceEnabled: boolean;
};

type PreferencesContextValue = {
  preferences: AppPreferences;
  resolvedAppearance: 'light' | 'dark';
  updatePreference: <K extends keyof AppPreferences>(key: K, value: AppPreferences[K]) => void;
};

const STORAGE_KEY = 'blurt.preferences.v1';

const DEFAULT_PREFERENCES: AppPreferences = {
  appearance: 'system',
  soundEnabled: true,
  startupChimeEnabled: true,
  celebrationIntensity: 'gentle',
  reducedMotionOverride: 'system',
  highContrast: false,
  largeText: false,
  encouragementMode: true,
  focusAmbienceEnabled: false,
};

const PreferencesContext = createContext<PreferencesContextValue | null>(null);

const isDarkScheme = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

const getResolvedAppearance = (appearance: AppearancePreference): 'light' | 'dark' => {
  if (appearance === 'system') {
    return isDarkScheme() ? 'dark' : 'light';
  }
  return appearance;
};

const readStoredPreferences = (): AppPreferences => {
  if (typeof window === 'undefined') {
    return DEFAULT_PREFERENCES;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return DEFAULT_PREFERENCES;
    }
    const parsed = JSON.parse(raw) as Partial<AppPreferences>;
    return { ...DEFAULT_PREFERENCES, ...parsed };
  } catch {
    return DEFAULT_PREFERENCES;
  }
};

export const PreferencesProvider = ({ children }: { children: ReactNode }) => {
  const [preferences, setPreferences] = useState<AppPreferences>(() => readStoredPreferences());
  const [resolvedAppearance, setResolvedAppearance] = useState<'light' | 'dark'>(() =>
    getResolvedAppearance(readStoredPreferences().appearance)
  );

  useEffect(() => {
    setResolvedAppearance(getResolvedAppearance(preferences.appearance));
  }, [preferences.appearance]);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (preferences.appearance === 'system') {
        setResolvedAppearance(mediaQuery.matches ? 'dark' : 'light');
      }
    };

    handleChange();
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [preferences.appearance]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
  }, [preferences]);

  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }

    const root = document.documentElement;
    root.classList.toggle('theme-dark', resolvedAppearance === 'dark');
    root.classList.toggle('theme-light', resolvedAppearance === 'light');
    root.classList.toggle('high-contrast', preferences.highContrast);
    root.classList.toggle('large-text', preferences.largeText);
    root.classList.toggle('focus-ambience', preferences.focusAmbienceEnabled);
    root.dataset.theme = resolvedAppearance;
    root.dataset.appearance = preferences.appearance;
    root.dataset.motion = preferences.reducedMotionOverride;
    root.dataset.soundEnabled = String(preferences.soundEnabled);
    root.dataset.startupChimeEnabled = String(preferences.startupChimeEnabled);
    root.dataset.celebrationIntensity = preferences.celebrationIntensity;
    window.dispatchEvent(new CustomEvent('blurt:preferences-changed'));
  }, [preferences, resolvedAppearance]);

  const value = useMemo<PreferencesContextValue>(
    () => ({
      preferences,
      resolvedAppearance,
      updatePreference: (key, nextValue) => {
        setPreferences((current) => ({ ...current, [key]: nextValue }));
      },
    }),
    [preferences, resolvedAppearance]
  );

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
};

export const usePreferences = () => {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error('usePreferences must be used within PreferencesProvider.');
  }
  return context;
};
