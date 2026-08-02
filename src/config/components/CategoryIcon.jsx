import { ICONS } from '../utils/icons';

export default function CategoryIcon({ iconKey, className = 'mxd-cat-icon', color = '#C9A227' }) {
  const path = ICONS[iconKey];
  if (path === 'CIRCLE') {
    return (
      <svg className={className} viewBox="0 0 30 32" fill="none" stroke={color} strokeWidth="1.8">
        <circle cx="15" cy="16" r="11" /><circle cx="15" cy="16" r="5" />
      </svg>
    );
  }
  return (
    <svg className={className} viewBox="0 0 30 32" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d={path || ICONS.fries} />
    </svg>
  );
}
