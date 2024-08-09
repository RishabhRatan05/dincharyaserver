const jwt = require("jsonwebtoken")
const User = require("../models/profile")

const checkLoggedInUser = async (req, res, next) => {
  const token = req.headers["authorization"]

  if (typeof token == "undefined") return

  const email = jwt.verify(token, process.env.SECRET)

  const isUser = await User.find({ email })

  if (isUser) {
    next()
  }

  return
}

const getId = async (token) => {
  if (typeof token == "undefined") return null

  const email = jwt.verify(token, process.env.SECRET)

  const isUser = await User.find({ email: email })

  if (!isUser) return null

  const { _id } = isUser[0]
  return _id
}

module.exports = { checkLoggedInUser, getId }
