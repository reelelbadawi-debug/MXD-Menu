export default function Footer({ restaurant }) {
  return (
    <footer className="mxd-footer">
      <svg className="mxd-foot-crown" viewBox="0 0 100 90" fill="none" stroke="#EDE4D3" strokeWidth="6" strokeLinecap="round">
        <path d="M14,55 Q35,64 50,55 T86,55" />
        <path d="M20,48 Q23,15 32,-2 Q40,15 48,-15 Q56,15 64,-2 Q73,15 76,48" />
        <circle cx="32" cy="-2" r="7" /><circle cx="48" cy="-15" r="8" /><circle cx="64" cy="-2" r="7" />
      </svg>
      <div>{restaurant?.name || 'MXD مكسد'}</div>
      <div>{restaurant?.address}</div>
      <div>{(restaurant?.phones || []).join(' | ')}</div>
    </footer>
  );
}
