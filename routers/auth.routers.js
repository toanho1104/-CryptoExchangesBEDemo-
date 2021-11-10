const express = require('express')
const { Accounts } = require('../models')
const { login, sigin } = require('../controllers/auth.controllers')
const { logFeature } = require('../middlewares/log')
// const { checkEmailExists } = require('../middlewares/validations/cheackExistl.middlewares')
const authRouter = express.Router()

// authRouter.post('/register', logFeature('dang ky tai khoan'), checkEmailExists(Accounts), register)
authRouter.post('/sigin', logFeature('dang ky tai khoan'), sigin)
authRouter.post('/login', logFeature('dang ky tai khoan'), login)
module.exports = {
  authRouter
}