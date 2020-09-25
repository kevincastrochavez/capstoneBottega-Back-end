const express = require("express");

const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/signin", authController.signin);

router.use(authController.protect);

router.get("/me", userController.getMe, userController.getUser);
router.patch("/updateMe", userController.updateMe);

// ADMIN
router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);
router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser);

module.exports = router;
