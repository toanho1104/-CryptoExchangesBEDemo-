const express = require('express')
const { accountRoute } = require('./account.routers')
const { authRouter } = require('./auth.routers')
// const { accountManagerRouter } = require('./accountManager.routers')
// const { authRouter } = require('./auth.routers')
// const { authorRoute } = require('./author.routers')
// const { authorManagerRouter } = require('./authorManager.routers')
// const { courseRouter } = require('./course.routers')
// const { courseContentManagerRouter } = require('./courseContenManager.routers ')
// const { courseMannagerRouter } = require('./courseMannager.routers')

const rootRouter = express.Router()

rootRouter.use('/auth', authRouter)

rootRouter.use('/account', accountRoute)
// rootRouter.use('/accountManager', accountManagerRouter)

// rootRouter.use('/course', courseRouter)
// rootRouter.use('/courseManager', courseMannagerRouter)

// rootRouter.use('/author', authorRoute)
// rootRouter.use('/authorManager', authorManagerRouter)

// rootRouter.use('/courseContentManager', courseContentManagerRouter)

module.exports = rootRouter