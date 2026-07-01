const express = require("express")
const productsController = require("../controllers/products.controller")
const authMiddleware = require("../middlewares/auth.middleware")
const gerenteMiddleware = require("../middlewares/gerente.middleware")

const router = express.Router()

router.get("/", productsController.findAll)
router.get("/:id", productsController.findById)

router.post("/", authMiddleware, gerenteMiddleware, productsController.create)
router.put("/:id", authMiddleware, gerenteMiddleware, productsController.update)
router.delete("/:id", authMiddleware, gerenteMiddleware, productsController.remove)

module.exports = router
