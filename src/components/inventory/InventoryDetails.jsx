import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { inventoryApi } from '../../services/inventoryApi';

export default function InventoryDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    inventoryApi.getById(id)
      .then(setItem)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <div className="skeleton h-8 w-48 rounded" />
      <div className="skeleton h-64 w-full rounded-2xl" />
      <div className="skeleton h-4 w-full rounded" />
      <div className="skeleton h-4 w-3/4 rounded" />
    </div>
  );

  if (error) return (
    <div className="max-w-2xl mx-auto p-6 text-center text-red-500">{error}</div>
  );

  if (!item) return null;

  return (
    <div className="max-w-2xl mx-auto p-6 animate-fade-in">
      <div className="card">
        <div className="aspect-video bg-cloud overflow-hidden">
          <img
            src={inventoryApi.getPhotoUrl(id)}
            alt={item.inventory_name}
            className="w-full h-full object-cover"
            onError={e => { e.target.style.display='none'; e.target.parentNode.innerHTML='<div class="flex items-center justify-center h-full text-6xl">📦</div>'; }}
          />
        </div>
        <div className="p-6">
          <h1 className="font-serif text-2xl font-bold text-midnight mb-3">{item.inventory_name}</h1>
          <p className="text-midnight/60 font-sans leading-relaxed">
            {item.description || <em>Без опису</em>}
          </p>
          <div className="flex gap-3 mt-6">
            <button onClick={() => navigate(`/admin/${id}/edit`)} className="btn-primary">Редагувати</button>
            <button onClick={() => navigate('/admin')} className="btn-secondary">← Назад</button>
          </div>
        </div>
      </div>
    </div>
  );
}