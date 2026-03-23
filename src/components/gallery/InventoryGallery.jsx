import InventoryCard from './InventoryCard';

function SkeletonCard() {
  return (
    <div className="card overflow-hidden">
      <div className="skeleton aspect-square" />
      <div className="p-4 space-y-2">
        <div className="skeleton h-4 w-3/4 rounded" />
        <div className="skeleton h-3 w-full rounded" />
      </div>
    </div>
  );
}

export default function InventoryGallery({ items, loading, error, favorites, onItemClick }) {
  if (error) return (
    <div className="flex flex-col items-center justify-center py-24 gap-4 animate-fade-in">
      <div className="text-5xl">⚠️</div>
      <p className="text-midnight/50 font-sans">{error}</p>
    </div>
  );

  if (!loading && items.length === 0) return (
    <div className="flex flex-col items-center justify-center py-24 gap-4 animate-fade-in">
      <div className="text-6xl">📦</div>
      <p className="font-serif text-xl text-midnight/40">Галерея порожня</p>
      <p className="text-sm text-midnight/30 font-sans">Додайте перший товар через адмін-панель</p>
    </div>
  );

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {loading
        ? Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />)
        : items.map((item) => (
          <InventoryCard
            key={item.id || item._id}
            item={item}
            isFav={favorites.isFavorite(item.id || item._id)}
            onToggleFav={favorites.toggleFavorite}
            onClick={onItemClick}
          />
        ))
      }
    </div>
  );
}