const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs')

const userSchema = new Schema(
    {
      username: {
        type: String,
        required: true,
        max_length: 20,
      },
      email: {
        type: String,
        required: true,
        max_length: 50,
      },
      password: {
        type: String,
        required: true,
        min_Length: 6
      },
      isMerchant:{
        type: Boolean,
        default: false,
        required:false,
      },
      order: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
    },
    {
      toJSON: {
        getters: true,
      },
    }
  );
//   userSchema
//   .virtual('friendcount')
//   // Getter
//   .get(function () {
//     return this.friends.length;
//   })

userSchema.pre('save', async function(next) {
    try {
      // Check if the password has been modified or is new
      if (!this.isModified('password')) {
        return next();
      }
  
      // Generate a salt
      const salt = await bcrypt.genSalt(10);
  
      // Hash the password along with the salt
      const hashedPassword = await bcrypt.hash(this.password, salt);
  
      // Replace the plaintext password with the hashed one
      this.password = hashedPassword;
      next();
    } catch (error) {
      next(error);
    }
  });
  

  
  const User = model('user', userSchema);
  
  module.exports = User;