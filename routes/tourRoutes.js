const express = require("express");
const {
  createTour,
  getTour,
  getAllTour,
  updateTour,
} = require("../controllers/tourController");

const router = express.Router();

router.route("/").post(createTour).get(getAllTour);

router.route("/:id").get(getTour).put(updateTour);

module.exports = router;
