import { inventoryApi } from '../../services/inventoryApi';

export default function InventoryCard({ item, isFav, onToggleFav, onClick }) {
  const id = item.id || item._id;

  return (
    <div
      className="group relative card cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
      onClick={() => onClick(item)}
    >
      <div className="aspect-square overflow-hidden bg-cloud-dark relative">
       <img
       src={inventoryApi.getPhotoUrl(id)}
       alt={item.inventory_name}
       className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 p-2"
       onError={e => {
         e.target.style.display = 'none';
         e.target.parentNode.innerHTML += '<div class="absolute inset-0 flex items-center justify-center text-5xl">📦</div>';
      }}
    />
     <div className="absolute inset-0 bg-midnight/0 group-hover:bg-midnight/20 transition-colors duration-300" />
   </div>

      <button
        onClick={e => { e.stopPropagation(); onToggleFav(id); }}
        className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 shadow-md z-10
          ${isFav
            ? 'bg-red-500 text-white'
            : 'bg-white/90 text-midnight/40 opacity-0 group-hover:opacity-100 hover:text-red-400'
          }`}
        title={isFav ? 'Видалити з улюблених' : 'Додати до улюблених'}
      >
        <svg className="w-4 h-4" fill={isFav ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>

      <div className="p-4">
        <h3 className="font-serif font-semibold text-midnight text-base truncate">{item.inventory_name}</h3>
        {item.description && (
          <p className="text-midnight/50 text-xs font-sans mt-1 line-clamp-2">{item.description}</p>
        )}
      </div>
    </div>
  );
}