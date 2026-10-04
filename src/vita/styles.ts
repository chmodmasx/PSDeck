export const VITA_STYLES = `
.psdeck-vita-root {
  --vita-blue: #168fd5;
  --vita-blue-deep: #07569b;
  --vita-bubble-size: clamp(78px, 11.5vw, 112px);
  position: fixed;
  inset: 0;
  z-index: 9999;
  overflow: hidden;
  outline: none !important;
  color: white;
  font-family: "Noto Sans", "DejaVu Sans", Arial, sans-serif;
  background:
    radial-gradient(circle at 48% 103%, rgba(255,255,255,.8) 0 1%, rgba(255,255,255,.28) 9%, transparent 32%),
    radial-gradient(ellipse at 52% 108%, rgba(255,255,255,.34), transparent 42%),
    linear-gradient(160deg, #25a7e7 0%, #0a83d0 46%, #07559b 100%);
  touch-action: none;
  user-select: none;
}

.psdeck-vita-root:focus,
.psdeck-vita-root:focus-visible {
  outline: none !important;
}

.psdeck-vita-root::before {
  content: "";
  position: absolute;
  inset: auto -8% -12% -8%;
  height: 38%;
  pointer-events: none;
  border-radius: 50% 50% 0 0;
  background:
    linear-gradient(180deg, rgba(255,255,255,.08), rgba(255,255,255,.42) 58%, rgba(255,255,255,.12));
  filter: blur(6px);
  transform: skewY(-2deg);
}

.vita-statusbar {
  position: absolute;
  z-index: 50;
  top: 0;
  left: 0;
  right: 0;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 13px;
  background: rgba(7, 16, 25, .93);
  border-bottom: 1px solid rgba(255,255,255,.08);
  font-size: 12px;
  text-shadow: 0 1px 2px rgba(0,0,0,.55);
}

.vita-status-left {
  font-size: 11px;
  opacity: .82;
  font-weight: 500;
}

.vita-status-right {
  display: flex;
  align-items: center;
  gap: 9px;
}

.vita-wifi {
  font-size: 13px;
  transform: rotate(35deg);
  opacity: .9;
}

.vita-battery {
  display: inline-block;
  position: relative;
  width: 23px;
  height: 10px;
  border: 1px solid rgba(255,255,255,.92);
  border-radius: 2px;
  padding: 1px;
}

.vita-battery::after {
  content: "";
  position: absolute;
  right: -4px;
  top: 2px;
  width: 2px;
  height: 5px;
  border-radius: 0 1px 1px 0;
  background: rgba(255,255,255,.82);
}

.vita-battery span {
  display: block;
  width: 76%;
  height: 100%;
  background: #b9eb4c;
}

.vita-home {
  position: absolute;
  inset: 32px 0 0;
  z-index: 5;
  overflow: hidden;
  touch-action: none;
}

.vita-home-page {
  position: absolute;
  inset: 2% 4.2% 2.8% 4.2%;
}

.vita-home-page.page-enter-next {
  animation: vita-page-enter-next 260ms cubic-bezier(.18,.84,.27,1);
}

.vita-home-page.page-enter-previous {
  animation: vita-page-enter-previous 260ms cubic-bezier(.18,.84,.27,1);
}

.vita-bubble-slot {
  position: absolute;
  width: calc(var(--vita-bubble-size) * 1.42);
  height: calc(var(--vita-bubble-size) * 1.42);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  transform: translate(-50%, -50%);
}

.vita-slot-0 { left: 26%; top: 18%; }
.vita-slot-1 { left: 50%; top: 18%; }
.vita-slot-2 { left: 74%; top: 18%; }

.vita-slot-3 { left: 14%; top: 50%; }
.vita-slot-4 { left: 38%; top: 50%; }
.vita-slot-5 { left: 62%; top: 50%; }
.vita-slot-6 { left: 86%; top: 50%; }

.vita-slot-7 { left: 26%; top: 82%; }
.vita-slot-8 { left: 50%; top: 82%; }
.vita-slot-9 { left: 74%; top: 82%; }

.vita-bubble {
  --bubble-accent: #2f9be9;
  --bubble-accent-dark: #07558f;
  position: relative;
  flex: 0 0 auto;
  width: var(--vita-bubble-size);
  height: var(--vita-bubble-size);
  padding: 0;
  border: 2px solid rgba(255,255,255,.68);
  border-radius: 50%;
  overflow: hidden;
  appearance: none;
  background:
    radial-gradient(circle at 33% 24%, rgba(255,255,255,.65), transparent 34%),
    linear-gradient(155deg, var(--bubble-accent), var(--bubble-accent-dark));
  box-shadow:
    inset 0 0 0 2px rgba(0,0,0,.10),
    inset 0 -13px 25px rgba(0,0,0,.18),
    0 5px 12px rgba(0,0,0,.30);
  transition:
    transform 165ms cubic-bezier(.2,.86,.25,1.15),
    filter 165ms ease,
    box-shadow 165ms ease;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

.vita-bubble-artwork {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.vita-bubble-gloss {
  position: absolute;
  z-index: 2;
  left: 8%;
  right: 8%;
  top: 4%;
  height: 42%;
  border-radius: 50%;
  background: linear-gradient(180deg, rgba(255,255,255,.43), rgba(255,255,255,.10) 52%, rgba(255,255,255,0));
  transform: scaleY(.72);
  transform-origin: top;
  pointer-events: none;
}

.vita-bubble.selected {
  transform: scale(1.11);
  filter: brightness(1.08) saturate(1.05);
  box-shadow:
    inset 0 0 0 2px rgba(0,0,0,.06),
    0 0 0 4px rgba(255,255,255,.40),
    0 8px 20px rgba(0,0,0,.32);
  animation: vita-bubble-float 2.05s ease-in-out infinite;
}

.vita-bubble-label {
  max-width: calc(var(--vita-bubble-size) * 1.5);
  margin-top: 6px;
  padding: 2px 7px;
  border-radius: 8px;
  overflow: hidden;
  color: rgba(255,255,255,.94);
  font-size: clamp(10px, 1.45vw, 13px);
  font-weight: 500;
  line-height: 1.18;
  text-align: center;
  text-overflow: ellipsis;
  text-shadow:
    0 1px 2px rgba(0,0,0,.82),
    0 0 5px rgba(0,0,0,.36);
  white-space: nowrap;
  opacity: .88;
  transition: 140ms ease;
}

.vita-bubble-label.selected {
  opacity: 1;
  background: rgba(0,0,0,.20);
}

.vita-page-indicator {
  position: absolute;
  z-index: 20;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.vita-page-indicator button {
  width: 9px;
  height: 9px;
  margin: 0;
  padding: 0;
  border: 1px solid rgba(255,255,255,.74);
  border-radius: 50%;
  background: rgba(12,75,126,.36);
  box-shadow: 0 1px 3px rgba(0,0,0,.28);
  appearance: none;
}

.vita-page-indicator button.active {
  background: white;
  box-shadow: 0 0 6px rgba(255,255,255,.75);
}

.vita-livearea {
  --live-accent: #2f9be9;
  --live-accent-dark: #07558f;
  position: absolute;
  inset: 32px 0 0;
  z-index: 8;
  overflow: hidden;
  background:
    linear-gradient(145deg, rgba(255,255,255,.10), transparent 30%),
    linear-gradient(150deg, var(--live-accent), var(--live-accent-dark));
  animation: vita-livearea-enter 280ms cubic-bezier(.18,.84,.27,1);
}

.vita-livearea-backdrop-art {
  position: absolute;
  inset: -7%;
  width: 114%;
  height: 114%;
  object-fit: cover;
  opacity: .20;
  filter: blur(13px) saturate(.82) brightness(.75);
  transform: scale(1.05);
}

.vita-livearea-background {
  position: absolute;
  inset: 0;
  overflow: hidden;
  background:
    linear-gradient(90deg, rgba(5,26,46,.32), transparent 46%),
    linear-gradient(180deg, rgba(255,255,255,.08), rgba(0,0,0,.12));
}

.vita-livearea-orb {
  position: absolute;
  border-radius: 50%;
  border: 2px solid rgba(255,255,255,.14);
  box-shadow: inset 0 0 60px rgba(255,255,255,.06);
}

.vita-livearea-orb-one {
  width: 55vw;
  height: 55vw;
  right: -16vw;
  top: -30vw;
}

.vita-livearea-orb-two {
  width: 38vw;
  height: 38vw;
  left: -16vw;
  bottom: -20vw;
}

.vita-livearea-back {
  position: absolute;
  z-index: 10;
  left: 14px;
  top: 12px;
  width: 40px;
  height: 40px;
  padding: 0 0 4px;
  display: grid;
  place-items: center;
  border: 1px solid rgba(255,255,255,.50);
  border-radius: 50%;
  background: rgba(0,0,0,.18);
  color: white;
  font: inherit;
  font-size: 32px;
  line-height: 1;
  appearance: none;
}

.vita-livearea-header {
  position: absolute;
  z-index: 4;
  left: 68px;
  top: 24px;
  display: flex;
  align-items: center;
  gap: 15px;
}

.vita-livearea-appicon {
  width: 70px;
  height: 70px;
  overflow: hidden;
  border: 2px solid rgba(255,255,255,.58);
  border-radius: 18px;
  background: rgba(255,255,255,.18);
  box-shadow: 0 5px 14px rgba(0,0,0,.24);
}

.vita-livearea-appicon-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.vita-livearea-header h1 {
  max-width: 450px;
  margin: 0 0 2px;
  overflow: hidden;
  font-size: clamp(23px, 3.2vw, 31px);
  font-weight: 500;
  text-overflow: ellipsis;
  text-shadow: 0 2px 6px rgba(0,0,0,.30);
  white-space: nowrap;
}

.vita-livearea-header p {
  margin: 0;
  font-size: 13px;
  opacity: .8;
}

.vita-livearea-content {
  position: absolute;
  z-index: 4;
  left: 7%;
  right: 7%;
  top: 122px;
  bottom: 47px;
  display: grid;
  grid-template-columns: 1.25fr .75fr;
  gap: 5vw;
  align-items: center;
}

.vita-livearea-card {
  min-height: 190px;
  padding: 22px 25px;
  border: 1px solid rgba(255,255,255,.31);
  border-radius: 22px;
  background:
    linear-gradient(145deg, rgba(255,255,255,.26), rgba(255,255,255,.09));
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.24),
    0 12px 30px rgba(0,0,0,.18);
  backdrop-filter: blur(5px);
}

.vita-livearea-card-title {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: .08em;
  opacity: .78;
  text-transform: uppercase;
}

.vita-livearea-card-copy {
  margin-top: 15px;
  font-size: clamp(20px, 2.8vw, 28px);
  font-weight: 500;
}

.vita-livearea-details {
  margin-top: 22px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.vita-livearea-details span {
  padding: 6px 10px;
  border: 1px solid rgba(255,255,255,.18);
  border-radius: 14px;
  background: rgba(0,0,0,.15);
  font-size: 11px;
}

.vita-livearea-gate {
  position: relative;
  width: clamp(150px, 22vw, 205px);
  aspect-ratio: 1 / 1;
  justify-self: center;
  padding: 0;
  overflow: hidden;
  border: 3px solid rgba(255,255,255,.74);
  border-radius: 22% 22% 42% 22%;
  appearance: none;
  background: rgba(255,255,255,.20);
  box-shadow:
    0 0 0 5px rgba(255,255,255,.12),
    0 12px 28px rgba(0,0,0,.28);
  transform: rotate(-2deg);
  cursor: pointer;
}

.vita-livearea-gate-art {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.vita-livearea-gate-shade {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(255,255,255,.12), transparent 42%),
    linear-gradient(0deg, rgba(0,0,0,.58), transparent 45%);
}

.vita-livearea-gate-label {
  position: absolute;
  z-index: 2;
  left: 14px;
  right: 14px;
  bottom: 12px;
  padding: 7px 12px;
  border: 1px solid rgba(255,255,255,.42);
  border-radius: 16px;
  background: rgba(0,0,0,.36);
  color: white;
  font: inherit;
  font-size: 17px;
  font-weight: 600;
  text-align: center;
  text-shadow: 0 1px 3px rgba(0,0,0,.65);
}

.vita-livearea-hint {
  position: absolute;
  right: 18px;
  bottom: 13px;
  z-index: 7;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 10px;
  opacity: .76;
}

.vita-livearea-hint span {
  width: 19px;
  height: 19px;
  display: inline-grid;
  place-items: center;
  margin-left: 8px;
  border: 1px solid rgba(255,255,255,.72);
  border-radius: 50%;
  font-size: 9px;
}

.vita-dev-exit {
  position: absolute;
  z-index: 60;
  left: 12px;
  bottom: 7px;
  padding: 3px;
  border: 0;
  background: transparent;
  color: rgba(255,255,255,.24);
  font: inherit;
  font-size: 9px;
}

@keyframes vita-bubble-float {
  0%, 100% { transform: scale(1.11) translateY(0); }
  50% { transform: scale(1.11) translateY(-2px); }
}

@keyframes vita-page-enter-next {
  from { opacity: 0; transform: translateY(18%); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes vita-page-enter-previous {
  from { opacity: 0; transform: translateY(-18%); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes vita-livearea-enter {
  from { opacity: 0; transform: translateX(7%) scale(.985); }
  to { opacity: 1; transform: translateX(0) scale(1); }
}

@media (max-height: 560px) {
  .psdeck-vita-root {
    --vita-bubble-size: clamp(74px, 10.8vw, 98px);
  }

  .vita-bubble-label {
    margin-top: 4px;
  }

  .vita-livearea-content {
    top: 112px;
  }

  .vita-livearea-card {
    min-height: 170px;
  }
}
`;
