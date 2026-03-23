import { useEffect, useState } from 'react';
import { useInventory } from '../store/InventoryContext';
import { useFavorites } from '../hooks/useFavorites';
import InventoryGallery from '../components/gallery/InventoryGallery';
import InventoryQuickView from '../components/gallery/InventoryQuickView';
import FavoritesBar from '../components/gallery/FavoritesBar';

export default function Gallery() {
  const { items, loading, error, fetchAll } = useInventory();
  const favorites = useFavorites();
  const [selectedItem, setSelectedItem] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const filtered = items.filter(item =>
    item.inventory_name?.toLowerCase().includes(search.toLowerCase()) ||
    item.description?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-midnight">Галерея</h1>
        <p className="text-midnight/50 text-sm font-sans mt-1">
          {!loading && `${items.length} товарів`}
          {favorites.favorites.length > 0 && ` · ${favorites.favorites.length} улюблених`}
        </p>
      </div>

      <div className="relative mb-6 max-w-md">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-midnight/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Пошук товарів..."
          className="input-field pl-9"
        />
        {search && (
          <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-midnight/40 hover:text-midnight">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      <InventoryGallery
        items={filtered}
        loading={loading}
        error={error}
        favorites={favorites}
        onItemClick={setSelectedItem}
      />

      {selectedItem && (
        <InventoryQuickView
          item={selectedItem}
          isFav={favorites.isFavorite(selectedItem.id || selectedItem._id)}
          onToggleFav={favorites.toggleFavorite}
          onClose={() => setSelectedItem(null)}
        />
      )}

      <FavoritesBar count={favorites.favorites.length} />
    </div>
  );
}