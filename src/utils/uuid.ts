/**
 * Benzersiz bir UUID (Universally Unique Identifier) oluşturur
 */
export function generateUUID(): string {
  // Modern tarayıcılarda crypto.randomUUID() kullanılabilir
  if (typeof window !== 'undefined' && window.crypto && typeof window.crypto.randomUUID === 'function') {
    return window.crypto.randomUUID();
  }
  
  // Eski tarayıcılar için alternatif UUID oluşturma yöntemi
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
} 