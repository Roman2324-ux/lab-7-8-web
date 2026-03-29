import { useEffect, useState } from 'react';
import { inventoryApi } from '../../services/inventoryApi';

export default function InventoryQuickView({ item, isFav, onToggleFav, onClose }) {
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const id = item?.id || item?._id;

  useEffect(() => {
    if (!item) return;
    setLoading(true);
    inventoryApi.getById(id)
      .then(setDetail)
      .catch(() => setDetail(item))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!item) return null;
  const data = detail || item;

  return (
    <div className="fixed inset-0 z-50 flex animate-fade-in">
      <div className="flex-1 bg-midnight/50 backdrop-blur-sm" onClick={onClose} />
      <div className="w-full max-w-lg bg-cloud h-full flex flex-col shadow-2xl animate-slide-in overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-cloud-dark sticky top-0 bg-cloud z-10">
          <h2 className="font-serif text-lg font-bold text-midnight truncate pr-4">
            {data.inventory_name}
          </h2>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => onToggleFav(id)}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200
                ${isFav ? 'bg-red-500 text-white' : 'bg-white text-midnight/40 hover:text-red-400 border border-cloud-dark'}`}
            >
              <svg className="w-4 h-4" fill={isFav ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white border border-cloud-dark flex items-center justify-center hover:bg-cloud-dark transition-colors"
            >
              <svg className="w-4 h-4 text-midnight" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex-1 p-6 space-y-6">
          <div className="rounded-2xl overflow-hidden bg-cloud-dark border border-cloud-dark shadow-sm">
            {loading ? (
             <div className="skeleton w-full h-48" />
            ) : (
              <img
               src={inventoryApi.getPhotoUrl(id)}
               alt={data.inventory_name}
                className="w-full max-h-[320px] object-contain p-3"
                onError={e => { e.target.style.display='none'; e.target.parentNode.innerHTML='<div class="flex items-center justify-center h-48 text-7xl">📦</div>'; }}
              />
            )}
            </div>

          <div className="bg-white rounded-xl p-5 border border-cloud-dark">
            <h3 className="text-xs font-mono uppercase tracking-widest text-midnight/40 mb-2">Опис</h3>
            {loading ? (
              <div className="space-y-2">
                <div className="skeleton h-4 w-full rounded" />
                <div className="skeleton h-4 w-3/4 rounded" />
              </div>
            ) : (
              <p className="text-midnight/70 font-sans text-sm leading-relaxed">
                {data.description || <em className="text-midnight/30">Опис відсутній</em>}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-midnight/30">ID:</span>
            <span className="text-xs font-mono bg-white border border-cloud-dark px-2 py-1 rounded text-midnight/50">{id}</span>
          </div>
        </div>
      </div>
    </div>
  );
}