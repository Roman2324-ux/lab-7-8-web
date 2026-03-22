import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
});

export const inventoryApi = {
  getAll: () => api.get('/inventory').then(r => r.data),
  getById: (id) => api.get(`/inventory/${id}`).then(r => r.data),
  create: (formData) => api.post('/register', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }).then(r => r.data),
  updateText: (id, data) => api.put(`/inventory/${id}`, data).then(r => r.data),
  updatePhoto: (id, formData) => api.put(`/inventory/${id}/photo`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }).then(r => r.data),
  delete: (id) => api.delete(`/inventory/${id}`).then(r => r.data),
  getPhotoUrl: (id) => `${api.defaults.baseURL}/inventory/${id}/photo`,
};

export default api;