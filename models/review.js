const { Schema, model } = require('mongoose');

const ReviewSchema = new Schema(
    {
      reviewId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
      },
      body: {
        type: String,
        required: true,
        maxlength: 280,
        minlength: 1,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
     username: [{
        type: Schema.type.ObjectId,
        ref: 'User',
     }
     ],

    },
    {
      toJSON: {
        getters: true,
      },
    }
  );

const Review = model('Review', ReviewSchema);
module.exports = Review