const crypto = require('crypto')

module.exports = {
  generateToken: () => {
    return crypto.randomBytes(20).toString('hex')
  },

  generateExpiryToken: () => {
    return new Date().getTime() + 15 * 60 * 1000
  }
}
