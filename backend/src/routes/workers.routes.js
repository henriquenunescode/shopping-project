const express = require("express")
const workersController = require("../controllers/workers.controller")
const authMiddleware = require("../middlewares/auth.middleware")
const gerenteMiddleware = require("../middlewares/gerente.middleware")

const router = express.Router()

router.get("/", workersController.findAll)
router.get("/:id", workersController.findById)

router.post("/", authMiddleware, gerenteMiddleware, workersController.create)
router.put("/:id", authMiddleware, gerenteMiddleware, workersController.update)
router.delete("/:id", authMiddleware, gerenteMiddleware, workersController.remove)

module.exports = router