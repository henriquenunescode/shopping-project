const express = require("express")
const usersController = require("../controllers/users.controller")
const authMiddleware = require("../middlewares/auth.middleware")

const router = express.Router()

router.post("/", usersController.create)
router.get("/", usersController.findAll)

router.get("/:id/history", authMiddleware, usersController.findHistory)

router.get("/:id", usersController.findById)
router.put("/:id", authMiddleware, usersController.update)
router.delete("/:id", authMiddleware, usersController.remove)

module.exports = router