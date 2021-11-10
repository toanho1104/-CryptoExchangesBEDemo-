const express = require('express')
const { getDetailAccount } = require('../controllers/account.controllers')
const { authenticate } = require('../middlewares/auth/verifyToken.midlewares')
const { logFeature } = require('../middlewares/log')
// const { getDetailAccount } = require('../controllers/account.controllers')
// const { getDetailAccount, updateAccount } = require('../controllers/account.controllers')
// const { authenticate } = require('../middlewares/auth/verifyToken.midlewares')
// const { logFeature } = require('../middlewares/log/logFeature.middlewares')

const accountRoute = express.Router()

// accountRoute.get('/', logFeature('lay thong tin tai khoan'), authenticate, getDetailAccount)
// accountRoute.put('/', logFeature('cap nhat thon tin tai khoan'), authenticate, updateAccount)
accountRoute.get('/', logFeature('lay thong tin tai khoan'), authenticate, getDetailAccount)

module.exports = {
  accountRoute
}