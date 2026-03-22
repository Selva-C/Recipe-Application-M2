import { Link } from 'react-router-dom';

export default function RecipeCard({ recipe, isFavorite, onToggleFavorite }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 relative group">
      {/* Clickable image and title that goes to details page */}
      <Link to={`/recipe/${recipe.idMeal}`} className="block">
        <img 
          src={recipe.strMealThumb} 
          alt={recipe.strMeal} 
          className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity"
        />
        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-800 truncate">{recipe.strMeal}</h3>
          {recipe.strCategory && (
            <span className="inline-block mt-2 px-3 py-1 bg-orange-100 text-orange-800 text-xs font-semibold rounded-full">
              {recipe.strCategory}
            </span>
          )}
        </div>
      </Link>

      {/* Instant Favorite Toggle Button */}
      <button 
        onClick={(e) => {
          e.preventDefault(); // Prevents the Link wrap from triggering
          onToggleFavorite(recipe);
        }}
        className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
        aria-label="Toggle Favorite"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill={isFavorite ? "currentColor" : "none"} 
          stroke="currentColor" 
          className={`w-6 h-6 ${isFavorite ? 'text-red-500' : 'text-gray-600'}`}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>
    </div>
  );
}