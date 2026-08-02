export default function CategoryNav({ categories, activeId, onSelect }) {
  return (
    <nav className="mxd-nav">
      <button className={activeId === null ? 'active' : ''} onClick={() => onSelect(null)}>
        الكل
      </button>
      {categories.map(cat => (
        <button
          key={cat.id}
          className={activeId === cat.id ? 'active' : ''}
          onClick={() => onSelect(cat.id)}
        >
          {cat.name}
        </button>
      ))}
    </nav>
  );
}
