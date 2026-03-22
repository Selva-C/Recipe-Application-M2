import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await response.json();
        setRecipe(data.meals ? data.meals[0] : null);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipeDetails();
  }, [id]);

  if (loading) return <div className="text-center mt-12 text-xl font-semibold">Loading recipe...</div>;
  if (!recipe) return <div className="text-center mt-12 text-xl font-semibold">Recipe not found!</div>;

  // Extract ingredients dynamically (API returns them as strIngredient1, strIngredient2...)
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (recipe[`strIngredient${i}`]) {
      ingredients.push(`${recipe[`strIngredient${i}`]} - ${recipe[`strMeasure${i}`]}`);
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Back button */}
      <button 
        onClick={() => navigate(-1)} 
        className="mb-6 flex items-center text-orange-500 hover:text-orange-600 font-semibold"
      >
        &larr; Back
      </button>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full h-64 md:h-96 object-cover" />
        
        <div className="p-6 md:p-8">
          <div className="flex flex-wrap items-center justify-between mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">{recipe.strMeal}</h1>
            <span className="px-4 py-2 bg-orange-100 text-orange-800 font-semibold rounded-full mt-2 md:mt-0">
              {recipe.strCategory} | {recipe.strArea}
            </span>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Ingredients Side */}
            <div className="md:col-span-1">
              <h3 className="text-xl font-bold mb-4 border-b pb-2">Ingredients</h3>
              <ul className="space-y-2">
                {ingredients.map((ing, index) => (
                  <li key={index} className="bg-gray-50 p-2 rounded text-gray-700">{ing}</li>
                ))}
              </ul>
            </div>

            {/* Instructions Side */}
            <div className="md:col-span-2">
              <h3 className="text-xl font-bold mb-4 border-b pb-2">Instructions</h3>
              <p className="text-gray-700 whitespace-pre-line leading-relaxed">{recipe.strInstructions}</p>
              
              {recipe.strYoutube && (
                <div className="mt-8">
                  <a 
                    href={recipe.strYoutube} 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-block px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition"
                  >
                    Watch on YouTube
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}