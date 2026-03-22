import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { InventoryProvider } from './store/InventoryContext';
import AdminInventory from './pages/AdminInventory';
import AdminInventoryCreate from './pages/AdminInventoryCreate';
import AdminInventoryEdit from './pages/AdminInventoryEdit';
import AdminInventoryDetails from './pages/AdminInventoryDetails';

export default function App() {
  return (
    <BrowserRouter>
      <InventoryProvider>
        <div className="min-h-screen bg-cloud flex flex-col">
          {/* Header */}
          <header className="bg-midnight text-cloud sticky top-0 z-40 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center h-16 gap-3">
                <div className="w-8 h-8 bg-forest rounded-lg flex items-center justify-center">
                  <span className="text-cloud text-sm font-serif font-bold">W</span>
                </div>
                <span className="font-serif text-xl font-semibold tracking-wide">Warehouse</span>
              </div>
            </div>
          </header>

          {/* Main */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Navigate to="/admin" replace />} />
              <Route path="/admin" element={<AdminInventory />} />
              <Route path="/admin/create" element={<AdminInventoryCreate />} />
              <Route path="/admin/:id" element={<AdminInventoryDetails />} />
              <Route path="/admin/:id/edit" element={<AdminInventoryEdit />} />
              <Route path="*" element={<Navigate to="/admin" replace />} />
            </Routes>
          </main>

          {/* Footer */}
          <footer className="bg-midnight text-cloud/50 py-6 mt-auto">
            <div className="max-w-7xl mx-auto px-4 text-center text-xs font-mono">
              © {new Date().getFullYear()} Warehouse System — Лабораторна робота 7
            </div>
          </footer>
        </div>
      </InventoryProvider>
    </BrowserRouter>
  );
}