const jwt = require("jsonwebtoken")
const User = require("../models/profile")

const checkLoggedInUser = async (req, res, next) => {
  const token = req.headers["authorization"]
  if (token == "null") {
    return
  } else {
    const email = jwt.verify(token, process.env.SECRET)

    const isUser = await User.find({ email })

    if (isUser) {
      next()
    }

    return
  }
}

const getId = async (token) => {
  if (token == "null") {
    return null
  } else {
    const email = jwt.verify(token, process.env.SECRET)

    const isUser = await User.find({ email: email })

    if (!isUser) return null

    const { _id } = isUser[0]
    return _id
  }
}

module.exports = { checkLoggedInUser, getId }
