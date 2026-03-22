import { useState, useEffect } from 'react';
import RecipeCard from '../components/RecipeCard';

export default function Home({ favoritesManager }) {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  
  // State for the new category dropdown
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  // Fetch standard recipes AND categories on component mount
  useEffect(() => {
    fetchRecipes('chicken', 'search'); // Default load
    fetchCategories(); // Load dropdown options
  }, []);

  // Fetch the list of categories for the dropdown from the API
  const fetchCategories = async () => {
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      const data = await response.json();
      setCategories(data.meals || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Upgraded fetch function to handle both text search and category filtering
  const fetchRecipes = async (query, type = 'search') => {
    setLoading(true);
    try {
      let url = '';
      if (type === 'category') {
        // API endpoint for filtering by category
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${query}`;
      } else {
        // API endpoint for searching by name
        url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      setRecipes(data.meals || []);
    } catch (error) {
      console.error(`Error fetching recipes by ${type}:`, error);
    } finally {
      setLoading(false);
    }
  };

  // Handle Text Search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setSelectedCategory(''); // Reset dropdown to 'All'
      fetchRecipes(searchTerm, 'search');
    }
  };

  // Handle Dropdown Category selection
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    
    if (category === '') {
      // If user selects "All Categories", fetch a default or clear
      setSearchTerm('');
      fetchRecipes('chicken', 'search'); 
    } else {
      setSearchTerm(''); // Clear text search when using dropdown
      fetchRecipes(category, 'category');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Search and Filter Section */}
      <div className="mb-8 max-w-4xl mx-auto">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3">
          
          {/* Text Search Input */}
          <input
            type="text"
            placeholder="Search for recipes (e.g., Arrabiata, Chicken...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          
          {/* Category Dropdown */}
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="px-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
          >
            <option value="">All Categories</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat.strCategory}>
                {cat.strCategory}
              </option>
            ))}
          </select>

          {/* Search Button */}
          <button 
            type="submit" 
            className="px-8 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors shadow-sm"
          >
            Search
          </button>
        </form>
      </div>

      {/* Recipe Grid */}
      {loading ? (
        <div className="text-center text-xl font-semibold text-gray-500 mt-12">Loading amazing recipes...</div>
      ) : recipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recipes.map((recipe) => (
            <RecipeCard 
              key={recipe.idMeal} 
              recipe={recipe} 
              isFavorite={favoritesManager.isFavorite(recipe.idMeal)}
              onToggleFavorite={favoritesManager.toggleFavorite}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-xl font-semibold text-gray-500 mt-12">No recipes found. Try another search or category!</div>
      )}
    </div>
  );
}