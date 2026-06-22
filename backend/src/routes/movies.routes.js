const express = require("express")

const router = express.Router()

const moviesController = require("../controllers/movies.controller")

router.post("/", moviesController.create)
router.get("/", moviesController.findAll)
router.get("/:id", moviesController.findById)
router.put("/:id", moviesController.update)
router.delete("/:id", moviesController.remove)

module.exports = router