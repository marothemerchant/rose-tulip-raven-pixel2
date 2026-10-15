# Orbit Studio Expo Go Client

## Outcome
Deliver a standalone Expo Go-compatible iOS client in `mobile/` that preserves the core Orbit Studio workflow: inspect a screenshot, capture tokens, edit/generate code, preview a screen, manage local worktrees, configure optional provider keys, and enable offline writing packs.

## Architecture
- Expo SDK starter with TypeScript and React Native primitives; no native-only modules beyond Expo Go-supported packages.
- A small local-first state layer in `mobile/src/state/OrbitContext.tsx`, persisted with AsyncStorage.
- Tab navigation implemented in-app for predictable Expo Go behavior and no external navigation dependency.
- Screenshot selection through `expo-image-picker`; image metadata and a lightweight palette are stored locally.
- Optional provider generation is user-initiated and sent directly to the selected OpenAI-compatible endpoint. Keys remain device-local and are never committed.
- Offline generation uses deterministic local templates and is available without credentials.

## Project structure
- `mobile/App.tsx`: safe-area shell, tab navigation, global actions.
- `mobile/src/components/`: reusable cards, buttons, icons and screen sections.
- `mobile/src/screens/`: Canvas, Code, Tree, Keys, and Models screens.
- `mobile/src/state/`: persisted app state and generation helpers.
- `mobile/src/theme.ts`: dark Orbit design tokens.

## Design
Three candidate styles:
- Quiet instrument panel — probability 0.06
- Soft industrial notebook — probability 0.04
- Midnight atelier — probability 0.08

Chosen: **Quiet instrument panel**.

### Design Movement
A tactile iOS instrument panel: calm dark surfaces, amber measurement marks, and generous sheet-like cards.
### Core Principles
1. One clear action per surface.
2. Strong hierarchy over decoration.
3. Touch targets at least 44pt.
4. Every destructive or network action is explicit.
### Color Philosophy
Near-black ink reduces glare; warm amber is reserved for measurement, active state, and creation; paper text remains soft rather than pure white.
### Layout Paradigm
Vertical instrument stack with a persistent bottom dock and focused modal sheets, not a dense dashboard.
### Signature Elements
Amber measurement rule, rounded graphite cards, and a small “on device” status badge.
### Interaction Philosophy
Actions should feel reversible: save, reset, remove, and generate all surface their state and preserve local work.
### Animation
Use subtle opacity/scale feedback only where it clarifies state; honor reduced motion by keeping the implementation mostly static.
### Typography System
System SF Pro / `System` with compact uppercase labels, 28–32pt screen titles, and 14–16pt body copy.
### Brand Essence
A quiet studio for turning screenshots into shippable interface ideas. Personality: precise, calm, independent.
### Brand Voice
Headlines are direct and tactile; CTAs are verbs. Examples: “Read the screen.” “Keep the useful bits.”
### Wordmark & Logo
Orbit ring mark with a single amber measurement dot.
### Signature Brand Color
`#E8A15A` amber.
