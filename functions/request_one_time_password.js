const admin = require("firebase-admin")
const twilio = require('./twillio')

module.exports = (req, res) => {
    if (!req.body.phone) {
        return res.status(422).send({ error: 'You must provide a phone number' })
    }
    const phone = String(req.body.phone).replace(/[^\d]/g, '')
    admin.auth().getUser(phone)
        .then(userRecord => {
            const code = Math.floor(Math.random() * 8999 + 1000)
            twilio.messages.create({
                body: 'Your code is ' + code,
                to: phone,
                from: '+12672744151'
            }, (error) => {
                if (error) {
                    return res.status(422).send(error)
                }
                admin.database().ref('users/' + phone)
                    .update({ code: code, codeValid: true }, () => {
                        res.send({ success: true })
                    })
            })

        })
        .catch((error) => {
            res.status(422).send({ error: error })
        })
}