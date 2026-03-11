import { RouterProvider } from 'react-router-dom';
import { router } from './app/routes';
import { AppStateProvider } from './app/state';
import { StartupSplash } from './app/components/StartupSplash';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AuthGate } from './app/components/AuthGate';
import { initDeepLinkAuth } from './services/deepLinkAuth';
import { PreferencesProvider, usePreferences } from './app/preferences';

const AppShell = () => {
  return (
    <AuthGate>
      <RouterProvider router={router} />
    </AuthGate>
  );
};

const AppContent = () => {
  const { preferences } = usePreferences();
  const [showSplash, setShowSplash] = useState(true);
  const startupAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    let unlisten: (() => void) | undefined;
    void initDeepLinkAuth().then((stop) => {
      unlisten = stop;
    });

    return () => {
      if (unlisten) {
        unlisten();
      }
    };
  }, []);

  useEffect(() => {
    if (!preferences.startupChimeEnabled) {
      startupAudioRef.current?.pause();
      startupAudioRef.current = null;
      return;
    }

    const startupAudio = new Audio('/sfx/startup/startup.wav');
    startupAudio.preload = 'auto';
    startupAudioRef.current = startupAudio;
    void startupAudio.play().catch(() => {
      // Ignore playback rejection (environment policy/device state).
    });

    return () => {
      startupAudio.pause();
      if (startupAudioRef.current === startupAudio) {
        startupAudioRef.current = null;
      }
    };
  }, [preferences.startupChimeEnabled]);

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
  }, []);

  return (
    <>
      <AppShell />
      {showSplash && <StartupSplash onComplete={handleSplashComplete} />}
    </>
  );
};

function App() {
  return (
    <PreferencesProvider>
      <AppStateProvider>
        <AppContent />
      </AppStateProvider>
    </PreferencesProvider>
  );
}

export default App;
