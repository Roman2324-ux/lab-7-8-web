import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInventory } from '../store/InventoryContext';
import InventoryForm from '../components/inventory/InventoryForm';
import { inventoryApi } from '../services/inventoryApi';

export default function AdminInventoryCreate() {
  const navigate = useNavigate();
  const { addItem } = useInventory();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async ({ name, description, photo }) => {
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('inventory_name', name);
      formData.append('description', description);
      if (photo) formData.append('photo', photo);
      const newItem = await inventoryApi.create(formData);
      addItem(newItem);
      navigate('/admin');
    } catch (e) {
      setError(e.message || 'Помилка створення');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate('/admin')} className="w-9 h-9 rounded-lg border border-cloud-dark bg-white flex items-center justify-center hover:bg-cloud transition-colors">
          <svg className="w-4 h-4 text-midnight" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <h1 className="font-serif text-2xl font-bold text-midnight">Новий товар</h1>
          <p className="text-midnight/40 text-sm font-sans">Заповніть форму для додавання</p>
        </div>
      </div>
      <div className="card p-6">
        {error && <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">{error}</div>}
        <InventoryForm onSubmit={handleSubmit} loading={loading} submitLabel="Створити товар" />
      </div>
    </div>
  );
}