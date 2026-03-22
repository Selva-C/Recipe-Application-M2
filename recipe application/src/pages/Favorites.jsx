import RecipeCard from '../components/RecipeCard';

export default function Favorites({ favoritesManager }) {
  const { favorites, toggleFavorite, isFavorite } = favoritesManager;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Favorite Recipes</h1>
      
      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((recipe) => (
            <RecipeCard 
              key={recipe.idMeal} 
              recipe={recipe} 
              isFavorite={isFavorite(recipe.idMeal)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <p className="text-xl text-gray-500 mb-4">You haven't saved any recipes yet!</p>
          <p className="text-gray-400">Click the heart icon on any recipe to add it here.</p>
        </div>
      )}
    </div>
  );
}