import { CompletionHero } from '../components/CompletionHero';
import { SessionSummary } from '../components/SessionSummary';
import { CompletionActions } from '../components/CompletionActions';

export function CompletionOffLight() {
  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-8">
      <div className="w-full max-w-3xl space-y-8">
        <CompletionHero
          intensity="off"
          theme="light"
          title="Session complete"
          subtitle="The useful part stays."
        />
        
        <SessionSummary
          intensity="off"
          theme="light"
          duration="42 min"
          noteCount={12}
          subject="Advanced Calculus"
        />
        
        <CompletionActions intensity="off" theme="light" />
      </div>
    </div>
  );
}
