import { useMemo, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import CategoryNav from '../components/CategoryNav';
import CategorySection from '../components/CategorySection';
import CategoryDivider from '../components/CategoryDivider';
import menuData from '../data/menu.json';

export default function Home() {
  const [search, setSearch] = useState('');
  const [activeId, setActiveId] = useState(null);

  // Only categories that have at least one non-hidden item are shown.
  const categories = useMemo(
    () => menuData.categories.map(cat => ({
      ...cat,
      items: cat.items.filter(it => !it.hidden)
    })).filter(cat => cat.items.length > 0),
    []
  );

  const filteredCategories = useMemo(() => {
    if (!search.trim()) return categories;
    const term = search.trim().toLowerCase();
    return categories
      .map(cat => ({ ...cat, items: cat.items.filter(it => it.name.toLowerCase().includes(term)) }))
      .filter(cat => cat.items.length > 0);
  }, [categories, search]);

  const scrollTo = (id) => {
    setActiveId(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <Header restaurant={menuData.restaurant} />
      <SearchBar value={search} onChange={setSearch} />
      {!search && (
        <CategoryNav categories={categories} activeId={activeId} onSelect={scrollTo} />
      )}
      <main className="mxd-main">
        {filteredCategories.length === 0 && (
          <div className="mxd-empty">مفيش أصناف مطابقة للبحث</div>
        )}
        {filteredCategories.map((cat, idx) => (
          <div key={cat.id}>
            {idx > 0 && <CategoryDivider />}
            <CategorySection category={cat} />
          </div>
        ))}
      </main>
      <Footer restaurant={menuData.restaurant} />
    </>
  );
}
