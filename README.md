# PSDeck

PSDeck is a PS Vita-inspired interface layer for Steam Deck Gaming Mode.

The goal is to reproduce the interaction model and visual language of the PS Vita Home screen and LiveArea while keeping Steam as the underlying launcher.

## Current milestone

The Home screen now follows the Vita model much more closely:

- apps and installed games live together as bubbles
- 3-4-3 geometry, up to 10 bubbles per page
- up to 10 vertical Home pages
- D-pad / stick spatial navigation
- touch a bubble to open its LiveArea
- vertical touch swipe changes Home page
- A on a bubble opens LiveArea
- B returns from LiveArea
- A / touch on the LiveArea gate launches the game or opens the system destination
- real installed Steam games are discovered from Gaming Mode's live app store
- game artwork prefers Steam's local cache and falls back to Steam artwork endpoints
- recent games are placed before older games
- Steam-native focus handling prevents controller navigation from escaping into Steam's top bar

## Vita-style assets

PSDeck ships original Vita-inspired system artwork for Store, Friends, Settings, Downloads and Media.

Sony firmware icons are intentionally not distributed in this public repository. The asset layer is image-based, so optional user-supplied replacement art can be added later without changing the Home renderer.

Steam game bubbles use their own available Steam artwork rather than a generic game icon whenever possible.

## LiveArea

Every bubble opens a LiveArea-style page before activation.

For installed games:

```text
Home bubble
   ↓
LiveArea
   ↓ Start
SteamClient.Apps.RunGame(...)
```

For system bubbles such as Store or Friends, the same gate opens the corresponding Steam surface.

## Compatibility

Verified navigation:

- Steam Store
- Friends / Chat
- real game launch through Steam

Still pending direct route mapping:

- Settings
- Downloads
- Media

Unsupported routes deliberately show a diagnostic toast instead of guessing an internal Steam path.

## Development

- Decky frontend: TypeScript + React + Rollup
- full-screen route: `/psdeck`
- CI: strict TypeScript validation, build and ZIP packaging
- development releases include `PSDeck-Decky.zip`

CSS Loader is intentionally deferred until the Vita shell itself is stable on hardware.

## Legal / design rule

No Sony firmware assets are committed to the public repository. Vita-like system graphics in this repository are original recreations.
