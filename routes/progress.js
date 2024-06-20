const express = require('express')

const { getAllProgress, createProgress, deleteProgress, updateProgress } = require("../controllers/progress")

const router = express.Router()

router.put('/',updateProgress)
router.route('/:id')
        .get(getAllProgress)
        .post(createProgress)
        .delete(deleteProgress)



module.exports= router
