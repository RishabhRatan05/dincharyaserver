const express = require("express")
const { signUpUser, loginUser } = require("../controllers/auth")

const router = express.Router()

router.post("/login",loginUser)
router.post("/signUp", signUpUser)

module.exports = router
