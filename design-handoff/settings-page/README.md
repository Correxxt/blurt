# Blurt Settings Page

A beautiful, premium settings page for the Blurt desktop study app. Designed with calm, creative, and slightly ritualistic personality.

## Design Philosophy

- **Premium & Creative**: Not a generic admin panel
- **Calm & Intentional**: Soft gradients, clean surfaces, rounded cards
- **Slightly Quirky**: Special touches in the "Rituals" section
- **Desktop-First**: Optimized for desktop app experience

## Visual Style

- **Brand Colors**: Purple-to-blue gradient accent
- **Light Mode**: Soft neutral background (#F7F8FC), white cards
- **Dark Mode**: Dark neutral background (#171717), elevated dark cards
- **Typography**: Clean, modern, with personality
- **Components**: Custom toggles, segmented controls, theme preview cards

## Sections

### 1. Appearance
Choose how Blurt looks on your device with visual preview cards:
- System (follows OS preference)
- Light mode
- Dark mode

### 2. Sound
Control audio feedback:
- Session sounds (note entry and timer alerts)
- Startup chime (plays when app launches)

### 3. Accessibility
Adjust for comfort and clarity:
- Motion preference (System, Reduce, Full)
- High contrast toggle
- Large text toggle

### 4. Rituals ✨
Small moments that make studying feel special:
- Celebration intensity (Off, Gentle, Full)
- Encouragement mode (occasional supportive messages)
- Focus ambience (subtle background atmosphere)

### 5. App Info
Read-only information:
- App version
- Storage mode

## Components

### Core Components

- **Sidebar** - App navigation with active state on Settings
- **SettingsHeader** - Page title with icon and description
- **ThemeCard** - Visual preview cards for appearance modes
- **ToggleRow** - Toggle switch with label and optional description
- **SegmentedControl** - Multi-option selector (3 states)
- **AppInfoCard** - Read-only app information display

### Section Components

- **AppearanceSection** - Theme selection with preview cards
- **SoundSection** - Audio toggles
- **AccessibilitySection** - Motion selector + toggles
- **RitualsSection** - Expressive section with special styling

## File Structure

```
/settings-page/
├── App.tsx                                  # Main app with theme switcher
├── README.md                                # This file
├── pages/
│   ├── SettingsPageLight.tsx               # Light mode complete page
│   └── SettingsPageDark.tsx                # Dark mode complete page
└── components/
    ├── Sidebar.tsx                         # App sidebar
    ├── SettingsHeader.tsx                  # Page header
    ├── ToggleRow.tsx                       # Toggle switch component
    ├── SegmentedControl.tsx                # Multi-option selector
    ├── ThemeCard.tsx                       # Theme preview card
    ├── AppInfoCard.tsx                     # App info display
    └── sections/
        ├── AppearanceSection.tsx           # Appearance settings
        ├── SoundSection.tsx                # Sound settings
        ├── AccessibilitySection.tsx        # Accessibility settings
        └── RitualsSection.tsx              # Rituals settings
```

## Features

✅ Both Light and Dark mode designs  
✅ Live theme switcher (demo purposes)  
✅ Custom-styled components  
✅ Visual preview cards for appearance modes  
✅ Clear section hierarchy  
✅ Generous spacing and rhythm  
✅ Premium visual quality  
✅ Expressive "Rituals" section  
✅ Read-only app info  
✅ Fully componentized architecture  

## States & Interactions

- **Toggles**: Smooth animated transitions, gradient when active
- **Segmented Controls**: Clear selected state with shadow/gradient
- **Theme Cards**: Border highlight and background gradient when selected
- **Hover States**: Subtle hover effects on all interactive elements

## Layout

- Desktop-optimized 2-column grid for Sound/Accessibility
- Full-width cards for Appearance and Rituals
- Max-width container (5xl) for comfortable reading
- Generous padding and spacing throughout

## Usage

The demo includes a theme switcher in the top-right corner to preview both modes:
- Light Mode
- Dark Mode

## Integration

To integrate into your Blurt app:

1. Copy the `/settings-page/components/` folder
2. Import the appropriate page component:
   ```tsx
   import { SettingsPageLight } from './pages/SettingsPageLight';
   import { SettingsPageDark } from './pages/SettingsPageDark';
   ```
3. Handle state management and persistence
4. Connect to your app's theme system

## Dependencies

- React 18.3+
- Tailwind CSS 4.0+
- lucide-react (for icons)
- TypeScript

## Notes

- All settings are local-device settings only
- "Rituals" settings are ambient/cosmetic only
- Settings do not alter core session mechanics
- Layout is responsive-ready but optimized for desktop
