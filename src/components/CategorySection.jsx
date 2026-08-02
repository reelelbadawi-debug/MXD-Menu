import CategoryIcon from './CategoryIcon';
import MenuItem from './MenuItem';
import { inferCategoryIcon } from '../utils/categoryIcon';

export default function CategorySection({ category }) {
  if (!category.items || category.items.length === 0) return null;
  return (
    <section className="mxd-category" id={`cat-${category.id}`}>
      <div className="mxd-cat-head">
        <CategoryIcon iconKey={inferCategoryIcon(category.name)} />
        <span className="mxd-cat-name">{category.name}</span>
      </div>
      <div className="mxd-items">
        {category.items.map((item) => <MenuItem key={item.id || item.name} item={item} />)}
      </div>
    </section>
  );
}
