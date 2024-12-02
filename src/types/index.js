/**
 * Represents a geographic location with latitude and longitude
 * @typedef {Object} Location
 * @property {number} latitude - The latitude coordinate
 * @property {number} longitude - The longitude coordinate
 */

/**
 * Represents a waste report submission
 * @typedef {Object} WasteReport
 * @property {string} image - Base64 or URL of the uploaded image
 * @property {Location} location - Geographic coordinates of the waste location
 * @property {string} description - Detailed description of the waste
 * @property {string} email - Contact email of the reporter
 */

/**
 * Result of location validation
 * @typedef {Object} LocationValidationResult
 * @property {boolean} isValid - Indicates if the location is valid
 * @property {string} message - Validation message or error description
 */

/**
 * Data structure for sending email about a waste report
 * @typedef {Object} EmailData
 * @property {string} to_email - Recipient email address
 * @property {string} from_email - Sender email address
 * @property {string} description - Waste report description
 * @property {string} location - Formatted location string
 * @property {string} image - Base64 or URL of the uploaded image
 */

// While not strictly necessary, these exports maintain the original module structure
export default {
  Location,
  WasteReport,
  LocationValidationResult,
  EmailData
};