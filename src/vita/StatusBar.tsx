type Props = {
  now: Date;
};

export function StatusBar({ now }: Props) {
  const time = new Intl.DateTimeFormat(undefined, {
    hour: "2-digit",
    minute: "2-digit"
  }).format(now);

  return (
    <header className="vita-statusbar">
      <div className="vita-status-left">PSDeck</div>
      <div className="vita-status-right">
        <span className="vita-wifi" aria-hidden="true">◔</span>
        <span>{time}</span>
        <span className="vita-battery" aria-hidden="true">
          <span />
        </span>
      </div>
    </header>
  );
}
