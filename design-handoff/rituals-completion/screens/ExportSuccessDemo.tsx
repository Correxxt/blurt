import { ExportSuccessBanner } from '../components/ExportSuccessBanner';

interface ExportSuccessDemoProps {
  intensity: 'off' | 'gentle' | 'full';
}

export function ExportSuccessDemo({ intensity }: ExportSuccessDemoProps) {
  return (
    <div className="min-h-screen bg-neutral-100 flex items-center justify-center p-8">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-xl p-12 shadow-sm border border-neutral-200">
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">Export Success Demo</h2>
          <p className="text-neutral-600 mb-8">
            This shows how the export success banner appears in context.
          </p>
          
          <div className="space-y-4">
            <ExportSuccessBanner intensity={intensity} />
            
            <div className="pt-8 border-t border-neutral-200">
              <p className="text-sm text-neutral-500">
                The banner appears after a successful export and typically auto-dismisses after a few seconds.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
