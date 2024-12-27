// Benzersiz ürün kodu oluşturucu
export const generateProductCode = (type, category) => {
  // Türe göre prefix
  const typePrefix = type === 'product' ? 'PRD' : 'SRV';
  
  // Kategoriye göre kod
  const categoryCode = category ? category.substring(0, 3).toUpperCase() : 'GEN';
  
  // Timestamp'ten benzersiz sayı
  const timestamp = new Date().getTime();
  const uniqueNumber = timestamp.toString().slice(-6);
  
  // Random harf
  const randomLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  
  // Kodu birleştir
  return `${typePrefix}-${categoryCode}-${uniqueNumber}${randomLetter}`;
};
