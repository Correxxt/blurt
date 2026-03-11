import { forwardRef, useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { NoteCard } from './NoteCard';
import type { Note } from '../../pages/SessionPage';

interface NoteBoardProps {
  notes: Note[];
  isCompleted: boolean;
  onUpdateNotePosition: (id: string, position: { x: number; y: number }) => void;
}

export const NoteBoard = forwardRef<HTMLDivElement, NoteBoardProps>(
  ({ notes, isCompleted, onUpdateNotePosition }, ref) => {
    const [arrangedNotes, setArrangedNotes] = useState<Note[]>(notes);

    // Auto-arrange notes in grid when session completes
    useEffect(() => {
      if (isCompleted && notes.length > 0) {
        const columns = 4;
        const cardWidth = 280;
        const cardHeight = 180;
        const gap = 24;
        
        const arranged = notes.map((note, index) => ({
          ...note,
          position: {
            x: (index % columns) * (cardWidth + gap) + 40,
            y: Math.floor(index / columns) * (cardHeight + gap) + 40,
          },
        }));
        
        setArrangedNotes(arranged);
      } else {
        setArrangedNotes(notes);
      }
    }, [isCompleted, notes]);

    return (
      <DndProvider backend={HTML5Backend}>
        <div
          ref={ref}
          className="flex-1 bg-white rounded-2xl border-2 border-neutral-200 relative overflow-hidden shadow-inner"
        >
          {arrangedNotes.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
                  <span className="text-3xl">✏️</span>
                </div>
                <p className="text-neutral-400 font-medium">
                  Start typing to add your first blurt
                </p>
              </div>
            </div>
          )}
          
          {arrangedNotes.map(note => (
            <NoteCard
              key={note.id}
              note={note}
              isDraggable={!isCompleted}
              onMove={onUpdateNotePosition}
            />
          ))}
        </div>
      </DndProvider>
    );
  }
);

NoteBoard.displayName = 'NoteBoard';
