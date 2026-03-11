# Blurt Active Session View

Standalone high-fidelity active session view for the Blurt desktop study app. This is the **in-progress session screen** while the timer is running and notes are being captured.

## Purpose

This view represents the core workspace where users actively capture facts and ideas during a timed study session. The design adapts based on the user's **celebration intensity** preference while maintaining the same core layout and functionality.

## Overview

The active session view includes:
- **Session title** (top left)
- **Countdown timer** (top right)
- **Control buttons** (Pause, Stop Early, Export View PNG, Export Full PNG)
- **Note input field** (centered, type and press Enter to add)
- **Large note canvas** (freeform draggable note board)
- **Dark, focused atmosphere** (desktop-first)

## Three Intensity Variants

### Off - Minimal & Focused
**Tone:** Quiet, clean, restrained professional workspace

**Visual Treatment:**
- Minimal decoration and glow
- Simple borders and neutral colors
- Low-noise surfaces
- Clean typography
- Note cards are simple and readable with minimal styling

**Best for:** Users who prefer maximum focus with minimal visual distraction

### Gentle - Polished & Supportive
**Tone:** Thoughtful, refined, structured, supportive

**Visual Treatment:**
- More detailed and deliberately designed
- Better hierarchy and clarity
- Subtle surface treatments
- Helper text and contextual hints
- Note cards feel more crafted with stronger hierarchy

**Best for:** Most users seeking a balanced, productive workspace (recommended default)

### Full - Immersive & Creative
**Tone:** Creatively energizing, premium, cinematic

**Visual Treatment:**
- "Idea wall" aesthetic
- Premium sticky-note / pinned-paper treatment
- Stronger lighting, depth, and texture
- Atmospheric background with gradient orbs
- Art-directed creative studio feel
- Notes have tape effect, rotation, rich shadows

**Best for:** Users who want maximum immersion and creative atmosphere

## Components

### Core Components
- **SessionHeader** - Title and timer display
- **SessionControls** - Action button bar
- **NoteInput** - Quick-capture input field
- **NoteBoard** - Canvas for draggable notes
- **NoteCard** - Individual note cards (styled per intensity)
- **AmbientBackground** - Atmospheric gradient layer (Full only)

### Screens
- **ActiveSessionOff** - Minimal intensity
- **ActiveSessionGentle** - Gentle intensity
- **ActiveSessionFull** - Full intensity

## Visual Design System

### Typography
- **Session title**: 2xl, bold
- **Timer**: 3xl, mono, bold
- **Input**: lg
- **Note text**: sm, medium leading
- **Helper text**: xs

### Color Palette
- **Background**: Neutral-900 (dark)
- **Cards/Surfaces**: Neutral-800
- **Borders**: Neutral-700
- **Text**: White to Neutral-300
- **Accents (Full)**: Purple-to-blue gradient, amber sticky notes

### Spacing & Layout
- Generous padding (8 units)
- Clear visual hierarchy
- Desktop-optimized proportions
- Comfortable reading distances

## Note Card Treatments

### Off Intensity
- Simple rectangular cards
- Neutral-800 background
- Subtle border (neutral-700)
- Minimal shadow
- Clean, readable text

### Gentle Intensity
- Refined rectangular cards
- Neutral-700 background
- Defined border (neutral-600)
- Medium shadow
- Clear hierarchy

### Full Intensity
- Premium sticky-note aesthetic
- Amber/yellow gradient background
- Left accent border (amber-400)
- Tape effect at top (simulates pinned paper)
- Slight random rotation (-2° to +2°)
- Rich shadows for depth
- Art-directed, tactile feel

## Interactive Behaviors

### Note Input
- Type text and press Enter to add note
- Input clears after submission
- New notes appear at random positions on canvas
- Visual feedback on focus

### Note Cards
- Draggable anywhere on canvas
- Hover to show drag cursor
- Scale slightly when dragging
- Z-index elevation when selected

### Controls
- Clear hover states on all buttons
- Primary action (Pause) is visually emphasized
- Export buttons grouped logically

## Desktop-First Design

- Optimized for large screens (1440px+)
- Spacious canvas for many notes
- Comfortable control spacing
- Large, readable timer
- Generous input area

## Accessibility

- High contrast text
- Clear interactive states
- Keyboard-accessible input
- Drag-and-drop with mouse
- Visual hierarchy maintained across all intensities

## File Structure

```
/active-session-view/
├── App.tsx                          # Main demo with controls
├── README.md                        # This file
├── screens/
│   ├── ActiveSessionOff.tsx        # Off intensity view
│   ├── ActiveSessionGentle.tsx     # Gentle intensity view
│   └── ActiveSessionFull.tsx       # Full intensity view
└── components/
    ├── SessionHeader.tsx           # Title and timer
    ├── SessionControls.tsx         # Action buttons
    ├── NoteInput.tsx               # Input field
    ├── NoteBoard.tsx               # Canvas container
    ├── NoteCard.tsx                # Individual note
    └── AmbientBackground.tsx       # Background atmosphere (Full)
```

## Features

✅ Three distinct intensity levels (Off, Gentle, Full)  
✅ Dark-mode-first focused atmosphere  
✅ Draggable note cards  
✅ Quick-capture input (type + Enter)  
✅ Real-time countdown timer  
✅ Session controls (Pause, Stop, Export)  
✅ Premium sticky-note aesthetic (Full)  
✅ Subtle grid pattern (Gentle/Full)  
✅ Atmospheric background (Full)  
✅ Fully componentized architecture  
✅ Standalone and self-contained  

## Usage

The demo app includes intensity controls to preview all three variants:
- **Off** - Minimal and focused
- **Gentle** - Polished and supportive (recommended)
- **Full** - Immersive and creative

## Sample Notes

The demo includes realistic sample notes for calculus:
- "Integration requires substitution when the derivative appears"
- "Chain rule: derivative of outer × derivative of inner"
- "Area under curve = definite integral"
- "Fundamental theorem connects derivatives and integrals"
- "u-substitution simplifies complex integrals"

## Integration Notes

To integrate into Blurt:

1. Copy components from `/active-session-view/components/`
2. Import appropriate screen based on user's ritual intensity setting
3. Connect to actual timer logic
4. Implement full drag-and-drop functionality
5. Handle note persistence
6. Connect export functionality
7. Add pause/resume mechanics

## Design Philosophy

The active session view is designed to:
- **Support focused work** without visual noise
- **Adapt to user preferences** through intensity levels
- **Feel premium and intentional** across all variants
- **Remain practical** for real implementation
- **Create atmosphere** without sacrificing usability
- **Encourage creative thinking** through spatial organization

## Differences from Completion Screen

This is the **active/in-progress** session view, NOT the post-session review screen:
- Timer is counting down
- User is actively adding notes
- Controls are for session management
- Canvas is dynamic and interactive
- Focus is on capture, not reflection
