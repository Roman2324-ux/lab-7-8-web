import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInventory } from '../store/InventoryContext';
import InventoryTable from '../components/inventory/InventoryTable';
import ConfirmModal from '../components/inventory/ConfirmModal';
import { inventoryApi } from '../services/inventoryApi';

export default function AdminInventory() {
  const navigate = useNavigate();
  const { items, loading, error, fetchAll, removeItem } = useInventory();
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const id = deleteTarget.id || deleteTarget._id;
    setDeleteLoading(true);
    try {
      await inventoryApi.delete(id);
      removeItem(id);
      setDeleteTarget(null);
    } catch (e) {
      alert('Помилка видалення: ' + e.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-midnight">Інвентар</h1>
          <p className="text-midnight/50 text-sm font-sans mt-1">
            {!loading && `${items.length} позицій`}
          </p>
        </div>
        <button onClick={() => navigate('/admin/create')} className="btn-primary flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Додати товар
        </button>
      </div>

      <InventoryTable items={items} loading={loading} error={error} onDelete={setDeleteTarget} />

      <ConfirmModal
        isOpen={!!deleteTarget}
        title="Видалити товар?"
        message={`Ви впевнені, що хочете видалити "${deleteTarget?.inventory_name}"? Цю дію не можна скасувати.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleteLoading}
      />
    </div>
  );
}