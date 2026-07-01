const express = require("express")
const moviesController = require("../controllers/movies.controller")
const authMiddleware = require("../middlewares/auth.middleware")
const gerenteMiddleware = require("../middlewares/gerente.middleware")

const router = express.Router()

router.get("/", moviesController.findAll)
router.get("/:id", moviesController.findById)

router.post("/", authMiddleware, gerenteMiddleware, moviesController.create)
router.put("/:id", authMiddleware, gerenteMiddleware, moviesController.update)
router.delete("/:id", authMiddleware, gerenteMiddleware, moviesController.remove)

module.exports = router
