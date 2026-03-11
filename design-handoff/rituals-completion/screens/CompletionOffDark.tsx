import { CompletionHero } from '../components/CompletionHero';
import { SessionSummary } from '../components/SessionSummary';
import { CompletionActions } from '../components/CompletionActions';

export function CompletionOffDark() {
  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-8">
      <div className="w-full max-w-3xl space-y-8">
        <CompletionHero
          intensity="off"
          theme="dark"
          title="Session complete"
          subtitle="The useful part stays."
        />
        
        <SessionSummary
          intensity="off"
          theme="dark"
          duration="42 min"
          noteCount={12}
          subject="Advanced Calculus"
        />
        
        <CompletionActions intensity="off" theme="dark" />
      </div>
    </div>
  );
}
