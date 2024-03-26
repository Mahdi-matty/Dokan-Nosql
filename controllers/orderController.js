const {Order, Product} = require('../models')


module.exports = {

    async getOrders(req, res) {
        try {
          const ord = await Order.find();
          res.json(ord);
        } catch (err) {
          res.status(500).json(err);
        }
      },

    async getSingleOrder(req, res) {
        try {
          const ord = await Order.findOne({ _id: req.params.orderId })

    
          if (!ord) {
            return res.status(404).json({ message: 'No ord with that ID' });
          }
          res.json(ord);
        } catch (err) {
          res.status(500).json(err);
        }
      },

    async createOrder(req, res) {
          try {
            const { productId } = req.body;
            const ord = await Order.create({ product: productId });
            res.json(ord);
          } catch (err) {
            console.log(err);
            return res.status(500).json(err);
          }
        },
  
    async deleteOrder(req, res) {
          try {
            const ord = await Order.findOneAndDelete({ _id: req.params.productId });
      
            if (!ord) {
              res.status(404).json({ message: 'No ord with that ID' });
            }
            res.json({ message: 'produc and reviews deleted!' });
          } catch (err) {
            res.status(500).json(err);
          }
        },
}