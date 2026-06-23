const express = require("express")
const ordersController = require("../controllers/orders.controller")

const router = express.Router()

router.post("/", ordersController.create)
router.get("/", ordersController.findAll)
router.get("/:id", ordersController.findById)
router.delete("/:id", ordersController.remove)

module.exports = router