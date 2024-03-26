const { Schema, model } = require('mongoose');

const ProductSchema = new Schema(
    {
      title: {
        type: String,
        required: true,
        maxlength: 280,
        minlength: 1,
      },
      content: {
        type: String,
      },
      productPic:{
        type: String,
      },
      stock: {
        type: Number,
      },
      category: {
        type: Schema.type.ObjectId,
        ref: 'Category',
        required: false
      },
      reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
    },
    {
      toJSON: {
        getters: true,
      },
    }
  );
//   ProductSchema
//   .virtual('reactionCount')
//   // Getter
//   .get(function () {
//     return this.reactions.length;
//   })

const Product = model('Product', ProductSchema);

module.exports = Product;