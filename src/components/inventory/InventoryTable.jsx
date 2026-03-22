import { useNavigate } from 'react-router-dom';
import { inventoryApi } from '../../services/inventoryApi';

function SkeletonRow() {
  return (
    <tr className="border-b border-cloud-dark">
      {[1,2,3,4].map(i => (
        <td key={i} className="px-4 py-3">
          <div className="skeleton h-5 w-full" />
        </td>
      ))}
    </tr>
  );
}

export default function InventoryTable({ items, loading, error, onDelete }) {
  const navigate = useNavigate();

  if (error) return (
    <div className="flex flex-col items-center justify-center py-20 gap-4 animate-fade-in">
      <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
        <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <p className="text-midnight/60 font-sans">{error}</p>
    </div>
  );

  return (
    <div className="card overflow-x-auto animate-fade-in">
      <table className="w-full min-w-[640px]">
        <thead>
          <tr className="border-b-2 border-cloud-dark bg-cloud/50">
            <th className="px-4 py-3 text-left text-xs font-mono font-medium text-midnight/50 uppercase tracking-wider">Фото</th>
            <th className="px-4 py-3 text-left text-xs font-mono font-medium text-midnight/50 uppercase tracking-wider">Назва</th>
            <th className="px-4 py-3 text-left text-xs font-mono font-medium text-midnight/50 uppercase tracking-wider">Опис</th>
            <th className="px-4 py-3 text-right text-xs font-mono font-medium text-midnight/50 uppercase tracking-wider">Дії</th>
          </tr>
        </thead>
        <tbody>
          {loading && [1,2,3,4].map(i => <SkeletonRow key={i} />)}

          {!loading && items.length === 0 && (
            <tr>
              <td colSpan={4}>
                <div className="flex flex-col items-center justify-center py-16 gap-3">
                  <div className="text-4xl">📦</div>
                  <p className="text-midnight/40 font-sans text-sm">Інвентар порожній</p>
                </div>
              </td>
            </tr>
          )}

          {!loading && items.map((item) => {
            const id = item.id || item._id;
            return (
              <tr key={id} className="border-b border-cloud-dark/60 hover:bg-cloud/30 transition-colors">
                <td className="px-4 py-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-cloud border border-cloud-dark">
                    <img
                      src={inventoryApi.getPhotoUrl(id)}
                      alt={item.inventory_name}
                      className="w-full h-full object-cover"
                      onError={e => { e.target.style.display='none'; e.target.parentNode.innerHTML='<span class="flex items-center justify-center w-full h-full text-xl">📦</span>'; }}
                    />
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="font-serif font-semibold text-midnight text-sm">{item.inventory_name}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-midnight/60 text-sm font-sans line-clamp-2 max-w-xs">
                    {item.description || <em className="text-midnight/30">Без опису</em>}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => navigate(`/admin/${id}`)} className="p-2 rounded-lg hover:bg-forest/10 text-forest transition-colors" title="Переглянути">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    <button onClick={() => navigate(`/admin/${id}/edit`)} className="p-2 rounded-lg hover:bg-midnight/10 text-midnight/60 transition-colors" title="Редагувати">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button onClick={() => onDelete(item)} className="p-2 rounded-lg hover:bg-red-50 text-red-400 transition-colors" title="Видалити">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}