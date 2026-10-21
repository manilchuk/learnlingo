import { useState, useCallback } from "react";
import { useAuth } from "../context/useAuth";

const STORAGE_KEY = "learnlingo_favorites";

export const useFavorites = () => {
  const { user } = useAuth();
  const userId = user?.uid;

  const getFavoritesForUser = useCallback(() => {
    if (!userId) return [];
    const stored = localStorage.getItem(`${STORAGE_KEY}_${userId}`);
    if (!stored) return [];
    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  }, [userId]);

  const [favoritesState, setFavoritesState] = useState(() => ({
    userId,
    favorites: getFavoritesForUser(),
  }));

  // Якщо userId змінився, оновлюємо стан під час рендеру
  if (favoritesState.userId !== userId) {
    setFavoritesState({
      userId,
      favorites: getFavoritesForUser(),
    });
  }

  const favorites = favoritesState.favorites;

  const toggleFavorite = useCallback(
    (teacherId) => {
      if (!userId) return;

      setFavoritesState((prev) => {
        const isAlreadyFavorite = prev.favorites.includes(teacherId);
        const updated = isAlreadyFavorite
          ? prev.favorites.filter((id) => id !== teacherId)
          : [...prev.favorites, teacherId];

        localStorage.setItem(
          `${STORAGE_KEY}_${userId}`,
          JSON.stringify(updated),
        );
        return { userId, favorites: updated };
      });
    },
    [userId],
  );

  const isFavorite = useCallback(
    (teacherId) => favorites.includes(teacherId),
    [favorites],
  );

  return { favorites, toggleFavorite, isFavorite };
};
