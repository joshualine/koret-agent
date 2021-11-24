const mongoose = require('mongoose');

const Rental = mongoose.model('Rental', new mongoose.Schema({
  user: {
    type: new mongoose.Schema({
      username: {
        type: String,
        require: true,
        min: 3,
        max: 20,
        unique: true,
      },
      email: {
        type: String,
        required: true,
        max: 50,
        unique: true,
      },
      isAgent: {
        type: Boolean,
        default: false,
      }
    }),
    required: true
  },
  property: {
    type: new mongoose.Schema({
      userId: {
        type: String,
        required: true,
      },
      propFollowers: {
        type: Array,
        default: [],
      },
    }),
    required: true
  },
  dateOut: {
    type: Date,
    required: true,
    default: Date.now
  },
  rentalFee: {
    type: Number,
    min: 0
  }
}))