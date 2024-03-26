const router = require('express').Router();

const {
    getusers,
    getSingleUser,
    createuser,
    deleteUser,
    updateUser
} = require('../../controllers/userController')

router.route('/').get(getusers).post(createuser);

router
  .route('/:userId')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);


  module.exports = router