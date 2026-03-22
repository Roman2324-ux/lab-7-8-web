import { useState } from 'react';

export default function InventoryForm({ initialData = {}, onSubmit, loading, submitLabel = 'Зберегти' }) {
  const [name, setName] = useState(initialData.inventory_name || '');
  const [description, setDescription] = useState(initialData.description || '');
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = "Назва обов'язкова";
    return e;
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPhoto(file);
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    onSubmit({ name: name.trim(), description: description.trim(), photo });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-midnight mb-1.5 font-sans">
          Назва <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Введіть назву інвентарю"
          className={`input-field ${errors.name ? 'border-red-400 focus:ring-red-200' : ''}`}
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-midnight mb-1.5 font-sans">Опис</label>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Короткий опис товару..."
          rows={4}
          className="input-field resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-midnight mb-1.5 font-sans">Фото</label>
        <div className="flex items-start gap-4">
          <label className="flex-1 border-2 border-dashed border-cloud-dark rounded-xl p-6 text-center cursor-pointer hover:border-forest hover:bg-forest/5 transition-all duration-200 group">
            <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-cloud flex items-center justify-center group-hover:bg-forest/10 transition-colors">
                <svg className="w-5 h-5 text-midnight/40 group-hover:text-forest" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-xs text-midnight/50 font-sans">
                {photo ? photo.name : 'Клікніть щоб обрати зображення'}
              </p>
            </div>
          </label>
          {preview && (
            <div className="w-24 h-24 rounded-xl overflow-hidden border border-cloud-dark flex-shrink-0">
              <img src={preview} alt="Preview" className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              Збереження...
            </span>
          ) : submitLabel}
        </button>
      </div>
    </form>
  );
}