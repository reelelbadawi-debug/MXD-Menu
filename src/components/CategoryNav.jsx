export default function CategoryNav({ categories, activeId, onSelect }) {
  return (
    <nav className="mxd-nav">
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
