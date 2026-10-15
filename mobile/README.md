# Orbit Studio — Expo Go client

This folder is a production-oriented Expo Go client for the Orbit Studio product in the parent repository.

## Run on iPhone with Expo Go

```bash
cd mobile
npm install
npx expo start
```

Scan the QR code from the Expo Go app on iOS. For a LAN connection, the phone and development machine should be on the same network; `npx expo start --tunnel` is an alternative when LAN discovery is unavailable.

## Included workflows

- Screenshot selection from Photos with an iOS permission explanation.
- Local canvas reference, palette tokens, inspection tool affordances, and removal.
- HTML/CSS/JS editor with reset, saved versions, local deterministic generation, and device preview.
- Local worktrees and saved version history.
- Optional Gemini, Groq, OpenRouter, and Mistral key storage with an explicit device-only warning.
- Offline mode and Nano/Coder/Studio writing packs.
- AsyncStorage persistence with safe fallback for malformed stored state.

## Security and production notes

Provider keys are persisted on-device to support the requested local-first workflow. For a public production release, route provider requests through an authenticated server proxy and remove direct client-side provider calls. Do not commit real API keys. The Expo config includes the required iOS photo-library permission string and a stable bundle identifier.

## Verification

The client is designed for Expo Go and uses only Expo SDK-supported packages. Run `npx tsc --noEmit` and `npx expo start` before device QA. Native iOS App Store builds require an Apple/macOS build environment; Expo Go is the intended immediate test target.
