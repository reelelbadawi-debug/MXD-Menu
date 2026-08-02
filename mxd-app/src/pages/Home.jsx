import { useMemo, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import CategoryNav from '../components/CategoryNav';
import CategorySection from '../components/CategorySection';
import CategoryDivider from '../components/CategoryDivider';
import StateMessage from '../components/StateMessage';
import { useSheetMenu } from '../hooks/useSheetMenu';

const RESTAURANT = {
  name: 'MXD مكسد',
  tagline: 'ملوك السعادة',
  address: 'الأقصر - طيبة، الحي الثاني',
  phones: ['01040016416', '01040016417'],
};

export default function Home() {
  const { categories, status } = useSheetMenu();
  const [search, setSearch] = useState('');
  const [activeCat, setActiveCat] = useState(null);

  const visibleCategories = useMemo(() => {
    let cats = categories;
    if (activeCat) cats = cats.filter(c => c.id === activeCat);
    if (search.trim()) {
      const term = search.trim().toLowerCase();
      cats = cats
        .map(c => ({
          ...c,
          items: c.items.filter(it =>
            it.name.toLowerCase().includes(term) ||
            (it.desc || '').toLowerCase().includes(term)
          )
        }))
        .filter(c => c.items.length > 0);
    }
    return cats;
  }, [categories, activeCat, search]);

  return (
    <>
      <Header restaurant={RESTAURANT} />

      {status === 'ready' && categories.length > 0 && (
        <>
          <SearchBar value={search} onChange={setSearch} />
          <CategoryNav categories={categories} activeId={activeCat} onSelect={setActiveCat} />
        </>
      )}

      <main className="mxd-main">
        {status === 'loading' && (
          <StateMessage icon="⏳" title="جاري تحميل المنيو..." />
        )}

        {status === 'error' && (
          <StateMessage
            icon="🍽️"
            title="المنيو مش متاح دلوقتي"
            subtitle="جرب تحدّث الصفحة بعد شوية."
          />
        )}

        {status === 'ready' && categories.length === 0 && (
          <StateMessage
            icon="📋"
            title="المنيو هيتحدث قريبًا"
            subtitle="مفيش أصناف متاحة دلوقتي."
          />
        )}

        {status === 'ready' && categories.length > 0 && visibleCategories.length === 0 && (
          <StateMessage icon="🔍" title="مفيش أصناف مطابقة للبحث" />
        )}

        {status === 'ready' && visibleCategories.map((cat, idx) => (
          <div key={cat.id}>
            {idx > 0 && <CategoryDivider />}
            <CategorySection category={cat} />
          </div>
        ))}
      </main>

      <Footer restaurant={RESTAURANT} />
    </>
  );
}
