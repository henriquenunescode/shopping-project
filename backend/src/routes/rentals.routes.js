const express = require("express")
const rentalsController = require("../controllers/rentals.controller")
const authMiddleware = require("../middlewares/auth.middleware")
const gerenteMiddleware = require("../middlewares/gerente.middleware")

const router = express.Router()

router.post("/", authMiddleware, rentalsController.create)
router.get("/", authMiddleware, gerenteMiddleware, rentalsController.findAll)
router.get("/:id", authMiddleware, gerenteMiddleware, rentalsController.findById)
router.delete("/:id", authMiddleware, gerenteMiddleware, rentalsController.remove)

module.exports = router
