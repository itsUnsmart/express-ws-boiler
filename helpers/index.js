/**
 * @param {string | number} PORT The port to listen on.
 * @return {number} The normalized port number.
 */

module.exports.normalizePort = PORT => {
  if (isNaN(Number(PORT))) PORT = 8080

  return PORT
}

/**
 * @param {string} message The message to parse.
 * @return The parsed JSON object or null.
 */

module.exports.safeParseJSON = message => {
  try {
    return JSON.parse(message)
  } catch (error) {
    return null
  }
}

/**
 * @typedef ErrorReason
 * @type {Object}
 * @param {string} reason - The reason for the error
 * @param {string} message - The error reason message
 * @param {any} data - The data received at the location of the error.
 * @param {string} location - The location of the error reason.
 */

/**
 * @typedef ErrorMessage
 * @type {Object}
 * @param {string} error - The error message.
 * @param {Array.<ErrorReason>} reasons - The reasons for the error.
 */

/**
 * @param {ErrorMessage}
 * @return The rendered error message
 */
module.exports.generateError = ({ error, reasons = [] }) => {
  return {
    type: 'error',
    message: error,
    code: error
      .split(' ')
      .join('_')
      .toLowerCase(),
    context_info: {
      errors: reasons.map(({ reason, message, data, location }) => {
        return {
          reason,
          message,
          data: data || null,
          location
        }
      })
    }
  }
}
