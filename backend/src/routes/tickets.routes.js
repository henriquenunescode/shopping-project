const express = require("express")
const ticketsController = require("../controllers/tickets.controller")
const authMiddleware = require("../middlewares/auth.middleware")

const router = express.Router()

router.post("/", authMiddleware, ticketsController.create)
router.get("/", ticketsController.findAll)
router.get("/:id", ticketsController.findById)
router.delete("/:id", authMiddleware, ticketsController.remove)

module.exports = router