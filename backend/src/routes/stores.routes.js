const express = require("express")

const router = express.Router()

const storesController = require("../controllers/stores.controller")

router.post("/", storesController.create)
router.get("/", storesController.findAll)
router.get("/:id", storesController.findById)
router.put("/:id", storesController.update)
router.delete("/:id", storesController.remove)

module.exports = router