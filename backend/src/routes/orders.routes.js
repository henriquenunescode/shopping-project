const express = require("express")
const ordersController = require("../controllers/orders.controller")
const authMiddleware = require("../middlewares/auth.middleware")

const router = express.Router()

router.post("/", authMiddleware, ordersController.create)
router.get("/", ordersController.findAll)
router.get("/:id", ordersController.findById)
router.delete("/:id", authMiddleware, ordersController.remove)

module.exports = router