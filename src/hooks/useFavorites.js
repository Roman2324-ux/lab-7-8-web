import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'warehouse_favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = useCallback((id) => favorites.includes(String(id)), [favorites]);

  const toggleFavorite = useCallback((id) => {
    const sid = String(id);
    setFavorites(prev =>
      prev.includes(sid) ? prev.filter(f => f !== sid) : [...prev, sid]
    );
  }, []);

  const removeFavorite = useCallback((id) => {
    setFavorites(prev => prev.filter(f => f !== String(id)));
  }, []);

  return { favorites, isFavorite, toggleFavorite, removeFavorite };
}