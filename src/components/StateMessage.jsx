export default function StateMessage({ icon, title, subtitle }) {
  return (
    <div className="mxd-state">
      <div className="mxd-state-icon">{icon}</div>
      <div className="mxd-state-title">{title}</div>
      {subtitle && <div className="mxd-state-subtitle">{subtitle}</div>}
    </div>
  );
}
