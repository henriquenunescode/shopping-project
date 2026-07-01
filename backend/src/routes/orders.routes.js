const express = require("express")
const ordersController = require("../controllers/orders.controller")
const authMiddleware = require("../middlewares/auth.middleware")
const gerenteMiddleware = require("../middlewares/gerente.middleware")

const router = express.Router()

router.post("/", authMiddleware, ordersController.create)
router.get("/", authMiddleware, gerenteMiddleware, ordersController.findAll)
router.get("/:id", authMiddleware, gerenteMiddleware, ordersController.findById)
router.delete("/:id", authMiddleware, gerenteMiddleware, ordersController.remove)

module.exports = router
