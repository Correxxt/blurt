# Motion Implementation Notes

This document provides guidance for implementing motion in the Rituals Completion package. All motion should respect `prefers-reduced-motion` and degrade gracefully.

## General Principles

1. **Respect user preferences**: Always check `prefers-reduced-motion`
2. **Purposeful, not decorative**: Motion should enhance meaning, not distract
3. **Smooth and natural**: Use appropriate easing functions
4. **Performant**: Use transform and opacity for animations
5. **Fallback gracefully**: All states work perfectly without motion

## Intensity-Based Motion

### Off Intensity
- **Philosophy**: Static or nearly static
- **Animations**: None or minimal
- **Duration**: N/A
- **Implementation**: No animation classes needed

### Gentle Intensity
- **Philosophy**: Soft, subtle, affirming
- **Animations**: Gentle fades, soft pulses
- **Duration**: 3-4 seconds
- **Easing**: ease-in-out

**Specific animations:**
- **Icon**: Subtle pulse (scale: 1.0 → 1.05 → 1.0)
- **Hero**: Fade in (opacity: 0 → 1, 600ms)
- **Stats**: Sequential fade in with 100ms stagger
- **Background orbs**: Opacity pulse (0.8 → 1.0 → 0.8, 4s loop)

### Full Intensity
- **Philosophy**: Expressive but tasteful celebration
- **Animations**: Scale-in, glow pulse, gentle rotation
- **Duration**: 2-3 seconds
- **Easing**: ease-out with slight bounce (cubic-bezier(0.34, 1.56, 0.64, 1))

**Specific animations:**
- **Badge**: Fade from top + bounce (translate-y: -20px → 0)
- **Icon**: Gentle rotation (0° → 360°, 2s) + glow pulse
- **Hero title**: Scale-in (scale: 0.95 → 1.0) + fade
- **Stats**: Sequential scale-in (scale: 0.9 → 1.0) with 150ms stagger
- **Background orbs**: Gentle drift (translate) + opacity pulse (3s loop)

## Component-Specific Motion

### CompletionHero

```jsx
// Off: No animation

// Gentle:
- Icon: pulse animation (scale 1.0 to 1.05, 2s ease-in-out infinite)
- Title: fade-in (600ms ease-out)
- Subtitle: fade-in (800ms ease-out, 200ms delay)

// Full:
- Icon: rotate (0 to 360deg, 2s ease-out) + glow pulse
- Title: scale-in (scale 0.95 to 1.0, 600ms cubic-bezier(0.34, 1.56, 0.64, 1))
- Subtitle: fade-in (800ms ease-out, 300ms delay)
```

### SessionSummary

```jsx
// Off: No animation

// Gentle:
- Card: fade-in (600ms ease-out, 300ms delay)
- Stats: sequential fade-in (each 400ms, 100ms stagger)

// Full:
- Card: scale-in (scale 0.95 to 1.0, 600ms ease-out, 200ms delay)
- Stats: sequential scale-in (each 500ms, 150ms stagger with bounce)
```

### CelebrationBackground

```jsx
// Gentle:
- All orbs: opacity pulse (0.8 to 1.0, 4s ease-in-out infinite)

// Full:
- Orbs: opacity pulse (0.8 to 1.0, 3s ease-in-out infinite)
- Orbs: gentle drift (translate x/y ±20px, 8s ease-in-out infinite alternate)
```

### RitualBadge

```jsx
// Full only:
- Badge: slide from top (translate-y -20px to 0, 500ms ease-out with bounce)
- Badge: fade-in (opacity 0 to 1, 500ms ease-out)
- Sparkle icon: gentle rotate (0 to 15deg and back, 2s ease-in-out infinite)
```

### ExportSuccessBanner

```jsx
// Off:
- Slide in from top (translate-y -100% to 0, 400ms ease-out)

// Gentle:
- Slide in from top (translate-y -100% to 0, 400ms ease-out)
- Soft glow pulse on icon (shadow opacity pulse, 2s ease-in-out infinite)

// Full:
- Slide in from top (translate-y -100% to 0, 400ms cubic-bezier(0.34, 1.56, 0.64, 1))
- Glow pulse on entire banner (box-shadow pulse, 2s ease-in-out infinite)
- Icon scale pulse (scale 1.0 to 1.1, 1.5s ease-in-out infinite)
```

## Example CSS Implementation

```css
/* Gentle pulse */
@keyframes gentle-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

/* Full bounce-in */
@keyframes bounce-in {
  0% { transform: scale(0.9); opacity: 0; }
  60% { transform: scale(1.05); opacity: 1; }
  100% { transform: scale(1); }
}

/* Opacity pulse */
@keyframes opacity-pulse {
  0%, 100% { opacity: 0.8; }
  50% { opacity: 1.0; }
}

/* Gentle drift */
@keyframes gentle-drift {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(20px, -20px); }
}

/* Slide from top */
@keyframes slide-from-top {
  from { transform: translateY(-100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Testing Checklist

- [ ] All animations use transform/opacity for performance
- [ ] Reduced-motion preferences are respected
- [ ] Static states (Off intensity) work perfectly
- [ ] Animations complete and don't loop indefinitely (except ambient pulses)
- [ ] Timing feels natural and not rushed
- [ ] Motion enhances the experience, doesn't distract
- [ ] All three intensities feel distinct but cohesive
