import { CompletionHero } from '../components/CompletionHero';
import { SessionSummary } from '../components/SessionSummary';
import { CompletionActions } from '../components/CompletionActions';
import { CelebrationBackground } from '../components/CelebrationBackground';
import { RitualBadge } from '../components/RitualBadge';

export function CompletionFullDark() {
  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-8 relative overflow-hidden">
      <CelebrationBackground intensity="full" theme="dark" />
      
      <div className="w-full max-w-3xl space-y-8 relative z-10">
        <RitualBadge intensity="full" theme="dark" />
        
        <CompletionHero
          intensity="full"
          theme="dark"
          title="You kept going long enough to leave a trail"
          subtitle="The work exists now. It wasn't there before."
        />
        
        <SessionSummary
          intensity="full"
          theme="dark"
          duration="42 min"
          noteCount={12}
          subject="Advanced Calculus"
        />
        
        <CompletionActions intensity="full" theme="dark" />
      </div>
    </div>
  );
}
