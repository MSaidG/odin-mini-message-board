const express = require('express');
const usersController = require('../controllers/usersController');
const router = express.Router();

router.get("/", usersController.usersListGet);
router.get("/create", usersController.usersCreateGet);
router.post("/create", usersController.usersCreatePost);
router.get("/:id/update", usersController.usersUpdateGet);
router.post("/:id/update", usersController.usersUpdatePost);
router.post("/:id/delete", usersController.usersDeletePost);
router.get("/search", usersController.usersSearchGet);

module.exports = router;