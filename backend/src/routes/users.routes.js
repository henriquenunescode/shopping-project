const express = require("express")
const usersController = require("../controllers/users.controller")
const authMiddleware = require("../middlewares/auth.middleware")
const gerenteMiddleware = require("../middlewares/gerente.middleware")

const router = express.Router()

router.get("/:id/history", authMiddleware, usersController.findHistory)
router.delete("/:id/history", authMiddleware, usersController.clearHistory)

router.post("/", authMiddleware, gerenteMiddleware, usersController.create)
router.get("/", authMiddleware, gerenteMiddleware, usersController.findAll)
router.get("/:id", authMiddleware, gerenteMiddleware, usersController.findById)
router.put("/:id", authMiddleware, usersController.update)
router.delete("/:id", authMiddleware, gerenteMiddleware, usersController.remove)

module.exports = router
