import { createContext, useContext, useState, useCallback } from 'react';
import { inventoryApi } from '../services/inventoryApi';

const InventoryContext = createContext(null);

export function InventoryProvider({ children }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await inventoryApi.getAll();
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'Помилка завантаження');
    } finally {
      setLoading(false);
    }
  }, []);

  const addItem = useCallback((item) => {
    setItems(prev => [item, ...prev]);
  }, []);

  const updateItem = useCallback((id, updates) => {
    setItems(prev => prev.map(i =>
      (i.id === id || i._id === id) ? { ...i, ...updates } : i
    ));
  }, []);

  const removeItem = useCallback((id) => {
    setItems(prev => prev.filter(i => i.id !== id && i._id !== id));
  }, []);

  return (
    <InventoryContext.Provider value={{ items, loading, error, fetchAll, addItem, updateItem, removeItem }}>
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory() {
  const ctx = useContext(InventoryContext);
  if (!ctx) throw new Error('useInventory must be used within InventoryProvider');
  return ctx;
}