import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInventory } from '../store/InventoryContext';
import { useFavorites } from '../hooks/useFavorites';
import InventoryCard from '../components/gallery/InventoryCard';
import InventoryQuickView from '../components/gallery/InventoryQuickView';

export default function Favorites() {
  const navigate = useNavigate();
  const { items, loading, fetchAll } = useInventory();
  const favorites = useFavorites();
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const favItems = items.filter(item => favorites.isFavorite(item.id || item._id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-midnight flex items-center gap-3">
            <svg className="w-7 h-7 text-red-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            Улюблені
          </h1>
          <p className="text-midnight/50 text-sm font-sans mt-1">
            {loading ? 'Завантаження...' : `${favItems.length} товарів збережено`}
          </p>
        </div>
        {favorites.favorites.length > 0 && (
          <button
            onClick={() => { if (window.confirm('Очистити всі улюблені?')) favorites.favorites.forEach(id => favorites.removeFavorite(id)); }}
            className="text-xs text-midnight/40 hover:text-red-400 transition-colors underline underline-offset-2"
          >
            Очистити все
          </button>
        )}
      </div>

      {!loading && favItems.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 gap-5 animate-fade-in">
          <div className="w-20 h-20 rounded-3xl bg-red-50 flex items-center justify-center">
            <svg className="w-10 h-10 text-red-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <div className="text-center">
            <p className="font-serif text-xl text-midnight/40 mb-1">Немає улюблених</p>
            <p className="text-sm text-midnight/30">Натисніть ❤️ на картці товару, щоб додати</p>
          </div>
          <button onClick={() => navigate('/gallery')} className="btn-primary mt-2">Перейти до галереї</button>
        </div>
      )}

      {!loading && favItems.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {favItems.map((item) => (
            <InventoryCard
              key={item.id || item._id}
              item={item}
              isFav={true}
              onToggleFav={favorites.toggleFavorite}
              onClick={setSelectedItem}
            />
          ))}
        </div>
      )}

      {selectedItem && (
        <InventoryQuickView
          item={selectedItem}
          isFav={favorites.isFavorite(selectedItem.id || selectedItem._id)}
          onToggleFav={favorites.toggleFavorite}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
}