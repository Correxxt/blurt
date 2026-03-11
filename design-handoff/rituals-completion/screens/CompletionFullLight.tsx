import { CompletionHero } from '../components/CompletionHero';
import { SessionSummary } from '../components/SessionSummary';
import { CompletionActions } from '../components/CompletionActions';
import { CelebrationBackground } from '../components/CelebrationBackground';
import { RitualBadge } from '../components/RitualBadge';

export function CompletionFullLight() {
  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-8 relative overflow-hidden">
      <CelebrationBackground intensity="full" theme="light" />
      
      <div className="w-full max-w-3xl space-y-8 relative z-10">
        <RitualBadge intensity="full" theme="light" />
        
        <CompletionHero
          intensity="full"
          theme="light"
          title="You kept going long enough to leave a trail"
          subtitle="The work exists now. It wasn't there before."
        />
        
        <SessionSummary
          intensity="full"
          theme="light"
          duration="42 min"
          noteCount={12}
          subject="Advanced Calculus"
        />
        
        <CompletionActions intensity="full" theme="light" />
      </div>
    </div>
  );
}
