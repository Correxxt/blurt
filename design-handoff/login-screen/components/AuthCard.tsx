import { useState, FormEvent } from 'react';
import { EmailLabel } from './EmailLabel';
import { EmailInput } from './EmailInput';
import { SendMagicLinkButton } from './SendMagicLinkButton';
import { StatusMessage } from './StatusMessage';
import { LocalModeLink } from './LocalModeLink';

interface AuthCardProps {
  currentState?: 'default' | 'loading' | 'success' | 'error';
}

export function AuthCard({ currentState = 'default' }: AuthCardProps) {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'default' | 'loading' | 'success' | 'error'>(currentState);

  // Sync with prop changes (for demo)
  useState(() => {
    setState(currentState);
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setState('loading');

    // Simulate API call
    setTimeout(() => {
      // Randomly show success or error for demo
      const isSuccess = Math.random() > 0.3;
      setState(isSuccess ? 'success' : 'error');
    }, 1500);
  };

  const handleLocalMode = () => {
    console.log('Local mode selected');
    // Navigate to local mode or handle accordingly
  };

  const isDisabled = !email.trim() || state === 'loading' || state === 'success';

  return (
    <div className="w-full max-w-[490px] bg-white rounded-2xl shadow-lg border border-neutral-200 p-10">
      {/* Logo/Wordmark */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          blurt.
        </h1>
      </div>

      {/* Title */}
      <h2 className="text-2xl font-semibold text-neutral-900 text-center mb-2">
        Sign in to sync Blurt
      </h2>

      {/* Subtitle */}
      <p className="text-neutral-600 text-center mb-8">
        Enter your email and we'll send a secure magic link.
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <EmailLabel htmlFor="email">Email</EmailLabel>
          <EmailInput
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={state === 'loading' || state === 'success'}
            hasError={state === 'error'}
          />
        </div>

        {/* Status Message Area */}
        <StatusMessage state={state} />

        {/* Submit Button */}
        <SendMagicLinkButton
          type="submit"
          disabled={isDisabled}
          isLoading={state === 'loading'}
          isSuccess={state === 'success'}
        />

        {/* Local Mode Link */}
        <LocalModeLink onClick={handleLocalMode} />

        {/* Footer Text */}
        <p className="text-xs text-neutral-500 text-center mt-6">
          No password needed.
        </p>
      </form>
    </div>
  );
}
