import { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { SettingsHeader } from '../components/SettingsHeader';
import { AppearanceSection } from '../components/sections/AppearanceSection';
import { SoundSection } from '../components/sections/SoundSection';
import { AccessibilitySection } from '../components/sections/AccessibilitySection';
import { RitualsSection } from '../components/sections/RitualsSection';
import { AppInfoCard } from '../components/AppInfoCard';

export function SettingsPageDark() {
  const [appearanceMode, setAppearanceMode] = useState<'system' | 'light' | 'dark'>('dark');
  const [sessionSounds, setSessionSounds] = useState(true);
  const [startupChime, setStartupChime] = useState(true);
  const [motionMode, setMotionMode] = useState<'system' | 'reduce' | 'full'>('system');
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [celebrationIntensity, setCelebrationIntensity] = useState<'off' | 'gentle' | 'full'>('gentle');
  const [encouragementMode, setEncouragementMode] = useState(true);
  const [focusAmbience, setFocusAmbience] = useState(false);

  return (
    <div className="flex h-screen bg-neutral-900">
      <Sidebar theme="dark" />
      
      <main className="flex-1 overflow-auto">
        <div className="max-w-5xl mx-auto px-12 py-10">
          <SettingsHeader theme="dark" />
          
          <div className="space-y-6">
            <AppearanceSection 
              theme="dark"
              value={appearanceMode}
              onChange={setAppearanceMode}
            />
            
            <div className="grid grid-cols-2 gap-6">
              <SoundSection
                theme="dark"
                sessionSounds={sessionSounds}
                onSessionSoundsChange={setSessionSounds}
                startupChime={startupChime}
                onStartupChimeChange={setStartupChime}
              />
              
              <AccessibilitySection
                theme="dark"
                motionMode={motionMode}
                onMotionModeChange={setMotionMode}
                highContrast={highContrast}
                onHighContrastChange={setHighContrast}
                largeText={largeText}
                onLargeTextChange={setLargeText}
              />
            </div>
            
            <RitualsSection
              theme="dark"
              celebrationIntensity={celebrationIntensity}
              onCelebrationIntensityChange={setCelebrationIntensity}
              encouragementMode={encouragementMode}
              onEncouragementModeChange={setEncouragementMode}
              focusAmbience={focusAmbience}
              onFocusAmbienceChange={setFocusAmbience}
            />
            
            <AppInfoCard theme="dark" />
          </div>
        </div>
      </main>
    </div>
  );
}
