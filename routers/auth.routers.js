const express = require('express')
const { Account } = require('../models')
const { login, sigin, verifyAccountSendOTP, verifyAccountGetOTP } = require('../controllers/auth.controllers')
const { logFeature } = require('../middlewares/log')
const { checkEmailExists, checkEmailNotExist } = require('../middlewares/validations/cheackExistl.middlewares')
const { authenticate } = require('../middlewares/auth/verifyToken.midlewares')
const { checkStatusAccount } = require('../middlewares/auth/verifyAccount.midlewares')
const authRouter = express.Router()

// authRouter.post('/register', logFeature('dang ky tai khoan'), checkEmailExists(Accounts), register)
authRouter.post('/sigin', logFeature('dang ky tai khoan'), checkEmailExists(Account), sigin)
authRouter.post('/login', logFeature('dang nhap khoan'), login)
authRouter.post('/verifyAccount/sendOtp', logFeature('xac nhan tai khoan, gui ma otp'), authenticate, checkStatusAccount([null]), verifyAccountSendOTP)
authRouter.post('/verifyAccount/getOtp', logFeature('xac nhan tai khoan, xac thuc ma otp'), authenticate, checkStatusAccount([null]), verifyAccountGetOTP)

module.exports = {
  authRouter
}