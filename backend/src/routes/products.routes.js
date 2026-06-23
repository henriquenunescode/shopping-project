const express = require("express")
const productsController = require("../controllers/products.controller")

const router = express.Router()

router.post("/", productsController.create)
router.get("/", productsController.findAll)
router.get("/:id", productsController.findById)
router.put("/:id", productsController.update)
router.delete("/:id", productsController.remove)

module.exports = router