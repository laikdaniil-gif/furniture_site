const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const getImageUrl = (filename) => {
  if (!filename) {
    console.warn('getImageUrl: filename is empty');
    return 'https://placehold.co/600x400?text=Нет+изображения';
  }
  const cleanFilename = filename.split('/').pop();
  return `${API_BASE}/static/${cleanFilename}`;
};