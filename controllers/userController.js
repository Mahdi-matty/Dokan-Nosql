const { ObjectId } = require('mongoose').Types;
const tokenAuth = require('../middleware/withTokenAuth')

const {User, Order, Review} = require('../models')

module.exports = {
    async getusers(req, res) {
        try {
          const user = await User.find();
    
          const userobj = {
            user,
            // headCount: await headCount(),
          };
    
          res.json(userobj);
        } catch (err) {
          console.log(err);
          return res.status(500).json(err);
        }
      },

    async getSingleUser(req, res) {
        try {
          const user = await User.findOne({ _id: req.params.userId })
            .select('-__v');
    
          if (!user) {
            return res.status(404).json({ message: 'No user with that ID' })
          }
    
          res.json( user );
        } catch (err) {
          console.log(err);
          return res.status(500).json(err);
        }
      },

    async createuser(req, res) {
        try {
          const user = await User.create(req.body);
          res.json(user);
        } catch (err) {
          res.status(500).json(err);
        }
      },

    async updateUser(req, res) {
        try {
          const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
          );
    
          if (!user) {
            return res.status(404).json({ message: 'No user with this id!' });
          }
    
          res.json(user);
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
      },

    async deleteUser(req, res) {
        try {
          const user = await User.findOneAndDelete({ _id: req.params.userId });
    
          if (!user) {
            return res.status(404).json({ message: 'No such user exists' });
          }
    
          const order = await Order.findOneAndUpdate(
            { user: req.params.userId },
            { $pull: { user: req.params.userId } },
            { new: true }
          );
    
          if (!order) {
            return res.status(404).json({
              message: 'user deleted, but no orders found',
            });
          }
    
          res.json({ message: 'user successfully deleted' });
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
      },
}
