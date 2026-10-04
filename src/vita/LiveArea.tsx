import type { VitaApp } from "./model";
import { VitaArtwork } from "./VitaArtwork";

type Props = {
  app: VitaApp;
  onStart: () => void;
  onBack: () => void;
};

export function LiveArea({ app, onStart, onBack }: Props) {
  return (
    <section
      className="vita-livearea"
      style={{
        "--live-accent": app.accent,
        "--live-accent-dark": app.accentDark
      } as React.CSSProperties}
      aria-label={`${app.title} LiveArea`}
    >
      {app.kind === "game" && (
        <VitaArtwork
          urls={app.imageUrls}
          alt=""
          className="vita-livearea-backdrop-art"
        />
      )}

      <div className="vita-livearea-background">
        <div className="vita-livearea-orb vita-livearea-orb-one" />
        <div className="vita-livearea-orb vita-livearea-orb-two" />
      </div>

      <button
        className="vita-livearea-back"
        type="button"
        tabIndex={-1}
        onClick={onBack}
        aria-label="Back to Home"
      >
        ‹
      </button>

      <div className="vita-livearea-header">
        <div className="vita-livearea-appicon">
          <VitaArtwork
            urls={app.imageUrls}
            alt=""
            className="vita-livearea-appicon-image"
          />
        </div>
        <div>
          <h1>{app.title}</h1>
          <p>{app.subtitle}</p>
        </div>
      </div>

      <div className="vita-livearea-content">
        <div className="vita-livearea-card">
          <div className="vita-livearea-card-title">LiveArea</div>
          <div className="vita-livearea-card-copy">{app.subtitle}</div>
          <div className="vita-livearea-details">
            {app.details.map((detail) => (
              <span key={detail}>{detail}</span>
            ))}
          </div>
        </div>

        <button
          className="vita-livearea-gate"
          type="button"
          tabIndex={-1}
          onClick={onStart}
          aria-label={`${app.startLabel} ${app.title}`}
        >
          <VitaArtwork
            urls={app.imageUrls}
            alt=""
            className="vita-livearea-gate-art"
          />
          <span className="vita-livearea-gate-shade" />
          <span className="vita-livearea-gate-label">{app.startLabel}</span>
        </button>
      </div>

      <div className="vita-livearea-hint">
        <span>A</span> {app.startLabel}
        <span>B</span> Back
      </div>
    </section>
  );
}
