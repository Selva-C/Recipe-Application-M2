import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import RecipeDetails from './pages/RecipeDetails';
import Favorites from './pages/Favorites';
import { useFavorites } from './hooks/useFavorites';

export default function App() {
  const favoritesManager = useFavorites(); // Lift state up so all routes can access it

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
        {/* Navigation Bar */}
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <Link to="/" className="text-2xl font-black text-orange-500 tracking-tight">
              RecipeHub
            </Link>
            <nav className="flex gap-6">
              <Link to="/" className="font-semibold text-gray-600 hover:text-orange-500 transition-colors">
                Home
              </Link>
              <Link to="/favorites" className="font-semibold text-gray-600 hover:text-orange-500 transition-colors flex items-center gap-1">
                Favorites 
                <span className="bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full text-xs">
                  {favoritesManager.favorites.length}
                </span>
              </Link>
            </nav>
          </div>
        </header>

        {/* Page Routing */}
        <main>
          <Routes>
            <Route path="/" element={<Home favoritesManager={favoritesManager} />} />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
            <Route path="/favorites" element={<Favorites favoritesManager={favoritesManager} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}