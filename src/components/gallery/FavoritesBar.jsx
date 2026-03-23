import { useNavigate } from 'react-router-dom';

export default function FavoritesBar({ count }) {
  const navigate = useNavigate();

  if (count === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 animate-slide-up">
      <button
        onClick={() => navigate('/favorites')}
        className="flex items-center gap-3 bg-midnight text-cloud px-6 py-3 rounded-full shadow-2xl hover:bg-forest transition-all duration-300"
      >
        <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        <span className="font-sans font-medium text-sm">Улюблені</span>
        <span className="bg-red-500 text-white text-xs font-mono w-6 h-6 rounded-full flex items-center justify-center">
          {count}
        </span>
      </button>
    </div>
  );
}