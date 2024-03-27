const withTokenAuth = require('../../middleware/withTokenAuth')
const router = require('express').Router();
const {
 getOrders,
 getSingleOrder,
 createOrder,
 deleteOrder
} = require('../../controllers/orderController')


router.route('/').get(getOrders).post(withTokenAuth, createOrder)


router.route('/:orderId').get(getSingleOrder).delete(deleteOrder)


module.exports= router
