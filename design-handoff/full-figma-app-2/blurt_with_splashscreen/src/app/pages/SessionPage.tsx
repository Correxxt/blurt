import { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { SessionHeader } from '../components/session/SessionHeader';
import { NoteInput } from '../components/session/NoteInput';
import { NoteBoard } from '../components/session/NoteBoard';

export interface Note {
  id: string;
  text: string;
  position: { x: number; y: number };
}

export function SessionPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const topic = searchParams.get('topic') || 'Untitled Session';
  const duration = parseInt(searchParams.get('duration') || '300', 10); // seconds
  
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isActive, setIsActive] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  
  const boardRef = useRef<HTMLDivElement>(null);

  // Timer countdown
  useEffect(() => {
    if (!isActive || isPaused || isCompleted) return;
    
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsCompleted(true);
          setIsActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isActive, isPaused, isCompleted]);

  const handleAddNote = (text: string) => {
    if (isCompleted || !text.trim()) return;
    
    // Random position within board bounds
    const boardWidth = boardRef.current?.offsetWidth || 800;
    const boardHeight = boardRef.current?.offsetHeight || 600;
    
    const newNote: Note = {
      id: Date.now().toString(),
      text,
      position: {
        x: Math.random() * (boardWidth - 250),
        y: Math.random() * (boardHeight - 150),
      },
    };
    
    setNotes(prev => [...prev, newNote]);
  };

  const handleUpdateNotePosition = (id: string, position: { x: number; y: number }) => {
    setNotes(prev =>
      prev.map(note => (note.id === id ? { ...note, position } : note))
    );
  };

  const handlePauseResume = () => {
    setIsPaused(prev => !prev);
  };

  const handleStopEarly = () => {
    setIsCompleted(true);
    setIsActive(false);
  };

  const handleExportView = () => {
    // Mock export functionality
    console.log('Export view PNG');
  };

  const handleExportFull = () => {
    // Mock export functionality
    console.log('Export full PNG');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col h-screen bg-neutral-50">
      <SessionHeader
        title={topic}
        timeLeft={formatTime(timeLeft)}
        isPaused={isPaused}
        isCompleted={isCompleted}
        onPauseResume={handlePauseResume}
        onStopEarly={handleStopEarly}
        onExportView={handleExportView}
        onExportFull={handleExportFull}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden px-8 pb-8">
        <NoteInput
          onAddNote={handleAddNote}
          disabled={isCompleted}
        />
        
        <NoteBoard
          ref={boardRef}
          notes={notes}
          isCompleted={isCompleted}
          onUpdateNotePosition={handleUpdateNotePosition}
        />
      </div>
    </div>
  );
}
