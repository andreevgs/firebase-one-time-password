const twilio = require('twilio')

const accoundSid = 'ACc05025b5a8619a9ec843f61083c09bf0'
const authToken = '536460a5492a212471e62c72a341dbd2'

module.exports = new twilio.Twilio(accoundSid, authToken)