import type { VitaApp } from "./model";
import { VitaAppIcon } from "./icons";

type Props = {
  app: VitaApp;
};

export function LiveArea({ app }: Props) {
  return (
    <section
      className="vita-livearea"
      style={{
        "--live-accent": app.accent,
        "--live-accent-dark": app.accentDark
      } as React.CSSProperties}
      aria-label={`${app.title} LiveArea`}
    >
      <div className="vita-livearea-background">
        <div className="vita-livearea-orb vita-livearea-orb-one" />
        <div className="vita-livearea-orb vita-livearea-orb-two" />
      </div>

      <div className="vita-livearea-header">
        <div className="vita-livearea-appicon">
          <VitaAppIcon icon={app.icon} />
        </div>
        <div>
          <h1>{app.title}</h1>
          <p>{app.subtitle}</p>
        </div>
      </div>

      <div className="vita-livearea-content">
        <div className="vita-livearea-card">
          <div className="vita-livearea-card-title">PSDeck</div>
          <div className="vita-livearea-card-copy">{app.subtitle}</div>
          <div className="vita-livearea-details">
            {app.details.map((detail) => (
              <span key={detail}>{detail}</span>
            ))}
          </div>
        </div>

        <div className="vita-start-wrap">
          <div className="vita-start-button">
            <span>{app.startLabel}</span>
          </div>
        </div>
      </div>

      <div className="vita-livearea-hint">
        <span>A</span> {app.startLabel}
        <span>B</span> Back
      </div>
    </section>
  );
}
