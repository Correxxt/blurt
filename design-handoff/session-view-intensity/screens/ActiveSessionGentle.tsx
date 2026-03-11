import { useState } from 'react';
import { SessionHeader } from '../components/SessionHeader';
import { SessionControls } from '../components/SessionControls';
import { NoteInput } from '../components/NoteInput';
import { NoteBoard } from '../components/NoteBoard';

export function ActiveSessionGentle() {
  const [notes, setNotes] = useState([
    { id: '1', text: 'Integration requires substitution when the derivative appears', x: 120, y: 80 },
    { id: '2', text: 'Chain rule: derivative of outer × derivative of inner', x: 450, y: 150 },
    { id: '3', text: 'Area under curve = definite integral', x: 200, y: 280 },
    { id: '4', text: 'Fundamental theorem connects derivatives and integrals', x: 600, y: 250 },
    { id: '5', text: 'u-substitution simplifies complex integrals', x: 350, y: 420 },
  ]);

  const handleAddNote = (text: string) => {
    const newNote = {
      id: Date.now().toString(),
      text,
      x: Math.random() * 600 + 100,
      y: Math.random() * 300 + 100,
    };
    setNotes([...notes, newNote]);
  };

  return (
    <div className="min-h-screen bg-neutral-900 flex flex-col">
      <SessionHeader
        intensity="gentle"
        title="Advanced Calculus"
        timeRemaining="23:45"
      />
      
      <SessionControls intensity="gentle" />
      
      <div className="flex-1 flex flex-col px-8 pb-8">
        <NoteInput
          intensity="gentle"
          onSubmit={handleAddNote}
          placeholder="Type a fact and press Enter"
        />
        
        <NoteBoard
          intensity="gentle"
          notes={notes}
          onNotesChange={setNotes}
        />
      </div>
    </div>
  );
}
