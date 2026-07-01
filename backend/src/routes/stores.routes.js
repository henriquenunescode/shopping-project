const express = require("express")
const storesController = require("../controllers/stores.controller")
const authMiddleware = require("../middlewares/auth.middleware")
const gerenteMiddleware = require("../middlewares/gerente.middleware")

const router = express.Router()

router.get("/", storesController.findAll)
router.get("/:id", storesController.findById)

router.post("/", authMiddleware, gerenteMiddleware, storesController.create)
router.put("/:id", authMiddleware, gerenteMiddleware, storesController.update)
router.delete("/:id", authMiddleware, gerenteMiddleware, storesController.remove)

module.exports = router
