
// Utility functions for date formatting
export const formatDate = (dateString: string) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

export const formatShortDate = (dateString: string) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
};
