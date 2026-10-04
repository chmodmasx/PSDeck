# PSDeck

PSDeck is a PS Vita-inspired interface layer for Steam Deck Gaming Mode.

The project aims to reproduce the interaction model and visual language of the PS Vita Home screen and LiveArea while keeping Steam as the underlying launcher.

## Current direction

PSDeck is now intentionally based on the **PS Vita**, not the PSP/XMB.

The first milestone focuses on:

- PS Vita-style bubble Home screen
- controller-first navigation
- a full-screen Decky route
- LiveArea-style app/game pages
- native Steam/Decky focus handling
- a clean Steam navigation adapter
- CI and installable development releases

## Design rules

- One Home page first. Additional pages are added only when needed.
- Opening a bubble leads to a LiveArea-style page.
- Starting from LiveArea launches or opens the corresponding Steam destination.
- No Sony firmware assets are committed to the public repository.
- Steam-specific compatibility code stays isolated from the Vita UI.

## Status

Fresh PS Vita rewrite in progress.
