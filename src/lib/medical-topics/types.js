/**
 * @typedef {Object} MedicalTopicItem
 * @property {string} title
 * @property {string} [slug]
 * @property {MedicalTopicItem[]} [children]
 */

/**
 * @typedef {Object} MedicalTopicSection
 * @property {string} title
 * @property {MedicalTopicItem[]} items
 */

/**
 * @typedef {Object} MedicalTopicIndex
 * @property {Object.<string, {title: string}>} sections
 */