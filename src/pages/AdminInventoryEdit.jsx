import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useInventory } from '../store/InventoryContext';
import { inventoryApi } from '../services/inventoryApi';

export default function AdminInventoryEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateItem } = useInventory();

  const [item, setItem] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [textLoading, setTextLoading] = useState(false);
  const [textError, setTextError] = useState(null);
  const [textSuccess, setTextSuccess] = useState(false);

  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoLoading, setPhotoLoading] = useState(false);
  const [photoError, setPhotoError] = useState(null);
  const [photoSuccess, setPhotoSuccess] = useState(false);

  useEffect(() => {
    inventoryApi.getById(id)
      .then(data => { setItem(data); setName(data.inventory_name || ''); setDescription(data.description || ''); })
      .catch(e => setFetchError(e.message))
      .finally(() => setFetchLoading(false));
  }, [id]);

  const handleTextSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setTextLoading(true); setTextError(null); setTextSuccess(false);
    try {
      const updated = await inventoryApi.updateText(id, { inventory_name: name.trim(), description: description.trim() });
      updateItem(id, updated);
      setTextSuccess(true);
      setTimeout(() => setTextSuccess(false), 3000);
    } catch (e) { setTextError(e.message); }
    finally { setTextLoading(false); }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPhoto(file);
    const reader = new FileReader();
    reader.onloadend = () => setPhotoPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handlePhotoSubmit = async (e) => {
    e.preventDefault();
    if (!photo) return;
    setPhotoLoading(true); setPhotoError(null); setPhotoSuccess(false);
    try {
      const formData = new FormData();
      formData.append('photo', photo);
      await inventoryApi.updatePhoto(id, formData);
      setPhotoSuccess(true); setPhoto(null);
      setTimeout(() => setPhotoSuccess(false), 3000);
    } catch (e) { setPhotoError(e.message); }
    finally { setPhotoLoading(false); }
  };

  if (fetchLoading) return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-4 animate-pulse">
      <div className="skeleton h-8 w-48 rounded" />
      <div className="skeleton h-64 w-full rounded-2xl" />
    </div>
  );

  if (fetchError) return <div className="max-w-2xl mx-auto px-4 py-8 text-center text-red-500">{fetchError}</div>;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate('/admin')} className="w-9 h-9 rounded-lg border border-cloud-dark bg-white flex items-center justify-center hover:bg-cloud transition-colors">
          <svg className="w-4 h-4 text-midnight" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <h1 className="font-serif text-2xl font-bold text-midnight">Редагування</h1>
          <p className="text-midnight/40 text-sm font-sans truncate max-w-xs">{item?.inventory_name}</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Текстові дані */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-serif text-lg font-semibold text-midnight">Текстові дані</h2>
            <span className="text-xs font-mono text-midnight/30">PUT /inventory/:id</span>
          </div>
          {textError && <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">{textError}</div>}
          {textSuccess && <div className="mb-4 p-3 rounded-lg bg-green-50 border border-green-200 text-green-600 text-sm">✓ Збережено</div>}
          <form onSubmit={handleTextSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-midnight mb-1.5">Назва <span className="text-red-500">*</span></label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} className="input-field" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-midnight mb-1.5">Опис</label>
              <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} className="input-field resize-none" />
            </div>
            <div className="flex justify-end">
              <button type="submit" className="btn-primary" disabled={textLoading}>
                {textLoading ? 'Збереження...' : 'Зберегти текст'}
              </button>
            </div>
          </form>
        </div>

        {/* Фото */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-serif text-lg font-semibold text-midnight">Фотографія</h2>
            <span className="text-xs font-mono text-midnight/30">PUT /inventory/:id/photo</span>
          </div>
          {photoError && <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">{photoError}</div>}
          {photoSuccess && <div className="mb-4 p-3 rounded-lg bg-green-50 border border-green-200 text-green-600 text-sm">✓ Фото оновлено</div>}
          <form onSubmit={handlePhotoSubmit} className="space-y-4">
            <div className="flex items-center gap-4">
              <div>
                <p className="text-xs text-midnight/40 mb-1.5">Поточне</p>
                <div className="w-20 h-20 rounded-xl overflow-hidden border border-cloud-dark bg-cloud">
                  <img src={inventoryApi.getPhotoUrl(id)} alt="current" className="w-full h-full object-cover"
                    onError={e => { e.target.style.display='none'; e.target.parentNode.innerHTML='<div class="flex items-center justify-center h-full text-2xl">📦</div>'; }} />
                </div>
              </div>
              {photoPreview && (
                <>
                  <svg className="w-5 h-5 text-midnight/30 mt-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  <div>
                    <p className="text-xs text-midnight/40 mb-1.5">Нове</p>
                    <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-forest">
                      <img src={photoPreview} alt="new" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </>
              )}
              <label className="flex-1 border-2 border-dashed border-cloud-dark rounded-xl p-4 text-center cursor-pointer hover:border-forest hover:bg-forest/5 transition-all group mt-5">
                <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
                <svg className="w-6 h-6 text-midnight/30 group-hover:text-forest mx-auto mb-1 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                <p className="text-xs text-midnight/40">{photo ? photo.name : 'Обрати нове фото'}</p>
              </label>
            </div>
            <div className="flex justify-end">
              <button type="submit" className="btn-primary" disabled={!photo || photoLoading}>
                {photoLoading ? 'Завантаження...' : 'Оновити фото'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}