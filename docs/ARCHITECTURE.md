# PSDeck architecture

## Goal

Recreate the interaction model and visual language of the PS Vita Home screen and LiveArea inside Steam Deck Gaming Mode without modifying SteamOS files.

## Home model

PSDeck treats system applications and games as one Home catalog, matching the Vita model.

The catalog currently contains:

1. PSDeck system bubbles
2. installed Steam games
3. installed non-Steam shortcuts

The Home has a maximum of 10 bubbles per page using a 3-4-3 spatial layout:

```text
      o     o     o

   o     o     o     o

      o     o     o
```

Up to 10 pages are exposed by the current model. Pages exist only when the catalog needs them.

## Input

### Steam Deck controller

The full-screen route is a Decky `Focusable` surface.

Controller input is consumed through:

- `onGamepadDirection`
- `onOKButton`
- `onCancelButton`

Spatial navigation uses the actual 3-4-3 slot coordinates. Up/down moves to the nearest bubble in X on the adjacent row. Leaving the top/bottom row moves to the previous/next page.

### Touch

Home supports:

- tap bubble: select/open
- vertical swipe: previous/next page
- tap page indicator: jump to page

LiveArea supports:

- tap gate: activate/start
- tap back control: return Home

## Steam library adapter

`src/steam/library.ts`

The adapter reads Gaming Mode's live `appStore.allApps` but keeps undocumented Steam globals isolated from the Vita UI.

It filters for visible installed games and non-Steam shortcuts, then maps each entry to a `VitaApp`.

The library hook refreshes:

- immediately
- during a short cold-boot warmup
- on Steam app-overview changes
- on a low-frequency fallback interval

## Artwork

Game image priority is designed around Steam-owned data:

1. custom/local Steam artwork
2. Steam loopback cache
3. Steam Community icon hash
4. public Steam artwork fallbacks
5. PSDeck game fallback image

System bubbles use original Vita-inspired image assets in `src/assets/vita/`.

## LiveArea

A selected Home item opens a LiveArea before activation.

Games launch through `SteamClient.Apps.RunGame`. For non-Steam shortcuts, PSDeck can derive Steam's shortcut GameID when no explicit GameID is exposed.

System destinations are isolated in `src/steam/navigation.ts`.

Verified:

- Store
- Friends / Chat
- game launch path

Pending on-device route mapping:

- Settings
- Downloads
- Media

## Native focus

PSDeck briefly reclaims focus while `/psdeck` opens. This is required because Steam can otherwise leave the active gamepad focus on its own top bar after route navigation.

## Compatibility rule

PSDeck must fail open. Any unsupported Steam route or missing undocumented API should degrade to a diagnostic message rather than trap the user or guess an internal path.
