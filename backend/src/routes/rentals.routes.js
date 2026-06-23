const express = require("express")
const rentalsController = require("../controllers/rentals.controller")

const router = express.Router()

router.post("/", rentalsController.create)
router.get("/", rentalsController.findAll)
router.get("/:id", rentalsController.findById)
router.delete("/:id", rentalsController.remove)

module.exports = router