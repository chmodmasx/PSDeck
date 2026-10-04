import { VITA_APPS } from "./model";
import { VitaAppIcon } from "./icons";

type Props = {
  selectedIndex: number;
};

export function VitaHome({ selectedIndex }: Props) {
  return (
    <section className="vita-home" aria-label="PSDeck Home">
      <div className="vita-home-grid">
        {VITA_APPS.map((app, index) => (
          <div
            className={`vita-bubble-slot vita-bubble-slot-${index}`}
            key={app.id}
          >
            <div
              className={`vita-bubble ${index === selectedIndex ? "selected" : ""}`}
              style={{
                "--bubble-accent": app.accent,
                "--bubble-accent-dark": app.accentDark
              } as React.CSSProperties}
            >
              <div className="vita-bubble-gloss" />
              <div className="vita-bubble-icon">
                <VitaAppIcon icon={app.icon} />
              </div>
            </div>
            <div
              className={`vita-bubble-label ${index === selectedIndex ? "selected" : ""}`}
            >
              {app.title}
            </div>
          </div>
        ))}
      </div>

      <aside className="vita-page-indicator" aria-label="Home page 1 of 1">
        <span className="active" />
      </aside>
    </section>
  );
}
