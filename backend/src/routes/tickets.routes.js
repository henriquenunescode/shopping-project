const express = require("express")
const ticketsController = require("../controllers/tickets.controller")
const authMiddleware = require("../middlewares/auth.middleware")
const gerenteMiddleware = require("../middlewares/gerente.middleware")

const router = express.Router()

router.post("/", authMiddleware, ticketsController.create)
router.get("/", authMiddleware, gerenteMiddleware, ticketsController.findAll)
router.get("/:id", authMiddleware, gerenteMiddleware, ticketsController.findById)
router.delete("/:id", authMiddleware, gerenteMiddleware, ticketsController.remove)

module.exports = router
