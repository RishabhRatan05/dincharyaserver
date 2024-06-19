const express = require("express")

const {getProfile, updateProfile, deleteProfile} = require('../controllers/profile')
const router = express.Router()


router.route("/:id")
    .get(getProfile)
    .put(updateProfile)
    .delete(deleteProfile)



module.exports= router
