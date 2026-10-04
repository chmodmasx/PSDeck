# PSDeck architecture

## Goal

Recreate the interaction model and visual language of the PS Vita Home screen and LiveArea inside Steam Deck Gaming Mode without modifying SteamOS files.

## Interaction model

Current milestone:

- one Home page
- bubble grid
- D-pad / stick movement through Steam's native navigation system
- A on a bubble opens its LiveArea
- B from LiveArea returns Home
- A in LiveArea activates the destination
- B from Home exits PSDeck

Additional Home pages are deliberately deferred until the number of apps actually requires them.

## Layers

### Vita UI

`src/vita/`

Owns:

- bubble Home
- LiveArea
- status bar
- visual states
- Home navigation state
- PS Vita-inspired motion

### Steam adapter

`src/steam/navigation.ts`

Translates PSDeck logical destinations to verified Decky/Steam navigation calls.

Verified:

- Library
- Store
- Friends / Chat

Pending on-device mapping:

- Settings
- Downloads
- Media

### Native controller focus

The full-screen route is a Decky `Focusable` surface.

Controller input is consumed through Steam-native events:

- `onGamepadDirection`
- `onOKButton`
- `onCancelButton`

PSDeck briefly reclaims focus while the route opens so directional input does not escape to Steam's top bar.

## Compatibility rule

PSDeck must fail open. Any unsupported native destination should display a diagnostic toast instead of trapping the user or guessing internal Steam routes.
