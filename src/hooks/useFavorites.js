import { useState, useEffect } from 'react';

export function useFavorites() {
  // Initialize state directly from localStorage so there's no initial flash/delay
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('recipehub_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  // Sync state changes to localStorage automatically
  useEffect(() => {
    localStorage.setItem('recipehub_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (recipe) => {
    setFavorites((prevFavorites) => {
      const isFavorited = prevFavorites.some((fav) => fav.idMeal === recipe.idMeal);
      if (isFavorited) {
        // Remove without delay
        return prevFavorites.filter((fav) => fav.idMeal !== recipe.idMeal);
      } else {
        // Add without delay
        return [...prevFavorites, recipe];
      }
    });
  };

  const isFavorite = (id) => favorites.some((fav) => fav.idMeal === id);

  return { favorites, toggleFavorite, isFavorite };
}