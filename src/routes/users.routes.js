const express = require("express");

const usersController = require("./../controllers/users.controller");

const validationMiddleware = require("./../middlewares/validations.middleware");

const router = express.Router();

router.route("/")
  .get(usersController.findUsers)
  .post(validationMiddleware.validUser, usersController.createNewUser);

router.route("/:id")
  .get(usersController.findUser)
  .patch(usersController.updateUser)
  .delete(usersController.deleteUser); 

module.exports = router;
