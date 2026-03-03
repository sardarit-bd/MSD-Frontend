/**
 * Safely generates a slug from a string
 * @param {string} text 
 * @returns {string}
 */
export function generateSlug(text) {
  if (!text) return '';
  
  return text
    .toLowerCase()
    .replace(/[;,.]/g, '')           // Remove punctuation
    .replace(/\s+/g, '-')             // Replace spaces with hyphens
    .replace(/[^\w\-]+/g, '')         // Remove non-word chars
    .replace(/\-\-+/g, '-')           // Replace multiple hyphens
    .replace(/^-+/, '')                // Trim hyphens from start
    .replace(/-+$/, '');               // Trim hyphens from end
}

/**
 * Validates medical topic data structure
 * @param {any} data 
 * @returns {boolean}
 */
export function isValidTopicData(data) {
  return data && 
         typeof data === 'object' && 
         typeof data.title === 'string' &&
         (!data.items || Array.isArray(data.items));
}

/**
 * Creates a cache key for dynamic imports
 * @param {string} slug 
 * @returns {string}
 */
export function getTopicCacheKey(slug) {
  return `medical-topic-${slug}`;
}

/**
 * Validates if a slug exists in the index
 * @param {string} slug 
 * @param {Object} indexData 
 * @returns {boolean}
 */
export function isValidSlug(slug, indexData) {
  return slug && indexData && typeof indexData[slug] !== 'undefined';
}