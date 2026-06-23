const express = require("express")

const router = express.Router()

const usersController = require("../controllers/users.controller")

router.post("/", usersController.create)
router.get("/", usersController.findAll)
router.get("/:id/history", usersController.findHistory)
router.get("/:id", usersController.findById)
router.put("/:id", usersController.update)
router.delete("/:id", usersController.remove)

module.exports = router