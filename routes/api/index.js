const router = require('express').Router();
const orderRoutes = require('./orderRouter')
const productRoutes = require('./productRouter')
const userRoutes = require('./userRoutes')

router.use('/order', orderRoutes)
router.use('/product', productRoutes)
router.use('/user', userRoutes)


module.exports = router