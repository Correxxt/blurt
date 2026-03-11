Design a desktop app screen for the “active session” view of a study app called “blurt.”.

Goal:
Create a premium macOS-style workspace that feels focused, calm, and modern. Keep it clean, highly usable, and visually intentional (not generic SaaS).

Canvas:
- Desktop app window frame context
- Main content area only (no need to redesign entire app shell/sidebar unless helpful)
- Primary layout should work at approx 1512x982 and scale down gracefully

Core UI sections (must include):
1) Top session header:
- Session title (left)
- Timer (MM:SS) prominent
- Controls row: Pause/Resume, Stop Early (danger/red), Export View PNG, Export Full PNG
- Clear hierarchy and spacing

2) Input capture area:
- Single text input with placeholder like “Type a fact and press Enter”
- Enter submits a note
- Input should support spaces normally
- Show subtle motion-ready affordance (this app uses entry animations)

3) Note board/canvas area:
- Large bounded board where note cards appear
- Notes are draggable while timer is running
- Notes are initially scattered/random during active writing
- Support dense note sets without visual chaos
- Note cards should allow wrapped long text and vertical overflow handling
- Include visual state ideas for dragging (lift/shadow) and drop/inertia feel

4) Session completion behavior (design both states):
- Active state (timer running)
- Completed/review-ready state where notes auto-arrange into a clean non-overlapping grid
- Input disabled after completion

Visual direction:
- Brand uses purple-to-blue accent gradient
- Light theme, soft neutral surfaces, strong contrast text
- Rounded cards, subtle borders, intentional shadows
- Expressive typography (not default system look)
- Motion-aware design (dock-like note launch, smooth transitions)
- Keep controls obvious and accessible

Interaction expectations (annotate in design notes):
- Enter adds note + ascending note SFX trigger
- Stop Early ends session immediately
- Timer end and Stop Early use same finalization flow
- After finish: no new note entry, notes arranged for readability

Deliverables:
- One frame for Active Session state
- One frame for Completed/Review Transition state
- Include component naming and spacing tokens for dev handoff
- Include hover/pressed/disabled variants for key buttons