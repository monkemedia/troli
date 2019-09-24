const crypto = require('crypto')

module.exports = {
  generateToken: () => crypto.randomBytes(20).toString('hex'),

  generateExpiryToken: () => new Date().getTime() + 15 * 60 * 1000
}
