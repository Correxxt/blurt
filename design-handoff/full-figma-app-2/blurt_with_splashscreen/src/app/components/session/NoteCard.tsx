import { useRef } from 'react';
import { useDrag } from 'react-dnd';
import { motion } from 'motion/react';
import type { Note } from '../../pages/SessionPage';

interface NoteCardProps {
  note: Note;
  isDraggable: boolean;
  onMove: (id: string, position: { x: number; y: number }) => void;
}

export function NoteCard({ note, isDraggable, onMove }: NoteCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'note',
      item: { id: note.id, ...note.position },
      canDrag: isDraggable,
      collect: monitor => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const delta = monitor.getDifferenceFromInitialOffset();
        if (delta) {
          const newX = Math.max(0, note.position.x + delta.x);
          const newY = Math.max(0, note.position.y + delta.y);
          onMove(note.id, { x: newX, y: newY });
        }
      },
    }),
    [note, isDraggable, onMove]
  );

  if (isDraggable) {
    drag(ref);
  }

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0, opacity: 0, y: -20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ 
        type: 'spring', 
        stiffness: 260, 
        damping: 20,
      }}
      style={{
        position: 'absolute',
        left: note.position.x,
        top: note.position.y,
        width: 260,
        cursor: isDraggable ? 'move' : 'default',
      }}
      className={`bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200 rounded-xl p-4 transition-all ${
        isDragging 
          ? 'opacity-50 scale-105 shadow-2xl rotate-3' 
          : 'shadow-md hover:shadow-lg'
      }`}
    >
      <p className="text-neutral-800 text-sm leading-relaxed break-words">
        {note.text}
      </p>
    </motion.div>
  );
}
