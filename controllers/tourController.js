const Tour = require("../models/Tour");
const _ = require("lodash");
const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

exports.getAllTour = catchAsync(async (req, res, next) => {
  const feature = new APIFeatures(Tour.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const tour = await feature.query;

  res.status(200).json({
    status: "success",
    results: tour.length,
    data: {
      tour,
    },
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id);
  if (!tour) return next(new AppError("Tour does not exist", 404));

  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
});

exports.createTour = async (req, res) => {
  try {
    const tour = req.body;
    const newTour = await Tour.create(tour);

    res.status(201).json({
      status: "success",
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "fail",
      message: "Invalid data sent!",
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = req.body;
    const lowerPrice = _.minBy(tour.prices, (o) => o.price).price;
    const newTour = await Tour.findByIdAndUpdate(
      req.params.id,
      { ...tour, lowerPrice },
      { new: true, runValidator: true }
    );
    //const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "fail",
      message: "Invalid data sent!",
    });
  }
};
