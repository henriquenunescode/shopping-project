const express = require("express")
const workersController = require("../controllers/workers.controller")

const router = express.Router()

router.post("/", workersController.create)
router.get("/", workersController.findAll)
router.get("/:id", workersController.findById)
router.put("/:id", workersController.update)
router.delete("/:id", workersController.remove)

module.exports = router