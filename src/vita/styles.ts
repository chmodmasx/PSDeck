export const VITA_STYLES = `
.psdeck-vita-root {
  --vita-blue: #1596db;
  --vita-blue-deep: #064f96;
  position: fixed;
  inset: 0;
  z-index: 9999;
  overflow: hidden;
  outline: none !important;
  color: white;
  font-family: "Noto Sans", "DejaVu Sans", Arial, sans-serif;
  background:
    radial-gradient(circle at 18% 15%, rgba(255,255,255,.18), transparent 22%),
    linear-gradient(160deg, #29a6df 0%, #0c80c7 48%, #075799 100%);
}

.psdeck-vita-root:focus,
.psdeck-vita-root:focus-visible {
  outline: none !important;
}

.psdeck-vita-root::before,
.psdeck-vita-root::after {
  content: "";
  position: absolute;
  pointer-events: none;
  border: 2px solid rgba(255,255,255,.10);
  border-radius: 50%;
}

.psdeck-vita-root::before {
  width: 680px;
  height: 680px;
  right: -240px;
  top: -260px;
  box-shadow:
    0 0 0 70px rgba(255,255,255,.025),
    0 0 0 145px rgba(255,255,255,.018);
}

.psdeck-vita-root::after {
  width: 520px;
  height: 520px;
  left: -280px;
  bottom: -240px;
  box-shadow:
    0 0 0 60px rgba(255,255,255,.024),
    0 0 0 128px rgba(255,255,255,.016);
}

.vita-statusbar {
  position: absolute;
  z-index: 30;
  top: 0;
  left: 0;
  right: 0;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 18px;
  background: linear-gradient(180deg, rgba(0,0,0,.30), rgba(0,0,0,.13));
  border-bottom: 1px solid rgba(255,255,255,.16);
  font-size: 13px;
  text-shadow: 0 1px 3px rgba(0,0,0,.35);
}

.vita-status-left {
  opacity: .88;
  font-weight: 600;
}

.vita-status-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.vita-wifi {
  font-size: 15px;
  transform: rotate(35deg);
  opacity: .9;
}

.vita-battery {
  display: inline-block;
  position: relative;
  width: 25px;
  height: 11px;
  border: 1px solid rgba(255,255,255,.9);
  border-radius: 2px;
  padding: 1px;
}

.vita-battery::after {
  content: "";
  position: absolute;
  right: -4px;
  top: 3px;
  width: 2px;
  height: 5px;
  border-radius: 0 1px 1px 0;
  background: rgba(255,255,255,.8);
}

.vita-battery span {
  display: block;
  width: 76%;
  height: 100%;
  background: rgba(255,255,255,.9);
}

.vita-home {
  position: absolute;
  inset: 38px 0 0;
  z-index: 5;
  animation: vita-home-enter 280ms cubic-bezier(.18,.84,.27,1);
}

.vita-home-grid {
  position: absolute;
  left: 50%;
  top: 51%;
  width: 760px;
  height: 560px;
  transform: translate(-50%, -50%);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 240px;
  align-items: center;
  justify-items: center;
}

.vita-bubble-slot {
  width: 210px;
  height: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.vita-bubble-slot:nth-child(2),
.vita-bubble-slot:nth-child(5) {
  transform: translateY(42px);
}

.vita-bubble {
  --bubble-accent: #2f9be9;
  --bubble-accent-dark: #07558f;
  position: relative;
  width: 144px;
  height: 144px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  overflow: hidden;
  transform: scale(1);
  background:
    radial-gradient(circle at 33% 25%, rgba(255,255,255,.68), rgba(255,255,255,.09) 24%, transparent 38%),
    radial-gradient(circle at 50% 100%, var(--bubble-accent-dark), transparent 65%),
    linear-gradient(155deg, var(--bubble-accent), var(--bubble-accent-dark));
  border: 3px solid rgba(255,255,255,.62);
  box-shadow:
    inset 0 0 0 2px rgba(0,0,0,.08),
    inset 0 -18px 28px rgba(0,0,0,.16),
    0 8px 18px rgba(0,0,0,.25);
  transition:
    transform 180ms cubic-bezier(.2,.86,.25,1.15),
    filter 180ms ease,
    box-shadow 180ms ease;
}

.vita-bubble-gloss {
  position: absolute;
  inset: 7px 16px auto;
  height: 48%;
  border-radius: 50%;
  background: linear-gradient(180deg, rgba(255,255,255,.36), rgba(255,255,255,0));
  transform: scaleY(.68);
  transform-origin: top;
  pointer-events: none;
}

.vita-bubble-icon {
  position: relative;
  z-index: 2;
  width: 70px;
  height: 70px;
  color: rgba(255,255,255,.97);
  filter: drop-shadow(0 2px 4px rgba(0,0,0,.24));
}

.vita-bubble-icon svg {
  width: 100%;
  height: 100%;
  fill: none;
  stroke: currentColor;
  stroke-width: 2.2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.vita-bubble.selected {
  transform: scale(1.16);
  filter: brightness(1.11) saturate(1.08);
  box-shadow:
    inset 0 0 0 2px rgba(0,0,0,.06),
    inset 0 -18px 28px rgba(0,0,0,.12),
    0 0 0 5px rgba(255,255,255,.38),
    0 12px 28px rgba(0,0,0,.30);
  animation: vita-bubble-float 1.85s ease-in-out infinite;
}

.vita-bubble-label {
  margin-top: 13px;
  padding: 4px 12px;
  border-radius: 11px;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: .01em;
  text-shadow: 0 2px 4px rgba(0,0,0,.5);
  opacity: .78;
  transition: 150ms ease;
}

.vita-bubble-label.selected {
  opacity: 1;
  background: rgba(0,0,0,.22);
}

.vita-page-indicator {
  position: absolute;
  right: 22px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.vita-page-indicator span {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,.7);
}

.vita-page-indicator span.active {
  background: white;
  box-shadow: 0 0 7px rgba(255,255,255,.75);
}

.vita-livearea {
  --live-accent: #2f9be9;
  --live-accent-dark: #07558f;
  position: absolute;
  inset: 38px 0 0;
  z-index: 8;
  overflow: hidden;
  background:
    linear-gradient(145deg, rgba(255,255,255,.13), transparent 30%),
    linear-gradient(150deg, var(--live-accent), var(--live-accent-dark));
  animation: vita-livearea-enter 300ms cubic-bezier(.18,.84,.27,1);
}

.vita-livearea-background {
  position: absolute;
  inset: 0;
  overflow: hidden;
  opacity: .7;
}

.vita-livearea-orb {
  position: absolute;
  border-radius: 50%;
  border: 2px solid rgba(255,255,255,.18);
  box-shadow: inset 0 0 70px rgba(255,255,255,.08);
}

.vita-livearea-orb-one {
  width: 620px;
  height: 620px;
  right: -100px;
  top: -260px;
}

.vita-livearea-orb-two {
  width: 430px;
  height: 430px;
  left: -120px;
  bottom: -180px;
}

.vita-livearea-header {
  position: absolute;
  z-index: 3;
  left: 66px;
  top: 54px;
  display: flex;
  align-items: center;
  gap: 22px;
}

.vita-livearea-appicon {
  width: 88px;
  height: 88px;
  padding: 18px;
  border-radius: 22px;
  background: rgba(255,255,255,.20);
  border: 1px solid rgba(255,255,255,.38);
  box-shadow: 0 7px 18px rgba(0,0,0,.18);
}

.vita-livearea-appicon svg {
  width: 100%;
  height: 100%;
  fill: none;
  stroke: white;
  stroke-width: 2.2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.vita-livearea-header h1 {
  margin: 0 0 4px;
  font-size: 31px;
  font-weight: 500;
  text-shadow: 0 2px 6px rgba(0,0,0,.27);
}

.vita-livearea-header p {
  margin: 0;
  font-size: 15px;
  opacity: .78;
}

.vita-livearea-content {
  position: absolute;
  z-index: 3;
  left: 64px;
  right: 64px;
  top: 190px;
  bottom: 70px;
  display: grid;
  grid-template-columns: 1.5fr .8fr;
  gap: 46px;
  align-items: center;
}

.vita-livearea-card {
  min-height: 275px;
  padding: 28px 32px;
  border-radius: 26px;
  background:
    linear-gradient(145deg, rgba(255,255,255,.27), rgba(255,255,255,.10));
  border: 1px solid rgba(255,255,255,.34);
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.25),
    0 16px 38px rgba(0,0,0,.18);
  backdrop-filter: blur(5px);
}

.vita-livearea-card-title {
  font-size: 17px;
  font-weight: 700;
  opacity: .82;
  text-transform: uppercase;
  letter-spacing: .08em;
}

.vita-livearea-card-copy {
  margin-top: 22px;
  font-size: 28px;
  font-weight: 500;
}

.vita-livearea-details {
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.vita-livearea-details span {
  padding: 8px 12px;
  border-radius: 16px;
  background: rgba(0,0,0,.17);
  border: 1px solid rgba(255,255,255,.20);
  font-size: 13px;
}

.vita-start-wrap {
  display: grid;
  place-items: center;
}

.vita-start-button {
  width: 184px;
  height: 184px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background:
    radial-gradient(circle at 35% 25%, rgba(255,255,255,.85), rgba(255,255,255,.2) 24%, transparent 40%),
    linear-gradient(145deg, rgba(255,255,255,.38), rgba(255,255,255,.13));
  border: 4px solid rgba(255,255,255,.76);
  box-shadow:
    0 0 0 6px rgba(255,255,255,.15),
    0 14px 32px rgba(0,0,0,.25);
  animation: vita-start-pulse 1.8s ease-in-out infinite;
}

.vita-start-button span {
  font-size: 24px;
  font-weight: 600;
  text-shadow: 0 2px 4px rgba(0,0,0,.32);
}

.vita-livearea-hint {
  position: absolute;
  right: 24px;
  bottom: 18px;
  z-index: 4;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  opacity: .72;
}

.vita-livearea-hint span {
  width: 21px;
  height: 21px;
  display: inline-grid;
  place-items: center;
  margin-left: 10px;
  border: 1px solid rgba(255,255,255,.72);
  border-radius: 50%;
  font-size: 10px;
}

.vita-dev-exit {
  position: absolute;
  z-index: 40;
  left: 14px;
  bottom: 10px;
  border: 0;
  background: transparent;
  color: rgba(255,255,255,.30);
  font: inherit;
  font-size: 10px;
  pointer-events: auto;
}

@keyframes vita-bubble-float {
  0%, 100% { transform: scale(1.16) translateY(0) rotate(-.5deg); }
  50% { transform: scale(1.16) translateY(-5px) rotate(.5deg); }
}

@keyframes vita-start-pulse {
  0%, 100% { transform: scale(1); filter: brightness(1); }
  50% { transform: scale(1.035); filter: brightness(1.08); }
}

@keyframes vita-home-enter {
  from { opacity: 0; transform: scale(.97); }
  to { opacity: 1; transform: scale(1); }
}

@keyframes vita-livearea-enter {
  from { opacity: 0; transform: translateX(42px) scale(.985); }
  to { opacity: 1; transform: translateX(0) scale(1); }
}

@media (max-width: 1000px) {
  .vita-home-grid {
    width: 680px;
    height: 520px;
  }

  .vita-bubble {
    width: 132px;
    height: 132px;
  }

  .vita-bubble-icon {
    width: 62px;
    height: 62px;
  }
}
`;
