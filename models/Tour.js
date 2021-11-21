const mongoose = require("mongoose");
const _ = require("lodash");

const tourSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 100,
    minlength: 6,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    maxlength: 500,
    trim: true,
  },
  amenities: [String],
  departureDate: {
    type: Date,
    required: true,
  },
  returnDate: {
    type: Date,
    required: true,
  },
  seats: {
    type: Number,
  },
  currency: {
    type: String,
    require: true,
  },
  prices: [
    {
      description: String,
      price: Number,
      seats: Number,
    },
  ],

  lowerPrice: {
    type: Number,
    require: true,
  },
  departurePlaces: [
    {
      name: String,
      time: Date,
      coordinate: {
        longitude: Number,
        latitude: Number,
      },
    },
  ],
  createAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  isActive: {
    type: Boolean,
    default: false,
    required: true,
  },
  recommendations: {
    type: String,
    trim: true,
  },
  importantNotes: {
    type: String,
    trim: true,
  },
  imagesCover: {
    type: String,
    require: true,
  },
  images: [String],
});

tourSchema.pre("save", function (next) {
  this.lowerPrice = _.minBy(this.prices, (o) => o.price).price;
  next();
});

tourSchema.pre("updateOne", function () {
  this.lowerPrice = _.minBy(this.prices, (o) => o.price).price;
  next();
});

module.exports = mongoose.model("Tour", tourSchema);
