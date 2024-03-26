const { Schema, model } = require('mongoose');
const ProductSchema = require('./product')

const CategorySchema = new Schema(
    {
      title: {
        type: String,
        required: true,
        maxlength: 280,
        minlength: 1,
      },
      sub: {
        type: String,
      },
      product: [ProductSchema],
    },
    {
      toJSON: {
        getters: true,
      },
    }
  );


const Category = model('Category', CategorySchema);
module.exports = Category