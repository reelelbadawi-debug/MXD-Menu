import CategoryIcon from './CategoryIcon';
import MenuItem from './MenuItem';

export default function CategorySection({ category }) {
  if (!category.items || category.items.length === 0) return null;
  return (
    <section className="mxd-category" id={category.id}>
      <div className="mxd-cat-head">
        <CategoryIcon iconKey={category.icon || 'plate'} />
        <span className="mxd-cat-name">{category.name}</span>
      </div>
      <div className="mxd-items">
        {category.items.map((item, idx) => <MenuItem key={idx} item={item} />)}
      </div>
    </section>
  );
}
