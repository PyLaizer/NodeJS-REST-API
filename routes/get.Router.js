const express = require('express')
const router = express.Router()

const getController = require('../controller/get.Controller')

router.get("/", getController.getAll)
router.get("/:id", getController.getById)
router.post("/:id/comment", getController.createComment)
router.get("/:id/allanoncomments",getController.getAnonComment)

module.exports = router