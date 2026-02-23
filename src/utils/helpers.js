/**
 * Utility functions for the E-Commerce application
 */

/**
 * Format price to Indian Rupee format
 * @param {number} price - The price to format
 * @returns {string} Formatted price string
 */
export const formatPrice = (price) => {
  if (!price || isNaN(price)) return '₹0';
  return `₹${Math.round(price).toLocaleString('en-IN')}`;
};

/**
 * Truncate text to specified length
 * @param {string} text - The text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text with ellipsis
 */
export const truncateText = (text, maxLength = 50) => {
  if (!text) return '';
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

/**
 * Debounce function to limit function calls
 * @param {function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {function} Debounced function
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Validate product object
 * @param {object} product - Product to validate
 * @returns {boolean} Whether product is valid
 */
export const isValidProduct = (product) => {
  return (
    product &&
    product.id &&
    product.name &&
    product.price !== undefined &&
    product.price !== null
  );
};

/**
 * Sort products by price
 * @param {array} products - Products to sort
 * @param {string} order - 'asc' or 'desc'
 * @returns {array} Sorted products
 */
export const sortByPrice = (products, order = 'asc') => {
  return [...products].sort((a, b) => {
    return order === 'asc' ? a.price - b.price : b.price - a.price;
  });
};

/**
 * Filter products by category
 * @param {array} products - Products to filter
 * @param {string} category - Category to filter by
 * @returns {array} Filtered products
 */
export const filterByCategory = (products, category) => {
  if (!category) return products;
  return products.filter(p => p.category?.toLowerCase() === category.toLowerCase());
};

/**
 * Search products by name or description
 * @param {array} products - Products to search
 * @param {string} query - Search query
 * @returns {array} Filtered products
 */
export const searchProducts = (products, query) => {
  if (!query) return products;
  const lowerQuery = query.toLowerCase();
  return products.filter(
    p =>
      p.name?.toLowerCase().includes(lowerQuery) ||
      p.description?.toLowerCase().includes(lowerQuery)
  );
};

/**
 * Get unique categories from products
 * @param {array} products - Products to extract categories from
 * @returns {array} Unique categories
 */
export const getUniqueCategories = (products) => {
  const categories = products.map(p => p.category).filter(Boolean);
  return [...new Set(categories)];
};

/**
 * Calculate total value of all products
 * @param {array} products - Products to sum
 * @returns {number} Total value
 */
export const calculateTotalValue = (products) => {
  return products.reduce((total, p) => total + (p.price || 0), 0);
};

export default {
  formatPrice,
  truncateText,
  debounce,
  isValidProduct,
  sortByPrice,
  filterByCategory,
  searchProducts,
  getUniqueCategories,
  calculateTotalValue,
};
