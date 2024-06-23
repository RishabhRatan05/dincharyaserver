const express = require('express')

const { getAllProgress, createProgress, deleteProgress, updateProgress } = require("../controllers/progress")

const router = express.Router()

router.route('/')
        .put(updateProgress)
        .get(getAllProgress)
        .post(createProgress)
router.delete('/:id',deleteProgress)



module.exports= router
