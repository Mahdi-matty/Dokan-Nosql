const router = require('express').Router();

const {
    getCategory,
    getProductss,
    getSingleProduct,
    getSingleCategory,
    createCategory,
    createReview,
    createProduct,
    deleteProduct,
    removeReview,
    updateProduct,
} = require('../../controllers/productController')

router.route('/').get(getProductss).post(createProduct);

router.route('/category/').get(getCategory).post(createCategory)

router.route('/review/').post(createReview)

router.route('/:productId').get(getSingleProduct).put(updateProduct).delete(deleteProduct)

router.route('/category/:categoryId').get(getSingleCategory)

router.route('/review/:reviewId').delete(removeReview)

module.exports= router
