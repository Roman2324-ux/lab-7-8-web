import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { InventoryProvider } from './store/InventoryContext';
import { NavLink, Outlet } from 'react-router-dom';
import { useState } from 'react';
import AdminInventory from './pages/AdminInventory';
import AdminInventoryCreate from './pages/AdminInventoryCreate';
import AdminInventoryEdit from './pages/AdminInventoryEdit';
import AdminInventoryDetails from './pages/AdminInventoryDetails';
import Gallery from './pages/Gallery';
import Favorites from './pages/Favorites';

function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navLinks = [
    { to: '/gallery', label: 'Галерея' },
    { to: '/favorites', label: 'Улюблені' },
    { to: '/admin', label: 'Адмін' },
  ];
  return (
    <div className="min-h-screen bg-cloud flex flex-col">
      <header className="bg-midnight text-cloud sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <NavLink to="/" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-forest rounded-lg flex items-center justify-center">
                <span className="text-cloud text-sm font-serif font-bold">W</span>
              </div>
              <span className="font-serif text-xl font-semibold tracking-wide">Warehouse</span>
            </NavLink>
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive ? 'bg-forest text-cloud' : 'text-cloud/70 hover:text-cloud hover:bg-white/10'
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </nav>
            <button className="md:hidden p-2 rounded-lg hover:bg-white/10" onClick={() => setMenuOpen(!menuOpen)}>
              <div className="w-5 h-4 flex flex-col justify-between">
                <span className={`block h-0.5 bg-cloud transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
                <span className={`block h-0.5 bg-cloud transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
                <span className={`block h-0.5 bg-cloud transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-[9px]' : ''}`} />
              </div>
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t border-white/10">
            <nav className="px-4 py-3 flex flex-col gap-1">
              {navLinks.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive ? 'bg-forest text-cloud' : 'text-cloud/80 hover:bg-white/10'
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </nav>
          </div>
        )}
      </header>
      <main className="flex-1"><Outlet /></main>
      <footer className="bg-midnight text-cloud/50 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs font-mono">
          © {new Date().getFullYear()} Warehouse System — Лабораторні роботи 7–8
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <InventoryProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Navigate to="/gallery" replace />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="admin" element={<AdminInventory />} />
            <Route path="admin/create" element={<AdminInventoryCreate />} />
            <Route path="admin/:id" element={<AdminInventoryDetails />} />
            <Route path="admin/:id/edit" element={<AdminInventoryEdit />} />
            <Route path="*" element={<Navigate to="/gallery" replace />} />
          </Route>
        </Routes>
      </InventoryProvider>
    </BrowserRouter>
  );
}