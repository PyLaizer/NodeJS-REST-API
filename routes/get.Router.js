const express = require('express')
const router = express.Router()

const getController = require('../controller/get.Controller')

router.get("/", getController.getAll)
router.get("/:id", getController.getById)
router.get("/:id/comments", getController.getAllComments)
router.post("/:id/comment", getController.createComment)
router.get("/:id/anoncomments",getController.getAnonComment)
router.get("/:id/characters", getController.getCharacters)

module.exports = router