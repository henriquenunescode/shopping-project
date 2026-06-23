const express = require("express")
const rentalsController = require("../controllers/rentals.controller")
const authMiddleware = require("../middlewares/auth.middleware")

const router = express.Router()

router.post("/", authMiddleware, rentalsController.create)
router.get("/", rentalsController.findAll)
router.get("/:id", rentalsController.findById)
router.delete("/:id", authMiddleware, rentalsController.remove)

module.exports = router