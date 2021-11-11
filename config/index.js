const mail = require("@sendgrid/mail")

const results = (code, success, message, results) => (
  {
    code,
    success,
    message,
    results
  }
)

const key = 'toanho1104'
const mailKey = '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'

const smg = (mail, otp) => {
  return ({
    to: mail,
    from: 'toanho1104@gmail.com', // Use the email address or domain you verified above
    subject: 'Thông báo xác nhân mail',
    text: `code OTP:${otp}`,
    html: `code OTP:${otp}`,
  })


}

module.exports = {
  results, key, mailKey, smg
}