# Blurt Login Screen

A standalone authentication screen for the blurt. study app with magic link email sign-in.

## Design System

- **Background**: `#F7F8FC` (soft neutral)
- **Accent**: Purple-to-blue gradient (`from-purple-600 to-blue-600`)
- **Typography**: Clean, modern sans-serif
- **Style**: Minimal, calm, rounded cards with subtle shadows

## Components

### Core Components

1. **AuthPageShell** - Full-page wrapper that centers content
2. **AuthCard** - Main card container (460-520px wide)
3. **EmailLabel** - Form label component
4. **EmailInput** - Email input with focus states and error handling
5. **SendMagicLinkButton** - Primary CTA with loading and success states
6. **StatusMessage** - Success/error message display
7. **LocalModeLink** - Secondary action link

## States

The login screen supports 4 distinct states:

1. **Default** - Initial state with empty form
2. **Loading** - Showing "Sending…" with spinner
3. **Success** - Green check with "Check your email for the sign-in link"
4. **Error** - Red error message with retry option

## Features

✅ Strong focus states on inputs and buttons  
✅ Disabled button when email is empty  
✅ Reserved space for messages (no layout shift)  
✅ Generous spacing and visual balance  
✅ WCAG AA color contrast  
✅ 16px+ input text size  
✅ 40px+ button touch targets  

## File Structure

```
/login-screen/
├── App.tsx                          # Main app with state switcher
├── README.md                        # This file
└── components/
    ├── AuthPageShell.tsx           # Page wrapper
    ├── AuthCard.tsx                # Main card
    ├── EmailLabel.tsx              # Label component
    ├── EmailInput.tsx              # Input component
    ├── SendMagicLinkButton.tsx     # Submit button
    ├── StatusMessage.tsx           # Success/error messages
    └── LocalModeLink.tsx           # Secondary link
```

## Usage

The demo includes a state switcher in the top-right corner to preview all states:
- Default
- Loading
- Success
- Error

## Implementation Notes

- Built with React and Tailwind CSS
- Uses lucide-react for icons (CheckCircle2, AlertCircle, Loader2, Check)
- Fully typed with TypeScript
- Responsive and accessible
- No external font dependencies

## Integration

To integrate into your app:

1. Copy the `/login-screen/components/` folder to your project
2. Import and use `AuthCard` component
3. Handle form submission and state management
4. Connect to your authentication backend

Example:
```tsx
import { AuthCard } from './components/AuthCard';

function LoginPage() {
  return (
    <div className="min-h-screen bg-[#F7F8FC] flex items-center justify-center">
      <AuthCard />
    </div>
  );
}
```
