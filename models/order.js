const { Schema, model } = require('mongoose');

const OrderSchema = new Schema(
    {
      createdAt:{
        type: Date,
        default: Date.now
      },
      product: [{
        type: Schema.type.ObjectId,
        ref: 'Product'
      }],
    },
    {
      toJSON: {
        getters: true,
      },
    }
  );


const Order = model('Order', OrderSchema);
module.exports = Order