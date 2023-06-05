const express = require("express");

const repairsController = require("./../controllers/repairs.controller");

const router = express.Router();

router.route("/")
  .get(repairsController.findRepairs)
  .post(repairsController.createAppointment);

router.route("/:id")
  .get(repairsController.findRepair)
  .patch(repairsController.updateStatus)
  .delete(repairsController.cancelAppointment);

module.exports = router;

