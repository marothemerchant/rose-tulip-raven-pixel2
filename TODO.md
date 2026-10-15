# Orbit Studio Expo Go Client

- [x] **Expo Go project boots on iOS with a first-class native shell.** The `mobile/` project must install, typecheck, and start with Expo; the app must render without browser APIs.
- [x] **Canvas supports screenshot-led inspection.** Users can choose a screenshot from the photo library, view it in the canvas, capture representative colors, and remove the current reference.
- [x] **Code workspace supports editing, saving, resetting, and local generation.** Users can switch HTML/CSS/JS, edit source, save versions, reset to a starter, and generate a deterministic offline result from a prompt.
- [x] **Tree keeps local worktrees and saved versions.** Users can see the active worktree, create a worktree, and view saved versions.
- [x] **Keys supports optional provider configuration.** Users can select a provider, save/remove a device-local API key, and see an explicit local-storage warning.
- [x] **Models supports offline mode and local packs.** Users can toggle offline mode and enable/remove Nano, Coder, and Studio packs.
- [x] **State survives app restarts.** Worktrees, code, tokens, packs, keys, and settings persist through AsyncStorage with safe fallback on malformed data.
- [x] **Production hygiene is documented.** Expo configuration, app identifiers, permissions, privacy notes, and run instructions are present; no secrets are committed.
