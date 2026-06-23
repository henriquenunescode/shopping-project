const express = require("express")
const ticketsController = require("../controllers/tickets.controller")

const router = express.Router()

router.post("/", ticketsController.create)
router.get("/", ticketsController.findAll)
router.get("/:id", ticketsController.findById)
router.delete("/:id", ticketsController.remove)

module.exports = router