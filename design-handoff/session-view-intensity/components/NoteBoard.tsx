import { NoteCard } from './NoteCard';

interface Note {
  id: string;
  text: string;
  x: number;
  y: number;
}

interface NoteBoardProps {
  intensity: 'off' | 'gentle' | 'full';
  notes: Note[];
  onNotesChange: (notes: Note[]) => void;
}

export function NoteBoard({ intensity, notes, onNotesChange }: NoteBoardProps) {
  const handleDragStart = (id: string) => {
    // In a real implementation, this would handle drag start
  };

  const handleDrag = (id: string, x: number, y: number) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, x, y } : note
    );
    onNotesChange(updatedNotes);
  };

  return (
    <div className={`flex-1 rounded-xl relative overflow-hidden ${
      intensity === 'full'
        ? 'bg-gradient-to-br from-neutral-900/60 to-neutral-800/40 border-2 border-neutral-700/30'
        : intensity === 'gentle'
        ? 'bg-neutral-800/40 border border-neutral-700/40'
        : 'bg-neutral-800/20 border border-neutral-700/30'
    }`}>
      {/* Grid pattern (subtle) */}
      {intensity !== 'off' && (
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
      )}
      
      {/* Notes */}
      <div className="absolute inset-0 p-8">
        {notes.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className={`text-lg ${
              intensity === 'full'
                ? 'text-purple-400/40'
                : intensity === 'gentle'
                ? 'text-neutral-600'
                : 'text-neutral-700'
            }`}>
              Your canvas is empty. Add your first note above.
            </p>
          </div>
        ) : (
          notes.map((note) => (
            <NoteCard
              key={note.id}
              intensity={intensity}
              text={note.text}
              x={note.x}
              y={note.y}
              onDragStart={() => handleDragStart(note.id)}
              onDrag={(x, y) => handleDrag(note.id, x, y)}
            />
          ))
        )}
      </div>
    </div>
  );
}
