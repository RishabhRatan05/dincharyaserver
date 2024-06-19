const express = require("express")
const { signInUser, loginUser } = require("../controllers/auth")

const router = express.Router()

router.post("/login",loginUser)
router.post("/signUp", signInUser)

module.exports = router
