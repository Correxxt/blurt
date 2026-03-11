import { CompletionHero } from '../components/CompletionHero';
import { SessionSummary } from '../components/SessionSummary';
import { CompletionActions } from '../components/CompletionActions';
import { CelebrationBackground } from '../components/CelebrationBackground';

export function CompletionGentleDark() {
  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-8 relative overflow-hidden">
      <CelebrationBackground intensity="gentle" theme="dark" />
      
      <div className="w-full max-w-3xl space-y-8 relative z-10">
        <CompletionHero
          intensity="gentle"
          theme="dark"
          title="You kept going long enough to leave a trail"
          subtitle="Saved outside your head now."
        />
        
        <SessionSummary
          intensity="gentle"
          theme="dark"
          duration="42 min"
          noteCount={12}
          subject="Advanced Calculus"
        />
        
        <CompletionActions intensity="gentle" theme="dark" />
      </div>
    </div>
  );
}
